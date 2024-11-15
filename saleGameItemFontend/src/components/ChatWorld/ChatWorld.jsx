import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatWorld.module.css';
import SocketClient from '../../socket.io/socket';
import axios from 'axios';



const ChatWorld = () => {


    const [messages, setMessages] = useState([{ message: "", userInfor: null }]);
    const inputValue = useRef('');
    let userId = JSON.parse(localStorage.getItem('userData')).userId
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        let clientSocket = new SocketClient()
        let socket = clientSocket.connect()

        socket.on("chat_world", (data) => {
            data = JSON.parse(data)
            let msg = data.message

            let message = msg
            let userInfor = null

            if (data.userInfor.userId != userId) {
                userInfor = data.userInfor
            }

            setMessages((prevMessages) => [...prevMessages, { message, userInfor }])
        })

        socket.on("connect_error", (err) => {
            alert(err.message)
        });
    }, [])


    const handleSend = async () => {
        if (inputValue.current.trim()) {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/chatWorld", { message: inputValue.current }, { withCredentials: true })
            inputValue.current = ""
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handleOnchange = (e) => {
        inputValue.current = e.target.value
    }

    return (
        <div className={styles.messengerContainer}>
            <div className={styles.header}>
                <h2>Kênh chat thế giới</h2>
            </div>
            <div className={styles.messages}>
                {messages.map((msg, index) => (
                    msg.message?.length === 0 ? (
                        <div key={index} />
                    ) : (
                        <div key={index} className={styles.chatContainer}>
                            {!msg.userInfor ? (
                                <>
                                    <div className={styles.message + ' ' + styles.sender}>
                                        {msg.message}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={styles.avartar} style={{ backgroundImage: `url(${msg.userInfor.avartar})` }} />
                                    <div className={styles.message}>
                                        <span style={{ color: "red" }}>{msg.userInfor.nickName + " : "}</span>
                                        {msg.message}
                                    </div>
                                </>
                            )}
                        </div>
                    )
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    onChange={handleOnchange}
                    onKeyPress={handleKeyPress}
                    className={styles.input}
                    placeholder="Type a message..."
                // value={inputValue.current}
                />
                <button onClick={handleSend} className={styles.sendButton}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWorld;