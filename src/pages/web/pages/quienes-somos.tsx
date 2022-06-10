import React, { FC, useEffect, useState } from "react";
import { Row, Col, Layout, Button } from "antd";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useHistory, useLocation } from "react-router-dom";
import RollbackOutlined from "@ant-design/icons/lib/icons/RollbackOutlined";
import imageNotFound from '../../../images/not-found-image.jpeg';

    const QuienesSomos : FC<any> = ({ loadCounter}) => {
    const location = useLocation();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

    }, [])

    return (
        <>
            <Layout
            >
                {isLoading === true ?
                    <Row justify="center" className='container-spinner-top'>
                        <Loader
                            type="Puff"
                            color="#a75233"
                            height={100}
                            width={100}
                        /></Row>

                    :
                    <Row justify="center" className="container-quienes-somos">
                        <Col xs={24} md={24}>
                            <Row>
                                <Col md={24}>
                                <img
                                    className='image-quienes-somos'
                                    loading="lazy"
                                    src={imageNotFound}
                                    alt="Imagen"
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={1} md={2}></Col>
                                <Col xs={24} md={20} className="container-form-contacto" > <h2>Quiénes somos</h2> </Col>
                                <Col xs={1} md={2}></Col>
                            </Row>
                            <Row className="container-text-quienes">
                                <Col xs={0} md={1}></Col>
                                <Col xs={24} md={4}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                                </Col>

                                <Col xs={24} md={14}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </Col>

                                <Col xs={24} md={4}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                                </Col>
                                <Col xs={0} md={1}></Col>
                            </Row>
                        </Col>

                    </Row>
                    

                }
            </Layout>
        </>
    );
}

export default QuienesSomos;
