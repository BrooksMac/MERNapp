import ProductCarousel from "../components/ProductCarousel";
import CategoryCardComponent from "../components/CategoryCardComponent";
import {Row, Container} from "react-bootstrap";
import UserChatComponent from "../components/user/UserChatComponent";

const HomePage = () => {
    /*this is what the database will look like, we are simulating one with this*/
    const categories = [
        "Tablets",
        "Monitors",
        "Games",
        "Printers",
        "Software",
        "Cameras",
        "Books",
        "Videos"
    ];
    return (
        <>
            <ProductCarousel/>
            {/*JSX that allows all the categories listed above to be mapped out to a Card component*/}
            {/*This row tag means that a xs device like a phone will show 1 card along its width md = medium device*/}
            {/*Lots of little adjustments to make it look purty in the className*/}
            <Container>
            <Row xs={1} md={2} className="g-4 mt-5">
                {/*setting the props of the array to be category for String and idx for index then passing them to the CategoryCardComponent*/}
                {
                    categories.map((category, idx) => <CategoryCardComponent key={idx} category={category} idx={idx} /> )
                }
            </Row>
            </Container>
        </>
    )
}

export default HomePage