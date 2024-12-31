import { useAuth } from "../AuthProvider/AuthContext";
import img from '../assets/img/authentication2.png';

const Login = () => {
    const { language } = useAuth(); // Get language from context

    // Language-specific content
    const texts = {
        en: {
            title: "Login",
            emailLabel: "Email Address",
            passwordLabel: "Password",
            emailPlaceholder: "Enter your email",
            passwordPlaceholder: "Enter your password",
            loginButton: "Login",
            signUpText: "Don't have an account?",
            signUpLink: "Sign Up",
        },
        ar: {
            title: "تسجيل الدخول",
            emailLabel: "عنوان البريد الإلكتروني",
            passwordLabel: "كلمة المرور",
            emailPlaceholder: "أدخل بريدك الإلكتروني",
            passwordPlaceholder: "أدخل كلمة المرور",
            loginButton: "تسجيل الدخول",
            signUpText: "لا تمتلك حساب؟",
            signUpLink: "إنشاء حساب",
        },
    };

    const selectedTexts = texts[language]; // Get the selected language content

    return (
        <div className={`flex flex-col md:flex-col lg:flex-row bg-gray-100 rounded-lg shadow-lg p-10 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {/* Right Section - Image */}
            <div className="w-full md:w-full lg:w-1/2 flex items-center justify-center p-10">
                <img 
                    src={img} 
                    alt="Login visual" 
                    className="w-full h-auto rounded-md shadow-md object-cover" 
                />
            </div>

            {/* Left Section - Form */}
            <div className="w-full md:w-full lg:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{selectedTexts.title}</h2>
                <form>
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
                        <label className="block text-gray-700 font-medium">{selectedTexts.passwordLabel}</label>
                        <input 
                            type="password" 
                            placeholder={selectedTexts.passwordPlaceholder} 
                            className="w-full p-3 border border-gray-300 rounded bg-gray-50" 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-yellow-500 text-white p-3 rounded font-semibold hover:bg-yellow-600"
                    >
                        {selectedTexts.loginButton}
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    {selectedTexts.signUpText}{' '}
                    <a href="/registration" className="text-yellow-500 hover:underline font-semibold">
                        {selectedTexts.signUpLink}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
