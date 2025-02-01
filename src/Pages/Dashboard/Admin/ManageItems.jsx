import  { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UpdateMenuItem from "../../../componants/Dashboard/Mudel/UpdateMenuItem";

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch items and categories from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/menu`);
        setItems(itemsResponse.data);

        // Extract unique categories from items
        const uniqueCategories = [
          "All",
          ...new Set(itemsResponse.data.map((item) => item.category.en)), 
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle item deletion
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/menu/${id}`
        );
        if (response.status === 200) {
          setItems(items.filter((item) => item._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the item.",
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
    // Extract the _id and the rest of the data
    const { _id, ...itemData } = updatedItem;

    // Send the updated data (without _id) to the backend using PATCH
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/menu/${_id}`,
      itemData // Send only the fields that have been modified
    );

    if (response.status === 200) {
      // Update the UI with the new data
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === _id ? { ...item, ...itemData } : item
        )
      );
      Swal.fire({
        title: "Updated!",
        text: "Your item has been updated.",
        icon: "success",
      });
    }
  } catch (error) {
    console.error("Error updating item:", error);
    Swal.fire({
      title: "Error!",
      text: "An error occurred while updating the item.",
      icon: "error",
    });
  }
};

  // Filter items based on search query and selected category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name?.en
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category.en === selectedCategory; // Use 'en' for category filtering
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 min-h-screen bg-[#1a1a1a]">
      <h1 className="text-2xl font-bold mb-6 text-white">Manage All Items</h1>
      <p className="mb-6 text-white">Total Items: {items.length}</p>

      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border bg-[#313131] text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border bg-[#313131] text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          {categories.map((category) => (
            <option key={category} value={category} className="bg-[#313131] text-white">
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#282727]">
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Item Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item._id} className="bg-[#313131] hover:bg-[#3a3a3a] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={item.image}
                    alt={item.name?.en}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">
                    {item.name?.en}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">SAR {item.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">
                    {item.category?.en}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
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
      />
    </div>
  );
};

export default ManageItems;