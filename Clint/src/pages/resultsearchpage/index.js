import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import UserDashboard from "../../components/userDashboard/UserDashboard"
import './ResultSearch.scss'
import SerachFilter from "../../components/searchfilter/SearchFilter"
import CardsResults from "../../components/cardsresults/CardsResults";
import JobCardResult from "../../components/jobCardResults/JobCardResult";
import { Users } from "../../data/Users";
// import { Jobs } from "../../data/Jobs"
import { getAllProject, getUserById } from "../../api";
// import { URLSearchParams } from "url";
import { getItem } from "../../utils/localStorge";
import jwtDecode from "jwt-decode";

export default function ResultSearch() {
    // const [jobs, setJobs] = useState([])
    // const [jobClicked, setJobClicked] = useState(false);
    // const [freelancerClicked, setFreelancerClicked] = useState(true);
    // const [searchTextResult, setSearchTextResult] = useState("")
    // const [category, setCategory] = useState()
    // const [subCategory, setSubCategory] =useState()
    const [userFound, setUserFound] = useState(false)
    const [userCatego, setUserCatego] = useState()
    const location = useLocation()
    useEffect(() => {
        const token = getItem('token')
        if (token) {
            const decodedToken = jwtDecode(token)
            const userId = decodedToken.id
            setUserFound(true)
            getUserById(userId).then((user) => {
                const category = user.category
                setUserCatego(category)
            }).catch((error) => {
                console.error(error)
            })
        } else {
            setUserFound(false)
        }
    }, [])
    // useEffect(()=>{
    //     const category = new URLSearchParams(location.search).get('category')
    //     const subCategory = new URLSearchParams(location.search).get('subCategory')
    //     setCategory(category)
    //     setSubCategory(subCategory)
    //     const token = getItem('token')
    //     const decodedToken = jwtDecode(token)
    //     const userId = decodedToken.id
    //     const getProduct = async () =>{
    //         const response = await getAllProject()
    //         setJobs(response)
    //     }
    //     getProduct()
    // },[])
    // useEffect( () => {
    //     const category = new URLSearchParams(location.search).get('category')
    //     const subCategory = new URLSearchParams(location.search).get('subCategory')
    //     setCategory(category)
    //     setSubCategory(subCategory)

    // },[location.pathname])
    // const handleJobClicked = () => {
    //     setJobClicked(true);
    //     setFreelancerClicked(false)
    // }
    // const handleFreelancerClicked = () => {
    //     setFreelancerClicked(true);
    //     setJobClicked(false);
    // }
    // const handleTextSearch = (newTextInput) => {
    //     setSearchTextResult(newTextInput)
    // }

    // const location = useLocation();
    // const category = new URLSearchParams(location.search).get('category');
    // const subCategory = new URLSearchParams(location.search).get('subCategory');
    // const userRender = Users.map((user) => {
    //     return (
    //         <Link to={`/freelancer/${user.id}`} key={user.id} style={{ color: 'inherit', textDecoration: 'none' }}>
    //             <CardsResults user={user}  />
    //         </Link>)
    // })
    // const jobRender = jobs.map((job) => {
    //     console.log(job,11)
    //     return (
    //         <Link to={`/jobprofile/${job._id}`} key={job._id} className="link_a">
    //           <JobCardResult job={job}/>
    //          </Link>
    //     )
    // })
    // const jobFilter = jobs.filter((job) => job.title?.includes(searchTextResult))
    // const jobRender = searchTextResult ?
    //         jobFilter.map((job) => (
    //                 <Link to={`/jobprofile/${job._id}`} key={job._id} style={{ color: 'inherit', textDecoration: 'none' }}>
    //                     <JobCardResult job={job} />
    //                 </Link>
    //         ))
    //     :
    //     jobs.map((job) => {
    //         return (
    //             <Link to={`/jobprofile/${job._id}`} key={job._id} style={{ color: 'inherit', textDecoration: 'none' }}>
    //                 <JobCardResult job={job} />
    //             </Link>
    //         )
    //     });
    return (
        <>
            {/* <UserDashboard /> */}
            {userFound ? (<UserDashboard/>):(<div style={{marginBottom:'15rem'}}></div>)}
            <div className="ad-cards">
                <span>Best Members</span>
                <div className="members-cards">
                    <div className="ad-img"><img alt="" src="" /></div>
                    <div className="ad-img "><img alt="" src="" /></div>
                    <div className="ad-img remove"><img alt="" src="" /></div>
                    <div className="ad-img remove"><img alt="" src="" /></div>
                </div>
            </div>
            <SerachFilter userCateg={userCatego}/>
            {/* <SerachFilter handleTextSearch={handleTextSearch} user={freelancerClicked} category={category} subCategory={subCategory} /> */}
            {/* <div className="most-popular-btns">
                <button className={`job-btn ${jobClicked ? "active" : ""}`}
                    onClick={handleJobClicked}>Jobs</button>
                <button className={`freelancer-btn ${freelancerClicked ? "active" : ""}`}
                    onClick={handleFreelancerClicked}>Freelancers</button>
            </div>
            <div className="results-render">
                {jobClicked ? (<div className="jobs-render">{jobRender}</div>) : (<div className="users-render">{userRender}</div>)/* {userRender} */}
            {/* </div>} */}
        </>
    )
}