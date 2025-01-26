import React, { useState } from "react";
import SectionTitle from "../../../componants/SectionTitle";

const AddItems = () => {
  const [itemData, setItemData] = useState({
    nameEn: "",
    nameAr: "",
    calories: "",
    price: "",
    descriptionEn: "",
    descriptionAr: "",
    categoryEn: "",
    categoryAr: "",
    popular: false,
    chefrecommends: false,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItemData({
      ...itemData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setItemData({
      ...itemData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data (e.g., send to server)
    console.log(itemData);
  };

  return (
    <>
      <SectionTitle subHeading={"What's new?"} heading={"ADD AN ITEM"} />
      <div className="max-w-md mx-auto mt-10 p-6 bg-[#1a1a1a] rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Recipe Name */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-[#f8f8f8]">Recipe Name (EN)*</label>
            <input
              type="text"
              name="nameEn"
              value={itemData.nameEn}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Recipe name in English"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-[#f8f8f8]">Recipe Name (AR)*</label>
            <input
              type="text"
              name="nameAr"
              value={itemData.nameAr}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="اسم الوصفة"
              required
            />
          </div>

          {/* Calories */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-[#f8f8f8]">Calories*</label>
            <input
              type="number"
              name="calories"
              value={itemData.calories}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Calories"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-[#f8f8f8]">Price*</label>
            <input
              type="number"
              name="price"
              value={itemData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Price"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-[#f8f8f8]">Description (EN)*</label>
            <textarea
              name="descriptionEn"
              value={itemData.descriptionEn}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Description in English"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-[#f8f8f8]">Description (AR)*</label>
            <textarea
              name="descriptionAr"
              value={itemData.descriptionAr}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="الوصف"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-[#f8f8f8]">Category (EN)*</label>
            <input
              type="text"
              name="categoryEn"
              value={itemData.categoryEn}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Category in English"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-[#f8f8f8]">Category (AR)*</label>
            <input
              type="text"
              name="categoryAr"
              value={itemData.categoryAr}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="التصنيف"
              required
            />
          </div>

          {/* Popular & Chef Recommends */}
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center text-[#f8f8f8]">
              <input
                type="checkbox"
                name="popular"
                checked={itemData.popular}
                onChange={handleChange}
                className="mr-2"
              />
              Popular
            </label>
            <label className="flex items-center text-[#f8f8f8]">
              <input
                type="checkbox"
                name="chefrecommends"
                checked={itemData.chefrecommends}
                onChange={handleChange}
                className="mr-2"
              />
              Chef Recommends
            </label>
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-[#f8f8f8]">Upload Image*</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-[#f8f8f8]"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600"
          >
            Add Item
          </button>
        </form>
      </div>
    </>
  );
};

export default AddItems;
