import { useState } from "react";
import SectionTitle from "../../../componants/SectionTitle";
import { FaSpinner } from "react-icons/fa";

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

  const [loading, setLoading] = useState(false);

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

  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const apiKey = "c87d48cbdd24285ed678a2942418556d"; // Your ImgBB API key
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        return result.data.url; // Return the image URL
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload image to ImgBB
      const imageUrl = await uploadImageToImgBB(itemData.image);

      //Prepare item data with the image URL
      const itemToSave = {
        name: {
          en: itemData.nameEn,
          ar: itemData.nameAr,
        },
        calories: itemData.calories,
        price: itemData.price,
        description: {
          en: itemData.descriptionEn,
          ar: itemData.descriptionAr,
        },
        category: {
          en: itemData.categoryEn,
          ar: itemData.categoryAr,
        },
        popular: itemData.popular,
        chefrecommends: itemData.chefrecommends,
        image: imageUrl,
      };

      // Step 3: Send item data to the backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemToSave),
      });

      if (response.ok) {
        alert("Item added successfully!");
        setItemData({
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
      } else {
        throw new Error("Failed to save item");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1a1a1a]">
        <FaSpinner className="animate-spin text-4xl text-[#D99904]" />
      </div>
    );
  }

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
            disabled={loading}
          >
            {loading ? "Adding Item..." : "Add Item"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddItems;