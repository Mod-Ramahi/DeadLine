import React, { useEffect, useState } from "react";
import './MyProfile.scss'
import MyUserProfile from "../../components/myuserprofile/MyUserProfile";
import { Users } from "../../data/Users";
import { getItem } from "../../utils/localStorge";
import jwt_decode from "jwt-decode";
import { getProfileByCreator, getUserById } from "../../api";
import { useNavigate } from "react-router-dom";
import UserProfile from "../../components/freelancer/UserProfile";


export default function MyProfile() {
    const [businessType, setBusinesstype] = useState('')
    const [notSignedIn, setNotSignedIn] = useState(true)
    const [seller, setSeller] = useState(false)
    const [myProfile, setMyProfile] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        const typeCheck = (() => {
            const token = getItem('token');
            if (token) {
                const tokenDecode = jwt_decode(token)
                const user = tokenDecode.id;
                setNotSignedIn(false);
                getUserById(user).then((foundUser) => {
                    const type = foundUser.userType;
                    setBusinesstype(type);
                    // setUser(foundUser)
                    if (type === 'seller') {
                        setSeller(true)
                    } else {
                        setSeller(false)
                    }
                }).catch((error) => {
                    console.error('error', error)
                });
                getProfile(user)
                // getProfileByCreator(user).then((freelaner) => {
                //     const profile = freelaner;
                //     if (profile) {
                //         setMyProfile(profile);
                //         console.log('profilllll:', profile)
                //     } else {
                //         setMyProfile(null)
                //         console.log('no profile yet')
                //     }
                // })
            }
        })
        const getProfile = async (id) => {
                    try {
                        const response = await getProfileByCreator(id)
                        if(!response || response.status === 404){
                            return setMyProfile(null)
                        }
                        if(response.status === 200 || response.length !==0){
                            setMyProfile(response)
                        }
                    }catch (error) {
                        console.error(error)
                    }
                }
        typeCheck()
    }, [])
    return (
        <>
            {seller || businessType === 'seller' ?
                (myProfile ?
                    (
                        <div className="column">
                            <div className="new-profile-container">
                                <div className="new-profile">
                                    <span className="new-profile-title">My Profile</span>
                                    <hr />
                                    <span className="new-profile-span">You already have a profile.</span>
                                    <span className="new-profile-span">You can edit your Profile/Service.</span>
                                    <button className="new-profile-add" onClick={() => navigate('/profileedit')}>Edit Profile</button>
                                </div>
                            </div>
                            < UserProfile user={myProfile}/>
                        </div>
                    )
                    :
                    (
                        <div className="new-profile-container margin-bottom">
                            <div className="new-profile">
                                <span className="new-profile-title">My Profile</span>
                                <hr />
                                <span className="new-profile-span">You do not have a profile yet.</span>
                                <span className="new-profile-span">Add a profile to share your Service so the companies can reach you. And you will be able to bid on jobs</span>
                                <button className="new-profile-add" onClick={() => navigate('/profileedit')}>Add new Profile</button>
                            </div>
                        </div>
                    )
                )
                :
                (
                    <div className="not-seller">
                        <div className="not-seller-box">
                            <span className="not-seller-span" >If you want to publish a profile(service) as a freelanser? You need to be registered as a freelancer.</span>
                            <span className="not-seller-span" >You can always change your business type from the settings.</span>
                            <button className="not-seller-button" onClick={notSignedIn ? () => navigate('/home') : () => navigate('/userhome')}>Ok</button>
                        </div>
                    </div>
                )
            }
        </>

    )
}