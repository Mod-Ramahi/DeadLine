// import { useState } from 'react';
import './Head.scss';
// import SearchIcon from './Searchicon.png';
// import HeadTxt from './Headtxt.png';
import SearchBar from '../searchbar/SearchBar';
import { Link } from 'react-router-dom';

const Head =({backgroundImg}) => {


    return(
        <div className='head'>
            <div className='headbackground'style={{backgroundImage:`url(${backgroundImg})`}}>
                <div className='headsearch'>
                    <SearchBar/>
                </div>
                <div className='headtext'>
                    <p>HIRE THE BEST</p>
                    <p>FREELANCERS FOR ANY JOB,</p>
                    <span>ONLINE.</span>
                </div>
                <div className='headthreebtns'>
                    <Link to='/postjob'>
                        <button className='headbtn'>Post a Job</button>
                    </Link>
                    <Link to='/categories'>
                        <button className='headbtn'>Find Freelancer</button>
                    </Link>
                    <Link to='/getidea'>
                    <button className='headbtn'>Get Idea</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Head;