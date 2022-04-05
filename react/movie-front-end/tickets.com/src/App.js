import { useState } from "react";
import {
  Card,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

import gitService from "./pages/utils/gitService.js";
import UserProfile from "./pages/components/profile.js";
import UserRepos from "./pages/components/repos.js";
import Recents from "./pages/components/recents.js";

const App = () => {
  const [userName, setUsername] = useState("");
  const [gitProfile, setGitProfile] = useState("");
  const [gitRepos, setGitRepos] = useState(false);
  const [isLoadin, setLoading] = useState(false);

  const getUser = async () => {
    if (!userName.trim()) return <></>;
    loading(true);
    const user = await gitService(userName.trim());
    setGitProfile(user);
    loading(false);
  };

  const gotoUser = (login) => {
    setUsername(login);
    getUser();
  };

  const loading = (status) => {
    setLoading(status);
    setGitRepos(!status);
  };

  const userNameInput = (event) => {
    setUsername(event.target.value);
  };

  return (
    <Container>
      <div className="row">
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
              onClick={getUser}
            >
              Find
            </Button>
          </div>
        </div>
        <Row className="d-flex justify-content-md-center">
          <div className="d-flex justify-content-center mt-2 mb-2 m-3 bg-light">
            <Recents gotoUser={gotoUser} />
          </div>
        </Row>
        <Row className="d-flex justify-content-md-center">
          <Col className="col-md-auto">
            <div className="d-flex align-content-center mt-1 me-0 p-0">
              <Card style={({ width: "400px" }, { borderBotton: "15px" })}>
                {gitProfile ? <UserProfile {...gitProfile} /> : <UserProfile />}
              </Card>
            </div>
          </Col>
          {isLoadin && !gitRepos && (
            <Col className="col-md-auto d-flex justify-content-center">
              <Spinner animation="border" role="status"></Spinner>
            </Col>
          )}
          <>
            {gitProfile && gitRepos ? (
              <UserRepos repos={gitProfile.repos} />
            ) : (
              ""
            )}
          </>
        </Row>
      </div>
    </Container>
  );
};

export default App;
