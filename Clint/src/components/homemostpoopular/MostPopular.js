import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MostPopular.scss';
import Card from '../Card';
import JobCardResult from '../jobCardResults/JobCardResult';
import { getAllProject } from '../../api';

const MostPopular = ({ title, cards, number }) => {
    const [jobs, setJobs] = useState([])
    const [jobClicked, setJobClicked] = useState(false);
    const [freelancerClicked, setFreelancerClicked] = useState(true)
    useEffect(()=>{
        const getProduct = async () =>{
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
    const RenderCards = cards.slice(0, number).map((card) => (
        <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/portfoliopage/${card.id}`} key={card.id}>
            <Card card={card}   />
        </Link>
    ));
    const RenderJobs = jobs.map((job) => (
        <Link to={`/jobprofile/${job._id}`} style={{color:'inherit', textDecoration:'none'}} key={job.id}>
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