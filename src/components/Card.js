import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Card({card, CardId}) {
  const GetCardId = () => {
    CardId(card.id)
  }
  return (
    <div  className='cardbox' onClick={GetCardId}>
      <div className="imagebox">
        <img alt={card.alt} src={card.src} />
      </div>
      <div className='cardtext'>
        <span className='txt1'>{card.text}</span>
        <span className='txt2'>{card.price}</span>
      </div>
    </div>
  )
}
