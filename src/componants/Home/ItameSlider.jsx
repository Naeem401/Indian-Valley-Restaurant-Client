import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import slide1 from '../../assets/img/catagory-slider/appetizer.jpg';
import slide2 from '../../assets/img/catagory-slider/supe.jpg';
import slide3 from '../../assets/img/catagory-slider/salad.jpg';
import slide4 from '../../assets/img/catagory-slider/veg-delight.jpg';
import slide5 from '../../assets/img/catagory-slider/mutton-tandoori.jpg';
import slide6 from '../../assets/img/catagory-slider/fish-tandoori.jpg';
import slide7 from '../../assets/img/catagory-slider/cafe-ka-dum.jpg';
import slide8 from '../../assets/img/catagory-slider/deinks.jpg';
import slide9 from '../../assets/img/catagory-slider/dessert.jpg';
import { useAuth } from '../../AuthProvider/AuthContext';

const ItameSlider = () => {
     const { language } = useAuth();
    const titles = {
        en: [
            "Appetizer",
            "Soup",
            "Salads",
            "Veg Delight",
            "Mutton Tandoori",
            "Fish Tandoori",
            "Cafe Ka Dum",
            "Drinks",
            "Dessert",
        ],
        ar: [
            "مقبلات",
            "حساء",
            "سلطات",
            "متعة نباتية",
            "تندوري لحم الضأن",
            "تندوري السمك",
            "كافيه كا دوم",
            "مشروبات",
            "حلويات",
        ],
    };

    return (
        <div className="w-4/5 mx-auto">
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000, // 3 seconds delay
                    disableOnInteraction: false, // Keep autoplay after user interactions
                }}
                loop={true} // Enable infinite loop
                modules={[Pagination, Autoplay]} // Add Autoplay module
                className="mySwiper"
                breakpoints={{
                    1024: {
                        slidesPerView: 4,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 1,
                    },
                }}
            >
                {[slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9].map((slide, index) => (
                    <SwiperSlide key={index} className="relative">
                        <img className="w-full" src={slide} alt={`Slide ${index + 1}`} />
                        {/* Transparent black overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                        {/* Text content */}
                        <h2 className="text-center absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 text-white text-2xl">
                            {titles[language][index]}
                        </h2>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ItameSlider;
