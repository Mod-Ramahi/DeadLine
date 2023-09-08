import React, { useEffect, useState } from "react";
import Joined from './Joined.png'
import Time from './Time.png'
import Recommendation from './Recommendation.png'
import { Users } from "../../data/Users";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getItem } from "../../utils/localStorge";
import jwt_decode from 'jwt-decode'
import { getUserById } from "../../api";
import defaultImage from './Icn1.png'

export default function JobProfile({ job }) {
    const [jobUser, setJobUser] = useState()
    const {id}= useParams()
    useEffect(() => {
        // const createdby =id.createdBy
        const userIdd = job.createdBy;
        console.log("user:",userIdd)
        if (userIdd) {
            getUserById(userIdd).then((user) => {
                const jobEmployer = user;
                setJobUser(jobEmployer)
                console.log("user:",userIdd,'jobuser:',jobUser)
            }).catch((error) => {
                console.log('error', error)
            })
        }
        
    }, [])

    return (
        <div className="userprofile">
            <div className="uppersection">
                <span className="upper"> Project </span>
            </div>
            <div className="lowersection">
                <div className="leftsection">
                    <div className="profilephoto">
                        <img className="photo" alt="profilephoto" src={defaultImage} />
                        {/* <p className="name">{user.name}</p> */}
                        <span className="name">{jobUser? jobUser?.name : "avcc"}</span>
                    </div>
                    <hr />
                    <div className="info">
                        <div className="country">
                            {/* <img className="countryimage" alt="" src={CountryFlag} /> */}
                            <span className="countryname">Country</span>
                        </div>
                        <div className="time">
                            <img className="timeicon" alt="time" src={Time} />
                            <span className="timezone">TimeZone:{jobUser?jobUser.timezone : "a"}</span>
                        </div>
                        <div className="joined">
                            <img className="joinedicon" alt="" src={Joined} />
                            <span className="joinedtime">{jobUser?jobUser?.joined : ""}</span>
                        </div>
                        <div className="recommendation">
                            <img className="recommendationimage" alt="" src={Recommendation} />
                            <span className="recommendationnumber">recommendation: 5</span>
                        </div>
                    </div>
                </div>
                <div className="middlesection">
                    <div className="nickname">
                        {/* <p>{job.jobTitle}</p> */}
                        <span>{job.title}</span>
                        <span className="budget">Budget: {job.salary}$ /{job.paymentMethod}</span>
                        {/* <p>{user.nickname}</p> */}
                    </div>
                    <div className="title_review">
                        <div className="review">
                            {/* <p>{user.avgRate}</p> */}
                            <span>(4 reviews)</span>
                        </div>
                    </div>
                    <hr />
                    <div className="userstatistic">
                        <div className="stat">
                            <div className="job_complete">
                                <span className="n">5</span>
                                <span className="span">projects Completed</span>
                            </div>
                            <div className="job_complete">
                                <span className="n">100%</span>
                                <span className="span">On Budget</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="serviceinfo">
                        <span className="myoffers">
                            {/* {job.jobDescription} */}
                            {job.shortDescription}
                        </span>
                        <span className="myoffers2">
                            {/* {job.jobDescription} */}
                            {job.description}
                        </span>

                    </div>
                </div>
                <div className="rightsection">
                    <div className="upperbox">
                        <Link to={`/bidproposal/${job.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <div className="hirebtn">
                                <span>bid On Job</span>
                            </div>
                        </Link>
                        <div className="boxinfo">
                            <span>Top Skills:</span>
                            <div className="pboxinfo">
                                <ul className="maincateg">
                                    {job.Skills.map((skill, idx) => (
                                        <li  key={idx}>{skill}</li>
                                    ))
                                    }
                                </ul>
                            </div>
                            <span>Category:</span>
                            <div className="pboxinfo">
                                {/* <p>{job.jobCategory}</p> */}
                                <span className="maincateg">{job.category}</span>
                                <span className="subcategspan">sub categ{job.subCateg}</span>
                            </div>
                        </div>
                    </div>
                    <div className="lowerads">
                        <div className="imgads">
                            {/* {AdsPhotos} */}
                            <span>Ads/recommended</span>
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
                    <span>proposals here</span>
                </div>
            </div>
        </div>
    )
}