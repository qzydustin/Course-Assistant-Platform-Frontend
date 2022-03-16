import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";


import SignUp from "./pages/signup";
import Login from "./pages/login";

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Login/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="login" element={<Login/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));