import { Card, Col, Image } from "react-bootstrap";

const CardRecents = ({ getUser, url, login, avatar_url }) => {
  return (
    <div onClick={() => getUser(login)} style={{ cursor: "pointer" }}>
      <Card className="m-2 p-1 d-flex" style={{ border: "1px" }}>
        <Col className="d-flex justify-content-center">
          <Image src={avatar_url} width={45} roundedCircle fluid />
        </Col>
        <Col className="d-flex justify-content-md-center">
          <p className="text-warning stretched-link">@{login}</p>
        </Col>
      </Card>
    </div>
  );
};

const Recents = ({ getUser }) => {
  const storage = localStorage.getItem(process.env.REACT_APP_LOCAL);
  if (!storage) return <></>;

  const mapStorage = JSON.parse(storage);
  const arrayStorage = Object.values(mapStorage);

  return (
    <>
      {arrayStorage.map((user) => (
        <CardRecents
          key={user.login}
          getUser={getUser}
          url={user.url}
          login={user.login}
          avatar_url={user.avatar_url}
        />
      ))}
    </>
  );
};

export default Recents;

/* */
