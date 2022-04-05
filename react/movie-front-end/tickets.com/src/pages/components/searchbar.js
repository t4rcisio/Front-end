import { FormControl, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";

const SearchBar = ({ getUser }) => {
  const [userName, setUsername] = useState("");
  const nameDebounce = useDebounce(userName, 500);

  const userNameInput = (event) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    console.log(nameDebounce);
  }, [nameDebounce]);

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "30px" }}
      >
        <div style={({ marginRight: "5px" }, { minWidth: "250px" })}>
          <FormControl
            placeholder="Type here github username"
            style={{ borderRadius: "10px" }}
            onChange={userNameInput}
          ></FormControl>
        </div>
        <div style={{ marginLeft: "5px" }}>
          <Button
            variant="success"
            style={{ borderRadius: "10px" }}
            onClick={() => getUser(userName)}
          >
            Find
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
