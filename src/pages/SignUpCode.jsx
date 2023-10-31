    import login from "../assets/login.png";
    import signUpCode from "../assets/signUpcode.png"
    import PinInput from "../components/PinInput.jsx";
    import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
    import {useState} from "react";
    import axios from "axios";
    import {Store} from "react-notifications-component";
    const SignUpCode = () => {
        const [pins, setPins] = useState(['', '', '', '', '', '']);
        const location = useLocation();

        const history = useNavigate();



        function handleRegister() {
            let data = JSON.stringify({
                "email": location.state.email,
                "registrationCode": location.state.pins.join(""),
                "company": location.state.company,
                "pinCode": pins.join("")
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://brixon-811bf88a933a.herokuapp.com/api/users/register-user',
                headers: {
                    'Content-Type': 'application/json'
                },
                data : data
            };

            axios.request(config)
                .then((response) => {
                    if(response.data.registerStatus==="OK"){

                        Store.addNotification({
                            title: 'Successful registration',
                            message: "You have successfully registered, use your email and PIN code to log in",
                            type: 'success',
                            insert: 'top',
                            container: 'top-right',
                            animationIn: ['animate__animated', 'animate__flipInY'],
                            animationOut: ['animate__animated', 'animate__flipOutX'],
                            dismiss: {
                                duration: 5000,
                            },
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
                    <img src={signUpCode} alt={"welcome-image"}/>
                </div>
                <div className="login-container_container">
                    <label>Code</label>
                    <PinInput pins={pins} setPins={setPins}/>
                </div>
                <div className="welcome-buttons">
                    <button className={"dont_have"} onClick={()=>handleRegister()}>Continue</button>
                    <button className={"have_account"}> <Link to={"/register"} >Back</Link></button>
                </div>
            </div>
        </div>)
    }
    export default SignUpCode