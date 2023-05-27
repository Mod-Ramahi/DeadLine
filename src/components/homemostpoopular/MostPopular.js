import './MostPopular.scss'
import { Cards } from '../../Cards';

const MostPopular = ()=> {
    const RenderCards = Cards.slice(0,8).map((card)=>(
        <div key={card.id} className='cardbox'>
                <div className="imagebox">
                    <img alt={card.alt} src={card.src}/>
                </div>
                <div className='cardtext'>
                    <span className='txt1'>{card.text}</span>
                    <span className='txt2'>{card.price}</span>
                </div>
        </div>
       
    ));
    

    return(
        <div className="mostpopular">
            <span>Most Popular</span>
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