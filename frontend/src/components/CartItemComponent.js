import {Button, Col, FormSelect, Image, ListGroupItem, Row} from "react-bootstrap";

const CartItemComponent = () => {
return (
    <>
    <ListGroupItem>
        <Row>
            <Col md={2}>
                <Image crossOrigin={"anonymous"} src={"/images/games-category.png"} fluid/>
            </Col>
            <Col md={2}>
                Mario <br />
                Anime Figurine
            </Col>
            <Col md={2}>
                <b>$2</b>
            </Col>
            <Col md={3}>
                <FormSelect>
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                </FormSelect>
            </Col>
            <Col md={3}>
                <Button type={"button"} variant={"secondary"} onClick={() => window.confirm("Are you sure?")}><i className={"bi bi-trash"}></i></Button>
            </Col>

        </Row>
    </ListGroupItem>
        <br />
    </>
)
}

export default CartItemComponent;