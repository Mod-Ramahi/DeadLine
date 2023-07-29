import React, { useEffect, useState } from "react";
import "./Portfolio.scss"
import { useParams } from "react-router-dom";
import { Cards } from "../../Cards";
import PortfolioView from "../../components/portfolio/PortfolioView";

export default function Portfolio() {
    const {CardId}=useParams()
    const [selectedCard, setSelectedCard] = useState()
    useEffect(()=>{
        const targetCard = Cards.find((card)=> card.id === parseInt(CardId))
        setSelectedCard(targetCard)
        console.log(CardId)
    },[CardId])
    if(!selectedCard){
        return <p>Loading...</p>
    }
    return (
        <PortfolioView card={selectedCard}/>
    )
}