import React, { useEffect, useState } from "react";
import { getItem } from "../../utils/localStorge";
import jwtDecode from "jwt-decode";
import { SettingsRequest, getUserById } from "../../api";
import { useNavigate } from "react-router-dom";

const PlanCard = ({ p, duration }) => {
    const [user, setUser] = useState()
    const [planId, setPlanId] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const userInfo = async () => {
            try {
                const token = await getItem('token')
                const decodedToken = jwtDecode(token)
                const userId = decodedToken.id;
                if (userId) {
                    const findUser = await getUserById(userId);
                    setUser(findUser)
                    setPlanId(p._id)

                } else {
                    console.log('there is no signed in user')
                }
            } catch (error) {
                console.error(error)
            }
        }
        userInfo()
    }, [])
    const handleSubscribeClicked = async () => {
        try {
            if (user) {
                const currentDate = new Date();
                const futureDate = new Date(currentDate)
                const userBalance = user.balance;
                const controlBalance = async (planPrice) => {
                    try {
                        const data = { planPrice }
                        const res = await SettingsRequest(data)
                        if (res.status === 200) {
                            console.log('success and navigate to home page')
                            navigate('/userhome')
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
                if (p.name !== 'Free trial') {
                    if (userBalance > p.price + 1) {
                        if (duration === 'Month') {
                            futureDate.setMonth(currentDate.getMonth() + 1)
                            const data = { planId, futureDate: futureDate.toISOString() }
                            const response = await SettingsRequest(data)
                            if (response.status === 200) {
                                console.log('future:', p.name)
                                console.log('test', user.membershipID)
                                controlBalance(p.price)
                            }
                            console.log(response)
                            navigate(-1)
                        } else {
                            futureDate.setFullYear(currentDate.getFullYear() + 1)
                            const data = { planId, futureDate }
                            const response = await SettingsRequest(data)
                            if (response.status === 200) {
                                console.log('future:', p.name)
                                console.log('test', user.membershipID)
                                controlBalance(p.price)
                            }
                            console.log(response)
                            navigate(-1)
                        }
                    } else {
                        navigate('/payment')
                    }
                } else {
                    futureDate.setMonth(currentDate.getMonth() + 1)
                    const data = { planId, futureDate: futureDate.toISOString() }
                    const response = await SettingsRequest(data)
                    if (response.status === 200) {
                        console.log('future:', p.name)
                        console.log('test', user.membershipID)
                        controlBalance(p.price)
                    }
                    console.log(response)
                    console.log('its free plan')
                    navigate(-3)
                }

            } else {
                navigate('/signin')
            }

        } catch (error) {
            console.error(error)
            alert('something went wrong')
        }

    }
    return (
        <div className="plan">
            <div className="plan-box">
                <div className="plan-name">
                    <span>{p.name}</span>
                </div>
                <div className="price">
                    <span>{p.price}$</span>
                    <span className="per">/{duration}</span>
                </div>
                <div className="subscribe">
                    <button onClick={handleSubscribeClicked}>Subscribe</button>
                </div>
                <div className="features">
                    <p>* Bids/Proposals: {p.bidsNumber}</p>
                    <p>* Skills: {p.skillsNumber}</p>
                    <p>* Private bids: {p.privateBids}</p>
                    <p>* following: {p.following}</p>
                    <p>* Profile promoted: {p.promoted ? 'Yes' : 'No'}</p>
                    <p>* Verified as Pro: {p.proVerified ? 'Yes' : 'No'}</p>

                </div>
            </div>
        </div>
    )
}
export default PlanCard;