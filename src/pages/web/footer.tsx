/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

export default function Footer() {
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


  return (
    <>
      <Row className="container-footer">
        <Col xs={0} md={6} className="center-content-margin">
          <img
            alt="Imagen"
            width="180px"
          />
        </Col>

        <Col xs={0} md={6}  className="info-footer">
          <p>Quiénes somos </p>
        </Col>

        <Col xs={0} md={6}  className="info-footer" >
          <p>Quiénes somos </p>
        </Col>
        <Col xs={0} md={6}  className="info-footer">
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
