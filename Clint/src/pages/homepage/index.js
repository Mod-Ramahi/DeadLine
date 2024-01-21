import Head from '../../components/pagehead/Head';
import MostPopular from '../../components/homemostpoopular/MostPopular';
import SmallAboutUs from '../../components/smallaboutussection/SmallAboutUs';
import {Cards} from "../../Cards"
import AllcategoryHome from '../../components/allcategoryhomesection/AllcategoryHome';
import HeadBg from './headimages/HeadBg.png'
export default function Home () {
    
    return(
        <>
            <Head backgroundImg={HeadBg}/>
            <MostPopular title={"Most Popular"} number={8} />
            <SmallAboutUs/>
            <AllcategoryHome/>
        </>
    )
}