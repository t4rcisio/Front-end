import { useState, useEffect, useRef } from "react";
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
import SearchBar from "./pages/components/searchbar.js";

const App = () => {
  const [gitProfile, setGitProfile] = useState("");
  const [gitRepos, setGitRepos] = useState(false);
  const [isLoadin, setLoading] = useState(false);
  const [content, setContent] = useState(false);

  const getUser = async (userName) => {
    if (!userName.trim()) return <></>;
    loading(true);
    const user = await gitService(userName.trim());
    setGitProfile(user);
    loading(false);
  };

  useEffect(() => {
    setContent(true);
  }, [isLoadin]);

  const loading = (status) => {
    setLoading(status);
    setGitRepos(!status);
  };

  return (
    <Container>
      <div className="row">
        <SearchBar getUser={getUser} />
        {content && (
          <>
            <Row className="d-flex justify-content-md-center">
              <div className="d-flex justify-content-center mt-2 mb-2 m-3 bg-light">
                <Recents getUser={getUser} />
              </div>
            </Row>
            <Row className="d-flex justify-content-md-center">
              <Col className="col-md-auto">
                <div className="d-flex align-content-center mt-1 me-0 p-0">
                  <Card style={({ width: "400px" }, { borderBotton: "15px" })}>
                    {gitProfile ? (
                      <UserProfile {...gitProfile} />
                    ) : (
                      <UserProfile />
                    )}
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
          </>
        )}
      </div>
    </Container>
  );
};

export default App;
