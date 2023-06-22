import React from "react";
import "./Portfolio.scss"

export default function Portfolio() {
    return (
        <div className="portfolio">
            <span className="title">Minimalist Soda Can Label Design</span>
            <div className="user_info">
                <div className="img">
                    <img alt="user" src="./images/Ahmad.png" />
                </div>
                <div className="info_user">
                    <div className="txt_info">
                        <span>Ahmad Khalil</span>
                        <span>@designerpro</span>
                    </div>
                    <div className="reviews_info">
                        <span>4.8</span>
                    </div>
                </div>
            </div>
            <div className="lower_section">
                <div className="left">
                    <div className="project_img">
                        <img alt="project" src="./images/assetg.png" />
                    </div>
                    <div className="project_txt">
                        <span>
                            Inspired from the 90's theme designs which are consist of neon colors and shapes. I also put some 90's radio stereo so it may somehow connect to the 'BEAT" word. So, to make the texts vibes with the theme, I also used old school/retro font styles.
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
                    <button className="hire_btn">Hire</button>
                </div>
            </div>
        </div>
    )
}