import { Link } from 'react-router-dom';
import './Navbar.css'
import React from 'react';

const Navbar = (props: { name: string, setName: (name: string) => void }) => {
    const logout = async () => {
        await fetch('http://localhost:8080/auth/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        props.setName('')
    }

    let menu;

    if(props.name === '') {
        menu = (
            <>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
            </>
        )
    } else if(props.name !== '') {
        menu = (
            <>
                <Link to={'/cats'}>Kittens</Link>
                <Link to={"/"} onClick={logout}>Logout</Link>
            </>
        )
    }

    return (
        <nav>
            <Link to={"/"}>CATS</Link>
            <div>
                {menu}
            </div>
        </nav>
    )
}

export default Navbar;