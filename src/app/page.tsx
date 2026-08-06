import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedCalculators from "@/components/home/FeaturedCalculators";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import LatestCalculators from "@/components/home/LatestCalculators";

export default function Home() {
  return (
    <>
      {/* 2. Hero */}
      <Hero />

      {/* 3. Search */}
      <SearchBar />

      {/* 4. Categories */}
      <CategoryGrid />

      {/* 5. Featured Calculators */}
      <FeaturedCalculators />

      {/* 6. Why Choose Us */}
      <WhyChooseUs />

      {/* 7. Latest Calculators */}
      <LatestCalculators />
    </>
  );
}
