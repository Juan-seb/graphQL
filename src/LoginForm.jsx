import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from './login/graphql-mutations';

const initialStateLogin = {
    username: "",
    password: ""
}

const LoginForm = ({ notifyError, setToken }) => {

    const [formData, setFormData] = useState(initialStateLogin);
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            notifyError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        
        if (result.data) {
            const { value: token } = result.data.login
            setToken(token)
            window.localStorage.setItem('user-token',token)
        }
    }, [result])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await login({
            variables: {
                username: formData.username,
                password: formData.password
            }
            
        })

        if (response.data) {
            const { value: token } = response.data.login
            setToken(token)
            window.localStorage.setItem('user-token',token)
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={formData.username}
                    onChange={handleChange}
                    name="username"
                    placeholder="Username"
                />
                <input type="text"
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Ingrese contraseña"
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )

}

export default LoginForm