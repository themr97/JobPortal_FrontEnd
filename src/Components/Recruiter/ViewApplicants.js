import axios from 'axios'
import { useEffect, useState } from 'react';

import { Container, Card, Button, CardColumns } from "react-bootstrap";
import api, { server } from '../../api/api';
import { useParams } from "react-router-dom";

const ApplicationTile = (props) => {

    const { application } = props;

    const appliedOn = new Date(application.dateOfApplication);


    const getResume = () => {
        if (
            application.jobApplicant.resume &&
            application.jobApplicant.resume !== ""
        ) {
            const address = `${server}${application.jobApplicant.resume}`;
            console.log(address);
            axios(address, {
                method: "GET",
                responseType: "blob",
            })
                .then((response) => {
                    const file = new Blob([response.data], { type: "application/pdf" });
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error")
                });
        } else {
            alert("Resume not found")
        }
    };

    return (
        <CardColumns>
            <Card>
                <Card.Body>
                    <Card.Title>Applicant Name: {application.jobApplicant.name}</Card.Title>
                    <Card.Text>
                        Applied On: {appliedOn.toLocaleDateString()}
                    </Card.Text>
                    <Button
                        color="primary"
                        onClick={() => getResume()}
                    >
                        Download Resume
                    </Button>
                </Card.Body>
            </Card>
        </CardColumns>
    )
};

const ViewApplicants = (props) => {
    const [applications, setApplications] = useState([]);
    const { jobId } = useParams();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        let address = `${api.applicants}?jobId=${jobId}`;

        console.log(address);

        axios
            .get(address, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setApplications(response.data);
            })
            .catch((err) => {
                console.log(err.response);
                // console.log(err.response.data);
                setApplications([]);
                alert("Applicants not found")
            });
    };

    return (
        <>
            <Container>
                <p className="display-4">Applications</p>
                {applications.length > 0 ? (
                    applications.map((obj) => (
                        <ApplicationTile application={obj} getData={getData} />
                    ))
                ) : (
                    <p>
                        No Applications Found
                    </p>
                )}
            </Container>
        </>
    );
};

export default ViewApplicants;