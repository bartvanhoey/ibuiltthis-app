"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import z, { undefined } from "zod";
import { productSchema } from "./product-validations";
import { db } from "@/db";
import { products } from "@/db/schema";
import { FormState } from "@/types";
import { eq, sql } from "drizzle-orm";
import { refresh, revalidatePath } from "next/cache";

// import { auth } from "@clerk/nextjs/server";

// const productSchema = z.object({})

export async function addProductAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log({ formData });

  try {
    const { userId, orgId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not signed in",
      };
    }

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";

    const rawFormData = Object.fromEntries(formData.entries());

    const validatedData = productSchema.safeParse(rawFormData);

    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to submit a product",
      };
    }

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Invalid data",
      };
    }

    const { name, slug, tagline, description, websiteUrl, tags } =
      validatedData.data;

    const tagsArray = tags
      ? tags.filter((tag: string) => typeof tag === "string")
      : [];

    console.log({ tagsArray });

    await db.insert(products).values({
      name,
      slug,
      tagline,
      description,
      websiteUrl,
      tags: tagsArray,
      status: "pending",
      submittedBy: userEmail,
      organizationId: orgId,
      userId,
    });

    return {
      success: true,
      message: "Product submitted successfully! It will be reviewed shortly.",
    };
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        // errors: error.flatten().fieldErrors,
        errors: z.treeifyError(error),
        message: "Zod Validation failed.",
      };
    }

    return {
      success: false,
      errors: { _form: ["something went wrong"] },
      message: "Failed to submit product",
    };
  }
}

export async function upvoteProductAction(productId: number) {
  console.log({ productId });

  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      console.log("user not signed in");
      return {
        success: false,
        message: "User not signed in",
      };
    }
    if (!orgId) {
      console.log("user not a organization member");
      return {
        success: false,
        message: "You must be a member of an organization to upvote a product",
      };
    }

    await db
      .update(products)
      .set({ voteCount: sql`GREATEST(0, vote_count + 1)` })
      .where(eq(products.id, productId));

    // refresh();
    
    revalidatePath("/")

    return {
      success: true,
      message: "Product upvoted successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to upvote product",
      voteCount: 0,
    };
  }
}

export async function downvoteProductAction(productId: number) {
  console.log({ productId });

  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      console.log("user not signed in");
      return {
        success: false,
        message: "User not signed in",
      };
    }
    if (!orgId) {
      console.log("user not a organization member");
      return {
        success: false,
        message: "You must be a member of an organization to upvote a product",
      };
    }

    await db
      .update(products)
      .set({ voteCount: sql`GREATEST(0, vote_count - 1)` })
      .where(eq(products.id, productId));

    // refresh();

    revalidatePath("/")

    return {
      success: true,
      message: "Product downvoted successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to downvote product",
      voteCount: 0,
    };
  }
}
