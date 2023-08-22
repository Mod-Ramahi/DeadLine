import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MostPopular.scss';
import Card from '../Card';
import JobCardResult from '../jobCardResults/JobCardResult';
// import { Jobs } from '../../data/Jobs';
import { getAllProject } from '../../api';

const MostPopular = ({ title, cards, number }) => {
    const [jobs, setJobs] = useState([])
    const [jobClicked, setJobClicked] = useState(false);
    const [freelancerClicked, setFreelancerClicked] = useState(true);
    const [selectedCardId, setSelectedCardId] =useState(null);
    const [selectedJob, setSelectedJob]= useState(null)

    useEffect (() => {
        const getProduct = async () => {
            const response = await getAllProject()
            setJobs(response)
        }
        getProduct()
    },[])
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
    // const handleIdJob = (JobID)=>{
    //     setSelectedJob(JobID)
    // }

    const RenderCards = cards.slice(0, number).map((card) => (
        <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/portfoliopage/${card.id}`} key={card.id}>
            <Card card={card}  CardId={handleIdCard} />
        </Link>
    ));
    const RenderJobs = jobs.slice(0, number).map((job) => (
        <Link to={`/jobprofile/${job._id}`} style={{color:'inherit', textDecoration:'none'}} key={job._id}>
            <JobCardResult  job={job} />
        </Link>
        
    ))


    return (
        <div className="most-popular">
            <span>{title}</span>
            <div className="most-popular-btns">
                <button className={`job-btn ${jobClicked ? "active" : ""}`}
                    onClick={handleJobClicked}>Jobs</button>
                <button className={`freelancer-btn ${freelancerClicked ? "active" : ""}`}
                    onClick={handleFreelancerClicked}>Freelancers</button>
            </div>
            {jobClicked ? (<div className='jobs-container'>{RenderJobs}</div>)
                :
                (<div className="cards-container">
                    {RenderCards}
                </div>)
            }

            <Link style={{ color: 'inherit', textDecoration: 'none' }}
                to={'/resultssearch'}>
                <button className='more-cards'>View more popular</button>
            </Link>
        </div>
    )
}

export default MostPopular;