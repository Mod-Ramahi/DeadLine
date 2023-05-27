import './SearchBar.scss';
import { useState } from 'react';
import  SearchIcon  from './Searchicon.png';

const SearchBar = () => {
    const [SearchString, setSearchString]= useState('');

    const HandleSearchChange = (event) => {
        setSearchString(event.target.value);
    };

    const SearchHandle = (e) => {
        e.preventDefault();
        console.log(SearchString);
        setSearchString('')
    };
    return (
        <div className='searchbar'>
            <form onSubmit={SearchHandle}>
                <div className='input'>
                    <input
                        type='text'
                        placeholder='Search...'
                        value={SearchString}
                        onChange={HandleSearchChange}
                    />
                    <button type='submit' className='iconbtn'><img alt='srchicon' src={SearchIcon} /></button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;