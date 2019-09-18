import React from 'react';

class NewRoomForm extends React.Component {
    constructor() {
        super()
        this.state = {
            createRoomForm: false,
            addUserForm: false,
            roomName: '',
            username: '',
            roomType: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.createRoom = this.createRoom.bind(this)
        this.addUser = this.addUser.bind(this)
        this.showCreateRoomForm = this.showCreateRoomForm.bind(this)
        this.showaddUserForm = this.showaddUserForm.bind(this)
    }

    handleChange(e) {
        const {name, value} = e.target

        this.setState({
            [name]: value
        })
    }

    showCreateRoomForm() {
        this.setState({
            createRoomForm: true
        })
    }

    showaddUserForm() {
        this.setState({
            addUserForm: true
        })
    }

    createRoom(e) {
        e.preventDefault()
        this.props.createNewRoom(this.state.roomName, this.state.roomType)
        this.setState({
            roomName: '',
            roomType: 0,
            createRoomForm: false
        })
    }

    addUser(e) {
        e.preventDefault()

        this.props.addUser(this.state.username)
        this.setState({
            username: '',
            addUserForm: false
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.showCreateRoomForm}>Create a room</button>
                <div className="add-new-room-form" style={{display: this.state.createRoomForm ? "block" : "none"}}>
                    <form onSubmit={this.createRoom}>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="roomName"
                            value={this.state.roomName}
                            placeholder="Please input the room name"
                            required />
                        <select
                            name="roomType"
                            value={this.state.roomType}
                            onChange={this.handleChange}>
                            <option value="0">public</option>
                            <option value="1">private</option>
                        </select>
                        <button id="create-room-btn" type="submit">Create</button>
                    </form>
                </div>
                <button disabled={this.props.disabled} onClick={this.showaddUserForm}>Invite user to your room</button>
                <div className="join-room-form" style={{display: this.state.addUserForm ? "block" : "none"}}>
                    <form onSubmit={this.addUser}>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="username"
                            value={this.state.username}
                            placeholder="Please input the username"
                            required />
                        <button id="create-room-btn" type="submit">Add</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewRoomForm;
