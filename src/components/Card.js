import React from 'react'

export default function Card({card}) {
  return (
    <div key={card.id} className='cardbox'>
    <div className="imagebox">
        <img alt={card.alt} src={card.src}/>
    </div>
    <div className='cardtext'>
        <span className='txt1'>{card.text}</span>
        <span className='txt2'>{card.price}</span>
    </div>
</div>
  )
}
