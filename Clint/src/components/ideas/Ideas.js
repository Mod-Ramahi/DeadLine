import React, { useState } from 'react'
import "../../pages/getidea/GetIdea.scss"
import {Cards} from '../../Cards'
import Card from '../Card'
export default function Ideas() {
    const [category, setCategory] = useState("Graphic Designing")
  return (
    <div className="search-wrapper">
        <div className='category-wrapper'>
            <p onClick={(e)=>{
                e.preventDefault()
                console.log(e)
                setCategory(e.target.textContent)
            }}>&gt; Architecture & Interior
            Design</p>
            <p onClick={(e)=>{
                setCategory(e.target.textContent)
            }}>&gt; Building Engineering</p>
            <p onClick={(e)=>{
                setCategory(e.target.textContent)
            }}>&gt; Logo & Brand Design
            </p>
            <p onClick={(e)=>{
                setCategory(e.target.textContent)
            }}>&gt; Cards & Cover Design</p>
            <p onClick={(e)=>{
                setCategory(e.target.textContent)
            }}>&gt; Web & App Design or
            UI/UX?</p>
            <p onClick={(e)=>{
                setCategory(e.target.textContent)
            }}>&gt; Building Engineering</p>
            <p onClick={(e)=>{
                setCategory(e.target.textContent)
            }}>&gt; Character Design
            </p>
            <p onClick={(e)=>{
                setCategory(e.target.textContent)
            }}>&gt;  Flyer
            </p>
            <p onClick={(e)=>{
                setCategory(e.target.textContent)
            }}>&gt;  Busnisse Card
            </p>
        </div>
        <div className='product-wrapper'>
            <h1>{category}</h1>
            <div className="cards-container">
                {
                    Cards.slice(0,8).map((e, idx)=>{
                        return <Card card={e} key={idx}/>
                    })
                }
            </div>
        </div>
    </div>
  )
}
