import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";


import SignUp from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard/Dashboard";
import {store} from "./pages/dashboardStore";
import {Provider} from "react-redux";
import React from "react";


export default function App({server}) {
    console.log("app server: ", server);
    if (!server) return <p>Loading...</p>;


    return (
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
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById("root"));