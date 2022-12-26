import {
    Navbar,
    Nav,
    Container,
    NavDropdown,
    Badge,
    Form,
    DropdownButton,
    Dropdown,
    Button,
    InputGroup
} from "react-bootstrap";

import {LinkContainer} from 'react-router-bootstrap';
import {Link} from "react-router-dom";




const HeaderComponent = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>

                {/*This stops the button from reloading the page if it is the current page*/}
                <LinkContainer to="/">
                    <Navbar.Brand href="/"> Brooks's Shop </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                        <InputGroup> {/*this holding tag is for formatting*/}

                        <DropdownButton id="dropdown-basic-button" title="All">
                            <Dropdown.Item>Electronics</Dropdown.Item>
                            <Dropdown.Item>Books</Dropdown.Item>
                            <Dropdown.Item>Cars</Dropdown.Item>
                        </DropdownButton>

                        <Form.Control type="text" placeholder="Search..." /> {/*search input*/}
                        <Button variant="warning"> <i className="bi bi-search"></i> </Button>{' '} {/*search button from boostrap*/}

                        </InputGroup>

                    </Nav> {/*this nav was split into two to make the header look more uniform*/}
                    <Nav>

                        {/*Using LinkContainer to send to another page, still doesn't reload page*/}
                        <LinkContainer to="/admin/orderspage">
                        <Nav.Link> Admin
                            {/*This will create a bubble to alert Admin's of a chat message*/}
                        <span
                            className="position-absolute top-1 start-2 translate-middle p-2 bg-danger border-light rounded-circle" >
                        </span>
                        </Nav.Link>
                        </LinkContainer>

                        <NavDropdown title="John Doe" id="collasible-nav-dropdown">
                            {/*make the drop down items highlight if on the current page and enable them to bring you to other pages*/}
                            <NavDropdown.Item eventKey="/user/orderspage" as={Link} to="/user/orderspage">My orders</NavDropdown.Item>
                            <NavDropdown.Item eventKey="/user/profilepage" as={Link} to="/user/profilepage">My profile</NavDropdown.Item>
                            <NavDropdown.Item >Logout</NavDropdown.Item>
                        </NavDropdown>

                        <LinkContainer to="/loginpage">
                            <Nav.Link> Login </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/registerpage">
                            <Nav.Link> Register </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/cartpage">
                            <Nav.Link> <i className="bi bi-cart"></i> Cart
                                <span className="ms-1">
                                <Badge pill bg="danger"> {/*added component with the constant 2*/}
                                    2
                                </Badge>
                                </span>
                            </Nav.Link>
                        </LinkContainer>


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderComponent;

