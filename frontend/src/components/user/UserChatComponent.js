import "../../chats.css"

const UserChatComponent = () => {
    return <>
            <input type="checkbox" id="check" hidden={true}/>       {/*here we make a checkbox with our icons so that only one appears at a time*/}
            <label className="chat-btn" htmlFor="check">
                <i className="bi bi-chat-dots comment"/> {/*comment and close are names we gave each icon*/}
                {/*red alert icon*/}
                <span className="position-absolute top-0 start-80 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                <i className="bi bi-x-circle close"/>
            </label>
            <div className="chat-wrapper"> {/*here is the title of the chat*/}
                <div className="chat-header">
                    <h6>Let's Chat - Online</h6>
                </div>
                <div className="chat-form"> {/*wrapper*/}

                    <div className="cht-msg"> {/*contains the chat history and the input field and submit button*/}

                        {/*not sure what the point of doing this was other than to see styling*/}
                        {Array.from({length: 20}).map((_,id)=> (
                        <div key={id}>
                            <p>
                                <b>You wrote:</b> Hello, world!
                            </p>
                            <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                                <b>Support Wrote:</b> I'm not world, im support.
                            </p>
                        </div>
                        ))
                        }

                    </div>


                    <textarea
                        id="clientChatMsg"
                        className="form-control"
                        placeholder="Your Text Message"
                    />

                    <button className="btn btn-success btn-block">Submit</button>
                </div>
            </div>
        </>
}

export default UserChatComponent