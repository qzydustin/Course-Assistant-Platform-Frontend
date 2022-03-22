import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";


import SignUp from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard/Dashboard";
import CoursePlaza from "./pages/CoursePlaza/CoursePlaza";
import Management from "./pages/Management/Management";


export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Login/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="courses" element={<CoursePlaza/>}/>
                    <Route path="management" element={<Management/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));