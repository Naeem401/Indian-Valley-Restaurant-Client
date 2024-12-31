import mid from '../../assets/img/Banner/chef-service.jpg';
import { useAuth } from '../../AuthProvider/AuthContext';

const MidBanner = () => {
     const { language } = useAuth();
    const texts = {
        en: {
            heading: "Indian Valley Restaurant",
            subheading: "Welcome to Indian Valley Restaurant 🙏, where authentic Indian flavors meet warm hospitality. Indulge in traditional delicacies crafted with love, bringing the taste of India to you!"
        },
        ar: {
            heading: "مطعم وادي الهندي",
            subheading: "مرحباً بكم في مطعم وادي الهندي 🙏، حيث تلتقي النكهات الهندية الأصيلة مع الضيافة الدافئة. استمتعوا بالمأكولات التقليدية التي تم تحضيرها بحب، مما يجلب طعم الهند إليكم!"
        }
    };

    return (
        <div
            className='w-4/5 mx-auto py-8 px-8 lg:py-[120px] lg:px-28 mt-20 min-h-[400px]'
            style={{
                backgroundImage: `url(${mid})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="bg-white p-4 lg:py-16 lg:px-28 opacity-75">
                <h2 className='text-center text-xl lg:text-4xl text-[#151515] mb-3'>
                    {texts[language].heading}
                </h2>
                <p className='text-center'>
                    {texts[language].subheading}
                </p>
            </div>
        </div>
    );
};

export default MidBanner;
