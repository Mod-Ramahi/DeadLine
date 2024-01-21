import React, { useEffect, useState } from "react";
import { getItem } from "../../utils/localStorge";
import jwtDecode from "jwt-decode";
import { getPlanById, getUserById } from "../../api";
import './PlanState.scss'

export default function PlanState() {
    const [userMembership, setUserMembership] = useState()
    const [userBids, setUserBids] = useState()
    const [userPrivate, setUserPrivate] = useState()
    const [userFollow, setUserFollow] = useState()
    const [userEndDate, setUserEndDate] = useState()
    const [planName, setPlanName] = useState()
    const [planSkills, setPlanSkills] = useState()
    const [planBids, setPlanBids] = useState()
    const [planPrivate, setPlanPrivate] = useState()
    const [planFollow, setPlanFollow] = useState()
    const [planPromoted, setPlanPromoted] = useState()
    const [isBuyer, setIsBuyer] = useState()


    useEffect(() => {
        const token = getItem('token')
        const decodeToken = jwtDecode(token)
        const userID = decodeToken.id
        getUserById(userID).then((user) => {
            const userType = user.userType
            if (user.membershipID && userType === 'seller') {
                setIsBuyer(false)
                setUserMembership(user.membershipID)
                setUserBids(user.bidCounter)
                setUserPrivate(user.privateCounter)
                setUserFollow(user.followingCounter)
                setUserEndDate(user.endDate)
                getPlanById(user.membershipID).then((plan) => {
                    setPlanName(plan.name)
                    setPlanSkills(plan.skillsNumber)
                    setPlanBids(plan.bidsNumber)
                    setPlanPrivate(plan.privateBids)
                    setPlanFollow(plan.following)
                    setPlanPromoted(plan.promoted)
                }).catch((err) => {
                    console.error(err)
                })
            } else {
                setIsBuyer(true)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    return (
        <div className="plans-states">
            {isBuyer ?
                (<div className="states-box">
                    <div className="box-row">
                        <span className="title-span">You must be a freelancer and subscribed user to see the plan stats. you can change to a freelancer yser from settings</span>
                    </div>
                </div>
                )
                :
                (
                    <div className="states-box">
                        <div className="box-row">
                            <span className="title-span">Your current plan:</span>
                            <span className="value-span">{planName}</span>
                        </div>
                        <div className="box-row">
                            <span className="title-span">Number of bids:</span>
                            <span className="value-span">used: {userBids} / from : {planBids}</span>
                        </div>
                        <div className="box-row">
                            <span className="title-span">private bids:</span>
                            <span className="value-span"> used: {userPrivate} / from: {planPrivate}</span>
                        </div>
                        <div className="box-row">
                            <span className="title-span">Following:</span>
                            <span className="value-span"> you follow:{userFollow} / from: {planFollow}</span>
                        </div>
                        <div className="box-row">
                            <span className="title-span">Subscription end date:</span>
                            <span className="value-span">{userEndDate}</span>
                        </div>
                        <div className="box-row">
                            <span className="title-span">promote feature allow you to appear as a recommended freelancer</span>
                            <span className="value-span">your current plan : {planPromoted ? 'promoted' : 'your plan dont support promote'}</span>
                        </div>
                        <div className="box-row">
                            <span className="title-span">Plan skills allowed in you profile:</span>
                            <span className="value-span">{planSkills} / you can check your freelancer profile</span>
                        </div>
                    </div>
                )
            }

        </div>
    )
}