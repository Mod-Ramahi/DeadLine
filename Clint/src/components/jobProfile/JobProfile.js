import React, { useEffect, useState } from "react";
import Joined from './Joined.png'
import Time from './Time.png'
import Recommendation from './Recommendation.png'
import { Users } from "../../data/Users";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getItem } from "../../utils/localStorge";
import jwt_decode from 'jwt-decode'
import { getProfileByCreator, getProposalByJobId, getUserById } from "../../api";
import defaultImage from './Icn1.png'
import DefaultPhoto from './defaultPhoto.jpg'
import Proposal from "../proposal/Proposal";
import jwtDecode from "jwt-decode";

export default function JobProfile({ job }) {
    const [jobUser, setJobUser] = useState()
    const [bid, setBid] = useState([]);
    const [userSigned, setUserSigned] = useState(false);
    const [isUserType, setIsUserType] = useState(false);
    const [isProfile, setIsProfile] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        // const createdby =id.createdBy
        const token = getItem('token')
        if (token) {
            const decodeToken = jwtDecode(token);
            const userId = decodeToken.id;
            
            setUserSigned(true)
            getUserById(userId).then((user) => {
                const typeUser = user.userType
                console.log('tytytytytytytpe:', typeUser, userId)
                if (typeUser === 'seller') {
                    setIsUserType(true)
                    getProfile(userId)
                } else {
                    setIsUserType(false);
                }
                
            })
        } else {
            setUserSigned(false)
            setIsUserType(false)
        }

        const getProfile = async (userId) => {
            try{
                const response = await getProfileByCreator(userId)
                if(response.status === 400 || !response){
                    console.log('no profile')
                    setIsProfile(false)
                }
                if (response.status === 200 || response.length !== 0){
                    console.log('200200200200200200200200')
                    setIsProfile(true)
                }
                console.log('elseseseses', userId)
            }catch(error){
                console.error(error)
            }
            // }
            // getProfileByCreator(userId).then((profile) => {
            //     if(!profile){
            //         setIsProfile(false)
            //     }else{
            //         setIsProfile(true)
            //     }
            // }).catch((err) => {
            //     console.error(err)
            // })
        }
        const jobProfile = () => {
            const userIdd = job.createdBy;
            console.log("user:", userIdd)
            if (userIdd) {
                getUserById(userIdd).then((user) => {
                    const jobEmployer = user;
                    setJobUser(jobEmployer)
                    console.log("user:", userIdd, 'jobuser:', jobUser)
                    jobProposal()
                }).catch((error) => {
                    console.log('error', error)
                })
            }
        }
        jobProfile()
        const jobProposal = () => {
            const jobIdd = job._id;
            console.log('jobIdd:', jobIdd)
            if (jobIdd) {
                getProposalByJobId(jobIdd).then((bids) => {
                    setBid(bids)
                    console.log("bids", { bids })
                }).catch((err) => {
                    console.error(err)
                })
            } else {
                console.log('no proposals for this job')
            }
        }
    }, [])

    const proposalsMap = bid.map((bidFound) => (
        <Link to={`/proposalPage/${bidFound._id}`} style={{ color: 'inherit', textDecoration: 'none' }} key={bidFound._id}>
            <Proposal bid={bidFound} />
        </Link>

    ))
    return (
        <div className="userprofile">
            <div className="uppersection">
                <span className="upper"> Project </span>
            </div>
            <div className="lowersection">
                <div className="leftsection">
                    <div className="profilephoto">
                        <img className="photo" alt="profilephoto" src={DefaultPhoto} />
                        {/* <p className="name">{user.name}</p> */}
                        <span className="name">{jobUser ? jobUser?.name : "avcc"}</span>
                    </div>
                    <hr />
                    <div className="info">
                        <div className="country">
                            {/* <img className="countryimage" alt="" src={CountryFlag} /> */}
                            <span className="countryname">Country</span>
                        </div>
                        <div className="time">
                            <img className="timeicon" alt="time" src={Time} />
                            <span className="timezone">TimeZone:{jobUser ? jobUser.timezone : "a"}</span>
                        </div>
                        <div className="joined">
                            <img className="joinedicon" alt="" src={Joined} />
                            <span className="joinedtime">{jobUser ? jobUser?.joined : ""}</span>
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
                        <hr />
                        <span className="maincateg">{job.category}</span>
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
                        {userSigned ?
                            (
                                <>
                                    {isUserType && isProfile ?
                                        (
                                            <Link to={`/bidproposal/${job._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                <div className="hirebtn">
                                                    <span>bid On Job</span>
                                                </div>
                                            </Link>

                                        )
                                        :
                                        (
                                            <Link to={'/myprofile'} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                <div className="hirebtn">
                                                    <span>Only freelancers with profile can bid. go to profile</span>
                                                </div>
                                            </Link>
                                        )

                                    }
                                </>


                            )
                            :
                            (
                                <Link to={'/signin'} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <div className="hirebtn">
                                        <span>sign in to bid on job</span>
                                    </div>
                                </Link>
                            )

                        }

                        <div className="boxinfo">
                            <span>Top Skills:</span>
                            <div className="pboxinfo">
                                <ul className="maincateg">
                                    {job.Skills.map((skill, idx) => (
                                        <li key={idx}>{skill}</li>
                                    ))
                                    }
                                </ul>
                            </div>
                            <div className="pboxinfo">
                                {/* <p>{job.jobCategory}</p> */}
                                <span className="subcategspan">{job.jobSubCateg}</span>
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
            <div className="proposals-section">
                <span className="proposal-span">Proposals</span>
                <div className="proposals">
                    {proposalsMap}
                </div>
            </div>
            <hr />
            <div className="reviewssection">
                <span>Reviews</span>
                <div>
                    {/* {Reviews} */}
                </div>
            </div>
        </div >
    )
}