import React from "react";
import './CardsResults.scss'
import DefaultPhoto from './defaulPhoto.jpg'

export default function CardsResults({ user }) {
    return (
        <div className="user-card" >
            <div className="up">
                <div className="user-photo">
                    <img alt={user.name} src={user.profilephoto ? user.profilephoto : DefaultPhoto} />
                </div>
                <div className="card-user">
                    <div className="card-name">
                        <span className="real-name">{user.name}</span>
                    </div>
                    <div className="user-price">
                        <span>Hourly price rate = <span className="price">{user.hourprice? user.hourprice : '10$'}</span></span>
                    </div>
                </div>
            </div>
            <div className="down">
                <span className="pro-title">{user.headline}</span>
            </div>
            <div className="mid-discription">
                <span className="service-summary"> {user.serviceSummary}</span>
            </div>
            <div className="card-title">
                <span className="reviews">Avg Review: {user.avgRate}</span>
            </div>
        </div>
    )
}