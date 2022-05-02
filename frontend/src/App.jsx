import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";


import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import {store} from "./pages/DashboardStore";
import {Provider} from "react-redux";
import React from "react";
import CapAlert from "./components/CapAlert";


export default function App({server}) {

    if (!server)  return <CapAlert message={"Not found server..."} type={"info"}/>;

    return (
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Login server={server}/>}/>
                    <Route path="signup" element={<Signup server={server}/>}/>
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