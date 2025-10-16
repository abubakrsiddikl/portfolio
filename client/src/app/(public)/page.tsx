import AboutSummary from "@/components/modules/Home/AboutMe";
import FeaturedProjects from "@/components/modules/Home/FeaturedProject";
import HeroSection from "@/components/modules/Home/HeroSection";
import RecentBlogs from "@/components/modules/Home/RecentBlog";

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] text-white overflow-hidden">
        {/*  bg-gradient-to-br from-[#0a021f] via-[#120336] to-[#1a0449] */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#6d28d9_40%,_transparent_50%)] opacity-30 --animate-fade-glow-once"></div> */}

        <HeroSection />
        <AboutSummary />
        <FeaturedProjects></FeaturedProjects>
        <RecentBlogs></RecentBlogs>
      </section>
    </>
  );
}
