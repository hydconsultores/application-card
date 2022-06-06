/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Row, Col, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faLinkedin,
  faTwitterSquare,
  faInstagramSquare,
  faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";


import { IconDefinition } from "@fortawesome/fontawesome-svg-core";


export default function Footer() {
  const [count, setCount] = useState(0);
  const [token,] = useState(null as any);
  const [, setLoading] = useState(false);
  useEffect(() => {
    if (token === null) return;
    const tkn = document.getElementById("tkn") as any;
    if (tkn !== null) {
      tkn.value = token;
    }
    setLoading(false);
  }, [token]);

  const imageUrl = (img: String) => {
    return img.includes("../") ? require(`${img}`) : `${img}`;
  };

  const fontAwesomeIcon = (name: String) => {
    let fa: IconDefinition = faFacebookSquare;
    switch (name) {
      case "Facebook":
        fa = faFacebookSquare;
        break;
      case "Linkedin":
        fa = faLinkedin;
        break;
      case "Instagram":
        fa = faInstagramSquare;
        break;
      case "Youtube":
        fa = faYoutubeSquare;
        break;
      case "Twitter":
        fa = faTwitterSquare;
        break;
    }
    return fa;
  };

  return (
    <>
      <Row className="container-footer">
        <Col md={6} className="center-content-margin">
          <img
            alt="Imagen"
            width="180px"
          />
        </Col>

        <Col md={6}  className="info-footer">
          <p>Quiénes somos </p>
        </Col>

        <Col md={6}  className="info-footer" >
          <p>Quiénes somos </p>
        </Col>
        <Col md={6}  className="info-footer">
          <p>Quiénes somos </p>
        </Col>
      </Row>

      <Row className="row-created">
        <Col lg={24} md={24} xs={24} className="content-created">
          Todos los derechos reservados {new Date().getFullYear()} Dcapp 
        </Col>
      </Row>
    </>
  );
}
