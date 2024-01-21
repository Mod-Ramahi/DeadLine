import React, { useEffect, useState } from "react";
import { getItem } from "../../utils/localStorge";
import jwtDecode from "jwt-decode";
import { getProjectByCreatorId, getUserById } from "../../api";
import JobCardResult from "../../components/jobCardResults/JobCardResult";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './MyFollowing.scss'

export default function MyFollowing() {
    // const [ user, setUser] = useState()
    const [userFollowing, setUserFollowing] = useState([])
    const [projectsArray, setProjectsArray] = useState([])
    const [noFollowing, setNoFollowing] = useState(false)
    const [jobs, setJobs] = useState([])
    const navigat = useNavigate()
    const location = useLocation()
    useEffect(() => {
        const followingRender = async () => {
            try {
                const token = getItem('token')
                const jwToken = jwtDecode(token)
                const userId = jwToken.id
                // setUser(userId)
                if(userId){
                    const user = await getUserById(userId)
                    const followList = user.following
                    if (followList){
                        setNoFollowing(false)
                        setUserFollowing(followList)
                        console.log('followList:', followList, 'user:', user)
                        const getJobsFollowed = await Promise.all(followList.map(async(following) => {
                            const jobFollowed = await getProjectByCreatorId(following)
                            return jobFollowed
                    }))
                    const jobsFlat = getJobsFollowed.flat()
                    setJobs(jobsFlat)
                    }else {
                        setNoFollowing(true)
                        console.log('no following list')
                    }
                } else {
                    alert('please sign in')
                    navigat('/')
                }
            } catch (error) {
                console.error(error)
            }
        }
        followingRender()
        // const listRender = async () => {
        //     try{
        //         const follooow = userFollowing
        //         console.log('user following',userFollowing)
        //         const getJobsFollowed = await Promise.all(userFollowing.map(async(following) => {
        //             const jobFollowed = await getProjectByCreatorId(following)
        //             return jobFollowed
        //     }))
        //     const jobsFlat = getJobsFollowed.flat()
        //     setJobs(jobsFlat)
        //     }catch (error) {
        //         console.error(error)
        //     }
        // }
        // listRender()
        console.log('jjjobs',jobs)
    },[])

    const followingMap = jobs.map((job, idx) => (
        <Link to={`/jobprofile/${job._id}`} style={{ color: 'inherit', textDecoration: 'none' }} key={idx}>
            <JobCardResult job={job} />
        </Link>
    ))
    return (
        <div className="following-posts">
            {followingMap}
        </div>
    )
}