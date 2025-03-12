import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import { useApp } from "../../AppContext/AppContext";
import useMenu from "../../Hooks/useMenu";
import { useNavigate } from "react-router-dom"; 

const ItemSlider = () => {
  const { language } = useApp();
  const [menu] = useMenu();
  const [categoriesWithImages, setCategoriesWithImages] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const categories = menu.reduce((acc, item) => {
      const categoryName = item.category[language];
      if (!acc[categoryName]) {
        acc[categoryName] = item.image;
      }
      return acc;
    }, {});

    setCategoriesWithImages(
      Object.keys(categories).map((categoryName) => ({
        category: categoryName,
        image: categories[categoryName],
      }))
    );
  }, [menu, language]);

  const handleCategoryClick = (category) => {
    navigate(`/menu/${category}`); // Navigate to the menu page with selected category
  };

  return (
    <div className="w-4/5 mx-auto my-12">
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          1024: { slidesPerView: 4 },
          768: { slidesPerView: 3 },
          640: { slidesPerView: 2 },
          320: { slidesPerView: 1 },
        }}
      >
        {categoriesWithImages.map((category, index) => (
          <SwiperSlide
            key={index}
            className="relative cursor-pointer" // Added cursor-pointer here
            onClick={() => handleCategoryClick(category.category)}
          >
            <img
              src={category.image || "default_image.jpg"}
              alt={category.category}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
            <h2 className="text-center absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 text-white text-2xl font-bold">
              {category.category}
            </h2>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ItemSlider;
