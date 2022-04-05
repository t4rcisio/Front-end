import { ListGroup, Col, Row, ListGroupItem, Card } from "react-bootstrap";

const cropTextTitle = (text) => {
  if (!text) text = "Undefined";
  if (text.length <= 25) return text;
  else return text.slice(0, 25) + "...";
};

const cropTextDescription = (text) => {
  if (!text) text = "Undefined";
  if (text.length <= 35) return text;
  else return text.slice(0, 35) + "...";
};

const CardRepos = ({
  name,
  description,
  size,
  stargazers_count,
  forks_count,
  html_url,
}) => (
  <ListGroupItem style={{ margin: "8px" }}>
    <div className="d-flex justify-content-between">
      <a href={html_url}>
        <p className="fs-3">{cropTextTitle(name)}</p>
      </a>
    </div>
    <p className="mb-1;">{cropTextDescription(description)}</p>
    <Row className="justify-content-md-center">
      <Col className="text-lg-center">
        <span className="badge rounded-pill bg-primary">💽 {size} kb</span>
      </Col>
      <Col className="text-lg-center">
        <span className="badge rounded-pill bg-success">
          🌟 {stargazers_count}
        </span>
      </Col>
      <Col className="text-lg-center">
        <span className="badge rounded-pill bg-warning text-dark">
          💡 {forks_count}
        </span>
      </Col>
    </Row>
  </ListGroupItem>
);

const Repos = ({ repos }) => {
  return (
    <Col className="col-md-auto mt-1">
      <Card className="pd-0" style={{ maxWidth: "400px" }}>
        <ListGroupItem>
          <p className="fs-1 fw-light ">Repositories</p>
        </ListGroupItem>

        <ListGroup>
          {repos.map((repo) => {
            return <CardRepos key={repo.id} {...repo} />;
          })}
        </ListGroup>
      </Card>
    </Col>
  );
};

export default Repos;
