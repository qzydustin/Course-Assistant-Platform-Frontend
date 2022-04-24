import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";


import SignUp from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard/Dashboard";
import {store} from "./pages/dashboardStore";
import {Provider} from "react-redux";
import React from "react";
import server from "./server.json";


export default function App({server}) {
    // const {server} = server;
    console.log("app server: ", server);
    return (
        // <div className="App">
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Login server={server}/>}/>
                    <Route path="signup" element={<SignUp server={server}/>}/>
                    <Route path="login" element={<Login server={server}/>}/>
                    <Route path="dashboard" element={<Dashboard server={server}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        </Provider>
        // </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById("root"));