import { Row, Col, Container, ListGroup, Button } from "react-bootstrap";
import PaginationComponent from "../components/PaginationComponent";
import ProductForListComponent from "../components/ProductForListComponent";
import SortOptionsComponent from "../components/SortOptionsComponent";
import PriceFilterComponent from "../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../components/filterQueryResultOptions/RatingFilterComponent";
import CategoryFilterComponent from "../components/filterQueryResultOptions/CategoryFilterComponent";
import AttributesFilterComponent from "../components/filterQueryResultOptions/AttributesFilterComponent";


const ProductListPage = () => {
    return (
        <Container fluid> {/*makes container contents dynamically full width*/}
            <Row>
                <Col md={3}> {/*left quarter of the screen default width is 12... md means for medium devices*/}
                    <ListGroup variant="flush"> {/*contains all the sorting stuff*/}
                        <ListGroup.Item className="mb-3 mt-3"><SortOptionsComponent /></ListGroup.Item>
                        <ListGroup.Item><PriceFilterComponent /></ListGroup.Item>
                        <ListGroup.Item><RatingFilterComponent /></ListGroup.Item>
                        <ListGroup.Item><CategoryFilterComponent /></ListGroup.Item>
                        <ListGroup.Item>
                            <AttributesFilterComponent />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button variant="primary">Filter</Button>
                            <Button variant="danger">Reset</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={9}> {/*right 3/4 of the screen*/}
                    <Col md={9}>
                        {Array.from({ length: 5}).map((_,idx) => (
                            <ProductForListComponent key={idx}
                                                     images={["games", "monitors", "tablets", "games", "monitors"]}
                                                     idx={idx}
                            />
                        ))}
                        <PaginationComponent />
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductListPage;