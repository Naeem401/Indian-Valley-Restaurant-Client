import Banner from "../componants/Home/Banner";
import ItamCard from "../componants/ItamCard";
import { useState } from "react";
import useMenu from "../Hooks/useMenu";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/css"; // Core Swiper CSS

const Menu = () => {
  const [menu] = useMenu(); // Assuming this returns the menu items
  const [selectedCategory, setSelectedCategory] = useState("Soups"); // Default selected category set to "Dessert"

  // Get unique categories and their first item's image for display
  const categoriesWithImages = menu.reduce((acc, item) => {
    if (!acc[item.category.en]) {  // Accessing English category name
      acc[item.category.en] = item.image; // Add category with the first item's image
    }
    return acc;
  }, {});

  const categories = Object.keys(categoriesWithImages);

  // Filter items based on selected category
  const filteredItems = menu.filter(
    (item) => item.category.en === selectedCategory // Accessing English category name
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
          <ItamCard
            key={item.id} // Use a unique identifier for the key
            item={{
              ...item,
              name: item.name.en, // Accessing the English name
              description: item.description.en || "No description available", // Accessing the English description
              category: item.category.en, // Accessing the English category
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
