import {Card, Button, Row, Col} from "react-bootstrap";
import {Rating} from "react-simple-star-rating";
import { LinkContainer} from "react-router-bootstrap";
import PaginationComponent from "./PaginationComponent";


const ProductForListComponent = ({images,idx}) => {
    return (
        <Card
            style={{
                marginTop: "30px",
                marginBottom:"50px"}}>
            <Row>
                {/*default width is 12.  the picture gets 5, the description gets 7.  If these cannot fit beside each other they will go above and below each other*/}
                <Col lg={5}>
                    {/*using the images array to map out the images to be displayed*/}
                    <Card.Img crossOrigin="anonymous" variant="top" src={"/images/"+images[idx]+"-category.png"} />
                </Col>
                <Col lg={7}>
                    <Card.Body>
                        <Card.Title>Product Name</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Card.Text>
                            <Rating readonly
                                    size={20}
                                    initialValue={5}/> (1)
                        </Card.Text>

                        <Card.Text className={"h4"}>
                            $500{" "}
                            <LinkContainer to="/productdetailspage">
                                <Button variant={"danger"}>See Product</Button>
                            </LinkContainer>
                        </Card.Text>

                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default ProductForListComponent;
