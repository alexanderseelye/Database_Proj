import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import "./login.css"

function Login() {
    const [username, setUserName] = useState('')
    const [userpassword, setUserPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()

    const onButtonClick = () => {
        // Set initial error values to empty
        setUsernameError('')
        setPasswordError('')

        // Check if the user has entered both fields correctly
        if ('' === username) {
            setUsernameError('Please enter your username')
            return
        }

        if ('' === userpassword) {
            setPasswordError('Please enter a password')
            return
        }

        if (userpassword.length < 7) {
            setPasswordError('The password must be 8 characters or longer')
            return
        }

        fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                user: username,
                password: userpassword
            })
        })
        .then((res) => res.json()).then((data) => {
            if (data.login) {
                console.log("Login Successful");
                navigate("/test")
            } else {
                console.log("Login Failed!")
                setUsernameError("Username or Password is incorrect!")
            }
        })

        return
    }

    const onRegisterButtonClick = () => {
        navigate("/register")
        return
    }

    return (
        <div className={'mainContainer'}>
        <div className={'titleContainer'}>
            <div>Login</div>
        </div>
        <br />
        <div className={'inputContainer'}>
            <input
            value={username}
            placeholder="Enter your username here"
            onChange={(ev) => setUserName(ev.target.value)}
            className={'inputBox'}
            />
            <label className="errorLabel">{usernameError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
            <input
            value={userpassword}
            placeholder="Enter your password here"
            onChange={(ev) => setUserPassword(ev.target.value)}
            className={'inputBox'}
            />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
            <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
        </div>
        <div className={'inputContainer'}>
            <input className={'inputButton'} type="button" onClick={onRegisterButtonClick} value={'Register'} />
        </div>
        </div>
    )
}

 
export default Login;