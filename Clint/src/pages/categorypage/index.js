import React, { useState } from 'react';
import './Categories.scss';
import CategCards from '../../components/CategCard';
import { CategoryList } from '../../CategoryList';
import seeAll from './seeAll.png';
import { Link } from 'react-router-dom';

export default function Categories() {
    const CategoryCardsList = CategoryList.map((categ) => (
        <div key={categ.id}>
            <CategCards categ={categ} seeAllImg={seeAll} category={categ.categoryname} />
            <div className="sub-categ-list">
                {categ.subCategory.map((subCateg, idx) => (
                    <Link key={idx}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        to={{
                            pathname: '/resultssearch',
                            search: `?category=${categ.categoryname}&subCategory=${subCateg}`,
                        }}
                    >
                        <span key={idx} className="sub-categ-span"> {'>'} &nbsp;{subCateg}</span>
                    </Link>
                ))
                }

            </div>
        </div>
    ));
    return (
        <>
            <div className='page-title'>
                <span className='title'>
                    Category
                </span>
            </div>
            <div className='categ-container'>
                {/* <Link to='/search'> */}
                {CategoryCardsList}
                {/* </Link> */}
            </div>
        </>
    )
}
