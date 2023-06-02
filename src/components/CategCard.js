import React from "react"

export default function CategCards({categ,seeAllImg}){
    return (
        <div key={categ.id} className="categbox">
            <div className="categlogo">
                <img className="categlogoimg" alt={categ.alt} src={categ.src}/>
            </div>
            <div className="categinfo">
                <div className="categhead">
                    <span className="categtitle">{categ.categoryname}</span>
                    <div className="seeall">
                        <span>See all</span>
                        <img alt="seeall" src={seeAllImg}/>
                    </div>
                </div>
                <hr/>
                <div className="subcateglist">
                    {categ.subCategory.map((subCateg,idx) =>(
                        <span key={idx} className="subcategspan"> {'>'} &nbsp;{subCateg}</span>
                    ))
                    }
                    
                </div>
            </div>
        </div>
    )
}