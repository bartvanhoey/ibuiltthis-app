"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormField } from "../forms/form-field";

export default function ProductSubmitForm() {
  return (
    <form className="space-y-6">
      <FormField
        label="Product Name"
        name="name"
        id="name"
        placeholder="My Awesome Product"
        required
        onChange={() => {}}
        error=""
      />

      <FormField
        label="Slug"
        name="slug"
        id="slug"
        placeholder="my-awesome-product"
        required
        onChange={() => {}}
        helperText="URL-friendly version of your product name"
        error=""
      />

      <FormField
        label="Description"
        name="description"
        id="description"
        placeholder="A brief description of your product"
        required
        onChange={() => {}}
        helperText="URL-friendly version of your product name"
        error=""
        textarea
      />

      <FormField
        label="Tagline"
        name="tagline"
        id="tagline"
        placeholder="A brief, catchy description"
        required={false}
        onChange={() => {}}
        error=""
      />

      <FormField
        label="Website URL"
        name="websiteUrl"
        id="websiteUrl"
        placeholder="https://www.yourproduct.com"
        required
        onChange={() => {}}
        error=""
        helperText="Enter your product's website or landing page"
      />

      <FormField
        label="Tags"
        name="tags"
        id="tags"
        placeholder="AI, Productivity, Saas"
        required={false}
        onChange={() => {}}
        error=""
        helperText="Comma-separated tags (e.g. AI, SaaS, Productivity)"
      />
    </form>
  );
}
