import AboutSummary from "@/components/modules/Home/AboutMe";
import FeaturedProjects from "@/components/modules/Home/FeaturedProject";
import HeroSection from "@/components/modules/Home/HeroSection";
import RecentBlogs from "@/components/modules/Home/RecentBlog";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSummary />
      <FeaturedProjects></FeaturedProjects>
      <RecentBlogs></RecentBlogs>
    </>
  );
}
