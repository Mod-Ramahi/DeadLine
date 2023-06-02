import React from 'react'
import './Categories.scss'
import Head from '../../components/pagehead/Head'
import CategCards from '../../components/CategCard'
import { CategoryList } from '../../CategoryList';
import seeAll from './seeAll.png'

export default function Categories () {
    const CategoryCardsList = CategoryList.map((categ)=>(
        <CategCards key={categ.id} categ={categ} seeAllImg={seeAll}/>
    ));
    return(
        <>
            <Head/>
            <div className='pagetitle'>
                <span className='title'>
                    Category
                </span>
            </div>
            <div className='categcontainer'>
                {CategoryCardsList}
            </div>
        </>
    )
}