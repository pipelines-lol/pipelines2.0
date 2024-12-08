import Hero from "~/components/landing/Hero";
import Offerings from "~/components/landing/Offerings";
import People from "~/components/landing/People";
import About from "~/components/landing/About";
import SlidingImages from "~/components/landing/Marquee";
import Testimonies from "~/components/landing/Testimonies";
import CTA from "~/components/landing/CTA";

export default function Page(): JSX.Element {
  return (
    <>
      <Hero />
      <Offerings />
      <About />
      <People />
      <SlidingImages />
      <Testimonies />
      <CTA />
    </>
  );
}
