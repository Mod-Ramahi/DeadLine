import React from "react";
import '../faq/Faq.scss'

export default function AboutUs () {
    return(
        <div className="faq">
            <div className="title">
                <span> About Us </span>
            </div>
            <div className="Deadline_login">
                <span>who we are</span>
                <hr />
                <div className="span">
                    <span>
                        {`> My child care provider just added me, what do I do next?`}
                    </span>
                </div>
            </div>
        </div>
    )
}