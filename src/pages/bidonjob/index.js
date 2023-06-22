import React from "react";
import "./BidOnJob.scss"

export default function BidOnJob() {
    return (
        <div className="bid">
            <span className="title">Bid On Job</span>
            <div className="budget">
                <label htmlFor="price">Bid Price</label>
                <div className="price_input">
                    <input type="number" id="price" ></input>
                    <select id="currency">
                        <option value="USdollar">$</option>
                        <option value="JOD">JOD</option>
                    </select>
                </div>
            </div>
            <div className="days">
                <label htmlFor="time">{`Delivery Time (days)`}</label>
                <input type="number" id="time"></input>
            </div>
            <div className="text_description">
                <label htmlFor="description">Proposal Description</label>
                <textarea className="description_area" placeholder="description . . ."></textarea>
            </div>
            <div className="attachment">
                <label htmlFor="attach">File Attachment</label>
                <input type="file" id="attach"></input>
            </div>
            <div className="add_milestone">
                <label htmlFor="milestone">Add milestone</label>
                <input type="text" id="milestone" placeholder="task, price, time"></input>
            </div>
            <div className="proposal_plan">
                <label htmlFor="proposalplan"> Choose plan</label>
                <select id="proposalplan">
                    <option value="public">Basic/Public</option>
                    <option value="private">private</option>
                </select>
            </div>
            <div className="submit">
                <button className="sub_btn">Submit</button>
            </div>
        </div>
    )
}