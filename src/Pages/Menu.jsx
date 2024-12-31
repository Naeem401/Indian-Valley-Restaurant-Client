import Banner from "../componants/Home/Banner";
import ItamCard from "../componants/ItamCard";
import { useState, useEffect } from "react";
import useMenu from "../Hooks/useMenu";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/css"; // Core Swiper CSS
import { useAuth } from "../AuthProvider/AuthContext"; // Import Auth context for language

const Menu = () => {
  const [menu] = useMenu(); // Assuming this returns the menu items
  const { language } = useAuth(); // Get selected language from context
  const [selectedCategory, setSelectedCategory] = useState(""); // Initialize with an empty string

  // Effect to set the default category based on the language
  useEffect(() => {
    if (language === "ar") {
      setSelectedCategory("الشوربات"); // Set default category to Arabic when language is Arabic
    } else {
      setSelectedCategory("Soups"); // Set default category to English when language is English
    }
  }, [language]);

  // Get unique categories and their first item's image for display
  const categoriesWithImages = menu.reduce((acc, item) => {
    const categoryName = item.category[language]; // Use the selected language for category name
    if (!acc[categoryName]) {
      acc[categoryName] = item.image; // Add category with the first item's image
    }
    return acc;
  }, {});

  const categories = Object.keys(categoriesWithImages);

  // Filter items based on selected category
  const filteredItems = menu.filter(
    (item) => item.category[language] === selectedCategory // Filter using the selected language
  );

  return (
    <div className="mb-4">
      {/* Banner Component */}
      <Banner />

      {/* Swiper for Categories */}
      <div className="my-4">
        <Swiper
          spaceBetween={15} // Adjust spacing between slides
          slidesPerView="auto" // Allow dynamic width for slides
          freeMode={true} // Enable free scrolling
        >
          {categories.map((category, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
              style={{ width: "auto" }} // Set slide width to auto
            >
              <div
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-4 pr-2 rounded-full cursor-pointer ${
                  selectedCategory === category
                    ? "bg-[#D99904] text-white"
                    : "bg-[#1a1a1a] text-[#adacac]"
                }`}
              >
                {/* Image on the Left */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
                  <img
                    src={categoriesWithImages[category] || "default_image.jpg"} // Provide a fallback image
                    alt={category}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Category Name on the Right */}
                <span className="text-sm md:text-base font-bold">{category}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto">
        {filteredItems.map((item) => (
          <ItamCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
