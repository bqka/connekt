import GetStarted from "./GetStarted";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Hero() {
  return (
    <section className="relative flex h-[80vh] w-full max-w-6xl items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: "url('/image1.png')",
          backgroundPosition: "center 35%",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/30" />

      {/* Foreground content */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-4 px-6 text-center md:px-12">
        <h1 className="text-3xl font-bold text-gray-50 text-shadow-lg/30 sm:text-4xl md:text-5xl">
          Welcome to the Future of <br />
          Conferencing!
        </h1>
        <p className="text-sm text-white/60 md:text-lg">
          Build something amazing with Next.js and Tailwind.
        </p>
        <GetStarted />
      </div>
    </section>
  );
}
