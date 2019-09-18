import React from 'react';
import '../style.css';

class SendMsgForm extends React.Component {
    constructor() {
        super()
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            message: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        /** send off the message to chatkit */
        this.props.sendMsg(this.state.message)

        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <form
            onSubmit={this.handleSubmit}
            className="send-message-form">
                <input
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
                <button>Send</button>
            </form>
        )
    }
}

export default SendMsgForm;
