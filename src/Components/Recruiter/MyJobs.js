import { useEffect, useState } from "react";
import { Card, CardColumns, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import api from "../../api/api";


const Job = (props) => {
    let history = useHistory();

    const { job } = props;

    const handleClick = (location) => {
        history.push(location);
    };

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
                    <Button
                        variant="primary"
                        onClick={() => handleClick(`/job/applications/${job._id}`)}
                    >View Applications</Button>
                </Card.Body>
            </Card>
        </CardColumns>
    );
};



const MyJobs = () => {
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


export default MyJobs
