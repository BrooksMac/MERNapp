import {Carousel} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";


const ProductCarousel = () => {

    /*here we make a link change the cursor when hovered and then put it in the Link tag as a style*/
    const cursorP = {
        cursor: "pointer"
    }
        return (
    <Carousel>


        <Carousel.Item>
            <img
                crossOrigin="anonymous" /*this allows the image to be seen no matter where the site is hosted*/
                className="d-block w-100"
                src="/images/carousel/carousel-1.png"
                alt="First slide"
                style={{height: "300px"}}   /*JSX styling to make the image in the caroused less tall*/
            />
            <Carousel.Caption>
                {/*Here we set cursorP as the style for this link*/}
                <LinkContainer style={cursorP} to="/productdetailspage">
                    <h3>Bestseller in Laptops</h3>
                </LinkContainer>
                <p>Roku Reader 6900.</p>
            </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item>
            <img
                className="d-block w-100"
                src="/images/carousel/carousel-2.png"
                alt="Second slide"
                style={{height: "300px"}}
            />

            <Carousel.Caption>
                <LinkContainer style={cursorP} to="/productdetailspage">
                    <h3>Bestseller in Books</h3>
                </LinkContainer>
                <p>Harry Plopper.</p>
            </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item>
            <img
                className="d-block w-100"
                src="/images/carousel/carousel-3.png"
                alt="Third slide"
                style={{height: "300px"}}
            />

            <Carousel.Caption>
                <LinkContainer style={cursorP} to="/productdetailspage">
                    <h3>Bestseller in Cameras</h3>
                </LinkContainer>
                <p>Drawing a picture of yourself in the mirror.</p>
            </Carousel.Caption>
        </Carousel.Item>


    </Carousel>
);
}

export default ProductCarousel;