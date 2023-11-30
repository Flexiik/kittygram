import { SyntheticEvent, useState } from 'react';
import '../style/form.css'
import { Navigate } from 'react-router-dom';
const Login = (props: { setName: (name: string) => void }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [canRedirect, setCanRedirect] = useState<boolean>(false);

    const submit = async (e: SyntheticEvent) => {
        if(email !== '' && password !== '') {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const content = await response.json();
            props.setName(content.name);
            setCanRedirect(true)
        }
    }

    if (canRedirect) {
      return (
        <>
          <Navigate to={"/login"} replace />
        </>
      );
    }

    return (
        <div className="form">
            <h2>Please Sign In</h2>
            <input type="email" placeholder="Email Adress" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type='submit' onClick={(e) => {
                e.preventDefault()
                submit(e)
            }}>Sign In</button>
        </div>
    )
}

export default Login;