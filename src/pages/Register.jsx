import login from "../assets/login.png";
import "../styles/login.css"
import PinInput from "../components/PinInput.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {Store} from "react-notifications-component";
const Register = () => {
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [pins, setPins] = useState(['', '', '', '', '', '']);
    const history = useNavigate();

    const handleContinueClick = () => {

        let data = JSON.stringify({
            "email": email,
            "code": pins.join("")
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://brixon-811bf88a933a.herokuapp.com/api/users/check-register',
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data.checkingStatus));
                if(response.data.checkingStatus==="FAILED"){
                    response.data.messages.forEach((message) => {
                        // Create a notification for each message
                        Store.addNotification({
                            title: 'Registration Failed',
                            message: message,
                            type: 'danger',
                            insert: 'top',
                            container: 'top-right',
                            animationIn: ['animate__animated', 'animate__flipInY'],
                            animationOut: ['animate__animated', 'animate__flipOutX'],
                            dismiss: {
                                duration: 5000,
                            },
                        });
                    });
                }
                else {
                    history('/code', {
                            state: {
                                email: email,
                                company:company,
                                pins:pins
                            }
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });



    };
    return(<div  className={"login-block"}>
        <div className="register-container">
            <div className="welcome-image">
                <img src={login} alt={"welcome-image"}/>
            </div>
            <div className="form-login_container">
                <div className="login-container_container">
                    <label>Email</label>
                    <input className={"input-login"} placeholder={"Email"}  value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="login-container_container">
                    <label>Company</label>
                    <input className={"input-login"} placeholder={"Company name"}  value={company}
                           onChange={(e) => setCompany(e.target.value)}/>
                </div>
                <div className="login-container_container">
                    <label>Code</label>
                    <PinInput pins={pins} setPins={setPins}/>
                </div>
                <div className="get-code">
                    <a href={"https://t.me/alex_abi"}>How to get code?</a>
                </div>

                <div className="welcome-buttons">
                    <button className={"dont_have"} onClick={()=>handleContinueClick()}>Continue</button>
                    <button className={"have_account"}> <Link to={"/"} >Back</Link></button>
                </div>

            </div>

        </div>
    </div>)
}
export default Register