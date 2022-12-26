import {Button, Col, Row, Table} from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";

/*asks for confirmation if the item should in fact be deleted*/
const deleteHandler = () => {
    if(window.confirm("Are you sure?")) alert("Product deleted!")
}

const AdminProductsPage = () => {
    return (
        <Row className={"m-5"}>
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            <Col md={10}>
                <h1>Product list {" "}
                    <LinkContainer to={"/admin/createproductpage"}>
                        <Button variant={"primary"} size={"lg"}>
                            Create new
                        </Button>
                    </LinkContainer>
                </h1>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Edit/Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[{name: "Panasonice", price: "$250", category: "TV"},
                        {name: "Lenovo", price: "$500", category: "Laptops"},
                        {name: "GTA 10", price: "$20", category: "games"}
                    ].map((item, idx) => (
                        <tr key={idx}>
                            <td>{idx +1}</td>
                            <td>{item.name}</td>  {/*colSpan={2} was removed from here to make this col become the size of 2*/}
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>
                                <LinkContainer to={"/admin/editproductpage"}>
                                    <Button className={"btn-sm"}>
                                        <i className={"bi bi-pencil-square"}></i>
                                    </Button>
                                </LinkContainer>
                                {" / "}
                                <Button variant={"danger"} className={"btn-sm"} onClick={deleteHandler}> {/*see deleteHandler above*/}
                                    <i className={"bi bi-x-circle"}></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default AdminProductsPage