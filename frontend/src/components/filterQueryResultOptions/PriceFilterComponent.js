import {Form, FormLabel} from "react-bootstrap";

const PriceFilterComponent = () => {
  return (
    <>
        <div>
        <span className="fw-bold">FILTERS</span>
        </div>
      <Form.Label>
        <span className="fw-bold">Price no greater than</span> $500
        </Form.Label>
      <Form.Range min={10} max={1000} step={10} />>
    </>
  );
};

export default PriceFilterComponent;
