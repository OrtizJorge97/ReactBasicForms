import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import { Button } from 'react-bootstrap';

export default function Profile() {
    const history = useHistory();
    const [user, setUser] = useState("");

    useEffect(() => {
        let mounted = true;
        async function GetProfile() {
            const options = {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }
            await fetch("http://192.168.0.237:5000/api/protected", options)
            .then(response => { 
                if(response.status === 200) {
                    return response.json();
                }
                else if(response.status === 401) {
                    localStorage.clear();
                    history.push("/login");
                } 
            })
            .then(json => {
                if(mounted) {
                    setUser(() => { 
                        if(json.logged_in_as === undefined) {
                            return "Guest";
                        }
                        else if(json.logged_in_as !== undefined) {
                            return json.logged_in_as;
                        }  
                    });
                }
            })
            .catch(error => console.log("ERROR!! ", error));
        }

        GetProfile();

        return () => mounted = false;
    }, [user]);

    const logOut = (e) => {
        localStorage.clear();
        history.push("/login");
    };

    return(
        <div style={{ textAlign: "center" }}>
            <h1>Hola: {user}</h1>
            <Button onClick={(e) => logOut(e)}>Log Out</Button>
        </div>
    );
}

/*
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: ""
        };

        this.history = useHistory();
    }

    componentDidMount = async() => {
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
        await fetch("http://192.168.0.237:5000/api/protected", options)
        .then(response => response.json())
        .then(json => {
            this.setState({user: json.logged_in_as})
        })
        .catch(error => console.log("ERROR!! ", error));
    }

    render() {
        
        return(
            <div style={{ textAlign: "center" }}>
                <h1>Hola: {this.state.user}</h1>
                <Button onClick={(e) => logOut(e)}>Log Out</Button>
            </div>
        );
    }
}
*/
