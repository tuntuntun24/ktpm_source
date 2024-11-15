import styles from "./Chat.module.css";
import ListUserChat from "../../components/ListUserChat/ListUserChat";
import DisplayMessages from "../../components/DisplayMessages/DisplayMessages";
import SearchUser from "../../components/SearchUser/SearchUser";
import { createContext, useEffect, useState, useRef } from "react";
import SocketClient from "../../socket.io/socket";
import axios from "axios";

export let UserSelectedContext = createContext();

function Chat() {
    const [dataMessages, setDataMessages] = useState([]); // Lưu trữ tất cả tin nhắn
    const [userSelected, setUserSelected] = useState({}); // Lưu trữ người dùng đã chọn
    const [displayMessages, setDisplayMessages] = useState([]); // Lọc tin nhắn của người dùng đã chọn
    const [listUserChatted, setListUserChatted] = useState([])

    const userSelectedRef = useRef(userSelected);

    useEffect(() => {
        userSelectedRef.current = userSelected;
    }, [userSelected]);

    useEffect(() => {
        let clientSocket = new SocketClient();
        let socket = clientSocket.connect();

        socket.on("sendMessagePrivate", (data) => {
            const currentUserSelected = userSelectedRef.current;

            if (currentUserSelected && currentUserSelected.userId) {
                let addedDataMessages = {
                    isSender: true,
                    message: data.message,
                    inforUser: {
                        nickName: currentUserSelected.nickName,
                        avatar: currentUserSelected.avartar,
                        userId: currentUserSelected.userId,
                        timeSend: Date.now()
                    },
                };
                setDataMessages((prev) => [...prev, addedDataMessages]);
            } else {
                console.log("No user selected, message ignored.");
            }
        });

        socket.on("recipientMessagePrivate", (data) => {
            let addedDataMessages = {
                isSender: false,
                message: data.message,
                inforUser: {
                    nickName: data.senderInfor.nickName,
                    avatar: data.senderInfor.avartar,
                    userId: data.senderInfor.userId,
                    timeSend: Date.now()
                },
            };
            setDataMessages((prev) => [...prev, addedDataMessages]);
        });

        socket.on("connect_error", (err) => {
            alert(err.message);
            console.log(err.message);
            window.location.reload()
            // window.location.href = "/messages"
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // Lấy dữ liệu tin nhắn của người dùng
    useEffect(() => {
        const fetchData = async () => {
            try {
                let responseDataMessage = await axios.post(
                    import.meta.env.VITE_BACKEND_URL + "/auth/getDataMessagesOfUserId",
                    {},
                    { withCredentials: true }
                );
                let dataMessages = responseDataMessage.data.dataMessagesHandled;

                setDataMessages(dataMessages);
            } catch (error) {
                console.log(error);
                alert(error.response?.data?.message || "An error occurred.");
            }
        };
        fetchData();
    }, []);



    // Lọc tin nhắn của người dùng được chọn
    useEffect(() => {
        const dataMessageDisplay = dataMessages.filter(
            (e) => e.inforUser.userId === userSelected?.userId
        );
        setDisplayMessages(dataMessageDisplay);
    }, [dataMessages, userSelected]);


    useEffect(() => {
        const listUser = []
        let idAdded = []

        for (let e of dataMessages) {
            if (!idAdded.includes(e.inforUser.userId)) {
                listUser.push(e.inforUser)
                idAdded.push(e.inforUser.userId)
            }
        }

        setListUserChatted(listUser)

    }, [dataMessages]);

    return (
        <UserSelectedContext.Provider value={{ setUserSelected, userSelected }}>
            <div className={styles.chat_Wrapper}>
                <ListUserChat listUserChatted={listUserChatted} />
                <DisplayMessages displayMessages={displayMessages} />
                <SearchUser />
            </div>
        </UserSelectedContext.Provider>
    );
}

export default Chat;
