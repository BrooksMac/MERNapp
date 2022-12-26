import {Alert, Button, Col, Container, Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";

const UserCartDetailsPage = () => {
    return (
        <Container fluid>
            <Row className={"mt-4"}>
                <h1>Cart Details</h1>
                <Col md={8}>
                    <br />
                    <Row>
                        <Col md={6}>
                            <h2>Shipping</h2>
                            <b>Name</b>: John Doe <br />
                            <b>Address</b>: New Castle, 76 st. <br />
                            <b>Phone</b>: 999 999 9999 <br />
                        </Col>
                        <Col md={6}>
                            <h2>Payment method</h2>
                            <Form.Select>
                                <option value={"pp"}>
                                    PayPal
                                </option>
                                <option value={"cod"}>
                                    Cash on Delivery
                                </option>
                            </Form.Select>
                        </Col>

                        <Row>
                            <Col>
                                <Alert className="mt-3" variant="danger">
                                    Not Delivered. In order to place an order please complete your profile.
                                </Alert>
                            </Col>
                            <Col>
                                <Alert className="mt-3" variant="success">
                                    Not yet paid.
                                </Alert>
                            </Col>
                        </Row>

                        <br />
                        <h2>Order items</h2>
                        <ListGroup variant={"flush"}>
                            {Array.from({length: 3}).map((item, idx)=> (
                                <CartItemComponent key={idx}/>
                            ))}

                        </ListGroup>
                    </Row>
                </Col>

                <Col md={4}>
                    <ListGroup>
                        <ListGroupItem>
                            <h3>Order summary</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            Items price (after tax): <span className={"fw-bold"}>$899</span>
                        </ListGroupItem>
                        <ListGroupItem>
                            Shipping: <span className={"fw-bold"}>included</span>
                        </ListGroupItem>
                        <ListGroupItem>
                            Tax: <span className={"fw-bold"}>included</span>
                        </ListGroupItem>
                        <ListGroupItem className={"text-danger"}>
                            Total price: <span className={"fw-bold"}>$905</span>
                        </ListGroupItem>
                        <ListGroupItem className={"text-danger"}>
                            <div className={"d-grid gap-2"}>
                                <Button size="lg" variant="danger" type={"button"}>
                                    Pay for the order
                                </Button>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>

        </Container>
    )
}

export default UserCartDetailsPage