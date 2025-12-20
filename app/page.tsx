import FeaturedProducts from "@/components/landing-page/featured-products";
import HeroSection from "@/components/landing-page/hero-section";
import RecentlyLaunchedProducts from "@/components/landing-page/recently-launched-products";
import { LoaderIcon } from "lucide-react";

import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <Suspense
        fallback={
          <div className="wrapper flex items-center gap-2">
            Loading Recently Launched Products...
            <LoaderIcon className="size-4 animate-spin" />
          </div>
        }>
        <RecentlyLaunchedProducts />
      </Suspense>
    </div>
  );
}
