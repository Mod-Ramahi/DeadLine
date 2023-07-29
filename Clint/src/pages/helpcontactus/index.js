import React from "react";
import '../faq/Faq.scss'

export default function Help() {
    return (
        <div className="faq">
            <div className="title">
                <span> Help </span>
            </div>
            <div className="Deadline_login">
                <span>DeadLine Login</span>
                <hr />
                <div className="span">
                    <span>
                        {`> My child care provider just added me, what do I do next?`}
                    </span>
                    <span>
                        {`> I can’t log into my account.`}
                    </span>
                    <span>
                        {`> How do I change the email address that I get updates to from my child’s daycare
                        provider?`}
                    </span>
                </div>
            </div>
            <button>Contact Us</button>
        </div>
    )
}