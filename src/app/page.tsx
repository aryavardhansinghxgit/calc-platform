import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedCalculators from "@/components/home/FeaturedCalculators";
import LatestCalculators from "@/components/home/LatestCalculators";

export default function Home() {
  return (
    <div className="space-y-6 pb-6">
      {/* 1. Compact Command Hero */}
      <Hero />

      {/* 2. Instant Search & Quick Launch */}
      <SearchBar />

      {/* 3. High-Density Category Grid */}
      <CategoryGrid />

      {/* 4. Featured Desktop Calculator Widget */}
      <FeaturedCalculators />

      {/* 5. All Tools Directory */}
      <LatestCalculators />
    </div>
  );
}
