import { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import Login from '../Login';

import auth, { userType } from "../../auth/auth";

const Navigation = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Login />
            </Modal>
            <Navbar collapseOnSelect fixed='sticky' expand='sm' bg="dark" variant='dark'>
                <Navbar.Brand href="/">Job Portal</Navbar.Brand>
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            {auth() ? (
                                userType() === "recruiter" ? (
                                    <>
                                        <Nav.Link href='/'>Home</Nav.Link>
                                        <Nav.Link href='/jobs'>Jobs</Nav.Link>
                                        <Nav.Link href='/createjob'>Add Job</Nav.Link>
                                        <Nav.Link href='/myjobs'>Jobs Posted</Nav.Link>
                                        <Nav.Link href='/employees'>Employees</Nav.Link>
                                        <Nav.Link href='/logout'>Logout</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link href='/'>Home</Nav.Link>
                                        <Nav.Link href='/jobs'>Jobs</Nav.Link>
                                        <Nav.Link href='/applications'>Applications</Nav.Link>
                                        <Nav.Link href='/logout'>Logout</Nav.Link>
                                    </>
                                )
                            ) : (
                                <>
                                    <Nav.Link onClick={handleShow}>Login</Nav.Link>
                                    <Nav.Link href='/jobs'>Jobs</Nav.Link>
                                    <Nav.Link href='/signup'>Singup</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;