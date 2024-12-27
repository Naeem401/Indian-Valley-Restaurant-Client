import img from '../../../assets/img/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured bg-fixed mt-5">
             <div className="hero-overlay bg-opacity-60"></div>
            <div className='bg-[#151515B3] py-[130px]'>
            <div>
                <p className="text-center mt-10 font-semibold text-xl text-[#D99904]">---Check it out---</p>
                <hr className="border-2 border-red-800 mb-4 w-1/4 mx-auto mt-4" />
                <h2 className="text-center text-3xl font-bold text-white">FROM OUR CATERING MENU</h2>
                <hr className="border-2 border-red-800 mb-4 w-1/4 mx-auto mt-4" />
            </div>
            <div className='md:flex justify-center items-center gap-6  w-4/5 mx-auto'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <p className='text-xl text-white'>
                    <span className='text-2xl'>October 19, 2024 <br />
                    INTRODUCING OUR CATERING SERVICE!</span> <br />
                    Indian Valley Restaurant now offers catering for all your events! Enjoy authentic Indian cuisine, from flavorful curries to delicious appetizers, perfect for weddings, corporate events, and special occasions.
                </p>
                <button className="p-4 border-b-2 border-white rounded-lg hover:border-b-[#D99904] mx-auto font-medium text-xl text-white">SHOW CATERING MENU</button>
            </div>
            </div>
            </div>
        </div>
    );
};

export default Featured;