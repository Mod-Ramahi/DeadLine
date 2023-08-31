import React, { useEffect } from "react";
import Joined from './Joined.png'
import Time from './Time.png'
import Recommendation from './Recommendation.png'
import { Users } from "../../data/Users";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function JobProfile({ job }) {
    const [proposal, setProposal] = useState([])
    // const user = Users.find(user => user.id === job.userPostedId)
    const user = Users.find(user => user.id === job.createdBy)
    const id = useParams();
    
    useEffect(() => {
        async function fetchProposals () {
        try{
            const response = await axios.get(`http://localhost:4000/api/v1/proposal/job/${id}`);
            setProposal(response.data);
        }catch(error){
            console.error("Error fetching proposals", error);
        }
    }
    fetchProposals();
    },[id])

    return (
        <div className="userprofile">
            <div className="uppersection">
                <span className="upper"> Project </span>
            </div>
            <div className="lowersection">
                <div className="leftsection">
                    <div className="profilephoto">
                        {/* <img className="photo" alt="profilephoto" src={job.jobPhoto} /> */}
                        {/* <p className="name">{user.name}</p> */}
                        <p className="name">{job?.createdBy?.email}</p>
                    </div>
                    <div className="info">
                        <div className="country">
                            {/* <img className="countryimage" alt="" src={CountryFlag} /> */}
                            {/* <p className="countryname">{user.country}</p> */}
                        </div>
                        <div className="time">
                            <img className="timeicon" alt="time" src={Time} />
                            {/* <p className="timezone">TimeZone:{user.timezone}</p> */}
                        </div>
                        <div className="joined">
                            <img className="joinedicon" alt="" src={Joined} />
                            {/* <p className="joinedtime">{user.joined}</p> */}
                        </div>
                        <div className="recommendation">
                            <img className="recommendationimage" alt="" src={Recommendation} />
                            <p className="recommendationnumber">recommendation: 5</p>
                        </div>
                    </div>
                </div>
                <div className="middlesection">
                    <div className="nickname">
                        {/* <p>{job.jobTitle}</p> */}
                        <p>{job.title}</p>
                        {/* <p>{user.nickname}</p> */}
                    </div>
                    <div className="title_review">
                        <div className="review">
                            {/* <p>{user.avgRate}</p> */}
                            <p>(4 reviews)</p>
                        </div>
                    </div>
                    <div className="userstatistic">
                        <div className="stat">
                            <div className="job_complete">
                                <p className="n">5</p>
                                <p>projects Completed</p>
                            </div>
                        </div>
                    </div>
                    <div className="serviceinfo">
                        <p className="myoffers">
                            {/* {job.jobDescription} */}
                            {job.description}
                        </p>
                        <ul>
                            {/* {job.jobSkills.map((skill, idx) => { */}
                            {/* {job.Skills.map((skill, idx) => {
                                return (
                                    <li key={idx}>{skill}</li>
                                )
                            })} */}
                        </ul> 
                    </div>
                </div>
                <div className="rightsection">
                    <div className="upperbox">
                        <Link to={`/bidproposal/${id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <div className="hirebtn">
                                <span>bid On Job</span>
                            </div>
                        </Link>
                        <div className="boxinfo">
                            <span>Top Skills</span>
                            <div className="pboxinfo">
                                <ul>
                                    {/* {job.jobSkills.map((skill, idx) => { */}
                                    {job.skills.map((skill, idx) => {
                                        return (
                                            <li key={idx}>{skill}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <span>Category</span>
                            <div className="pboxinfo">
                                {/* <p>{job.jobCategory}</p> */}
                                <p>{job.category}</p>
                            </div>
                        </div>
                    </div>
                    <div className="lowerads">
                        <div className="imgads">
                            {/* {AdsPhotos} */}
                            <p>Ads/recommended</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="reviewssection">
                <span>Reviews</span>
                <div>
                    {/* {Reviews} */}
                </div>
            </div>
            <hr />
            <div className="reviewssection">
                <span>Proposals</span>
                <div>
                    {proposal? proposal.map((propose) => (<span key={propose._id}>{propose.description}</span>)):<span>No proposals</span>}
                </div>
            </div>
        </div>
    )
}