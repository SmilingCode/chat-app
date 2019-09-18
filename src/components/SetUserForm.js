import React from 'react';

class SetUserForm extends React.Component {
    constructor() {
        super()
        this.state = {
            username: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.submitUsername(this.state.username)
    }

    render() {
        return (
            <div className="submitUsername">
                <form className="submitUsernameForm" onSubmit={this.onSubmit}>
                    <input
                    type="text"
                    value={this.state.username}
                    placeholder="please input your username" onChange={this.onChange} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default SetUserForm;
