import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Joined from './Joined.png'
import Time from './Time.png'
import Recommendation from './Recommendation.png'
import { getItem } from "../../utils/localStorge";
import jwtDecode from "jwt-decode";
import { getProfileByCreator } from "../../api";
import UserProfile from "../freelancer/UserProfile";

export default function MyUserProfile() {
    const [myProfile, setMyProfile] = useState()
    const [newProfile, setNewProfile] = useState(false)
    const [signedIn, setSignedIn] = useState(false)
    const [user, setUser] = useState()
    useEffect(() => {
        const checkProfile = () => {
            const token = getItem('token')
            if(token){
                const tokenDecode = jwtDecode(token)
                const tokenId = tokenDecode.id;
                console.log("token: ",tokenId)
                setUser(tokenId)
                setSignedIn(true)
                getProfileByCreator(tokenId).then((UserProfile) => {
                    const profileFound= UserProfile.createdBy;
                    console.log('userProfileeee:', profileFound)
                    if(profileFound){
                        console.log(profileFound)
                        setMyProfile(UserProfile);
                    }else{
                        setMyProfile(null)
                        setNewProfile(true)
                    }
                }).catch((error) => {
                    console.error(error)
                })
                console.log("profile: ", myProfile, "user: ", user)
            }else{
                setMyProfile(null)
                setNewProfile(false)
                setSignedIn(false)
            }
            console.log("profile: ", myProfile, "user: ", user)
        }
        checkProfile()
    },[])
    return (
        <div className="userprofile">
            <div className="uppersection" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <span className="upper"> My Profile </span>
                <Link to='/profileedit' style={{ color: 'inherit', textDecoration: 'none' }}>
                    <button>Edit</button>
                </Link>
            </div>
            <UserProfile user={myProfile}/>
            {/* <div className="lowersection">
                <div className="leftsection">
                    <div className="profilephoto">
                        <img alt="profilephoto" src={user.profilephoto} />
                        <p className="name">{user.name}</p>
                    </div>
                    <div className="info">
                        <div className="country">
                            <p className="countryname">{user.country}</p>
                        </div>
                        <div className="time">
                            <img className="timeicon" alt="time" src={Time} />
                            <p className="timezone">TimeZone:{user.timezone}</p>
                        </div>
                        <div className="joined">
                            <img className="joinedicon" alt="" src={Joined} />
                            <p className="joinedtime">{user.joined}</p>
                        </div>
                        <div className="recommendation">
                            <img className="recommendationimage" alt="" src={Recommendation} />
                            <p className="recommendationnumber">recommendation: 5</p>
                        </div>
                    </div>
                </div>
                <div className="middlesection">
                    <div className="nickname">
                        <p>{user.name}</p>
                        <p>{user.nickname}</p>
                    </div>
                    <div className="title_review">
                        <p>{user.headline}</p>
                        <div className="review">
                            <p>{user.avgRate}</p>
                            <p>(4 reviews)</p>
                        </div>
                    </div>
                    <div className="userstatistic">
                        <div className="stat">
                            <div className="job_complete">
                                <p className="n">5</p>
                                <p>Jobs Completed</p>
                            </div>
                            <div className="job_complete">
                                <p className="n">100%</p>
                                <p>On Budget</p>
                            </div>
                        </div>
                        <div className="stat">
                            <div className="job_complete">
                                <p className="n">100%</p>
                                <p>On Time</p>
                            </div>
                        </div>
                    </div>
                    <div className="serviceinfo">
                        <p className="aboutme">
                            {user.maininfo}
                        </p>
                        <p className="myoffers">
                            {user.servicesinfo}
                        </p>
                        <ul>
                            {user.skills.map((skill, idx) => {
                                return (
                                    <li key={idx}>{skill}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="rightsection">
                    <div className="upperbox">
                        <div className="hirebtn">
                            <span>Hire</span>
                        </div>
                        <div className="boxinfo">
                            <span>Top Skills</span>
                            <div className="pboxinfo">
                                <ul>
                                    {user.topSkills.map((topskill, idx) => {
                                        return (
                                            <li key={idx}>{topskill}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <span>Category</span>
                            <div className="pboxinfo">
                                <p>{user.category}</p>
                            </div>
                            <span>My expertise</span>
                            <div className="pboxinfo">
                                <ul>
                                    {user.experties.map((expert, idx) => {
                                        return (
                                            <li key={idx}>{expert}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <span>Clients:</span>
                            <div className="pboxinfo">
                                <p>5</p>
                            </div>
                        </div>
                    </div>
                    <div className="lowerads">
                        <div className="imgads">
                            <p>Ads/recommended</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="userprojects">
                <hr />
                <div className="userprojectsimage">
                    <img alt="portfolio" src='../images/assetb' />
                    <img alt="portfolio" src='../images/assetb' />
                    <img alt="portfolio" src='../images/assetb' />
                    <img alt="portfolio" src='../images/assetb' />
                </div>
                <hr />
            </div>
            <div className="reviewssection">
                <span>Reviews</span>
                <div>
                </div>
            </div> */}
        </div>
    )
}