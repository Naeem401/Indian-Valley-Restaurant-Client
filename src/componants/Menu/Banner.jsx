import banner from '../../assets/img/banner2.jpg';

const Banner = () => {
    return (
        <div className="relative">
            <img src={banner} alt="Banner" className="w-full h-auto" />
            <div className="bg-[#15151599] absolute inset-0 flex items-center justify-center text-center p-5">
                <div className="max-w-3xl p-4">
                    <h2 className="text-white text-3xl sm:text-5xl font-bold mb-4">
                        Our Menu
                    </h2>
                    <p className="text-white text-lg sm:text-xl font-semibold">
                        Would you like to try a dish?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
