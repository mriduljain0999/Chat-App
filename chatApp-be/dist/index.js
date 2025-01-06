"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let rooms = [];
let users = [];
wss.on('connection', function (socket) {
    socket.on('message', function (message) {
        let parsedMessage = JSON.parse(message);
        if (parsedMessage.type == "join") {
            const room = rooms.find((room) => room == parsedMessage.payload.roomId);
            if (room) {
                users.push({
                    socket,
                    roomId: parsedMessage.payload.roomId,
                    username: parsedMessage.payload.username
                });
                let usersInRoom = 0;
                const roomSpecificUsers = users.filter((user) => {
                    if (user.roomId == parsedMessage.payload.roomId) {
                        usersInRoom++;
                        return true;
                    }
                    else
                        return false;
                });
                roomSpecificUsers.forEach((user) => {
                    const joinSuccess = {
                        status: true,
                        message: "Joined room successfully!",
                        users: usersInRoom,
                        joinedUser: parsedMessage.payload.username,
                        roomId: user.roomId,
                        username: user.username
                    };
                    user.socket.send(JSON.stringify(joinSuccess));
                });
            }
            else {
                const joinFail = {
                    status: false,
                    message: "Room not found"
                };
                socket.send(JSON.stringify(joinFail));
            }
        }
        else if (parsedMessage.type == "chat") {
            const sender = users.find((user) => user.socket == socket);
            if (sender) {
                const roomSpecificUsers = users.filter((user) => {
                    if (user.roomId == parsedMessage.payload.roomId) {
                        return true;
                    }
                    else
                        return false;
                });
                roomSpecificUsers.forEach((user) => {
                    const serverResponse = {
                        type: "chat",
                        senderUsername: sender.username,
                        content: parsedMessage.payload.message,
                        socketUsername: user.username
                    };
                    user.socket.send(JSON.stringify(serverResponse));
                });
            }
            else {
                const chatFail = {
                    status: false,
                    message: "Join room to chat"
                };
                socket.send(JSON.stringify(chatFail));
            }
        }
        else if (parsedMessage.type == "create") {
            rooms.push(parsedMessage.payload.roomId);
            console.log(rooms);
        }
    });
    socket.on("close", function () {
        const disconnectedUser = users.find((user) => user.socket === socket);
        if (disconnectedUser) {
            users = users.filter((user) => user.socket !== socket);
            // Check if the room should be deleted
            const remainingUsers = users.filter((user) => user.roomId === disconnectedUser.roomId);
            if (remainingUsers.length === 0) {
                rooms = rooms.filter((room) => room !== disconnectedUser.roomId);
                console.log(`Room ${disconnectedUser.roomId} deleted`);
            }
            console.log(remainingUsers.length);
            // Notify remaining users in the room
            remainingUsers.forEach((user) => {
                const updateMessage = {
                    message: `${disconnectedUser.username} has left the room`,
                    users: remainingUsers.length,
                };
                user.socket.send(JSON.stringify(updateMessage));
            });
        }
    });
});
