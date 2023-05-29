import './Home.scss';
import Head from '../../components/pagehead/Head';
import MostPopular from '../../components/homemostpoopular/MostPopular';
import SmallAboutUs from '../../components/smallaboutussection/SmallAboutUs';
import {Cards} from "../../Cards"
const Home = () => {
    
    return(
        <>
            <Head/>
            <MostPopular title={"Most Popular"} cards={Cards} number={8}/>
            <SmallAboutUs/>
        </>
    )
}

export default Home;