import { useAuth } from "../AuthProvider/AuthContext";
import img from '../assets/img/authentication2.png';

const Registration = () => {
  const { language } = useAuth(); // Get language from context

  // Language-specific content
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
      phonePlaceholder: "Enter your phone number",
      passwordPlaceholder: "Enter your password",
      confirmPasswordPlaceholder: "Confirm your password",
      registerButton: "Register",
      signInText: "Already have an account?",
      signInLink: "Sign In",
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
      phonePlaceholder: "أدخل رقم هاتفك",
      passwordPlaceholder: "أدخل كلمة المرور",
      confirmPasswordPlaceholder: "أكد كلمة المرور",
      registerButton: "تسجيل",
      signInText: "هل لديك حساب؟",
      signInLink: "تسجيل الدخول",
    },
  };

  const selectedTexts = texts[language]; // Get the selected language content

  return (
    <div className={`flex flex-col-reverse sm:flex-col-reverse lg:flex-row bg-gray-100 rounded-lg shadow-lg p-10 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Left Section - Form */}
      <div className="w-full md:w-full lg:w-1/2 p-8 lg:order-first">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{selectedTexts.title}</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">{selectedTexts.nameLabel}</label>
            <input 
              type="text" 
              placeholder={selectedTexts.namePlaceholder} 
              className="w-full p-3 border border-gray-300 rounded bg-gray-50" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">{selectedTexts.emailLabel}</label>
            <input 
              type="email" 
              placeholder={selectedTexts.emailPlaceholder} 
              className="w-full p-3 border border-gray-300 rounded bg-gray-50" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">{selectedTexts.phoneLabel}</label>
            <input 
              type="tel" 
              placeholder={selectedTexts.phonePlaceholder} 
              pattern="^\+9665\d{8}$" // Saudi Arabia phone number format
              className="w-full p-3 border border-gray-300 rounded bg-gray-50" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">{selectedTexts.passwordLabel}</label>
            <input 
              type="password" 
              placeholder={selectedTexts.passwordPlaceholder} 
              className="w-full p-3 border border-gray-300 rounded bg-gray-50" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">{selectedTexts.confirmPasswordLabel}</label>
            <input 
              type="password" 
              placeholder={selectedTexts.confirmPasswordPlaceholder} 
              className="w-full p-3 border border-gray-300 rounded bg-gray-50" 
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
        <p className="text-center mt-4 text-gray-600">
          {selectedTexts.signInText}{' '}
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
