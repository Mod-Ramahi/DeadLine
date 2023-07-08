import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import UserDashboard from "../../components/userDashboard/UserDashboard"
import './ResultSearch.scss'
import SerachFilter from "../../components/searchfilter/SearchFilter"
import CardsResults from "../../components/cardsresults/CardsResults";
import JobCardResult from "../../components/jobCardResults/JobCardResult";
import { Users } from "../../data/Users";
import { Jobs } from "../../data/Jobs"

export default function ResultSearch() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectJob, setSelectedJob] = useState(null);
    const [jobClicked, setJobClicked] = useState(false);
    const [freelancerClicked, setFreelancerClicked] = useState(true)

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
    const HandleUserID = (UserID) => {
        setSelectedUser(UserID);
        console.log(UserID)
    }
    const HandleJobID = (JobID) => {
        setSelectedJob(JobID);
        console.log(JobID)
    }
    const userRender = Users.map((user) => {
        return (
            <Link to={`/freelancer/${user.id}`} key={user.id} className="link_a">
                <CardsResults user={user} onUserClick={HandleUserID} />
            </Link>)
    })
    const jobRender = Jobs.map((job) => {
        return (
            <Link to={`/jobprofile/${job.id}`} key={job.id} className="link_a">
                <JobCardResult job={job} onJobClick={HandleJobID} />
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