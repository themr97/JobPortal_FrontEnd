import { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import Login from '../Login';

// import isAuth, { userType } from "../lib/isAuth";

const Navigation = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isAuth = false;

    const userType = 'job';

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Login handleClose={handleClose} />
            </Modal>
            <Navbar collapseOnSelect fixed='sticky' expand='sm' bg="dark" variant='dark'>
                <Navbar.Brand href="/">Job Portal</Navbar.Brand>
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            {isAuth ? (
                                userType === "recruiter" ? (
                                    <>
                                        <Nav.Link href='/'>Home</Nav.Link>
                                        <Nav.Link href='/addjob'>Add Job</Nav.Link>
                                        <Nav.Link href='/myjobs'>Jobs Posted</Nav.Link>
                                        <Nav.Link href='/employees'>Employees</Nav.Link>
                                        <Nav.Link href='/profile'>Profile</Nav.Link>
                                        <Nav.Link href='/logout'>Logout</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link href='/'>Home</Nav.Link>
                                        <Nav.Link href='/applications'>Applications</Nav.Link>
                                        <Nav.Link href='/profile'>Profile</Nav.Link>
                                        <Nav.Link href='/logout'>Logout</Nav.Link>
                                    </>
                                )
                            ) : (
                                <>
                                    <Nav.Link onClick={handleShow}>Login</Nav.Link>
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