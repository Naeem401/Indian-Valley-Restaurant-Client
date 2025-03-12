
import { useApp } from "../AppContext/AppContext";
import Banner from "../componants/Home/Banner";
import ChefRecommends from "../componants/Home/ChefRecommends";
import Featured from "../componants/Home/Featured/Featured";
import ItemSlider from "../componants/Home/ItameSlider";
import MidBanner from "../componants/Home/MidBanner";
import PopularItem from "../componants/Home/PopularItem";
import Testimonials from "../componants/Home/Testtimonials";
import SectionTitle from "../componants/SectionTitle";

const Home = () => {
  const { language } = useApp();

  // Translations
  const translations = {
    en: {
      orderOnline: { subHeading: "From 12.30pm to 1.00am", heading: "Order Online" },
      fromOurMenu: { subHeading: "Check it out", heading: "FROM OUR MENU" },
      chefRecommends: { subHeading: "Should Try", heading: "CHEF RECOMMENDS" },
      testimonials: { subHeading: "What Our Clients Say", heading: "TESTIMONIALS" },
    },
    ar: {
      orderOnline: { subHeading: "من الساعة 12:30 مساءً إلى الساعة 1:00 صباحًا", heading: "اطلب عبر الإنترنت" },
      fromOurMenu: { subHeading: "تحقق من ذلك", heading: "من قائمتنا" },
      chefRecommends: { subHeading: "يجب أن تجرب", heading: "يوصي الطاهي" },
      testimonials: { subHeading: "ما يقوله عملاؤنا", heading: "الشهادات" },
    },
  };

  const t = translations[language]; 

  return (
    <div className="bg-black text-white">
      <div className="pt-16">
  <Banner />
</div>
      <SectionTitle 
        subHeading={t.orderOnline.subHeading} 
        heading={t.orderOnline.heading} 
      />
      <ItemSlider />
      <MidBanner />
      <SectionTitle 
        subHeading={t.fromOurMenu.subHeading} 
        heading={t.fromOurMenu.heading} 
      />
      <PopularItem />
      <SectionTitle 
        subHeading={t.chefRecommends.subHeading} 
        heading={t.chefRecommends.heading} 
      />
      <ChefRecommends />
      <Featured />
      <SectionTitle 
        subHeading={t.testimonials.subHeading} 
        heading={t.testimonials.heading} 
      />
      <Testimonials />
    </div>
  );
};

export default Home;