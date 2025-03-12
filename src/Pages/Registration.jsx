import { useNavigate } from "react-router-dom";
import img from '../assets/img/authentication2.png';
import { useState } from "react";
import Swal from 'sweetalert2';
import { useApp } from "../AppContext/AppContext";

const Registration = () => {
  const { language, createUser, updateUserProfile } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const texts = {
    en: {
      title: "Registration",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone (Saudi Arabia Only)",
      passwordLabel: "Password",
      confirmPasswordLabel: "Confirm Password",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "Enter your email",
      phonePlaceholder: "05XXXXXXXX",
      passwordPlaceholder: "Enter your password",
      confirmPasswordPlaceholder: "Confirm your password",
      registerButton: "Register",
      signInText: "Already have an account?",
      signInLink: "Sign In",
      errorPasswordMatch: "Passwords do not match.",
      errorRegister: "Registration failed. Please try again.",
      successRegister: "Registration successful!",
    },
    ar: {
      title: "التسجيل",
      nameLabel: "الاسم الكامل",
      emailLabel: "عنوان البريد الإلكتروني",
      phoneLabel: "الهاتف (للسعودية فقط)",
      passwordLabel: "كلمة المرور",
      confirmPasswordLabel: "تأكيد كلمة المرور",
      namePlaceholder: "أدخل اسمك الكامل",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      phonePlaceholder: "05XXXXXXXX",
      passwordPlaceholder: "أدخل كلمة المرور",
      confirmPasswordPlaceholder: "أكد كلمة المرور",
      registerButton: "تسجيل",
      signInText: "هل لديك حساب؟",
      signInLink: "تسجيل الدخول",
      errorPasswordMatch: "كلمات المرور غير متطابقة.",
      errorRegister: "فشل التسجيل. حاول مرة أخرى.",
      successRegister: "تم التسجيل بنجاح!",
    },
  };

  const selectedTexts = texts[language];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: selectedTexts.errorPasswordMatch,
      });
      return;
    }

    try {
      await createUser(email, password, name, phone);
      await updateUserProfile(name);
      setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
      setError("");
      Swal.fire({
        icon: 'success',
        title: selectedTexts.successRegister,
        showConfirmButton: true,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: selectedTexts.errorRegister,
      });
    }
  };

  return (
    <div
      className={`flex flex-col-reverse sm:flex-col-reverse lg:flex-row bg-black text-white rounded-lg shadow-lg p-10 ${
        language === "ar" ? "text-right" : "text-left"
      }`}
    >
      {/* Left Section - Form */}
      <div className="w-full md:w-full lg:w-1/2 p-8 lg:order-first">
        <h2 className="text-2xl font-bold mb-6 text-yellow-500 text-center">{selectedTexts.title}</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">{selectedTexts.nameLabel}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={selectedTexts.namePlaceholder}
              className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">{selectedTexts.emailLabel}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={selectedTexts.emailPlaceholder}
              className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">{selectedTexts.phoneLabel}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={selectedTexts.phonePlaceholder}
              pattern="^05\d{8}$"
              className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">{selectedTexts.passwordLabel}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={selectedTexts.passwordPlaceholder}
              className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">{selectedTexts.confirmPasswordLabel}</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={selectedTexts.confirmPasswordPlaceholder}
              className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-3 rounded font-semibold hover:bg-yellow-600"
          >
            {selectedTexts.registerButton}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-400">
          {selectedTexts.signInText}{" "}
          <a href="/login" className="text-yellow-500 hover:underline font-semibold">
            {selectedTexts.signInLink}
          </a>
        </p>
      </div>

      {/* Right Section - Image */}
      <div className="w-full md:w-full lg:w-1/2 flex items-center justify-center p-10 lg:order-last">
        <img
          src={img}
          alt="Registration visual"
          className="w-full h-auto rounded-md shadow-md object-cover"
        />
      </div>
    </div>
  );
};

export default Registration;
