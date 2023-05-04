import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const [credentials, setcredentials] = useState({name:"", email: "", password: "",cpassword:"" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const{name,email,password}=credentials
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password})

        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token',json.authtoken)
            navigate("/");
            props.showAlert("Successfully created account","success")
        }
        else{
            props.showAlert(json.error,"Danger")
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
             <h2>Signup to Continue Todo</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" onChange={onChange} id="name" name= "name" aria-describedby="emailHelp" />
                
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="email" name= "email" aria-describedby="emailHelp" />
                
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="password" name= "password" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="cpassword" name= "cpassword" placeholder="Password"/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup