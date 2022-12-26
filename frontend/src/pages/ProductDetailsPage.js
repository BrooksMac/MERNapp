import {useParams} from "react-router-dom";
import {Button, Col, Container, Image, ListGroup, ListGroupItem, Row, Form, Alert} from "react-bootstrap";
import {Rating} from "react-simple-star-rating";

import ImageZoom from "js-image-zoom";
import {useEffect} from "react";

const ProductDetailsPage = () => {

    const options = {
        /*width: 400,
        zoomWidth: 500,
        fillContainer: true,
        zoomPosition: "bottom",*/
        scale: 2,
        offset: {vertical: 0, horizontal: 0}
    };

    useEffect(() => {
        new ImageZoom(document.getElementById("first"), options)
        new ImageZoom(document.getElementById("second"), options)
        new ImageZoom(document.getElementById("third"), options)
        new ImageZoom(document.getElementById("fourth"), options)
    })

    /*container adds some space on the left and right sides*/
    return(
        <Container>
        <Row className={"mt-5"}> {/*mt is margin top*/}

            <Col style={{zIndex: 1}} md={4}>
                <div id="first">
                    <Image crossOrigin={"anonymous"} fluid src={"/images/games-category.png"}/> {/*Fluid causes the image to scale its size to whats holding it*/}
                </div>
                <br />
                <div id="second">
                    <Image crossOrigin={"anonymous"} fluid src={"/images/monitors-category.png"}/>
                </div>
                <br />
                <div id="third">
                    <Image crossOrigin={"anonymous"} fluid src={"/images/tablets-category.png"}/>
                </div>
                <br />
                <div id="fourth">
                    <Image crossOrigin={"anonymous"} fluid src={"/images/games-category.png"}/>
                </div>
            </Col>

            {/*ListGroup makes nicely formatted lists, better than <ol> <li> */}
            <Col md={8}>
                <Row>
                    <Col md={8}>
                        <ListGroup variant={"flush"}>
                            <ListGroupItem><h1>Product Title</h1></ListGroupItem>
                            <ListGroupItem>
                                <Rating readonly size={20} initialValue={4} /> (1)
                            </ListGroupItem>
                            <ListGroupItem>
                                Price <span className={"fw-bold"}>$345</span>
                            </ListGroupItem>
                            <ListGroupItem>
                                Description of product
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <ListGroup>
                            <ListGroupItem>
                                Status: in stock
                            </ListGroupItem>
                            <ListGroupItem>
                                Price: <span className={"fw-bold"}>$345</span>
                            </ListGroupItem>
                            <ListGroupItem>
                                Quantity:
                                <Form.Select aria-label="Default select example">
                                    <option>1</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </Form.Select>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button variant={"danger"}>Add to Cart</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>

                <Row>
                    <Col className={"mt-5"}>
                        <h5>REVIEWS</h5>
                        <ListGroup variant={"flush"}>
                            {Array.from({length: 5}).map((item, idx) => (
                                <ListGroupItem key={idx}>
                                    Person's name
                                    <br />
                                    <Rating readonly size={20} initialValue={4}/>
                                    <br />
                                    Date of review
                                    <br />
                                    Contents of review
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
                <hr />
                send review form
                <Alert variant={"danger"}>Login first to write a review</Alert>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                        <Form.Label>Write a Review</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Select aria-label="Default select example">
                        <option>Your rating</option>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </Form.Select>
                    <Button className={"mb-3 mt-3"} variant="primary">Submit</Button>
                </Form>
            </Col>

        </Row>

        </Container>
    )




}

export default ProductDetailsPage