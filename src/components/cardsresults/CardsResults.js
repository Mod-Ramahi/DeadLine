import React from "react";
import './CardsResults.scss'

export default function CardsResults({ user, onUserClick }) {
    
    const GetUserID = () => {
        onUserClick(user.id)
    }
    return (
        <div className="user_card" onClick={GetUserID}>
            <div className="up">
                <div className="user_photo">
                    <img alt={user.name} src={user.profilephoto} />
                </div>
                <div className="user_price">
                    <span>{user.hourprice}</span>
                </div>
            </div>
            <div className="down">
                <span className="pro_title">{user.headline}</span>
            </div>
            <div className="card_title">
                <span className="real_name">{user.name}</span>
                <span className="reviews">{user.avgRate}</span>
            </div>
        </div>
    )
}