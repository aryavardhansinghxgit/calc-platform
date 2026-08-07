import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedCalculators from "@/components/home/FeaturedCalculators";
import LatestCalculators from "@/components/home/LatestCalculators";

export default function Home() {
  return (
    <div className="space-y-6 pb-6">
      {/* 1. Hero with Quick Scientific Calculator & SearchBar */}
      <Hero />

      {/* 2. 4-Column Directory (High Density Links matching Calculator.net) */}
      <CategoryGrid />

      {/* 3. Featured Calculator Tabs */}
      <FeaturedCalculators />

      {/* 4. Latest Tools Index */}
      <LatestCalculators />
    </div>
  );
}
