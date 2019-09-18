import React from 'react';
import MessageList from './MessageList.js';
import NewRoomForm from './NewRoomForm.js';
import RoomList from './RoomList.js';
import SendMsgForm from './SendMsgForm.js';
import '../style.css';

import Chatkit from '@pusher/chatkit-client';
import {tokenUrl, instanceLocator} from '../config.js';

class ChatScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            roomId: null,
            messages: [],
            joinableRooms: [],
            joinedRooms: []
        }

        this.sendMsg = this.sendMsg.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.getRooms = this.getRooms.bind(this)
        this.createNewRoom = this.createNewRoom.bind(this)
        this.addUserToRoom = this.addUserToRoom.bind(this)
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        })

        // chatManager.connect()
        // .then(currentUser => {
        //     console.log('connected user :', currentUser)
        // })
        // .catch(error => {
        //     console.error("error:", error)
        // })

        chatManager.connect()
        .then(currentUser => {
            this.currentUser = currentUser
            this.getRooms()
            //this.subscribeToRoom()
        })
        .catch(error => {
            console.error("error:", error);
        })
    }

    getRooms() {
        /** give all rooms to state: rooms[] */
        this.currentUser.getJoinableRooms()
        .then(joinableRooms => {
            this.setState({
                joinableRooms: joinableRooms,
                joinedRooms: this.currentUser.rooms
            })
        })
        .catch(error => {
            console.log('rooms: ', error);
        })
    }

    subscribeToRoom(roomId) {
        /** obtain all messages and send to state: messages[] */
        this.setState({
            messages: [],
            roomId: roomId
        })
        this.currentUser.subscribeToRoom({
            roomId: roomId, // '19877933'
            hooks: {
                onMessage: message => {
                    // console.log('Received message:', message.text)
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            },
            messageLimit: 20
        })
        .catch(err => {
            console.log('msgs: ', err);
        });
    }

    sendMsg(text) {
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId //this.currentUser.rooms[0].id
        })
    }

    createNewRoom(roomName, isPrivate) {
        //console.log('roomName: ', roomName);
        this.currentUser.createRoom({
            name: roomName,
            private: isPrivate
        })
        .then(room => {
            //console.log('roomId: ', room.id);
            this.subscribeToRoom(room.id)
            this.getRooms()
        })
        .catch(err => {
            console.log("error with create room: " , err)
        })
    }

    addUserToRoom(username) {
        this.currentUser.addUserToRoom({
          userId: username,
          roomId: this.state.roomId
        })
          .then(() => {
            console.log(`Added ${username} to room ${this.state.roomId}`)
          })
          .catch(err => {
            console.log(`Error adding keith to room 123: ${err}`)
          })
    }

    render() {
        return (
            <div className="App">
                <RoomList
                    roomId={this.state.roomId}
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
                <MessageList roomId={this.state.roomId} messages={this.state.messages} />
                <NewRoomForm
                    createNewRoom={this.createNewRoom}
                    addUser={this.addUserToRoom}
                    disabled={!this.state.roomId} />
                <SendMsgForm sendMsg={this.sendMsg} disabled={!this.state.roomId} />
            </div>
        )
    }
}

export default ChatScreen;
