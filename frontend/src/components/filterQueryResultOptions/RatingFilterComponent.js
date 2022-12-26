import {Form} from "react-bootstrap";
import {Fragment} from "react";
import {Rating} from "react-simple-star-rating";


const RatingFilterComponent = () => {
  return (
      <>
        <span className="fw-bold">Rating</span>
        {/*rather than creating this form 5 times with different values we can do this*/}
        {Array.from({length: 5}).map((_, idx) => (
            <Fragment key={idx}>
              <Form.Check type="checkbox" id={`check-api-${idx}`}> {/*allegedly $idx needed to be added here to make the boxes unique, it worked otherwise though*/}
                <Form.Check.Input type="checkbox" isValid />
                <Form.Check.Label style={{cursor: "pointer"}}>
                  <Rating readonly size={20} initialValue={5-idx}/> {/*5-idx allows us to use the idx value from the array to set how many stars*/}
                </Form.Check.Label>
              </Form.Check>
            </Fragment>
        ))}
      </>
  );
};

export default RatingFilterComponent;
