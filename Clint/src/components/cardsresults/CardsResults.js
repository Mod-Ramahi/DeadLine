import React, { useEffect, useState } from "react";
import './CardsResults.scss'
import DefaultPhoto from './defaulPhoto.jpg'
import { getUserById } from "../../api";

export default function CardsResults({ user }) {
    const [creator, setCreator] = useState()
    useEffect(() => {
        const getCretor =  async () => {
            const userId = await user.createdBy
            console.log("check",userId)
            const response= await getUserById(userId)
            setCreator(response)
        }
        getCretor()
    },[])
    return (
        <div className="user-card" >
            <div className="up">
                <div className="user-photo">
                    <img alt={user.name} src={DefaultPhoto} />
                </div>
                <div className="card-user">
                    <div className="card-name">
                        <span className="real-name">{creator?.proname}</span>
                    </div>
                    <div className="user-price">
                        <span>Hourly price rate = <span className="price">{user? user.hourPrice : '10'}$ </span></span>
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