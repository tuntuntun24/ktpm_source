import { io } from "socket.io-client"

let at = localStorage.getItem("at")

class SocketClient {

    constructor(url = import.meta.env.VITE_BACKEND_URL_SOCKET, config = { auth: { at } }) {
        this.url = url
        this.config = config
        this.socket = null
    }

    connect() {
        if (!this.socket) {
            this.socket = io(this.url, this.config)
        }
        return this.socket
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
        }
    }

}


export default SocketClient