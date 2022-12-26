import {
    Alert,
    Button,
    CloseButton,
    Col,
    Container,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    FormSelect,
    Row, Table
} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";

const AdminCreateProductPage = () => {

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
                        Create a new Product
                    </h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <FormGroup className={"mb-3"} controlId={"formBasicName"}>
                            <FormLabel>Name</FormLabel>
                            <FormControl name={"name"} required type={"text"}/>
                        </FormGroup>
                        <FormGroup className={"mb-3"} controlId={"exampleForm.ControlTextarea1"}>
                            <FormLabel>Description</FormLabel>
                            <FormControl name={"description"} required as={"textarea"} rows={3}/>
                        </FormGroup>
                        <FormGroup className={"mb-3"} controlId={"formBasicCount"}>
                            <FormLabel>Count in stock</FormLabel>
                            <FormControl name={"count"} required type={"number"} min={"0"}/>
                        </FormGroup>
                        <FormGroup className={"mb-3"} controlId={"formBasicPrice"}>
                            <FormLabel>Price</FormLabel>
                            <FormControl name="price" required type="text"/>
                        </FormGroup>

                        <FormGroup className={"mb-3"} controlId={"formBasicCategory"}>
                            <FormLabel>
                                Category
                                <CloseButton />(<small>remove selected</small>
                            </FormLabel>
                            <FormSelect required name={"category"} aria-label={"Default select example"}>
                                <option value={""}>Choose category</option>
                                <option value={"1"}>Laptops</option>
                                <option value={"2"}>TV</option>
                                <option value={"3"}>Games</option>
                            </FormSelect>
                        </FormGroup>

                        <FormGroup className={"mb-3"} controlId={"formBasicNewCategory"}>
                            <FormLabel>Or create a new category</FormLabel>
                            <Form.Control name="newCategory" type={"text"}/>
                        </FormGroup>

                        <Row className={"mt-5"}>
                            <Col md={6}>
                                <FormGroup className={"mb-3"} controlId={"formBasicAttributes"}>
                                    <FormLabel>Choose attribute and set value</FormLabel>
                                    <FormSelect name={"attrKey"} aria-label={"Default select example"}>
                                        <option>Choose attribute</option>
                                        <option value={"red"}>Color</option>
                                    </FormSelect>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup className={"mb-3"} controlId={"formBasicAttributeValue"}>
                                    <FormLabel>Attribute value</FormLabel>
                                    <FormSelect name={"attrVal"} aria-label={"Default select example"}>
                                        <option>Choose attribute value</option>
                                        <option value={"red"}>Color</option>
                                    </FormSelect>
                                </FormGroup>
                            </Col>

                            <Row>
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>Attribute</th>
                                            <th>Value</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>attr key</td>
                                            <td>attr value</td>
                                            <td><CloseButton /></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <FormGroup className={"mb-3"} controlId={"formBasicNewAttribute"}>
                                        <FormLabel>Create new attribute</FormLabel>
                                        <Form.Control disabled={false} placeholder={"first choose or create category"} name="newAttrValue" type={"text"}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className={"mb-3"} controlId={"formBasicNewAttributeValue"}>
                                        <FormLabel>Attribute value</FormLabel>
                                        <Form.Control disabled={false} placeholder={"first choose or create category"} name="newAttrValue" type={"text"}/> {/*this has the same name can't be right*/}
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Alert variant={"primary"}>
                                After typing attribute key and value press enter on one of the fields
                            </Alert>

                        </Row>

                        <FormGroup className={"mb-3 mt-3"} controlId={"formFileMultiple"}>
                            <FormLabel>Images</FormLabel>
                            <Form.Control type="file" multiple required/>
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminCreateProductPage