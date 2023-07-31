import './Head.scss';
import SearchBar from '../searchbar/SearchBar';
import { Link } from 'react-router-dom';

export default function Head ({backgroundImg}) {


    return(
        <div className='head'>
            <div className='head-background'style={{backgroundImage:`url(${backgroundImg})`}}>
                <div className='head-search'>
                    <SearchBar/>
                </div>
                <div className='head-text'>
                    <p>HIRE THE BEST</p>
                    <p>FREELANCERS FOR ANY JOB,</p>
                    <span>ONLINE.</span>
                </div>
                <div className='head-three-btns'>
                    <Link to='/postjob'>
                        <button className='head-btn'>Post a Job</button>
                    </Link>
                    <Link to='/categories'>
                        <button className='head-btn'>Find Freelancer</button>
                    </Link>
                    <Link to='/getidea'>
                    <button className='head-btn'>Get Idea</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}