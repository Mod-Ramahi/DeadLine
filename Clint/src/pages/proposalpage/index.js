import React, { useEffect, useState } from "react";
import './ProposalPage.scss'
import DefaultImg from './defaultPhoto.jpg'
import { useNavigate, useParams } from "react-router-dom";
import { getProfileByCreator, getProposalById } from "../../api";

export function ProposalPage () {
    const {bidId} = useParams();
    const [propose, setPropose] = useState()
    const [profileRelated, setProfileRelated] = useState()
    const [creator, setCreator] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const getProposal = () => {
            getProposalById(bidId).then((proposal) => {
                setPropose(proposal)
                const profile = proposal.createdBy
                if(profile){
                    getProfileByCreator(profile).then((profileFound) => {
                        setProfileRelated(profileFound)
                    }).catch((error) => {
                        console.error('error', error)
                    })
                    getProfile(profile)
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        const getProfile = (profile) => {
            getProfileByCreator(profile).then((prof) => {
                const created = prof._id
                setCreator(created)                
            }).catch((error) => {
                console.error(error)
            })
        }
        getProposal()
    },[])
    const handleAccept = () => {
        //we here
    }
    return(
        <div className="proposal-container">
            <div className="user-profile">
                <div className="profile-image">
                    <img className="img" alt="" src={DefaultImg}/>
                </div>
                <div className="proname-price">
                    <span className="price-span">{propose?.price}$</span>
                    <span className="proname-span">{profileRelated?.proname}</span>
                    <hr className="soft-hr"/>
                    <div className="headline">
                        <span className="headline-span">{profileRelated?.headline}</span>
                    </div>
                </div>
            </div>
            <div className="proposal-div">
                <span className="summary-span">{propose?.summary}</span>
                <hr className="hr"/>
                <span className="description-span">{propose?.description}</span>
                <div className="time-div">
                    <span className="time-span">{propose?.time} days</span>
                    <span className="milestone-span">{propose?.milestone}</span>
                    <hr className="hr-white"/>
                    <span className="avg-review">User Avg. reviews</span>
                </div>
            </div>
            <hr className="soft-hr"/>
            <button className="go-profile" onClick={() => navigate(`/freelancer/${creator}`)}>Freelancer profile</button>
            <button className="go-profile" onClick={handleAccept}>Accept</button>
        </div>
    )
}