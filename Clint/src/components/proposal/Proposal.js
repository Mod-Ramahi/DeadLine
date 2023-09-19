import React, { useEffect, useState } from "react";
import './Proposal.scss'
import { getUserById } from "../../api";

export default function Proposal ({bid}) {
    const [creator, setCreator] = useState()
    useEffect ( () => {
        console.log('the bid recieved:', bid)
        const getUser= ()=>{
            if(bid){
                const userId = bid.createdBy;
                getUserById(userId).then((user) => {
                    setCreator(user)
                })
            }
        }
        getUser()
    },[bid])
    return(
        <div className="proposal-card">
            <div className="up">
                <span className="name">{creator?.proname}</span>
            </div>
            <div className="down">
                <span className="summary">{bid?.summary}</span>
            </div>
        </div>
    )
}