import FeaturedDestanition from "../components/home/card/FeaturedDestanition";
import Hero from "../components/home/hero/Hero";
import NewsLetter from "../components/home/newsLetter/NewsLetter";
import ExclusiveOffers from "../components/home/offers/ExclusiveOffers";
import Testimonial from "../components/home/testimonial/Testimonial";
const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedDestanition />
      <ExclusiveOffers />
      <Testimonial />
      <NewsLetter />
    </>
  );
};

export default Home;
