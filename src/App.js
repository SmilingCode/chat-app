import React from 'react';
import SetUserForm from './components/SetUserForm';
import ChatScreen from './components/ChatScreen';

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            currentScreen: 'init',
            currentUsername: ''
        }
        this.submitUsername = this.submitUsername.bind(this)
    }

    submitUsername(username) {
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username})
        }).then(response => {
            //console.log('response.json: ', response.json());
            console.log('response.status: ', response.status);
            // if (response.status === 201) {
            //     this.setState({
            //         currentScreen: 'ChatScreen',
            //         currentUsername: username
            //     })
            // } else if(response.status === 500) {
            //     alert('this username has been taken, please choose another one!');
            // }
            this.setState({
                currentScreen: 'ChatScreen',
                currentUsername: username
            })

        }).catch(err => {
            console.error(err);
        })
    }

    render() {
        if (this.state.currentScreen === 'init') {
            return (
                <SetUserForm submitUsername={this.submitUsername} />
            )
        } else {
            return (
                <ChatScreen currentUsername={this.state.currentUsername} />
            )
        }
    }
}

export default App;
