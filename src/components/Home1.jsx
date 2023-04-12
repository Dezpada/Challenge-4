import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import "../styles/Home1.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarPage from "./NavbarPage";
import "react-slideshow-image/dist/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Home1() {
  const [movies, setMovies] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=117cdbfac10bbc3a44833dd1488f43f9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
        );
        setMovies(response.data.results);
      } catch (error) {
        alert(error);
      }
    };
    fetchAPI();
  }, []);

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
  };
  const spanStyle = {
    fontSize: "20px",
    background: "#efefef",
    color: "#000000",
  };
  return (
    <>
      <Row>
        <Col>
          <NavbarPage />
        </Col>
      </Row>
      <Slider {...settings}>
        {movies.map((image, index) => (
          <div key={index}>
            <div
              style={{
                ...divStyle,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                display: "grid",
                placeItems: "bottom",
                width: "100%",
                height: "600px",
                marginBottom: "5px",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0)100%),url(https://image.tmdb.org/t/p/original/${image.backdrop_path})`,
              }}
            >
              <span
                style={{
                  spanStyle,
                  color: "White",
                  marginTop: "200px",
                  marginLeft: "15px",
                  marginRight: "700px",
                }}
              >
                <h1 style={{ fontSize: "80px" }}>{image.title}</h1>
                <p>{image.overview}</p>
              </span>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}

export default Home1;