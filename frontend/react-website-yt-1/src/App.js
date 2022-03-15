import React from 'react';
import { observer } from 'mobx-react';
import SubmitButton from './SubmitButton';
import Logingform from './Logingform';
import Userstore from './store/Userstore';
import './App.css';

import Navbar from './components/Navbar';

class App extends React.Component {

    async componentDidMount() {
        try {
            let res = await fetch('/isLoggedin', {
                method: 'post',
                headers: {
                    'Accept': 'application/jason',
                    'Content-Type': 'application/jason'
                }
            });
            let result = await res.json();

            if (result && result.success) {
                Userstore.loading = false;
                Userstore.isLoggedin = true;
                Userstore.username = result.username;
            } else {
                Userstore.loading = false;
                Userstore.isLoggedin = false;
            }
        } catch (e) {
            Userstore.loading = false;
            Userstore.isLoggedin = false;
        }
    }

    async doLogout() {
        try {
            let res = await fetch('/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/jason',
                    'Content-Type': 'application/jason'
                }
            });
            let result = await res.json();

            if (result && result.success) {

                Userstore.isLoggedin = false;
                Userstore.username = '';

            }


        } catch (e) {
            console.log(e)
        }
    }

    render() {

        if (Userstore.loading) {
            return ( <
                div className = 'app' >
                <
                div className = 'container' >
                loading, please wait.. <
                /div> <
                /div>
            );
        } else {
            if (Userstore.isLoggedin) {
                return ( <
                    div className = 'app' >
                    <
                    div className = 'container' >
                    Welcome { Userstore.username } <
                    SubmitButton text = { 'log out' }
                    disabled = { false }
                    onClick = {
                        () => this.doLogout() }
                    /> <
                    /div> <
                    /div>
                );
            }

            return ( <
                div className = 'app' >
                <
                div className = 'container' >
                <
                SubmitButton text = { 'log out' }
                disabled = { false }
                onClick = {
                    () => this.doLogout() }
                /> <
                Logingform / >
                <
                /div> <
                /div>
            );
        }
    }
}

export default observer(App);