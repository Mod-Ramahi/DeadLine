import React, { useEffect, useState } from "react";
import "./BidOnJob.scss"
import { SettingsRequest, bidProposal, getPlanById, getUserById, postProposalRequest } from "../../api";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../utils/localStorge";
import * as Yup from 'yup'
import jwtDecode from "jwt-decode";

export default function BidOnJob() {
    const { id } = useParams()
    const [userFound, setUserFound] = useState()
    const [userWindow, setUserWindow] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [attached, setAttached] = useState()
    const [price, setPrice] = useState()
    const [time, setTime] = useState()
    const [milestone, setMilestone] = useState()
    const [plan, setPlan] = useState("public");
    const [seller, setSeller] = useState(false);
    const [userIn, setUserIn] = useState(false)
    const [userBidCounter, setUserBidCounter] = useState()
    const [userPrivateCoubter, setUserPrivateCounter] = useState()
    const [bidPromoted, setBidPromoted] = useState(false)
    const [bidVerified, setBidVerified] = useState(false)
    const [showPrivate, setShowPrivate] = useState(false)

    useEffect(() => {
        const checUser = () => {
            const token = getItem('token')
            const decodeToken = jwtDecode(token)
            const userId = decodeToken.id
            if (userId) {
                setUserIn(true)
                getUserById(userId).then((user) => {
                    setUserFound(user)
                    const userBids = user.bidCounter
                    const userPrivate = user.privateCounter
                    setUserBidCounter(userBids)
                    setUserPrivateCounter(userPrivate)
                    console.log('first userBids:', userBidCounter)
                    const type = user.userType
                    if (type === 'seller') {
                        setSeller(true)
                    } else {
                        setSeller(false)
                        setUserWindow(false)
                    }
                    if (!user.membershipID) {
                        navigate('/membership')
                    } else {
                        // checkPlan(user.membershipID)
                        const planId = user.membershipID
                        const checkPlan = (planId) => {
                            getPlanById(planId).then((plan) => {
                                const planBids = plan.bidsNumber
                                const planPrivate = plan.privateBids
                                const userBids = user.bidCounter
                                const planVerified = plan.proVerified
                                const planPromoted = plan.promoted
                                setBidVerified(planVerified)
                                setBidPromoted(planPromoted)
                                console.log('userBids:', userBids, 'planBids:', planBids, 'planVerified:', planVerified, 'planPromoted:', planPromoted)
                                if (userPrivateCoubter < planPrivate) {
                                    setShowPrivate(true)
                                }
                                if (userBidCounter >= planBids) {
                                    setUserWindow(false)
                                } else {
                                    setUserWindow(true)
                                }
                            }).catch((error) => {
                                console.error(error)
                                alert('something went wrong')
                                navigate('/userhome')
                            })
                        }
                        checkPlan(planId)
                    }
                }).catch((err) => {
                    console.error(err)
                    alert('something went wrong')
                })
            } else {
                setUserIn(false)
            }
        }
        checUser()
        // const checkPlan = (planId) => {
        //     getPlanById(planId).then((plan) => {
        //         // const userBids = userFound.bidCounter
        //         // setUserBidCounter(userBids)
        //         const planBids = plan.bidsNumber
        //         console.log('userBids:', userBidCounter, 'planBids:', planBids)
        //         if(userBidCounter >= planBids) {
        //             setUserWindow(false)
        //         }else{
        //             setUserWindow(true)  
        //         }
        //     }).catch((error) => {
        //         console.error(error)
        //         alert('something went wrong')
        //         navigate('/userhome')
        //     })
        // }
    }, [])
    const validationSchema = Yup.object().shape({
        summary: Yup.string().min(20, 'Proposal summary must be atleast 20 characters')
            .max(120, 'Proposal summary must not exceed 120 characters'),
        description: Yup.string().min(50, 'Proposal description mus be atleast 50 characters')
            .max(500, 'proposal must not exceed 500 charaters'),
        attached: Yup.mixed()
            .test('fileType', 'Invalid file format', (value) => {
                if (!value) return true;
                const supportedFomats = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
                return supportedFomats.includes(value.type);
            })
            .test('fileSize', 'File size is more than 3MB', (value) => {
                if (!value) return true;
                const maxSizeInBytes = 3 * 1024 * 1024;
                return value.size <= maxSizeInBytes;
            }),
        price: Yup.number().min(20, '20$ is the minimum price value ')
            .max(50000, 'price must not exceed 50000'),

    })
    const navigate = useNavigate()

    const handleSummary = (event) => {
        const summary = event.target.value;
        setSummary(summary);
        if (validationErrors.summary) {
            setValidationErrors((prevError) => ({
                ...prevError,
                summary: ''
            }))
        }
    }
    const handleDescription = (event) => {
        const description = event.target.value;
        setDescription(description)
        if (validationErrors.description) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                description: ''
            }))
        }
    }
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setAttached(file)
    };
    const handlePrice = (event) => {
        const price = event.target.value;
        setPrice(price)
    }
    const handleTime = (event) => {
        const time = event.target.value;
        setTime(time);
    }
    const handleMilestone = (event) => {
        const milestone = event.target.value;
        setMilestone(milestone)
    }
    const handlePrivate = () => {
        setPlan('private')
    }
    // const updateUser = async () => {
    //     try {
    //         const counter = userFound.bidCounter
    //         const data = counter
    //         const res = await SettingsRequest(data);
    //         console.log('counter: ', data, res)
    //         if (plan === 'private') {
    //             const response = await SettingsRequest(plan)
    //             console.log('private response', response)
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await validationSchema.validate(
                { summary, description, price },
                { abortEarly: false }
            );
            console.log('validation test')
            const data = {
                summary, description, price, time, milestone, plan, bidPromoted, bidVerified
            }
            const response = await bidProposal(data, id)
            console.log('resss res response :', response.status)
            if (response.status === 200) {
                console.log('yes response recieved is 200')
                const counterBid = userFound.bidCounter
                const data = { counterBid }
                const afterBid = async () => {
                    try {
                        if (plan === 'private') {
                            const data = { plan }
                            const res = await SettingsRequest(data)
                            if (res.status === 200) {
                                console.log('private counter updated', res)
                                navigate('/userhome')
                            } else {
                                console.log('cannot update the private counter')
                                // alert('something went wrong with your private bid')
                            }
                        }
                        const counter = 1
                        const data = { counter }
                        const response = await SettingsRequest(data)
                        if (response.status === 200) {
                            console.log('proposals counter updated', response)
                            navigate('/userhome')
                        } else {
                            console.log('cannot update the proposals counter')
                            // alert('something went wrong with your proposals')
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
                afterBid()
                // SettingsRequest(data).then((res) => {
                //     console.log('counter: ', data, res)
                //     if (plan === 'private') {
                //         const data = {plan}
                //         SettingsRequest(data).then((response) => {
                //             console.log('private response', response)
                //         }).catch((error) => {
                //             console.error(error)
                //         })

                //     }
                //     console.log('success bid')
                //     navigate('/userhome')
                // }).catch((error) => {
                //     console.error(error)
                // });
            } else {
                alert('something went wrongg')
            }
            console.log(response)
        } catch (error) {
            if (error.name === 'ValidationError') {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message
                });
                setValidationErrors(validationErrors)
            } else {
                console.error(error)
                alert('something wen wrong')
            }
        }
    }

    return (
        <>
            {userWindow ?
                (
                    <form onSubmit={handleSubmit} className="bid">
                        <span className="title">Bid On Job</span>
                        <div className="text-description">
                            <span>Proposal summary:</span>
                            <div className="handle-input">
                                <textarea className="description-area" maxLength={120} placeholder="Short discription. . .(characters: min=20 max=120)" onChange={handleSummary} />
                                {validationErrors.summary && <span className="error">{validationErrors.summary}</span>}
                            </div>
                        </div>
                        <hr className="hr" />
                        <div className="text-description">
                            <span>Proposal Description</span>
                            <div className="handle-input">
                                <textarea className="description-area" maxLength={500} placeholder="description . . .(characters: min=50 max=500)" onChange={handleDescription} />
                                {validationErrors.description && <span className="error">{validationErrors.description}</span>}
                            </div>
                        </div>
                        <hr className="hr" />
                        <div className="text-description">
                            <span>File Attachment</span>
                            <div className="handle-input">
                                <input type="file" id="attach" accept=".jpg, .png, .pdf" onChange={handleFileUpload} />

                                {validationErrors.attached && <span className="errors">{validationErrors.attached}</span>}
                            </div>
                        </div>
                        <hr className="hr-break" />
                        <div className="text-description div-price">
                            <span>Bid Price $</span>
                            <div className="handle-input">
                                <input type="number" id="price" min={20} max={50000} placeholder="min= 20$" onChange={handlePrice} />
                                {validationErrors.price && <span className="error">{validationErrors.price}</span>}
                            </div>
                        </div>
                        <hr className="hr" />
                        <div className="text-description">
                            <span> Expected delivery Time in days </span>
                            <input type="number" className="input" id="time" placeholder="ex: 30 days" onChange={handleTime} />
                        </div>
                        <hr className="hr" />
                        <div className="text-description">
                            <span>Add milestone or price and delivery time details if needed</span>
                            <input type="text" className="input" id="milestone" placeholder="ex: task, price, time and more details if needed" onChange={handleMilestone} />
                        </div>
                        <hr className="hr" />
                        {showPrivate ?
                            (
                                <div className="text-description">
                                    <span> Choose plan</span>
                                    <div className="private-button">
                                        <span>you can make this bid as a private bid. only 'the job owner / company' can see your proposal details</span>
                                    </div>
                                    <select className="select" id="proposalplan" onChange={handlePrivate}>
                                        <option value="public">Basic/Public</option>
                                        <option value="private">private</option>
                                    </select>
                                </div>
                            )
                            :
                            (
                                <div className="text-description">
                                    <div className="private-button">
                                        <span>You can bid as a public proposal. Your membership private bids are exceeded / not available</span>
                                    </div>
                                </div>
                            )

                        }
                        <div className="save">
                            <div className="handle-input">
                                {!userIn ?
                                    (
                                        <div className="not-user">
                                            <span className="not-user-span"> You Need to Sign In</span>
                                        </div>
                                    )
                                    :
                                    (
                                        <>
                                            {seller ?
                                                (
                                                    <>

                                                        <button className="submit" type="submit">Submit</button>
                                                        {validationErrors && (<ul>
                                                            {Object.keys(validationErrors).map((errorName, idx) => (
                                                                <li key={idx} className="errors">
                                                                    {validationErrors[errorName]}
                                                                </li>
                                                            ))}</ul>
                                                        )}
                                                    </>
                                                )
                                                :
                                                (
                                                    <div className="not-user">
                                                        <span className="not-user-span"> Only Freelancers and sellers can bid on job. You can change your type from settings</span>
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    </form>
                )
                :
                (!seller ?
                    (
                        <div className="user-window">
                            <div className="window-content">
                                <span>Only Freelancers and sellers can bid on job.</span>
                                <span>You can change your type from settings</span>
                                <button className="window-button" onClick={() => navigate('/settings')}>settings</button>
                            </div>
                        </div>
                    ) :
                    (
                        <div className="user-window">
                            <div className="window-content">
                                <span>You have reached the limit for proposals</span>
                                <span>Please check our membership plans to renew your subscription</span>
                                <button className="window-button" onClick={() => navigate('/membership')}>Check our plans</button>
                            </div>
                        </div>
                    )

                )
            }
        </>

    )

}