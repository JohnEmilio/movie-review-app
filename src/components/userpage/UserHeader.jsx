import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import api from "../../api/axiosConfig";
import { useState } from "react";

const UserHeader = ( { navigation }) => {
  let navigate = useNavigate();

  const [movie, setMovie] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    let movies = []
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=a9bd84c15f8fa17808fb7e767b72bc08&query=${movie}`;
    fetch(searchUrl)
      .then(res => res.json())
      .then(data =>{
          if(data.results.length == 0){
                  setError("No movies found")
          }
          else {
            console.log(data.results)
            navigate("/results", {state:{movieData: data}})
            // .navigation.push("/results", {movieData: data.results});
            
          }})

  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ color: "red" }}>
          <FontAwesomeIcon icon={faClapperboard} /> CineMate
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </Nav>
          <>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder={error ? "Invalid Response" : "Search"}
                className={error ? 'me-2 outline-red form-control' : 'me-2 form-control'}
                aria-label="Search"
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
              />
              <Button type="button" variant="outline-success"  onClick={e => handleSubmit(e)}>
                Search
              </Button>
            </Form>
          </>
          <Button
            variant="outline-danger"
            onClick={() => {
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserHeader;
