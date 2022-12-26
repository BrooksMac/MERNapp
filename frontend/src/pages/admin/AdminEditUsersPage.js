import {useState} from "react"
import {
    Alert,
    Button,
    CloseButton,
    Col,
    Container,
    Form, FormCheck,
    FormControl,
    FormGroup,
    FormLabel,
    FormSelect, Image,
    Row,
    Table
} from "react-bootstrap";
import {Link} from "react-router-dom";

const AdminEditUsersPage = () => {
    const [validated, setValidated] = useState(false);


    /*This is used by all the formControl's to ensure that everything has been validated*/
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    }

    return (
        <Container>
            <Row className={"mt-5 justify-content-md-center"}>
                <Col md={1}>
                    <Link to={"/admin/productspage"} className={""}>
                        <Button className={"mt-2"}>
                            Go back
                        </Button>
                    </Link>
                </Col>
                <Col md={6}>
                    <h1>
                        Edit User
                    </h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <FormGroup className={"mb-3"} controlId={"formBasicFirstname"}>
                            <FormLabel>First Name</FormLabel>
                            <FormControl name={"firstname"} required type={"text"} defaultValue={"Mark"}/>
                        </FormGroup>
                        <FormGroup className={"mb-3"} controlId={"formBasicLastName"}>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl name={"lastName"} required type={"text"} defaultValue={"Twain"}/>
                        </FormGroup>
                        <FormGroup className={"mb-3"} controlId={"formBasicEmail"}>
                            <FormLabel>Email</FormLabel>
                            <FormControl name={"email"} required type={"text"} defaultValue={"MT@gmail.com"}/>
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formBasicCheckbox">
                            <FormCheck type="checkbox" label="Is admin" />
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            UPDATE
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminEditUsersPage