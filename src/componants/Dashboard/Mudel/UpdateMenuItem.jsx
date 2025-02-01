import React, { useState, useEffect } from "react";

const UpdateMenuItem = ({ isOpen, onClose, item, onSave }) => {
  // Initialize form data with the selected item's data
  const [formData, setFormData] = useState({
    name: { en: "", ar: "" },
    calories: 0,
    price: 0,
    description: { en: "", ar: "" },
    category: { en: "", ar: "" },
    popular: false,
    chefrecommends: false,
    image: "",
  });

  // Update formData when the item prop changes
  useEffect(() => {
    if (item) {
      setFormData({
        name: { en: item.name?.en || "", ar: item.name?.ar || "" },
        calories: item.calories || 0,
        price: item.price || 0,
        description: { en: item.description?.en || "", ar: item.description?.ar || "" },
        category: { en: item.category?.en || "", ar: item.category?.ar || "" },
        popular: item.popular || false,
        chefrecommends: item.chefrecommends || false,
        image: item.image || "",
      });
    }
  }, [item]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, _id: item._id }); // Include the item ID in the updated data
    onClose(); // Close the modal
  };

  // If the modal is not open or item is undefined, return null
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#313131] rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-4">Update Menu Item</h2>
        <form onSubmit={handleSubmit}>
          {/* Name (English) */}
          <div className="mb-4">
            <label className="block text-white mb-2">Name (English)</label>
            <input
              type="text"
              name="name.en"
              value={formData.name.en} // Default value from item
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#1a1a1a] text-white border border-gray-600 rounded-lg"
            />
          </div>

          {/* Name (Arabic) */}
          <div className="mb-4">
            <label className="block text-white mb-2">Name (Arabic)</label>
            <input
              type="text"
              name="name.ar"
              value={formData.name.ar} // Default value from item
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#1a1a1a] text-white border border-gray-600 rounded-lg"
            />
          </div>

          {/* Calories */}
          <div className="mb-4">
            <label className="block text-white mb-2">Calories</label>
            <input
              type="number"
              name="calories"
              value={formData.calories} // Default value from item
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#1a1a1a] text-white border border-gray-600 rounded-lg"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-white mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price} // Default value from item
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#1a1a1a] text-white border border-gray-600 rounded-lg"
            />
          </div>

          {/* Description (English) */}
          <div className="mb-4">
            <label className="block text-white mb-2">Description (English)</label>
            <textarea
              name="description.en"
              value={formData.description.en} // Default value from item
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#1a1a1a] text-white border border-gray-600 rounded-lg"
            />
          </div>

          {/* Description (Arabic) */}
          <div className="mb-4">
            <label className="block text-white mb-2">Description (Arabic)</label>
            <textarea
              name="description.ar"
              value={formData.description.ar} // Default value from item
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#1a1a1a] text-white border border-gray-600 rounded-lg"
            />
          </div>

          {/* Category (English) */}
          <div className="mb-4">
            <label className="block text-white mb-2">Category (English)</label>
            <input
              type="text"
              name="category.en"
              value={formData.category.en} // Default value from item
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#1a1a1a] text-white border border-gray-600 rounded-lg"
            />
          </div>

          {/* Category (Arabic) */}
          <div className="mb-4">
            <label className="block text-white mb-2">Category (Arabic)</label>
            <input
              type="text"
              name="category.ar"
              value={formData.category.ar} // Default value from item
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#1a1a1a] text-white border border-gray-600 rounded-lg"
            />
          </div>

          {/* Popular */}
          <div className="mb-4">
            <label className="block text-white mb-2">Popular</label>
            <input
              type="checkbox"
              name="popular"
              checked={formData.popular} // Default value from item
              onChange={handleCheckboxChange}
              className="mr-2"
            />
          </div>

          {/* Chef Recommends */}
          <div className="mb-4">
            <label className="block text-white mb-2">Chef Recommends</label>
            <input
              type="checkbox"
              name="chefrecommends"
              checked={formData.chefrecommends} // Default value from item
              onChange={handleCheckboxChange}
              className="mr-2"
            />
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-white mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image} // Default value from item
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#1a1a1a] text-white border border-gray-600 rounded-lg"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenuItem;