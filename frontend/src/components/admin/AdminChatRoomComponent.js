import {Button, FormControl, FormGroup, FormLabel, Toast, ToastBody, ToastHeader} from "react-bootstrap";
import {useState} from "react";


const AdminChatRoomComponent = () => {

    const[toast1, closeToast1] = useState(true)
    const close1 = () => closeToast1(false)
    const[toast2, closeToast2] = useState(true)
    const close2 = () => closeToast2(false)

    return (
        <>
        <Toast show={toast1} onClose={close1} className={"ms-4 mb-5"}>
            <ToastHeader>
                <strong className={"me-auto"}>Chat with Mark Twain</strong> {/*me-auto places the x on the right top corner*/}
            </ToastHeader>
        <ToastBody>
            <p className={"bg-primary p-3 ms-4 rounded-pill"}>
                <b>Mark Twain:</b> Hello world!
            </p>
            <p>
                <b>Admin:</b> I'm not world
            </p>
            <FormGroup className={"mb-3"} controlId={"exampleForm.ControlTextarea1"}>
                <FormLabel>Write a message</FormLabel>
                <FormControl as={"textarea"} rows={2}/>
            </FormGroup>
            <Button variant={"success"} type={"submit"}>
                Submit
            </Button>
        </ToastBody>
        </Toast>

            <Toast show={toast2} onClose={close2} className={"ms-4 mb-5"}>
                <ToastHeader>
                    <strong className={"me-auto"}>Chat with John Doe</strong> {/*me-auto places the x on the right top corner*/}
                </ToastHeader>
                <ToastBody>
                    <p className={"bg-primary p-3 ms-4 rounded-pill"}>
                        <b>John Doe:</b> Hello world!
                    </p>
                    <p>
                        <b>Admin:</b> I'm not world
                    </p>
                    <FormGroup className={"mb-3"} controlId={"exampleForm.ControlTextarea1"}>
                        <FormLabel>Write a message</FormLabel>
                        <FormControl as={"textarea"} rows={2}/>
                    </FormGroup>
                    <Button variant={"success"} type={"submit"}>
                        Submit
                    </Button>
                </ToastBody>
            </Toast>
        </>
    )
}

export default AdminChatRoomComponent;