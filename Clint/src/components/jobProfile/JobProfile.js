import React, { useEffect, useState } from "react";
import Joined from './Joined.png'
import Time from './Time.png'
import Recommendation from './Recommendation.png'
import { Users } from "../../data/Users";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getItem } from "../../utils/localStorge";
import jwt_decode from 'jwt-decode'
import { SettingsRequest, getPlanById, getProfileByCreator, getProposalByJobId, getUserById } from "../../api";
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
    const [companyId, setCompanyId] = useState()
    const [folloNumber, setFollowNumber] = useState()
    const [noMembership, setNoMemberShip] = useState()
    const [followCounter, setFollowCounter] = useState()
    const [userFollow, setUserFollow] = useState([])
    const [membershipError, setMembershipError] = useState(false)
    const [followExceedError, setFollowExceedError] = useState(false)
    const [followedError, setFollowedError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        // const createdby =id.createdBy
        const token = getItem('token')
        if (token) {
            const decodeToken = jwtDecode(token);
            const userId = decodeToken.id;

            setUserSigned(true)
            getUserById(userId).then((user) => {
                if (user.membershipID) {
                    getPlanById(user.membershipID).then((plan) => {
                        const planFollow = plan.following
                        setFollowNumber(planFollow)
                        setNoMemberShip(false)
                    }).catch((error) => {
                        console.error(error)
                    })
                } else {
                    setNoMemberShip(true)
                }
                const userFollowings = user.following
                const followUsed = user.followingCounter
                setFollowCounter(followUsed)
                setUserFollow(userFollowings)
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
            try {
                const response = await getProfileByCreator(userId)
                if (response.status === 400 || !response) {
                    console.log('no profile')
                    setIsProfile(false)
                }
                if (response.status === 200 || response.length !== 0) {
                    console.log('200200200200200200200200')
                    setIsProfile(true)
                }
                console.log('elseseseses', userId)
            } catch (error) {
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
                    setCompanyId(user._id)
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
    const handleFollow = () => {
        if (!noMembership) {
            setMembershipError(false)
            const isFollowed = userFollow.includes(companyId)
            if (!isFollowed) {
                setFollowedError(false)
                if (folloNumber > followCounter) {
                    setFollowExceedError(false)
                    const data = { companyId }
                    SettingsRequest(data).then((res) => {
                        console.log(res)
                    }).catch((error) => {
                        console.error(error)
                    })
                    console.log('user followings:', userFollow)
                } else {
                    console.log('follow number exceeded')
                    setFollowExceedError(true)
                    setErrorMessage('You have reached the maximum following number in your membership plan')
                }
            } else {
                console.log('already followed')
                setFollowedError(true)
                setErrorMessage('You already following this company')
            }
        } else {
            console.log('no membership')
            setMembershipError(true)
            setErrorMessage('You need to subscribe to our membership plans to be able to follow')
        }

        console.log('company id:', companyId, 'follow number:', folloNumber, 'follow counter:', followCounter,)
    }
    const handleFollowError = () => {
        setFollowExceedError(false)
        setFollowedError(false)
        setMembershipError(false)
        setErrorMessage('')
    }

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
            {followExceedError || membershipError || followedError ?
                (
                    <div className="follow-error">
                        <span>{errorMessage}</span>
                        <button className="follow-error-button" onClick={handleFollowError}>Ok</button>
                        <button className="follow-error-button" onClick={() => navigate('/membership')}>Membership options</button>
                    </div>
                )
                :
                (
                    <>
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
                                                    (<>
                                                        <Link to={`/bidproposal/${job._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                            <div className="hirebtn">
                                                                <span>bid On Job</span>
                                                            </div>
                                                        </Link>
                                                        <span className="follow-span">follow to get notify when this company post a new job</span>
                                                        <button className="follow-button" onClick={handleFollow}>Follow the buyer</button>
                                                    </>
                                                    )
                                                    :
                                                    (
                                                        <Link to={'/myprofile'} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                            <div className="hirebtn">
                                                                <span>Only freelancers with profile can bid or follow. go to profile</span>
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
                                                {job?.Skills.map((skill, idx) => (
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
                        <hr className="job-page-hr" />
                        <div className="proposals-section">
                            <span className="proposal-span">Proposals</span>
                            <div className="proposals">
                                {proposalsMap}
                            </div>
                        </div>
                        <hr className="job-page-hr" />
                        <div className="reviewssection">
                            <span>Reviews</span>
                            <div>
                                {/* {Reviews} */}
                            </div>
                        </div>
                    </>
                )

            }

        </div >
    )
}