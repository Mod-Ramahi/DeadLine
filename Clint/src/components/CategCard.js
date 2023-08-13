import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function CategCards({ categ, seeAllImg, category }) {
    const [categorySelected, setCategorySelected] = useState('')
    // const [subCategorySelected, setSubCategorySelected]= useState('')

    // const handleSubCateg = (subCateg)=>{
    //     setSubCategorySelected(subCateg)
    // }
    useEffect(() => {
        setCategorySelected(category);
    }, [category])
    
    return (
        <div key={categ.id} className="categ-box">
            <div className="categ-logo">
                <img className="categ-logo-img" alt={categ.alt} src={categ.src} />
            </div>
            <div className="categ-info">
                <div className="categ-head">
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={{
                        pathname: '/resultssearch',
                        search: `?category=${categorySelected}`,
                    }}>
                        <span className="categ-title">{categ.categoryname}</span>
                    </Link>
                    <div className="see-all">
                        
                        <Link className="see-all" style={{ textDecoration: 'none', color: 'inherit' }} to={{
                            pathname: '/resultssearch',
                            search: `?category=${categorySelected}`,
                        }}>
                            <span>See all</span>
                            <img alt="seeall" src={seeAllImg} />
                        </Link>
                    </div>
                </div>
                <hr />
                {/* <div className="subcateglist">
                    {categ.subCategory.map((subCateg, idx) => (
                        <Link key={idx} 
                        style={{ textDecoration: 'none', color: 'inherit' }} 
                        to={{
                            pathname: '/resultssearch',
                            search: `?category=${categorySelected}&subCategory=${encodeURIComponent(subCategorySelected)}`,
                        }}
                        onClick={()=>handleSubCateg(subCateg)}>
                            <span key={idx} className="subcategspan"> {'>'} &nbsp;{subCateg}</span>
                        </Link>
                    ))
                    }

                </div> */}
            </div>
        </div>
    )
}