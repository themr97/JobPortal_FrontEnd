import { useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Alert,
} from "react-bootstrap";

import PhoneInput from 'react-phone-input-2'

import { Redirect } from "react-router-dom";

import axios from 'axios'

import api from "../../api/api";
import auth from '../../auth/auth'
import FileUpload from "./FileUpload";


const Signup = () => {

    const [loggedin, setLoggedin] = useState(auth());

    const [signupDetails, setSignupDetails] = useState({
        type: "applicant",
        email: "",
        password: "",
        name: "",
        resume: "",
        bio: "",
        contactNumber: "",
        companyName: "",
    });

    const [phone, setPhone] = useState("");


    const handleInput = (key, value) => {
        setSignupDetails({
            ...signupDetails,
            [key]: value,
        });
    };

    const handleLoginApplicant = () => {

        let updatedDetails = {
            ...signupDetails,
        };

        setSignupDetails(updatedDetails);

        axios.post(api.signup, updatedDetails).then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("type", response.data.type);
            setLoggedin(auth());
            alert("Signed up successfully")
            console.log(response);
            window.location.reload(true);
        })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const handleLoginRecruiter = () => {
        let updatedDetails = {
            ...signupDetails,
        };
        if (phone !== "") {
            updatedDetails = {
                ...signupDetails,
                contactNumber: `+${phone}`,
            };
        } else {
            updatedDetails = {
                ...signupDetails,
                contactNumber: "",
            };
        }

        setSignupDetails(updatedDetails);
        axios
            .post(api.signup, updatedDetails)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("type", response.data.type);
                setLoggedin(auth());
                alert("Signed up successfully")
                console.log(response);
                window.location.reload(true);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    return loggedin ? (
        <Redirect to="/" />
    ) : (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-info">Registration</h1>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Alert>
                    </Alert>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="ControlSelect1">
                            <Form.Label>User Type</Form.Label>
                            <Form.Control
                                as="select"
                                select
                                label="Category"
                                variant="outlined"
                                value={signupDetails.type}
                                onChange={(event) => {
                                    handleInput("type", event.target.value);
                                }}
                            >
                                <option value="recruiter">Recruiter</option>
                                <option value="applicant">Applicant</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Your name"
                                label="Name"
                                value={signupDetails.name}
                                onChange={(event) => handleInput("name", event.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={signupDetails.email}
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
                                value={signupDetails.password}
                                onChange={(event) => handleInput("password", event.target.value)}
                                required
                            />
                        </Form.Group>
                        {signupDetails.type === "applicant" ? (
                            <>
                                <FileUpload
                                    uploadTo={api.uploadResume}
                                    handleInput={handleInput}
                                    identifier={"resume"}
                                />
                            </>
                        ) : (
                            <>
                                <Form.Group>
                                    <Form.Label>Phone No</Form.Label>
                                    <PhoneInput
                                        country={"in"}
                                        value={phone}
                                        onChange={(phone) => setPhone(phone)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="password"
                                        placeholder="Enter Company Name"
                                        value={signupDetails.companyName}
                                        onChange={(event) => handleInput("companyName", event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Company Bio</Form.Label>
                                    <Form.Control
                                        label="Bio (upto 250 words)"
                                        rows={8}
                                        type="text"
                                        as="textarea"
                                        name="password"
                                        placeholder="Enter Company Bio (Max 250 Characters)"
                                        value={signupDetails.bio}
                                        onChange={(event) => {
                                            if (
                                                event.target.value.split(" ").filter(function (n) {
                                                    return n !== "";
                                                }).length <= 250
                                            ) {
                                                handleInput("bio", event.target.value);
                                            }
                                        }}
                                    />
                                </Form.Group>
                            </>
                        )}
                        <Button
                            variant="primary"
                            onClick={() => {
                                signupDetails.type === "applicant"
                                    ? handleLoginApplicant()
                                    : handleLoginRecruiter();
                            }}
                        >
                            Signup
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container >
    )
}

export default Signup
