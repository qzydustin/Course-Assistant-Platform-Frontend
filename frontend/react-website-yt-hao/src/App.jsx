import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import SignUp from "./pages/signup";
import SignInSide from "./pages/signin_side";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<SignInSide/>}/>
                    <Route path="SignUp" element={<SignUp/>}/>
                    <Route path="SignInSide" element={<SignInSide/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));