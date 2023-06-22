import React from 'react';
import './Categories.scss';
import CategCards from '../../components/CategCard';
import { CategoryList } from '../../CategoryList';
import seeAll from './seeAll.png';
import { Link } from 'react-router-dom';

export default function Categories () {
    const CategoryCardsList = CategoryList.map((categ)=>(
        <CategCards key={categ.id} categ={categ} seeAllImg={seeAll}/>
    ));
    return(
        <>
            <div className='pagetitle'>
                <span className='title'>
                    Category
                </span>
            </div>
            <div className='categcontainer'>
                <Link to='/search'>{CategoryCardsList}</Link>
            </div>
        </>
    )
}