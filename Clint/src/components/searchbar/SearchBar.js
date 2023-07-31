import './SearchBar.scss';
import { useState } from 'react';
import  SearchIcon  from './Searchicon.png';

export default function SearchBar () {
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
        <div className='search-bar'>
            <form className='search-form' onSubmit={SearchHandle}>
                <div className='input'>
                    <input
                        type='text'
                        placeholder='Search...'
                        value={SearchString}
                        onChange={HandleSearchChange}
                    />
                    <button type='submit' className='icon-btn'><img alt='srchicon' src={SearchIcon} /></button>
                </div>
            </form>
        </div>
    )
}