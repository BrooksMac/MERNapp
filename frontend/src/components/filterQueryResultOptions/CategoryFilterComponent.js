import { Form } from "react-bootstrap";

const CategoryFilterComponent = () => {
  return (
      <>
        <span className={"fw-bold"}>Category</span>
    <Form>
      {/*we use underscore in the first slot because we simply don't care to use it*/}
      {Array.from({length: 5}).map((_, idx) => (
        <div key={idx} className="mb-3"> {/*gotta make sure to define the key */}
          <Form.Check type="checkbox" id={`check-api2-${idx}`}> {/*added idx here again BUT changed api to api2 since the id was the same as the checkbox*/}
            <Form.Check.Input type={"checkbox"} isValid /> {/*if this is broken its because checkbox shouldn't be wrapped in {}*/}
            <Form.Check.Label style={{cursor: "pointer"}}>Category {idx+1}</Form.Check.Label>
          </Form.Check>
        </div>
      ))}
    </Form>
      </>
  );
};

export default CategoryFilterComponent;
