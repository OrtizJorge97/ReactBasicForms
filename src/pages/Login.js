import React, { useState } from "react";
import { useHistory } from "react-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const token = localStorage.getItem("token");
    const history = useHistory();

    const handleClick = async() => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        };

        await fetch("http://192.168.0.237:5000/api/token", options)
        .then(resp => {
            if(resp.status === 200) { 
                return resp.json();
            }
            else { 
                alert("There has been some error");
            }
        })
        .then(jsonData => {
            console.log("this came from the bakend", jsonData);
            localStorage.setItem("token", jsonData.access_token);
            history.push("/profile");
        })
        .catch(error => {
            console.log("There has been an error!!!!", error);
        });
    };

    return(
        <div style={{ textAlign: "center" }}>
            <h1>Login</h1>
            {(token && token!="" && token!=undefined) ? ("You are logged in with this token " + token):
            ( 
                <div>
                    <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br></br>
                    <button onClick={handleClick}>Login</button>
                </div>
            )}           
        </div>
    );
}