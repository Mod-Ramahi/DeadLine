import React, { useEffect, useState } from "react";
import { editPlan } from "../../api";
import { useNavigate } from "react-router-dom";

const Plan = ({ plan }) => {
    const [edit, setEdit] = useState(false)
    const [price, setPrice] = useState(0)
    const [skillsNumber, setSkillsNumber] = useState(0)
    const [bidsNumber, setBidsNumber] = useState(0)
    const [privateBids, setPrivateBids] = useState(0)
    const [following, setFollowing] = useState(0)
    const [promoted, setPromoted] = useState(false)
    const [proVerified, setProVerified] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        if(plan){
            setPrice(plan.price)
            setSkillsNumber(plan.skillsNumber)
            setBidsNumber(plan.bidsNumber)
            setPrivateBids(plan.privateBids)
            setFollowing(plan.following)
            setPromoted(plan.promoted)
            setProVerified(plan.proVerified)
        }
    },[plan])

    const handleSaveEdits = async () => {
        try {
            const id= plan._id;
            const data = { price, skillsNumber, bidsNumber, privateBids, following, promoted, proVerified }
            const response = await editPlan(data, id)
            console.log(response)
            if(response.status === 200){
                console.log('plan been edited:', response)
                navigate('/administration/home')
            }

        } catch(error){
            console.error(error)
        }
        setEdit(false)
    }

    return (
        <div className="plan-div">
            <div className="plan-box">
                <span className="span planname">Plan name: {plan?.name}</span>
                <span className="span">Price: {plan?.price}</span>
                <span className="span">Skills allowed: {plan?.skillsNumber}</span>
                <span className="span">Number of bids: {plan?.bidsNumber}</span>
                <span className="span">Number of private bids: {plan?.privateBids}</span>
                <span className="span">Number of follow: {plan?.following}</span>
                <span className="span">Is promoted: {plan?.promoted? 'Yes' : 'No'}</span>
                <span className="span">Is pro verified: {plan?.proVerified? 'Yes' : 'No'}</span>
            </div>
            <div className="plan-edit">
                <button onClick={() => setEdit(true)} className="edit-button">Edit This Plan</button>
                {edit &&
                    <div className="edit-box">
                        <div className="edit-div">
                            <span className="edit-span">Price:</span>
                            <input type="number" id="monthprice" className="input" value={price} onChange={(event) => setPrice(event.target.value)} />
                        </div>
                        <div className="edit-div">
                            <span className="edit-span">Skills allowed:</span>
                            <input type="number" id="skillsnumber" className="input" value={skillsNumber} onChange={(event) => setSkillsNumber(event.target.value)} />
                        </div>
                        <div className="edit-div">
                            <span className="edit-span">Number of bids:</span>
                            <input type="number" id="numberofbids" className="input" value={bidsNumber} onChange={(event) => setBidsNumber(event.target.value)} />
                        </div>
                        <div className="edit-div">
                            <span className="edit-span">Number of private bids:</span>
                            <input type="number" id="privatebids" className="input" value={privateBids} onChange={(event) => setPrivateBids(event.target.value)} />
                        </div>
                        <div className="edit-div">
                            <span className="edit-span">Number of follow:</span>
                            <input type="number" id="numberoffollow" className="input" value={following} onChange={(event) => setFollowing(event.target.value)} />
                        </div>
                        <div className="edit-div">
                            <span className="edit-span">Is promoted: {promoted ? 'Yes' : 'No'}</span>
                            <button className="edit-btn" onClick={() => setPromoted(!promoted)}>{promoted? 'Change to No' : 'Change to Yes'}</button>
                        </div>
                        <div className="edit-div">
                            <span className="edit-span">Is proVerefied: {proVerified ? 'Yes' : 'No'}</span>
                            <button className="edit-btn" onClick={() => setProVerified(!proVerified)}>{proVerified? 'Change to No' : 'Change to Yes'}</button>
                        </div>
                        <hr className="plan-hr" />
                        <div className="save-cancel">
                            <button className="save-cancel-btn" onClick={handleSaveEdits}>Save Edits</button>
                            <button className="save-cancel-btn" onClick={() => setEdit(false)}>Cancel & close</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Plan