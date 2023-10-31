import login from "../assets/login.png";
import "../styles/login.css"
import PinInput from 'react-pin-input';

import {Link, useNavigation} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css'
import { ReactNotifications } from 'react-notifications-component'
import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [pins, setPins] = useState();
    const history = useNavigate();

    function handleLogin() {
        let data = JSON.stringify({
            "email": email,
            "pinCode": pins
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://brixon-811bf88a933a.herokuapp.com/api/users/login-user',
            headers: {
                'Content-Type': 'application/json',
            },
            data : data
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data)
               if(response.data.loginStatus==="OK"){
                   localStorage.setItem("token",response.data.jwt)
                   localStorage.setItem("user", JSON.stringify(response.data.userDTO));
                    history("/home")

               }
               else {
                   Store.addNotification({
                       title: "Login Failed",
                       message: "Your Username or Password is Incorrect",
                       type: "danger",
                       insert: "top",
                       container: "top-right",
                       animationIn: ["animate__animated", "animate__flipInY"],
                       animationOut: ["animate__animated", "animate__flipOutX"],
                       dismiss: {
                           duration: 5000
                       }

                   });
               }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return(<div  className={"login-block"}>

        <div className="login-container">
            <div className="welcome-image">
                <img src={login} alt={"welcome-image"}/>
            </div>
            <div className="form-login_container">
                <div className="login-container_container">
                    <label>Email</label>
                    <input className={"input-login"} placeholder={"Email"}   value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="login-container_container">
                    <label>Code</label>
                    <PinInput
                        length={6}
                        initialValue=""
                        secret
                        secretDelay={100}
                        onChange={(value, index) => {setPins(value)}}
                        type="numeric"
                        inputMode="number"
                        placeholder={"X"}
                        style={{width:44,display:"flex"}}
                        inputStyle={{borderRadius: 8,background: "#F2F2F7",borderColor:"white"}}
                        autoSelect={true}
                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                    />
                </div>
                <div className="get-code">
                    <a href={"https://t.me/alex_abi"}>How to get code?</a>
                    <Link to={"/reques-reset-password"} >Forgot password?</Link>
                </div>

                <div className="welcome-buttons">
                    <button className={"dont_have"} onClick={()=>handleLogin()}>Continue</button>
                    <button className={"have_account"}><Link to={"/"} >Back</Link></button>
                </div>

            </div>

        </div>

    </div>)
}
export default Login