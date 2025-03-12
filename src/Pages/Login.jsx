import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import img from "../assets/img/authentication2.png";
import { useApp } from "../AppContext/AppContext";

const Login = () => {
  const { signIn } = useApp(); // Use the signIn function from context
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      await signIn(email, password); // Call signIn function
      Swal.fire({
        icon: "success",
        title: "Login successful!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/"); // Navigate to the home page
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: err.message, // Display error message
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-black min-h-screen text-white p-10 rounded-lg shadow-lg">
      {/* Right Section - Image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-10">
        <img src={img} alt="Login visual" className="w-full h-auto rounded-md shadow-md object-cover" />
      </div>

      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 p-8">
        <h2 className="text-2xl font-bold mb-6 text-yellow-500 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black p-3 rounded font-semibold hover:bg-yellow-600"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-400">
          Don't have an account?{" "}
          <Link to="/registration" className="text-yellow-500 hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
