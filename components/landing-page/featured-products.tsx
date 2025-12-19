"use cache"
import React, { cache } from "react";
import SectionHeader from "../common/section-header";
import { ArrowRightIcon, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductCard from "../products/product-card";
import { getFeaturedProducts } from "@/lib/products/products-select";


// const featuredProducts = [
//   {
//     id: 1,
//     name: "ParityKit",
//     description: "A toolkit for creating parity products",
//     tags: ["SaaS", "Pricing", "Global"],
//     votes: 615,
//     isFeatured: true,
//   },
//   {
//     id: 2,
//     name: "Modern Full Stack Next.js Course",
//     description: "Learn to build modern full stack applications with Next.js",
//     tags: ["Next.js", "Full-Stack", "Course"],
//     votes: 124,
//     isFeatured: false,
//   },
// ];

export default async function FeaturedProducts() {

  const featuredProducts = await getFeaturedProducts();

  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Featured Today"
            icon={StarIcon}
            description="Top picks from our community this week"
          />
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/explore">
              View All <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid-wrapper">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
