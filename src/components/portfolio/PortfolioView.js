import React from "react";
import { Users } from "../../data/Users";
import { Link } from "react-router-dom";

export default function PortfolioView({ card }) {
    const user = Users.find((user) => user.id === card.userId)
    return (
        <div className="portfolio">
            <span className="title">{card.text}</span>
            <div className="user_info">
                <div className="img">
                    <img alt="user" src={user.profilephoto} />
                </div>
                <div className="info_user">
                    <div className="txt_info">
                        <span>{user.name}</span>
                        <span>{user.nickname}</span>
                    </div>
                    <div className="reviews_info">
                        <span>{user.avgRate}</span>
                    </div>
                </div>
            </div>
            <div className="lower_section">
                <div className="left">
                    <div className="project_img">
                        <img alt="project" src={card.src} />
                    </div>
                    <div className="project_txt">
                        <span>
                            {card.projectDescription}
                        </span>
                    </div>
                </div>
                <div className="right">
                    <ul>
                        <li>graphic design</li>
                        <li>concept design</li>
                        <li>photoshop design</li>
                        <li>label design</li>
                        <li>adobe photoshop</li>
                        <li>adobe illustrator</li>
                        <li>product design</li>
                        <li>food & drink</li>
                    </ul>
                    <Link to={`/freelancer/${user.id}`} style={{color:'inherit', textDecoration:'none'}}>
                        <button className="hire_btn">Hire</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}