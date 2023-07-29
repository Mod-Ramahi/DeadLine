import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MostPopular.scss';
import Card from '../Card';
import JobCardResult from '../jobCardResults/JobCardResult';
import { Jobs } from '../../data/Jobs';

const MostPopular = ({ title, cards, number }) => {
    const [jobClicked, setJobClicked] = useState(false);
    const [freelancerClicked, setFreelancerClicked] = useState(true);
    const [selectedCardId, setSelectedCardId] =useState(null);
    const [selectedJob, setSelectedJob]= useState(null)


    const handleJobClicked = () => {
        setJobClicked(true);
        setFreelancerClicked(false)
    }
    const handleFreelancerClicked = () => {
        setFreelancerClicked(true);
        setJobClicked(false);
    }
    const handleIdCard = (cardId)=>{
        setSelectedCardId(cardId)
        console.log(cardId)
    }
    const handleIdJob = (JobID)=>{
        setSelectedJob(JobID)
    }

    const RenderCards = cards.slice(0, number).map((card) => (
        <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/portfoliopage/${card.id}`} key={card.id}>
            <Card card={card}  CardId={handleIdCard} />
        </Link>
    ));
    const RenderJobs = Jobs.map((job) => (
        <Link to={`/jobprofile/${job.id}`} style={{color:'inherit', textDecoration:'none'}} key={job.id}>
            <JobCardResult  job={job} onJobClick={handleIdJob}/>
        </Link>
        
    ))


    return (
        <div className="mostpopular">
            <span>{title}</span>
            <div className="mostpopularbtns">
                <button className={`jobbtn ${jobClicked ? "active" : ""}`}
                    onClick={handleJobClicked}>Jobs</button>
                <button className={`freelancerbtn ${freelancerClicked ? "active" : ""}`}
                    onClick={handleFreelancerClicked}>Freelancers</button>
            </div>
            {jobClicked ? (<div className='jobscontainer'>{RenderJobs}</div>)
                :
                (<div className="cardscontainer">
                    {RenderCards}
                </div>)
            }

            <Link style={{ color: 'inherit', textDecoration: 'none' }}
                to={'/resultssearch'}>
                <button className='morecards'>View more popular</button>
            </Link>
        </div>
    )
}

export default MostPopular;