import './Home.scss';
import Head from '../../components/pagehead/Head';
import MostPopular from '../../components/homemostpoopular/MostPopular';
import SmallAboutUs from '../../components/smallaboutussection/SmallAboutUs';

const Home = () => {
    
    return(
        <>
            <Head/>
            <MostPopular/>
            <SmallAboutUs/>
        </>
    )
}

export default Home;