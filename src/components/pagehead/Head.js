// import { useState } from 'react';
import './Head.scss';
// import SearchIcon from './Searchicon.png';
import HeadTxt from './Headtxt.png';
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
                    <img alt='headtxt' src={HeadTxt}/>
                </div>
                <div className='headthreebtns'>
                    <button className='headbtn'>Post a Job</button>
                    <Link to='/categories'>
                        <button className='headbtn'>Find Freelancer</button>
                    </Link>
                    <button className='headbtn'>Get Idea</button>
                </div>
            </div>
        </div>
    )
}

export default Head;