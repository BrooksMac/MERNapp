import {Button, Col, Row, Table} from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import {Link} from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';

const deleteHandler = () => {
    if(window.confirm("Are you sure?")) alert("User deleted!");
}

const AdminUsersPage = () => {
    return (
        <Row className={"m-5"}>
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            <Col md={10}>
                <h1>Users</h1>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Is Admin</th>
                        <th>Edit/Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map((item, idx) => (

                        <tr key={idx}>
                            <td>{idx +1}</td>
                            <td >Mark</td>  {/*colSpan={2} was removed from here to make this col become the size of 2*/}
                            <td>Twain</td>
                            <td>MT@gmail.com</td>
                            <td><i className={item}></i> </td> {/*from the mapped array above the first icon will be the first item and second item will be second*/}
                            <td>
                                <LinkContainer to={"/admin/edituserspage"}>
                                <Button className={"btn-sm"}><i className={"bi bi-pencil-square"}></i> </Button>
                                </LinkContainer>
                                {" / "}
                                <Button variant={"danger"} className={"btn-sm"} onClick={deleteHandler}><i className={"bi bi-x-circle"}></i> </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default AdminUsersPage