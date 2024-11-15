import styles from "./DisplayMessages.module.css";
import { UserSelectedContext } from "../../pages/Chat/Chat";
import { useContext, useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import OtherMessage from "./OtherMessage/OtherMessage";
import OwnMessage from "./OwnMessage/OwnMessage";

function DisplayMessages({ displayMessages }) {
    const { userSelected } = useContext(UserSelectedContext);
    const [messageTyping, setMessageTyping] = useState("");
    const messagesEndRef = useRef(null);

    const avatarStyles = {
        backgroundImage: `url(${userSelected?.avartar || ""})`,
        height: "80px",
        width: "80px",
        borderRadius: "50%",
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    async function handleSendMessage() {
        if (!messageTyping.trim()) {
            alert("Nhập tin nhắn trước khi gửi!");
            return;
        }

        if (!userSelected?.userId) {
            alert("Không tìm thấy người nhận!");
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/privateMessage`,
                { message: messageTyping, recipientUserId: userSelected.userId },
                { withCredentials: true }
            );
            setMessageTyping("");
        } catch (error) {
            console.error("Error sending message:", error);
            alert(error.response?.data?.message || "An error occurred.");
        }
    }

    function handleChangeMessageTyping(e) {
        setMessageTyping(e.target.value);
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [displayMessages]);
    console.log(displayMessages);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", { month: "long", day: "numeric", year: "numeric" });
    };

    return (
        <div className={styles.displayMessages_container}>
            <h2 style={{ textAlign: "center" }}>Chat riêng</h2>
            <hr />

            <div className={styles.infor_header}>
                <div className={styles.avatar} style={avatarStyles}></div>
                <span className={styles.nickName}>{userSelected?.nickName}</span>
                {/* <span className={styles.userStatus}>{userSelected?.isOnline ? "Online" : "Offline"}</span> */}
            </div>

            <div className={styles.content_messages}>
                {displayMessages.map((message, index) => (
                    <div key={index}>
                        {index === 0 || formatDate(displayMessages[index - 1].timestamp) !== formatDate(message.timestamp) ? (
                            <div className={styles.dateSeparator}>
                                {formatDate(message.inforUser.timeSend)}
                            </div>
                        ) : null}

                        {message.isSender ? (
                            <OwnMessage
                                key={index}
                                inforMessage={{
                                    messageContent: message.message,
                                    timestamp: new Date(message.inforUser.timeSend).toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' })
                                }}
                            />
                        ) : (
                            <OtherMessage
                                key={index}
                                inforMessage={{
                                    messageContent: message.message,
                                    avatar: message.inforUser.avatar,
                                    timestamp: new Date(message.inforUser.timeSend).toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' })
                                }}
                            />
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputAndSenbtn}>
                <input
                    value={messageTyping}
                    type="text"
                    className={styles.input_message}
                    placeholder="Type a message..."
                    onChange={handleChangeMessageTyping}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <div onClick={handleSendMessage} className={styles.send_button}>
                    Send <IoSend style={{ margin: "10px" }} />
                </div>
            </div>
        </div>
    );
}

export default DisplayMessages;
