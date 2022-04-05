import { Card, Image, ListGroup } from "react-bootstrap";

const userProfile = ({
  avatar_url,
  public_repos,
  followers,
  following,
  login,
  bio,
  html_url,
}) => (
  <>
    <Card.Header
      className="d-flex justify-content-center"
      style={{ borderBottom: "0px" }}
    >
      <Image
        src={avatar_url || "https://avatars.githubusercontent.com/u/9919?v=4"}
        roundedCircle
        fluid
        alt="..."
        width={"300px"}
      />
    </Card.Header>
    <Card.Body>
      <Card.Text style={({ borderBottom: "0px" }, { marginBottom: "0px" })}>
        <a href={html_url || "#"}>@{login || "git_hub_view"}</a>
      </Card.Text>
      <Card.Text
        style={
          ({ borderBottom: "0px" }, { borderTop: "0px" }, { maxWidth: "300px" })
        }
      >
        {bio || "Undefined"}
      </Card.Text>
      <Card.Body>
        <ListGroup>
          <ListGroup.Item
            rounded="true"
            style={({ padding: "1px" }, { marginTop: "5px" })}
          >
            📦 Repos: {public_repos || 0}
          </ListGroup.Item>
          <ListGroup.Item
            style={
              ({ borderRadius: "25px" },
              { paddingTop: "1px" },
              { paddingLeft: "1px" },
              { marginTop: "5px" })
            }
          >
            🕸 Followers: {followers || 0}
          </ListGroup.Item>
          <ListGroup.Item
            style={
              ({ borderRadius: "25px" },
              { paddingTop: "1px" },
              { paddingLeft: "1px" },
              { marginTop: "5px" })
            }
          >
            🦑 Following: {following || 0}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card.Body>
  </>
);

export default userProfile;
