import Hero from "~/components/hero";
import Offerings from "~/components/offerings";
import People from "~/components/people";
import About from "~/components/About";
import SlidingImages from "~/components/Marquee";
import Testimonies from "~/components/Testimonies";
import CTA from "~/components/CTA";

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
