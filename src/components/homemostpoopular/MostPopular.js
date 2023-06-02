import React from 'react';
import './MostPopular.scss';
import Card from '../Card';

const MostPopular = ({title,cards, number})=> {
    const RenderCards = cards.slice(0,number).map((card)=>(
        <Card key={card.id} card={card}/>
       
    ));
    

    return(
        <div className="mostpopular">
            <span>{title}</span>
            <div className="mostpopularbtns">
                <button className="jobbtn">Jobs</button>
                <button className="freelancerbtn">Freelancers</button>
            </div>
            <div className="cardscontainer">
                {RenderCards}
            </div>
            <button className='morecards'>View more popular</button>
        </div>
    )
}

export default MostPopular;