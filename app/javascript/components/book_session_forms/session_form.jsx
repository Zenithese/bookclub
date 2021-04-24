import React, { useState } from 'react'

function SessionForm(props) {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const demo = () => {
        const user = {
            username: "Demo",
            email: "Demo@internet.com",
            password: "password"
        }
        props.processForm(user);
    }

    const update = (field) => {
        return e => {
            if (field === 'username or email') {
                setUsername(e.target.value)
                setEmail(e.target.value)
            } else if (field === 'username') {
                setUsername(e.target.value)
            } else if (field === 'email') {
                setEmail(e.target.value)
            } else if (field === 'password') {
                setPassword(e.target.value)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username,
            email,
            password,
        }
        props.processForm(user);
    }

    let appropriateCredentials = props.formType === 'login' ? (
        <div>
            <label></label>
            <input type="text" value={username} onChange={update('username or email')} placeholder="Username or email"/>
        </div>
    ) : (
        <div>
            <div>
                <label></label>
                    <input type="text" value={username} onChange={update('username')} placeholder="Username" />
            </div>
            <div>
                <label></label>
                    <input type="email" value={email} onChange={update('email')} placeholder="Email" />
            </div>
        </div>
    )

    return (
        <div>
            <form className="session-form" onSubmit={(e) => handleSubmit(e)}>
                {appropriateCredentials}
                <div>
                    <label></label>
                    <input type="password" value={password} onChange={update('password')} placeholder="Password" />
                </div>
                <input type="submit" value={props.formType} />
                <br />
                {/* {props.otherForm} */}
            </form>
            {
                props.formType === 'login' &&
                <div className="login-demo-container">
                    <span>or</span>
                    <button onClick={demo}>Demo</button>
                </div>
            }
        </div>
    )
}

export default SessionForm;