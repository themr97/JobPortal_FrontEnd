import { useState } from "react"
import axios from 'axios'
import { Modal, Button, Form } from "react-bootstrap"

import auth from '../../auth/auth'
import api from '../../api/api'


const Login = (props) => {
    const handleClose = props;

    const [loggedin, setLoggedin] = useState(auth());

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });

    const handleInput = (key, value) => {
        setLoginDetails({
            ...loginDetails,
            [key]: value,
        });
    };

    const handleLogin = () => {
        axios.post(api.login, loginDetails).then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("type", response.data.type);
            setLoggedin(auth());
            alert("Logged in successfully")
            console.log(response);
        })
            .catch((err) => {
                alert(err.response)
                console.log(err.response);
            });
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={loginDetails.email}
                            onChange={(event) => handleInput("email", event.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginDetails.password}
                            onChange={(event) => handleInput("password", event.target.value)}
                            required
                        />
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => handleLogin()}>
                    Login
                </Button>
            </Modal.Footer>
        </>
    )
}

export default Login
