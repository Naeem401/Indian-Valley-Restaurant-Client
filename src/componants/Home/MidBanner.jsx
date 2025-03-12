import { useApp } from "../../AppContext/AppContext";
import mid from "../../assets/img/Banner/chef-service.jpg";
const MidBanner = () => {
  const { language } = useApp();
  const texts = {
    en: {
      heading: "Indian Valley Restaurant",
      subheading: "Welcome to Indian Valley Restaurant 🙏, where authentic Indian flavors meet warm hospitality. Indulge in traditional delicacies crafted with love, bringing the taste of India to you!",
    },
    ar: {
      heading: "مطعم وادي الهندي",
      subheading: "مرحباً بكم في مطعم وادي الهندي 🙏، حيث تلتقي النكهات الهندية الأصيلة مع الضيافة الدافئة. استمتعوا بالمأكولات التقليدية التي تم تحضيرها بحب، مما يجلب طعم الهند إليكم!",
    },
  };

  return (
    <div
      className="w-4/5 mx-auto my-20 min-h-[400px] bg-cover bg-center"
      style={{ backgroundImage: `url(${mid})` }}
    >
      <div className="bg-white bg-opacity-75 p-8 lg:py-16 lg:px-28 text-center">
        <h2 className="text-3xl lg:text-4xl text-[#151515] mb-4 font-bold">
          {texts[language].heading}
        </h2>
        <p className="text-lg text-[#151515]">
          {texts[language].subheading}
        </p>
      </div>
    </div>
  );
};

export default MidBanner;