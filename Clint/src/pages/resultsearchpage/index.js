import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import UserDashboard from "../../components/userDashboard/UserDashboard"
import './ResultSearch.scss'
import SerachFilter from "../../components/searchfilter/SearchFilter"
import CardsResults from "../../components/cardsresults/CardsResults";
import JobCardResult from "../../components/jobCardResults/JobCardResult";
import { Users } from "../../data/Users";
// import { Jobs } from "../../data/Jobs"
import { getAllProject } from "../../api";

export default function ResultSearch() {
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

    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category');
    const subCategory = new URLSearchParams(location.search).get('subCategory');
    const userRender = Users.map((user) => {
        return (
            <Link to={`/freelancer/${user.id}`} key={user.id} className="link_a">
                <CardsResults user={user}  />
            </Link>)
    })
    const jobRender = jobs.map((job) => {
        console.log(job,11)
        return (
            <Link to={`/jobprofile/${job._id}`} key={job._id} className="link_a">
              <JobCardResult job={job}/>
             </Link>
        )
    })
    return (
        <>
            <UserDashboard />
            <div className="adcards">
                <p>Best Members</p>
                <div className="memberscards">
                    <div className="adimg"><img alt="" src="" /></div>
                    <div className="adimg"><img alt="" src="" /></div>
                    <div className="adimg remove"><img alt="" src="" /></div>
                    <div className="adimg remove"><img alt="" src="" /></div>
                </div>
            </div>
            <SerachFilter category={category} subCategory={subCategory} />
            <div className="mostpopularbtns">
                <button className={`jobbtn ${jobClicked? "active":""}`}
                onClick={handleJobClicked}>Jobs</button>
                <button className={`freelancerbtn ${freelancerClicked? "active":""}`}
                onClick={handleFreelancerClicked}>Freelancers</button>
            </div>
            <div className="results_render">
                {jobClicked? (jobRender):(userRender)/* {userRender} */}
                
            </div>
        </>
    )
}