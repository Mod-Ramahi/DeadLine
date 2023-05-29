import './Home.scss';
import Head from '../../components/pagehead/Head';
import MostPopular from '../../components/homemostpoopular/MostPopular';
import SmallAboutUs from '../../components/smallaboutussection/SmallAboutUs';
import AllcategoryHome from '../../components/allcategoryhomesection/AllcategoryHome';

const Home = () => {
    
    return(
        <>
            <Head/>
            <MostPopular/>
            <SmallAboutUs/>
            <AllcategoryHome/>
        </>
    )
}

export default Home;