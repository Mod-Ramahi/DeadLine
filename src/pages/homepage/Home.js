import './Home.scss';
import Head from '../../components/pagehead/Head';
import MostPopular from '../../components/homemostpoopular/MostPopular';
import SmallAboutUs from '../../components/smallaboutussection/SmallAboutUs';
import {Cards} from "../../Cards"
import AllcategoryHome from '../../components/allcategoryhomesection/AllcategoryHome';
import HeadBg from './headimages/HeadBg.png'
const Home = () => {
    
    return(
        <>
            <Head backgroundImg={HeadBg}/>
            <MostPopular title={"Most Popular"} cards={Cards} number={8}/>
            <SmallAboutUs/>
            <AllcategoryHome/>
        </>
    )
}

export default Home;