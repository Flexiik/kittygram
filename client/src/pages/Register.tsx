import { SyntheticEvent, useState } from 'react';
import '../style/form.css'
import { Navigate } from 'react-router-dom';
const Register = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [canRedirect, setCanRedirect] = useState<boolean>(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        })

        setCanRedirect(true)
    }

    if(canRedirect) {
        return <>
        <Navigate to={"/login"} />
        </>
    }

    return (
        <div className="form">
            <h2>Register</h2>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
            <input type="email" placeholder="Email Adress" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button onClick={(e) => submit(e)}>Register</button>
        </div>
    )
}

export default Register;