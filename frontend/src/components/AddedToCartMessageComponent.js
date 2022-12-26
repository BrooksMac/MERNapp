import {Alert, Button} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";

/*when something is added to cart a pop up is displayed with links to cart*/
const AddedToCartMessageComponent = () => {
const [show, setShow] = useState(true);

if (show) {
    return (
        <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>The product was added to your cart</Alert.Heading>
            <p>
                <Link to={"/cart"}>
                    <Button variant={"success"}>Go Back</Button>{" "}
                </Link>
                <Link to={"/cart"}>
                    <Button variant={"danger"}>Go to Cart</Button>
                </Link>
            </p>
        </Alert>
    );
}
return <Button onClick={() => setShow(true)}>Show Alert</Button>;

}

export default AddedToCartMessageComponent;