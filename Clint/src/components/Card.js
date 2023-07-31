import React, { useState } from 'react'

export default function Card({card, CardId}) {
  const GetCardId = () => {
    CardId(card.id)
  }
  return (
    <div  className='card-box' onClick={GetCardId}>
      <div className="image-box">
        <img alt={card.alt} src={card.src} />
      </div>
      <div className='card-text'>
        <span className='txt1'>{card.text}</span>
        <span className='txt2'>{card.price}</span>
      </div>
    </div>
  )
}
