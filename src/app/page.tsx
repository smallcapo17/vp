import { Hero } from "../components/Hero";
import { VideoSlider } from "../components/VideoSlider";
import { Events } from "../components/Events";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-white text-espresso">
      <Navbar />
      <Hero />
      <VideoSlider />
      <Events />
      <Footer />
    </main>
  );
}
