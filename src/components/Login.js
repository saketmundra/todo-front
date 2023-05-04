import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    let navigate = useNavigate();


    const [credentials, setcredentials] = useState({ email: "", password: "" })


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token',json.authtoken)
            navigate("/");
            props.showAlert("Login Successfull","success")
        }
        else{
            props.showAlert(json.error,"danger")
        }

    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <h2>Login to Continue iNotebook</h2>
            <form onSubmit={handleSubmit}  >
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" value={credentials.email} onChange={onChange} className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="passoword">Password</label>
                    <input type="password" value={credentials.password} onChange={onChange} className="form-control" id="password" name='password' placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login