import { getFeaturedProducts } from "@/lib/products/products-select";
import React from "react";

export const generateStaticParams = async () => {
  const products = await getFeaturedProducts();
  return products.map((product) => ({ id: product.id.toString() }));
};

async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div>ProductDetail for product {id}</div>;
}

export default ProductDetail;
