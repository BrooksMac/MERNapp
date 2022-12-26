import { Form } from "react-bootstrap";

const AttributesFilterComponent = () => {
  return (
    <>
        {/*here we create two arrays in a single array and map them both*/}
        {[{color: ["red", "blue", "green"]},{ram: ["1 TB", "2 TB"]}].map((item, idx) => (

            <div key={idx} className="mb-3">

                {/*here is where the names of the arrays will be displayed aka the labels*/}
                <Form.Label>
                    <b>
                        {Object.keys(item)}
                    </b>
                </Form.Label>

                {/*here is where the contents of the 2 arrays get dynamically placed under the appropriate header and displayed*/}
                {/*the first item refers to the label the second item refers to the items found within that label*/}
                {item[Object.keys(item)].map((item, idx) => (

                    <Form.Check key={idx}
                                type="checkbox"
                                label={item}
                    />
                ))}
            </div>
        ))}
    </>
  );
};

export default AttributesFilterComponent;
