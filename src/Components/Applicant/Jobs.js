import { useEffect, useState } from "react";
import { Card, CardColumns, Container, Button } from "react-bootstrap";
import axios from "axios";
import api from "../../api/api";
import { userType } from "../../auth/auth";


const Job = (props) => {

    const { job } = props;
    const sop = 'Null'
    const handleApply = () => {
        console.log(job._id);
        axios
            .post(
                `${api.jobs}/${job._id}/applications`,
                {
                    sop: sop,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((response) => {
                console.log(response.data)
                alert("Applied Successfully")
            })
            .catch((err) => {
                if (err.response.data.message === 'You have already applied for this job') {
                    alert("You have already applied for this job")
                }
            });
    };

    const deadline = new Date(job.deadline).toLocaleDateString();

    const postedOn = new Date(job.dateOfPosting);

    return (
        <CardColumns>
            <Card>
                <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Text>
                        Job Description : {job.desc}
                    </Card.Text>
                    <Card.Text>
                        Salary : {job.salary}
                    </Card.Text>
                    <Card.Text>
                        Date Of Posting: {postedOn.toLocaleDateString()}
                    </Card.Text>
                    <Card.Text>
                        Last Date to Apply : {deadline}
                    </Card.Text>
                    <Card.Text>
                        Posted By : {job.recruiter.name}
                    </Card.Text>
                    <Card.Text>
                        Company Name : {job.recruiter.companyName}
                    </Card.Text>
                    <Card.Text>
                        Contact Number : {job.recruiter.contactNumber}
                    </Card.Text>
                    <Button
                        variant="primary"
                        disabled={userType() === "recruiter"}
                        onClick={() => handleApply()}
                    >Apply</Button>
                </Card.Body>
            </Card>
        </CardColumns>
    );
};



const Jobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {

        let address = api.jobs;

        console.log(address);
        axios
            .get(address, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setJobs(response.data);
            })
            .catch((err) => {
                console.log(err.response.data);
                alert("Error")
            });
    };
    return (
        <Container>
            {jobs.length > 0 ? (
                jobs.map((job) => {
                    return <Job job={job} getData={getData} />;
                })
            ) : (
                <h1 className="display-4">No jobs found</h1>
            )}
        </Container>

    );
};


export default Jobs
