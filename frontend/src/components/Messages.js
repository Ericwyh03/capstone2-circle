import React, { useState } from 'react';
import '../styles/message.css';

const mockConversations = [
    { id: 1, name: 'Aidan T.', lastMessage: 'Hey! Ready for the meetup?' },
    { id: 2, name: 'Mei Ling', lastMessage: 'Can we reschedule our chat?' },
    { id: 3, name: 'Zahir', lastMessage: 'Loved your last idea!' },
];

function Messages() {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className="messages-container">
            <div className="messages-sidebar">
                <h3>Conversations</h3>
                {mockConversations.map((chat) => (
                    <div
                        key={chat.id}
                        className={`chat-preview ${selectedChat?.id === chat.id ? 'active' : ''}`}
                        onClick={() => setSelectedChat(chat)}
                    >
                        <strong>{chat.name}</strong>
                        <p>{chat.lastMessage}</p>
                    </div>
                ))}
            </div>

            <div className="messages-chatbox">
                {selectedChat ? (
                    <>
                        <h3>Chat with {selectedChat.name}</h3>
                        <div className="chat-messages">
                            <p><strong>You:</strong> Hello!</p>
                            <p><strong>{selectedChat.name}:</strong> {selectedChat.lastMessage}</p>
                        </div>
                        <div className="chat-input">
                            <input type="text" placeholder="Type a message..." />
                            <button>Send</button>
                        </div>
                    </>
                ) : (
                    <div className="chat-placeholder">
                        <p>Select a conversation to begin chatting.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Messages;
