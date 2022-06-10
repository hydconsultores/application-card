import React, { FC, useEffect, useState } from "react";
import { Row, Col, Layout, Modal, Button, Input, Table, Form } from "antd";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useHistory, useLocation } from "react-router-dom";
import RollbackOutlined from "@ant-design/icons/lib/icons/RollbackOutlined";
import TextArea from "antd/lib/input/TextArea";
import { ContactoService } from "../../../api/microservices/Contacto";

    const FormContacto : FC<any> = ({ loadCounter}) => {
    const location = useLocation();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false)
    const [enviando, setEnviando] = useState(false)

    useEffect(() => {

    }, [])

      const onFinish = (values:any) => {
        setEnviando(true);
        ContactoService.crearContacto(values).then((result) => {
            if (result.error) {
                setEnviando(false);
                setIsLoading(false);
                let mensaje = ''
                if (typeof result.error === 'object') {
                  const obj = result.error as any;
                  mensaje = obj.data.error;
                } else if (typeof result.error === 'string') {
                  mensaje = result.error;
                } else {
                  Modal.error({
                    content: 'Lo sentimos, ha ocurrido un error',
                  });
                }
              } else {
                setEnviando(false);
                if (result.data !== undefined) {
                    setIsLoading(false);
                   if(result.status > 0){
                    loadCounter();
                    Modal.success({
                        onOk : ()=> { succesSolicitud() ;},
                        content: 'Formulario registrado con éxito',
                      });
                    }
                }
              }
        })
      };

    const validInputText = (value:any) => {
        if (/^[^$%&|<>#?()/*@!¡¿·=]*$/.test(value)) {
          return true;
        } else {
          return false;
        }
  }
    const succesSolicitud = () => {
        history.push("/");
    }

      const onFinishFailed = (errorInfo:any) => {
        Modal.error({
            content: 'Debes completar todos los campos',
          });
      };

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
                    <Row justify="center" >
                        <Col xs={24} md={24}>
                            <Row>
                                <Col md={2}> <Button className="list-galeria-volver" type="primary" onClick={() => { history.push("/") }} icon={<RollbackOutlined />}>
                                Volver
                                </Button></Col>
                            </Row>
                        </Col>

                        <Col xs={24} md={24}>
                            <Row>
                                <Col xs={1} md={2}></Col>
                                <Col xs={22} md={20}>
                                <Form
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off">
                                    <Row>   
                                        <Col xs={0} md={2}></Col>
                                        <Col xs={24} md={20} className="container-form-contacto" > <h2>Formulario de contacto</h2> 
                                        <Row>
                                            <Col xs={0} md={1}></Col>
                                            <Col xs={24} md={10}>
                                            <Form.Item
                                                name="nombre"
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Ingrese su nombre',
                                                },
                                                {
                                                    message: 'No se permiten caracteres especiales',
                                                    validator: (_, value) => { 
                                                        if(validInputText(value)){
                                                            return Promise.resolve();
                                                        }else{
                                                            return Promise.reject('No se permiten caracteres especiales');
                                                        }
                                                    }
                                                }
                                                ]}>
                                                <Input placeholder="Nombre" />
                                            </Form.Item>    
                                            </Col>
                                            <Col md={2}></Col>
                                            <Col xs={24} md={10}>
                                                <Form.Item
                                                    name="asunto"
                                                    rules={[
                                                    {
                                                        required: true,
                                                        message: 'Ingrese asunto',
                                                    },
                                                    {
                                                        message: 'No se permiten caracteres especiales',
                                                        validator: (_, value) => { 
                                                            if(validInputText(value)){
                                                                return Promise.resolve();
                                                            }else{
                                                                return Promise.reject('No se permiten caracteres especiales');
                                                            }
                                                        }
                                                    }
                                                    ]}>
                                                    <Input placeholder="Asunto" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={0} md={1}></Col>
                                        </Row>
                                        <Row>
                                            <Col xs={0} md={1}></Col>
                                            <Col xs={24} md={10}>
                                                <Form.Item
                                                            name="correo"
                                                            rules={[
                                                            {
                                                                required: true,
                                                                message: 'Ingrese su correo válido correo@dominio.cl',
                                                                type:"email"

                                                            },
                                                            ]}>
                                                        <Input placeholder="Correo" />
                                                    </Form.Item>
                                            </Col>
                                            <Col md={2}></Col>
                                            <Col xs={24} md={10}>
                                            <Form.Item
                                                        name="telefono"
                                                        rules={[
                                                        {   
                                                            required: true,
                                                            message: 'Ingrese su teléfono',
                                                            min:8,
                                                            max:8
                                                        },
                                                        ]}>
                                                    <Input  type="number" prefix="+569"  placeholder="47474747" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={0} md={1}></Col>
                                        </Row>
                                        </Col>
                                        <Col xs={0} md={2}></Col>
                                    </Row>    
                                    <Row>
                                        <Col xs={0} md={3}></Col>
                                        <Col xs={0} md={18} className="container-textarea">
                                            <Form.Item
                                                    name="comentario"
                                                    rules={[
                                                    {
                                                        required: true,
                                                        message: 'Ingrese su comentario',
                                                    },
                                                    {
                                                        message: 'No se permiten caracteres especiales',
                                                        validator: (_, value) => { 
                                                            if(validInputText(value)){
                                                                return Promise.resolve();
                                                            }else{
                                                                return Promise.reject('No se permiten caracteres especiales');
                                                            }
                                                        }
                                                    }
                                                    ]}>
                                                <TextArea rows={5} placeholder="Ingresa tu comentario..." maxLength={500} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={0} md={3}></Col>
                                    </Row>            
                                    <Row>
                                        <Col xs={5} md={10}></Col>
                                        <Col xs={14} md={6} className="col-search-advance">
                                            <Button loading={enviando} htmlType="submit" className="selButton-search-advance">
                                            Enviar
                                            </Button>
                                        </Col>
                                        <Col xs={5} md={8}></Col>
                                    </Row>   
                                </Form>
                                </Col>
                                <Col xs={1} md={2}></Col>
                            </Row>
                        </Col>

                    </Row>
                    

                }
            </Layout>
        </>
    );
}

export default FormContacto;
