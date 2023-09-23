import React, { useEffect, useState } from "react";
import MyJobsList from "../../components/myJobs/MyJobsList";
import { getItem } from "../../utils/localStorge";
import jwtDecode from "jwt-decode";
import { getAndDeleteJob, getProjectByCreatorId, getProposalByJobId } from "../../api";
import JobCardResult from "../../components/jobCardResults/JobCardResult";
import { Link, useNavigate } from "react-router-dom";
import RelatedProposals from './RelatedProposals'
import './MyJobs.scss'

export default function Myjobs() {
    const [noActivities, setNoActivities] = useState(false)
    const [jobs, setJobs] = useState([])
    const [reset, setReset] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {

        const getInfo = () => {
            const token = getItem('token')
            const decodeToken = jwtDecode(token)
            const userId = decodeToken.id;
            if (userId) {
                getActivities(userId)
            } else {
                console.log('no user id')
                navigate('/')
            }
        }

        const getActivities = ((userId) => {
            if (userId) {
                const id = userId;
                getProjectByCreatorId(id).then((job) => {
                    if (!job || job.length === 0) {
                        setNoActivities(true);
                        setReset(true)
                        navigate('/myjobs')
                    } else{
                    setJobs(job)
                    setNoActivities(false);
                    setReset(false)
                    console.log("jjjjjjooooooobIIIIIIDDDDDhhhhhhhhhhhhhh:", job._id)
                    }
                }).catch((err) => {
                    console.error(err)
                })
            } else {
                console.log('not getting the user id')
            }
        })
        getInfo()

    }, [])

    const deleteJob = (id) => {
        getAndDeleteJob(id).then((deleted) => {
            if (deleted) {
                console.log("deleted", deleted)
                setReset(false)
                navigate('/myjobs')
            } else {
                console.log('error deleting job or cant find')
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    const renderJobs = jobs.map((job) => (
        <div className="block" key={job._id}>
            <div className="job">
                <span className="my-job-span">Job Status: Live</span>
                <Link to={`/jobprofile/${job._id}`} style={{ color: 'inherit', textDecoration: 'none' }} key={job._id}>
                    <JobCardResult job={job} />
                </Link>
                <button className="delete-job-button" onClick={() => deleteJob(job._id)}>Delete Job</button>
            </div>
            <hr className="hr" />
            <span className="proposals-span"> Recieved bids/proposals: </span>
            <div className="proposals">
                <RelatedProposals jobId={job._id} />
            </div>
        </div>
    ))
    return (
        <div className="my-jobs">
            <span className="title-span">My Jobs Activities</span>
            {noActivities ?
                (
                    <div className="no-activities">
                        <span className="no-projects-span">You have no Activities</span>
                        <button className="no-activities-button" onClick={() => navigate('/getidea')}> Get Ideas</button>
                    </div>
                )
                :
                (
                    <div className="my-projects">
                        <span className="my-projects-span">My Jobs & recieved proposals</span>
                        {renderJobs}
                    </div>
                )
            }
        </div>
    )
}