import { useState } from "react";
import axios from 'axios';
import api from '../../api/api'
import { Col, Container, Form, Row, Button } from "react-bootstrap";

const CreateJob = () => {
    const [jobDetails, setJobDetails] = useState({
        title: "",
        desc: "",
        deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
        salary: 0,
    });

    const handleInput = (key, value) => {
        setJobDetails({
            ...jobDetails,
            [key]: value,
        });
    };

    const handleUpdate = () => {
        console.log(jobDetails);
        axios.post(api.jobs, jobDetails, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            setJobDetails({
                title: "",
                desc: "",
                deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .substr(0, 16),
                duration: 0,
                salary: 0,
            });
            alert("Job Posted successfully!");
        })
            .catch((err) => {
                console.log(err.response);
            });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-info">Post a Job</h1>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter Job Title"
                                label="Name"
                                value={jobDetails.title}
                                onChange={(event) =>
                                    handleInput("title", event.target.value)
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Job Description</Form.Label>
                            <Form.Control
                                as='textarea'
                                row={8}
                                name="desc"
                                placeholder="Enter Job Description"
                                label="Description"
                                value={jobDetails.desc}
                                onChange={(event) =>
                                    handleInput("desc", event.target.value)
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Salary</Form.Label>
                            <Form.Control
                                type="number"
                                name="salary"
                                placeholder="Enter Salary in Rupees"
                                label="Salary"
                                value={jobDetails.salary}
                                onChange={(event) => {
                                    handleInput("salary", event.target.value);
                                }}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control
                                type="date"
                                name="deadline"
                                placeholder="Enter Salary in Rupees"
                                label="Deadline"
                                value={jobDetails.deadline}
                                onChange={(event) => {
                                    handleInput("deadline", event.target.value);
                                }}
                                required
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={() => handleUpdate()}
                        >
                            Post Job
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CreateJob
