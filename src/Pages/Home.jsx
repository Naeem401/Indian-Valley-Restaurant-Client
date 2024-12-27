import Banner from "../componants/Home/Banner";
import ChefRecommends from "../componants/Home/ChefRecommends";
import Featured from "../componants/Home/Featured/Featured";
import ItameSlider from "../componants/Home/ItameSlider";
import MidBanner from "../componants/Home/MidBanner";
import PopularItem from "../componants/Home/PopularItem";
import Testtimonials from "../componants/Home/Testtimonials";
import SectionTitle from "../componants/SectionTitle";


const Home = () => {
    return (
        <div>
            <Banner/>
            <SectionTitle 
            subHeading={"From 12.30pm to 1.00am"}
            heading={"Order Online"}
            ></SectionTitle>
            <ItameSlider/>
            <MidBanner/>
            <SectionTitle 
            subHeading={"Check it out"}
            heading={"FROM OUR MENU"}
            ></SectionTitle>
            <PopularItem/>
            <SectionTitle 
            subHeading={"Should Try"}
            heading={"CHEF RECOMMENDS"}
            ></SectionTitle>
            <ChefRecommends/>
            <Featured/>
            <SectionTitle 
            subHeading={"What Our Clients Say"}
            heading={"TESTIMONIALS"}
            ></SectionTitle>
            <Testtimonials/>
        </div>
    );
};

export default Home;