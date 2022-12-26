import {Col, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";

const AdminOrdersPage = () => {
    return (
        <Row className={"m-5"}>
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            <Col md={10}>
                <h1>Orders</h1>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Delivered</th>
                        <th>Payment method</th>
                        <th>Order Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map((item, idx) => (

                        <tr key={idx}>
                            <td>{idx +1}</td>
                            <td >Mark Twain</td>  {/*colSpan={2} was removed from here to make this col become the size of 2*/}
                            <td>2022-09-12</td>
                            <td>$125</td>
                            <td><i className={item}></i> </td> {/*from the mapped array above the first icon will be the first item and second item will be second*/}
                            <td>PayPal</td>
                            <td>
                                <Link to={"/admin/orderdetailspage"}>go to order</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default AdminOrdersPage