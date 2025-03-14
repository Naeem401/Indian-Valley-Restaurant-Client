import { useApp } from "../AppContext/AppContext";
import { toast } from "react-hot-toast";
import useUserRole from "../Hooks/useUserRole"; // Import useUserRole hook

const ItemCard = ({ item }) => {
  const { name, description, image, price } = item || {};
  const { language, addToCart, user } = useApp();
  const { role, loading: roleLoading } = useUserRole(); // Get user role and loading state

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.", {
        position: "top-right",
        style: {
          background: "#d9534f",
          color: "#fff",
          fontWeight: "bold",
        },
      });
      return;
    }

    if (roleLoading) {
      toast.loading("Checking permissions...");
      return;
    }

    if (role !== "customer") {
      toast.error("Only customers can add items to the cart.", {
        position: "top-right",
        style: {
          background: "#d9534f",
          color: "#fff",
          fontWeight: "bold",
        },
      });
      return;
    }

    // If the user is a customer, proceed with adding the item to the cart
    addToCart(item);
    toast.success(`${name?.[language]} added to cart!`, {
      position: "top-right",
      style: {
        background: "#333",
        color: "#fff",
        fontWeight: "bold",
      },
    });
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg flex flex-col h-full text-center">
      <img
        src={image}
        alt={name?.[language]}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="flex-grow">
        <h3 className="text-xl text-white mt-4">{name?.[language]}</h3>
        <p className="text-[#9e9e9e]">{description?.[language]}</p>
      </div>
      <div>
        <p className="text-xl text-[#BB8506] mt-2">SAR {price}</p>
        <button
          onClick={handleAddToCart}
          disabled={roleLoading} // Disable button while loading role
          className={`w-full py-2 mt-4 rounded-lg transition duration-300 ${
            roleLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#D99904] text-white hover:bg-[#dbaa1a]"
          }`}
        >
          {roleLoading ? "Checking..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
