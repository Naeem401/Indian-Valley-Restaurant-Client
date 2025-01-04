import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../AuthProvider/AuthContext";
import img from "../assets/img/authentication2.png";

const Login = () => {
  const { signIn } = useAuth(); // Use the signIn function from context
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
    <div className="flex flex-col lg:flex-row bg-gray-100 rounded-lg shadow-lg p-10">
      {/* Right Section - Image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-10">
        <img src={img} alt="Login visual" className="w-full h-auto rounded-md shadow-md object-cover" />
      </div>

      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded bg-gray-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded bg-gray-50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-3 rounded font-semibold hover:bg-yellow-600"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
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
