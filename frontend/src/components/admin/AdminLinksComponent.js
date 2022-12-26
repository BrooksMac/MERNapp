import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"

const AdminLinksComponent = () => {
    return (

        /*Nav is needed when placing many links together*/
        /*Navbar changes background color*/
        <Navbar bg={"light"} variant={"light"}>
            <Nav className={"flex-column"}>
                {/* LinkContainer ensures page is not reloaded*/}
                <LinkContainer to={"/admin/orderspage"}>
                    <Nav.Link>Orders</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/admin/productspage"}>
                    <Nav.Link>Products</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/admin/userspage"}>
                    <Nav.Link>Users</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/admin/chatspage"}>
                    <Nav.Link>Chats</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/admin/analyticspage"}>
                    <Nav.Link>Analytics</Nav.Link>
                </LinkContainer>
                <Nav.Link>Logout</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default AdminLinksComponent;