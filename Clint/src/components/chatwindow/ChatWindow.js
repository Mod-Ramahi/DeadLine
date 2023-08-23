import React from "react";
import { useState,useEffect } from "react";

export default function ChatWindow() {

    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [users, setUsers] = useState([]);

    // Simulate a list of users
    const sampleUsers = ["User 1", "User 2", "User 3"];

    useEffect(() => {
        // Simulate loading messages
        const initialMessages = [
            { user: "User 1", text: "Hello!" },
            { user: "User 2", text: "Hi there!" },
        ];

        setMessages(initialMessages);
        setUsers(sampleUsers);
    }, []);

    //handle sending a message
    const handleSendMessage = () => {
        if (currentMessage.trim() === "") return;

        // Simulate sending a message 
        const newMessage = { user: "You", text: currentMessage };
        setMessages([...messages, newMessage]);
        setCurrentMessage("");
    };

    // to select a user to chat with
    const handleUserSelect = (user) => {
        console.log(`Loading messages for ${user}`);

        // set  selected user
    };

    return (
        <div className="chat-container" style={{marginTop:'15rem'}}>
            <div className="user-list">
                <h2>Users</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user} onClick={() => handleUserSelect(user)}>
                            {user}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat">
                <div className="conversation">
                    <h2>Conversation</h2>
                    <div className="message-list">
                        {messages.map((message, index) => (
                            <div key={index} className="message">
                                <strong>{message.user}:</strong> {message.text}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="message-input">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage();
                            }
                        }}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}