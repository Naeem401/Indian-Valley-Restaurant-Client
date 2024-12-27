
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../../assets/img/Banner/banner1.png'
import banner2 from '../../assets/img/Banner/banner2.png'
import banner3 from '../../assets/img/Banner/banner3.png'


const Banner = () => {
    return (
        <div>
            <Carousel
            autoPlay
            infiniteLoop 
            interval={3000} 
            showThumbs={false} 
            showStatus={false} 
            >
                <div>
                    <img src={banner1} />
                </div>
                <div>
                    <img src={banner2} />
                </div>
                <div>
                    <img src={banner3} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;