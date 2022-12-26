import {Col, Container, Form, Button, Row, InputGroup, Alert} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom"
import {Spinner} from "react-bootstrap";


const UserProfilePage = () => {


    /*responsible for making sure passwords match*/
    const [validated, setValidated] = useState(false);

    const onChange = () => {
        const password = document.querySelector("input[name=password]")
        const  confirmPassword = document.querySelector("input[name=confirmPassword]")
        if(confirmPassword.value === password.value()){
            confirmPassword.setCustomValidity("")
        } else {
            confirmPassword.setCustomValidity("Passwords do not match")
        }
    }



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
                    <h1>User Profile</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className={"mb-3"} controlId="formBasicFirstName"> {/*this was removed from here to make it longer as={Col} md="4"*/}
                            <Form.Label>Your first name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue="John"
                                name={"firstName"}
                            />
                            <Form.Control.Feedback type={"invalid"}>Please enter your first name!</Form.Control.Feedback> {/*this works in conjunction with the required attribute above*/}
                        </Form.Group>

                        <Form.Group className={"mb-3"} controlId={"formBasicLastname"}> {/*these should be unique*/}
                            <Form.Label>Your last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                 defaultValue="Doe"
                                name={"lastName"}
                            />
                            <Form.Control.Feedback type={"invalid"}>Please enter your last name!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className={"mb-3"} controlId={"formBasicEmail"}> {/*these should be unique*/}
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                disabled
                                value={"Account must be deleted to change email"}
                            />
                        </Form.Group>

                        <Form.Group className={"mb-3"} controlId={"formBasicPhone"}> {/*these should be unique*/}
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={"Enter your phone number"}
                                defaultValue={""}
                            />
                        </Form.Group>

                        <Form.Group className={"mb-3"} controlId={"formBasicAddress"}> {/*these should be unique*/}
                            <Form.Label>Addressr</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={"Enter your street name and house number"}
                                defaultValue={""}
                            />
                        </Form.Group>

                        <Form.Group className={"mb-3"} controlId={"formBasicCountry"}> {/*these should be unique*/}
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={"Enter your Country"}
                                defaultValue={""}
                            />
                        </Form.Group>

                        <Form.Group className={"mb-3"} controlId={"formBasicZip"}> {/*these should be unique*/}
                            <Form.Label>Zip</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={"Enter your Zip code"}
                                defaultValue={""}
                            />
                        </Form.Group>

                        <Form.Group className={"mb-3"} controlId={"formBasicCity"}> {/*these should be unique*/}
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={"Enter your City"}
                                defaultValue={""}
                            />
                        </Form.Group>

                        <Form.Group className={"mb-3"} controlId={"formBasicState"}> {/*these should be unique*/}
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={"Enter your State"}
                                defaultValue={""}
                            />
                        </Form.Group>


                        <Form.Group className={"mb-3"} controlId={"formBasicPassword"}> {/*these should be unique*/}
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Enter password"
                                name={"password"}
                                minLength={6}
                                onChange={onChange}
                            />
                            <Form.Control.Feedback type={"invalid"}>Please enter a valid password!</Form.Control.Feedback>
                            <Form.Text className={"text-muted"}>
                                Password should have at least 6 characters.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className={"mb-3"} controlId={"formBasicPasswordRepeat"}> {/*these should be unique*/}
                            <Form.Label>Re-enter Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Re-enter password"
                                name={"confirmPassword"}
                                minLength={6}
                                onChange={onChange} /*This is used to make sure passwords match {nameOfFunction above}*/
                            />
                            <Form.Control.Feedback type={"invalid"}>Please ensure both passwords match!</Form.Control.Feedback>
                        </Form.Group>


                        <Button variant={"primary"} type="submit">
                            Submit</Button>
                        <Alert show={true} variant={"info"}>User updated!</Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default UserProfilePage