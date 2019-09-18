import React from 'react';
import '../style.css';

function Message(props) {
    return (
        <div className="message">
        {
            props.messages.map((msg, index) => {
                return (
                    <div key={index} className="message">
                        <div className="message-username">{msg.senderId}</div>
                        <div className="message-text">{msg.text}</div>
                    </div>
                )
            })
        }
        </div>
    )
}

export default Message;
