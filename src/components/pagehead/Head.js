// import { useState } from 'react';
import './Head.scss';
// import SearchIcon from './Searchicon.png';
import HeadTxt from './Headtxt.png';
import SearchBar from '../searchbar/SearchBar';

const Head =() => {
    // const [SearchString, setSearchString]= useState('');

    // const HandleSearchChange = (event) => {
    //     setSearchString(event.target.value);
    // };

    // const SearchHandle = (e) => {
    //     e.preventDefault();
    //     console.log(SearchString);
    //     setSearchString('')
    // };

    return(
        <div className='head'>
            <div className='headbackground'>
                <div className='headsearch'>
                    <SearchBar/>
                    {/* <div className='searchbar'>
                        <form onSubmit={SearchHandle}>
                        <div className='input'>
                            <input 
                                type='text'
                                placeholder='Search...'
                                value={SearchString}
                                onChange={HandleSearchChange}
                            />
                            <button type='submit' className='iconbtn'><img alt='srchicon' src={SearchIcon}/></button>
                        </div>
                        </form>
                    </div> */}
                </div>
                <div className='headtext'>
                    <img alt='headtxt' src={HeadTxt}/>
                </div>
                <div className='headthreebtns'>
                    <button className='headbtn'>Post a Job</button>
                    <button className='headbtn'>Find Freelancer</button>
                    <button className='headbtn'>Get Idea</button>
                </div>
            </div>
        </div>
    )
}

export default Head;