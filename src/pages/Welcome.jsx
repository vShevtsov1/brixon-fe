import welcome from "../assets/welcome.png";
import "../styles/welcome.css"
import {Link, useLocation} from "react-router-dom";
import {useState} from "react";
const Welcome = () => {
    const [pins, setPins] = useState(['', '', '', '', '', '']);


    return(<div className={"welcome-block"}  >

        <div className="welcome-container">
            <div className="welcome-image">
                <img src={welcome} alt={"welcome-image"}/>
            </div>
            <div className="welcome-buttons">
                <button  className={"dont_have"}> <Link to={"/register"} >New user</Link></button>
                <button className={"have_account"}> <Link to={"/login"} >I have an account</Link></button>
            </div>
            <div className="languages-container">
                <span>
                     en
                </span>
                <span>
                      ru
                </span>

            </div>
        </div>

    </div>)
}
export default Welcome