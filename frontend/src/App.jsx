import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";


import SignUp from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard/Dashboard";
import {store} from "./pages/dashboardStore";
import {Provider} from "react-redux";
import React from "react";

export default function App() {

    return (
        // <div className="App">
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Login/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
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