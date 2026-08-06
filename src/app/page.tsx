import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedCalculators from "@/components/home/FeaturedCalculators";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex-1 w-full space-y-12">
        <Hero />
        <CategoryGrid />
        <FeaturedCalculators />
      </main>
      <Footer />
    </div>
  );
}
