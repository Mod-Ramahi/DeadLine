import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MostPopular.scss';
// import Card from '../Card';
import JobCardResult from '../jobCardResults/JobCardResult';
import { getAllProject, getallProfiles } from '../../api';
import CardsResults from '../cardsresults/CardsResults';

const MostPopular = ({ title, cards }) => {
    const [jobs, setJobs] = useState([])
    const [profiles, setProfiles] = useState([])
    const [jobClicked, setJobClicked] = useState(false);
    const [freelancerClicked, setFreelancerClicked] = useState(true)
    useEffect(()=>{
        const getProfiles = async () => {
            const response = await getallProfiles()
            setProfiles(response)
            console.log(response)
        }
        getProfiles()
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
    const RenderCards = profiles.map((card) => (
        <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/freelancer/${card._id}`} key={card._id}>
            <CardsResults user={card}/>
        </Link>
    ));
    const RenderJobs = jobs.map((job) => (
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