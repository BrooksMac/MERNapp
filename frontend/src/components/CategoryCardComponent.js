import {Button, Card} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

/*pass the category and idx into the arrow function*/
const CategoryCardComponent = ({category, idx}) => {
    const images = [
        "/images/games-category.png",
        "/images/monitors-category.png",
        "/images/tablets-category.png",
        "/images/monitors-category.png",
        "/images/games-category.png",
        "/images/monitors-category.png",
        "/images/games-category.png",
        "/images/monitors-category.png"
    ]

return (
    <Card>
        <Card.Img
            crossOrigin="anonymous" /*this allows the image to be seen no matter where the site is hosted*/
            variant="top"
            src={images [idx]}
        />
        <Card.Body>
            <Card.Title>{category}</Card.Title>
            <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
            </Card.Text>
            <LinkContainer to="/productlistpage">
            <Button variant="primary">Go to {category}</Button>
            </LinkContainer>
        </Card.Body>
    </Card>
);
}

export default CategoryCardComponent;