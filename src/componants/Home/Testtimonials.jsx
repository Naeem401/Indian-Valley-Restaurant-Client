// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import { useEffect, useState } from 'react';
// import { Rating } from '@smastrom/react-rating'

// import '@smastrom/react-rating/style.css'

const Testtimonials = () => {
    // const [revews, setRevews] = useState([])
    // useEffect(() => {
    //     fetch('http://localhost:5000/reviews')
    //         .then(res => res.json())
    //         .then(data => setRevews(data))
    // }, [])

    return (
        <div className='container md:w-4/5 mx-auto md:py-6'>
            {/* <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                <div>
                    {
                        revews.map(revew => <SwiperSlide
                            key={revew.id}>
                            <div className='text-white p-4 md:px-8 lg:px-40 text-center flex flex-col'>
                                <div className='mx-auto'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={revew.rating}
                                    readOnly
                                />
                                </div>
                                <p className='mt-[47px]'>{revew.details}</p>
                                <h2 className='mt-4 text-[#CD9003] text-[31px]'>{revew.name}</h2>
                            </div>
                        </SwiperSlide>)
                    }
                </div>
            </Swiper> */}
        </div>
    );
};

export default Testtimonials;