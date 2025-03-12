import Banner from "../componants/Home/Banner";
import ItamCard from "../componants/ItamCard";
import { useState, useEffect } from "react";
import useMenu from "../Hooks/useMenu";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useApp } from "../AppContext/AppContext";
import { useParams } from "react-router-dom"; // Use useParams to get the category from URL
import { FaSpinner } from "react-icons/fa";

const Menu = () => {
  const { language, loading } = useApp();
  const { category } = useParams(); 
  const [menu] = useMenu();
  const [selectedCategory, setSelectedCategory] = useState(category || "Soups");

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  const categoriesWithImages = menu.reduce((acc, item) => {
    const categoryName = item.category[language];
    if (!acc[categoryName]) {
      acc[categoryName] = item.image;
    }
    return acc;
  }, {});

  const categories = Object.keys(categoriesWithImages);

  // Filter menu items based on the selected category
  const filteredItems = menu.filter(
    (item) => item.category[language] === selectedCategory
  );
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1a1a1a]">
        <FaSpinner className="animate-spin text-4xl text-[#D99904]" />
      </div>
    );
  }
  return (
    <div className="mb-4">
      <div className="pt-16">
        <Banner />
      </div>

      <div className="my-4">
        <Swiper
          spaceBetween={15}
          slidesPerView="auto"
          freeMode={true}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center" style={{ width: "auto" }}>
              <div
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-4 pr-2 rounded-full cursor-pointer ${selectedCategory === category ? "bg-[#D99904] text-white" : "bg-[#1a1a1a] text-[#adacac]"}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
                  <img
                    src={categoriesWithImages[category] || "default_image.jpg"}
                    alt={category}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm md:text-base font-bold">{category}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] gap-5 mx-auto">
        {filteredItems.map((item) => (
          <ItamCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
