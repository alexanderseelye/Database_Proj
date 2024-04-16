import React from "react";
import {useNavigate} from "react-router-dom"



function NavBar(props) {

    const navigate = useNavigate();

    const GoHome = () => {
        navigate("/home")
    }

    return (
        <div>
            <button onClick={GoHome}>HOME</button>
        </div>

    )
}
 
export default NavBar;