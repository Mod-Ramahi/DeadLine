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
    const [freelancerClicked, setFreelancerClicked] = useState(true);
    const [searchTextResult, setSearchTextResult] = useState("")
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
    const handleTextSearch = (newTextInput) => {
        setSearchTextResult(newTextInput)
    }

    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category');
    const subCategory = new URLSearchParams(location.search).get('subCategory');
    const userRender = Users.map((user) => {
        return (
            <Link to={`/freelancer/${user.id}`} key={user.id} style={{ color: 'inherit', textDecoration: 'none' }}>
                <CardsResults user={user}  />
            </Link>)
    })
    // const jobRender = jobs.map((job) => {
    //     console.log(job,11)
    //     return (
    //         <Link to={`/jobprofile/${job._id}`} key={job._id} className="link_a">
    //           <JobCardResult job={job}/>
    //          </Link>
    //     )
    // })
    const jobFilter = jobs.filter((job) => job.title?.includes(searchTextResult))
    const jobRender = searchTextResult ?
            jobFilter.map((job) => (
                    <Link to={`/jobprofile/${job._id}`} key={job._id} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <JobCardResult job={job} />
                    </Link>
            ))
        :
        jobs.map((job) => {
            return (
                <Link to={`/jobprofile/${job._id}`} key={job._id} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <JobCardResult job={job} />
                </Link>
            )
        });
    return (
        <>
            <UserDashboard />
            <div className="ad-cards">
                <span>Best Members</span>
                <div className="members-cards">
                    <div className="ad-img"><img alt="" src="" /></div>
                    <div className="ad-img "><img alt="" src="" /></div>
                    <div className="ad-img remove"><img alt="" src="" /></div>
                    <div className="ad-img remove"><img alt="" src="" /></div>
                </div>
            </div>
            <SerachFilter handleTextSearch={handleTextSearch} user={freelancerClicked} category={category} subCategory={subCategory} />
            <div className="most-popular-btns">
                <button className={`job-btn ${jobClicked ? "active" : ""}`}
                    onClick={handleJobClicked}>Jobs</button>
                <button className={`freelancer-btn ${freelancerClicked ? "active" : ""}`}
                    onClick={handleFreelancerClicked}>Freelancers</button>
            </div>
            <div className="results-render">
                {jobClicked ? (<div className="jobs-render">{jobRender}</div>) : (<div className="users-render">{userRender}</div>)/* {userRender} */}
            </div>
        </>
    )
}