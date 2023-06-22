import React from "react";
import './Faq.scss';

export default function Faq() {
    return (
        <div className="faq">
            <div className="title">
                <span> FAQ </span>
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
            <div className="Deadline_login">
                <span>DeadLine Usage</span>
                <hr />
                <div className="span">
                    <span>
                        {`> What app should I be using?`}
                    </span>
                    <span>
                        {`> How can I send my child care provider a message?`}
                    </span>
                    <span>
                        {`> Can I add to my child’s journal without sharing with my daycare?`}
                    </span>
                </div>
            </div>
        </div>
    )
}