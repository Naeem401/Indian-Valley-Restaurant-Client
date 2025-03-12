import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UpdateMenuItem from "../../../componants/Dashboard/Mudel/UpdateMenuItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { FaSpinner } from "react-icons/fa";
import { useApp } from "../../../AppContext/AppContext";

// Translations for multi-language support
const translations = {
  en: {
    manageItems: "Manage All Items",
    totalItems: "Total Items",
    searchPlaceholder: "Search items...",
    itemImage: "Item Image",
    itemName: "Item Name",
    price: "Price",
    category: "Category",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    deleteConfirmationTitle: "Are you sure?",
    deleteConfirmationText: "You won't be able to revert this!",
    deleteConfirmationConfirm: "Yes, delete it!",
    deleteSuccessTitle: "Deleted!",
    deleteSuccessText: "Your item has been deleted.",
    deleteErrorTitle: "Error!",
    deleteErrorText: "An error occurred while deleting the item.",
    updateSuccessTitle: "Updated!",
    updateSuccessText: "Your item has been updated.",
    updateErrorTitle: "Error!",
    updateErrorText: "An error occurred while updating the item.",
  },
  ar: {
    manageItems: "إدارة جميع العناصر",
    totalItems: "إجمالي العناصر",
    searchPlaceholder: "ابحث عن العناصر...",
    itemImage: "صورة العنصر",
    itemName: "اسم العنصر",
    price: "السعر",
    category: "الفئة",
    actions: "الإجراءات",
    edit: "تعديل",
    delete: "حذف",
    deleteConfirmationTitle: "هل أنت متأكد؟",
    deleteConfirmationText: "لن تتمكن من التراجع عن هذا!",
    deleteConfirmationConfirm: "نعم، احذفه!",
    deleteSuccessTitle: "تم الحذف!",
    deleteSuccessText: "تم حذف العنصر بنجاح.",
    deleteErrorTitle: "خطأ!",
    deleteErrorText: "حدث خطأ أثناء حذف العنصر.",
    updateSuccessTitle: "تم التحديث!",
    updateSuccessText: "تم تحديث العنصر بنجاح.",
    updateErrorTitle: "خطأ!",
    updateErrorText: "حدث خطأ أثناء تحديث العنصر.",
  },
};

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { language, loading } = useApp();
  const [selectedCategory, setSelectedCategory] = useState(
    language === "en" ? "Soups" : "الشوربات"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Get translations for the current language
  const t = translations[language];

  // Fetch items and categories from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/menu`);
        setItems(itemsResponse.data);

        // Extract unique categories from items (excluding "All")
        const uniqueCategories = [
          ...new Set(itemsResponse.data.map((item) => item.category[language])),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [language]);

  // Update selectedCategory when language changes
  useEffect(() => {
    setSelectedCategory(language === "en" ? "Soups" : "الشوربات");
  }, [language]);

  // Handle item deletion
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: t.deleteConfirmationTitle,
      text: t.deleteConfirmationText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t.deleteConfirmationConfirm,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/menu/${id}`
        );
        if (response.status === 200) {
          setItems(items.filter((item) => item._id !== id));
          Swal.fire({
            title: t.deleteSuccessTitle,
            text: t.deleteSuccessText,
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire({
          title: t.deleteErrorTitle,
          text: t.deleteErrorText,
          icon: "error",
        });
      }
    }
  };

  // Handle edit button click
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Handle save changes
  const handleSaveChanges = async (updatedItem) => {
    try {
      const { _id, ...itemData } = updatedItem;
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/menu/${_id}`,
        itemData
      );

      if (response.status === 200) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === _id ? { ...item, ...itemData } : item
          )
        );
        Swal.fire({
          title: t.updateSuccessTitle,
          text: t.updateSuccessText,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error updating item:", error);
      Swal.fire({
        title: t.updateErrorTitle,
        text: t.updateErrorText,
        icon: "error",
      });
    }
  };

  // Filter items based on search query and selected category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name?.[language]
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = item.category[language] === selectedCategory; // Only show items in the selected category
    return matchesSearch && matchesCategory;
  });

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1a1a1a]">
        <FaSpinner className="animate-spin text-4xl text-[#D99904]" />
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[#1a1a1a]">
      <h1 className="text-2xl font-bold mb-6 text-white">{t.manageItems}</h1>
      <p className="mb-6 text-white">
        {t.totalItems}: {items.length}
      </p>

      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border bg-[#313131] text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Swiper for Categories */}
      <div className="my-4">
        <Swiper
          spaceBetween={15}
          slidesPerView="auto"
          freeMode={true}
          modules={[FreeMode]}
        >
          {categories.map((category, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
              style={{ width: "auto" }}
            >
              <div
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-4 pr-2 rounded-full cursor-pointer ${
                  selectedCategory === category
                    ? "bg-[#D99904] text-white"
                    : "bg-[#1a1a1a] text-[#adacac]"
                }`}
              >
                <span className="text-sm md:text-base font-bold p-2">{category}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#282727]">
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                {t.itemImage}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                {t.itemName}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                {t.price}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                {t.category}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                {t.actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item._id} className="bg-[#313131] hover:bg-[#3a3a3a] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={item.image}
                    alt={item.name?.[language]}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">
                    {item.name?.[language]}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">SAR {item.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">
                    {item.category?.[language]}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    {t.edit}
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    {t.delete}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Menu Item Modal */}
      <UpdateMenuItem
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        onSave={handleSaveChanges}
        language={language}
      />
    </div>
  );
};

export default ManageItems;