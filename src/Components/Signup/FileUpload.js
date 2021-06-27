import { useState } from "react";

import { Button, Form } from 'react-bootstrap'

import Axios from "axios";

const FileUpload = (props) => {
    const { uploadTo, identifier, handleInput } = props;
    const [file, setFile] = useState("");
    const handleUpload = () => {
        console.log(file);
        const data = new FormData();
        data.append("file", file);


        Axios.post(uploadTo, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                console.log(response.data);
                handleInput(identifier, response.data.url);
                alert("Uploaded resume")
            })
            .catch((err) => {
                console.log(err.response);
                alert("upload fail")
            });
    };
    return (
        <>
            <Form.Label>Resume</Form.Label>
            <Form.Control
                type="file"
                name="resume"
                placeholder="Upload Resume"
                onChange={(event) => {
                    console.log(event.target.files);
                    setFile(event.target.files[0]);
                }}
                required
            />
            <Button primary onClick={() => handleUpload()}>Upload Resume</Button>
        </>
    )
}

export default FileUpload
