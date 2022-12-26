import {Alert, Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState} from "react";

const LoginPage = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);


    };
    return (
        <Container>
            <Row className={"mt-5"}>
                <Col md={6}>
                    <h1>Login</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className={"mb-3"} controlId={"formBasicEmail"}> {/*these should be unique*/}
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                                name={"email"}
                            />
                            <Form.Control.Feedback type={"invalid"}>Please enter an email!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className={"mb-3"} controlId={"formBasicPassword"}> {/*these should be unique*/}
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Enter password"
                                name={"password"}
                            />
                        </Form.Group>

                        <Form.Group className={"mb-3"} controlId={"formBasicCheckbox"}> {/*these should be unique*/}
                            <Form.Check
                                type="checkbox"
                                name={"doNotLogout"}
                                label={"Do not logout?"}
                            />
                        </Form.Group>

                        <Row className={"pb-2"}>
                            <Col>
                                Need to register?
                                <Link to={"/registerpage"}> Register </Link>
                            </Col>
                        </Row>

                        <Button variant={"primary"} type="submit">
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Login</Button>
                        <Alert show={true} variant={"danger"}>Wrong credentials</Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage