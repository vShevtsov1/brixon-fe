import login from "../assets/login.png";
import reset from "../assets/resetpass.png"
import PinInput from "../components/PinInput.jsx";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {Store} from "react-notifications-component";
const ResetPassword = () => {


    const history = useNavigate();
    const [email, setEmail] = useState("");


    function handleReset() {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://brixon-811bf88a933a.herokuapp.com/api/users/request-reset?email=${email}`,

        };

        axios.request(config)
            .then((response) => {
               if(response.data.loginStatus === "OK"){
                   Store.addNotification({
                       title: "Password Reset",
                       message: "An email with instructions on how to reset your password has been sent to your registered email address. Please check your inbox and follow the provided steps to reset your password.",
                       type: "success",
                       insert: "top",
                       container: "top-right",
                       animationIn: ["animate__animated", "animate__flipInY"],
                       animationOut: ["animate__animated", "animate__flipOutX"],
                       dismiss: {
                           duration: 8000
                       }

                   });
                   history("/login")
               }
               else {
                   Store.addNotification({
                       title: "Password Reset Error",
                       message: "The provided email address does not exist in our records. Please double-check the email address or contact our support team for assistance.",
                       type: "danger",
                       insert: "top",
                       container: "top-right",
                       animationIn: ["animate__animated", "animate__flipInY"],
                       animationOut: ["animate__animated", "animate__flipOutX"],
                       dismiss: {
                           duration: 5000
                       }
                   });
                   history("/login")

               }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return(<div className={"login-block"}>
        <div className="sign-up-code">

            <div className="welcome-image">
                <img src={reset} alt={"welcome-image"} style={{width:300,height:300}}/>
            </div>
            <div className="login-container_container">
                <label>Email</label>
                <input className={"input-login"} placeholder={"Email"}   value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="welcome-buttons">
                <button className={"dont_have"} onClick={()=>handleReset()}>Reset password</button>
                <button className={"have_account"}> <Link to={"/login"} >Back</Link></button>
            </div>
        </div>
    </div>)
}
export default ResetPassword;