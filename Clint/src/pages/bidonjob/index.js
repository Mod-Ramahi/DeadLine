import React, { useState } from "react";
import "./BidOnJob.scss"
import { postProposalRequest } from "../../api";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

export default function BidOnJob() {
    const {id} = useParams()
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState("USdollar");
    const [deliveryTime , setTime] = useState(0);
    const [description, setDescription] = useState("");
    const [milestone, setMilestone] = useState("");
    const [plan, setPlan] = useState("public");

    const navigate = useNavigate()

    const handlePrice = (event) => {
        setPrice(event.target.value)
    };
    const handleTime = (event) => {
        setTime(event.target.value)
    };
    const handleBidDescription = (event) => {
        setDescription(event.target.value)
    };
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const maxSize = 20971520; // 20MB

        if (file && file.size > maxSize) {
            alert("Maximum file size exceeded. Please choose a smaller file.");
            event.target.value = null;
        } else {
            alert("file uploaded");
        }
    };
    const handleMilestone = (event) => {
        setMilestone(event.target.value)
    };
    const handleProposalPlan = (event) => {
        setPlan(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await postProposalRequest({price,description,milestone,plan,deliveryTime,jobId:id})
            console.log(response)
            if (response.status === 201){
                navigate('/userhome')
            }
            if (response.status === 500){
                alert("something wen wrong")
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <form onSubmit={handleSubmit} className="bid">
            <span className="title">Bid On Job</span>
            <div className="budget">
                <label htmlFor="price">Bid Price</label>
                <div className="price_input">
                    <input type="number" id="price" onChange={handlePrice}></input>
                    {/* <select id="currency" onChange={handleCurrency}>
                        <option value="USdollar">$</option>
                        <option value="JOD">JOD</option>
                    </select> */}
                </div>
            </div>
            <div className="days">
                <label htmlFor="time">{`Delivery Time (days)`}</label>
                <input type="number" id="time" onChange={handleTime}></input>
            </div>
            <div className="text_description">
                <label htmlFor="description">Proposal Description</label>
                <textarea className="description_area" maxLength={700} placeholder="description . . ." onChange={handleBidDescription}></textarea>
            </div>
            <div className="text_description">
                <label htmlFor="description">short Description</label>
                <textarea className="description_area" maxLength={200} placeholder="description . . ." onChange={handleBidDescription}></textarea>
            </div>
            <div className="attachment">
                <label htmlFor="attach">File Attachment</label>
                <input type="file" id="attach" accept=".jpg, .png, .pdf" onChange={handleFileUpload}></input>
            </div>
            <div className="add_milestone">
                <label htmlFor="milestone">Add milestone</label>
                <input type="text" id="milestone" placeholder="task, price, time" onChange={handleMilestone}></input>
            </div>
            <div className="proposal_plan">
                <label htmlFor="proposalplan"> Choose plan</label>
                <select id="proposalplan" onChange={handleProposalPlan}>
                    <option value="public">Basic/Public</option>
                    <option value="private">private</option>
                </select>
            </div>
            <div className="submit">
                <button className="sub_btn" type="submit">Submit</button>
            </div>
        </form>
    )
}