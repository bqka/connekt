import Hero from "@/components/hero";
import Reviews from "@/components/reviews";
import Usecase from "@/components/usecase";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-background text-text px-8">
      <Hero />
      <Usecase />
      <Reviews />
    </main>
  );
}