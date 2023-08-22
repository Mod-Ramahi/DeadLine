import React from "react";
import './CardsResults.scss'

export default function CardsResults({ user }) {
    return (
        <div className="user-card" >
            <div className="up">
                <div className="user-photo">
                    <img alt={user.name} src={user.profilephoto} />
                </div>
                <div className="card-user">
                    <div className="card-name">
                        <span className="real-name">{user.name}</span>
                    </div>
                    <div className="user-price">
                        <span>Hourly price rate = <span className="price">{user.hourprice}</span></span>
                    </div>
                </div>
            </div>
            <div className="down">
                <span className="pro-title">{user.headline}</span>
            </div>
            <div className="mid-discription">
                <span className="service-summary"> Summary of the service offered by the user / freelancer. short discription to let the buyers know about the service before the click and open</span>
            </div>
            <div className="card-title">
                <span className="reviews">Avg Review: {user.avgRate}</span>
            </div>
        </div>
    )
}