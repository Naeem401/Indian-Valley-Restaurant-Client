import { useState, useEffect } from "react";
import { useApp } from "../../../AppContext/AppContext";
import { FaTrash, FaTimes } from "react-icons/fa";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Toaster } from 'react-hot-toast';

const CustomerCart = () => {
  const {
    user,
    cart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
    language,
  } = useApp();

  const stripe = useStripe();
  const elements = useElements();

  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [orderType, setOrderType] = useState("dine-in");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [loading, setLoading] = useState(false);

  // Stripe Card Element Styling
  const cardStyle = {
    style: {
      base: {
        color: "#ffffff", // White text
        fontSize: "16px",
        "::placeholder": {
          color: "#cfd7df", // Light gray placeholder
        },
      },
      invalid: {
        color: "#fa755a", // Red for invalid input
      },
    },
  };

  useEffect(() => {
    if (user) fetchCart();
  }, [user, fetchCart]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(itemId);
      return;
    }
    await updateCartItem(itemId, newQuantity);
  };

  const handlePlaceOrder = async () => {
    if (!cart.items.length) {
      Toaster.error(language === "en" ? "Cart is empty!" : "السلة فارغة!");
      return;
    }

    // Validate mobile number
    if (!mobileNumber) {
      Toaster.error(language === "en" ? "Please enter mobile number." : "الرجاء إدخال رقم الجوال.");
      return;
    }

    // Validate order type specific fields
    if (orderType === "delivery" && !deliveryAddress) {
      Toaster.error(language === "en" ? "Please enter delivery address." : "الرجاء إدخال عنوان التوصيل.");
      return;
    }
    if (orderType === "dine-in" && !numberOfPeople) {
      Toaster.error(language === "en" ? "Please enter number of people." : "الرجاء إدخال عدد الأشخاص.");
      return;
    }
    if (orderType === "pickup" && !pickupTime) {
      Toaster.error(language === "en" ? "Please select pickup time." : "الرجاء تحديد وقت الاستلام.");
      return;
    }

    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (paymentMethod === "card") {
      setLoading(true);
      try {
        // Create payment intent
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, { total });

        const { error } = await stripe.confirmCardPayment(response.data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

        if (error) {
          Toaster.error(language === "en" ? "Payment failed." : "فشل الدفع.");
          return;
        }

        // Payment successful - place order
        await placeOrder(total);
        Toaster.success(language === "en" ? "Order placed!" : "تم الطلب بنجاح!");
      } catch (error) {
        console.error("Payment error:", error);
        Toaster.error(language === "en" ? "Payment failed." : "فشل الدفع.");
      } finally {
        setLoading(false);
      }
    } else {
      // Cash payment
      await placeOrder(total);
      Toaster.success(language === "en" ? "Order placed!" : "تم الطلب بنجاح!");
    }
  };

  const placeOrder = async (total) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {
        userId: user._id,
        items: cart.items,
        total,
        status: "pending",
        type: orderType,
        paymentMethod,
        mobileNumber,
        ...(orderType === "delivery" && { deliveryAddress }),
        ...(orderType === "dine-in" && { 
          numberOfPeople,
          seatingType: numberOfPeople > 1 ? "family" : "single",
        }),
        ...(orderType === "pickup" && { pickupTime }),
        customerName: user.name,
        customerEmail: user.email,
        customerAddress: user.address,
      });
      await clearCart();
      setShowOrderDetailsModal(false);
    } catch (error) {
      console.error("Order error:", error);
      Toaster.error(language === "en" ? "Order failed." : "فشل الطلب.");
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#1a1a1a] min-h-screen text-white">
      {/* Cart Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-[#D99904] mb-6">
        {language === "en" ? "My Cart" : "سلة التسوق"}
      </h1>

      {/* Cart Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-[#2c2c2c] p-4 rounded-lg mb-6">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-lg">
            {language === "en" ? "Total Items:" : "العناصر:"} {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
          </p>
          <p className="text-lg">
            {language === "en" ? "Total Price:" : "الإجمالي:"} SAR{" "}
            {cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
          </p>
        </div>
        <button
          onClick={() => setShowOrderDetailsModal(true)}
          disabled={cart.items.length === 0}
          className="bg-[#D99904] text-white py-2 px-6 rounded-lg hover:bg-[#b88203] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {language === "en" ? "Place Order" : "تأكيد الطلب"}
        </button>
      </div>

      {/* Cart Items List */}
      <div className="bg-[#313131] p-4 rounded-lg">
        {cart.items.length === 0 ? (
          <p className="text-center text-xl py-6">
            {language === "en" ? "Your cart is empty" : "السلة فارغة"}
          </p>
        ) : (
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.itemId} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#3a3a3a] rounded-lg">
                {/* Item Details */}
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <img src={item.image} alt={item.name[language]} className="w-16 h-16 object-cover rounded" />
                  <p className="text-lg font-medium">{item.name[language]}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(item.itemId, item.quantity - 1)}
                    className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.itemId, item.quantity + 1)}
                    className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>

                {/* Price and Delete */}
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <p className="text-lg text-[#D99904]">
                    SAR {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.itemId)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-[#2c2c2c] rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowOrderDetailsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes size={24} />
            </button>

            <h2 className="text-xl font-bold mb-6 text-[#D99904]">
              {language === "en" ? "Order Details" : "تفاصيل الطلب"}
            </h2>

            {/* Order Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {language === "en" ? "Order Type" : "نوع الطلب"}
              </label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full p-2 rounded bg-[#3a3a3a] text-white"
              >
                <option value="delivery">{language === "en" ? "Delivery" : "توصيل"}</option>
                <option value="pickup">{language === "en" ? "Pickup" : "استلام"}</option>
                <option value="dine-in">{language === "en" ? "Dine-In" : "تناول في المطعم"}</option>
              </select>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {language === "en" ? "Payment Method" : "طريقة الدفع"}
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 rounded bg-[#3a3a3a] text-white"
              >
                <option value="cash">{language === "en" ? "Cash" : "نقدي"}</option>
                <option value="card">{language === "en" ? "Card" : "بطاقة"}</option>
              </select>
            </div>

            {/* Mobile Number (Common for all order types) */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {language === "en" ? "Mobile Number" : "رقم الجوال"}
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full p-2 rounded bg-[#3a3a3a] text-white"
                placeholder={language === "en" ? "05XXXXXXXX" : "05XXXXXXXX"}
              />
            </div>

            {/* Conditional Fields */}
            {orderType === "delivery" && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {language === "en" ? "Delivery Address" : "عنوان التوصيل"}
                </label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full p-2 rounded bg-[#3a3a3a] text-white"
                  placeholder={language === "en" ? "Full address with landmarks" : "العنوان الكامل مع المعالم"}
                  rows="3"
                />
              </div>
            )}

            {orderType === "dine-in" && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {language === "en" ? "Number of People" : "عدد الأشخاص"}
                </label>
                <select
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  className="w-full p-2 rounded bg-[#3a3a3a] text-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            )}

            {orderType === "pickup" && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {language === "en" ? "Pickup Time" : "وقت الاستلام"}
                </label>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full p-2 rounded bg-[#3a3a3a] text-white"
                />
              </div>
            )}

            {/* Stripe Card Element */}
            {paymentMethod === "card" && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {language === "en" ? "Card Details" : "تفاصيل البطاقة"}
                </label>
                <CardElement
                  className="p-2 bg-[#3a3a3a] rounded"
                  options={cardStyle}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowOrderDetailsModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all duration-300"
              >
                {language === "en" ? "Cancel" : "إلغاء"}
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="bg-[#D99904] text-white px-4 py-2 rounded hover:bg-[#b88203] transition-all duration-300"
              >
                {loading
                  ? language === "en"
                    ? "Processing..."
                    : "جاري المعالجة..."
                  : language === "en"
                  ? "Place Order"
                  : "تأكيد الطلب"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCart;