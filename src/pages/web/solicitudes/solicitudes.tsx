import React, { FC, useEffect, useState } from "react";
import { Row, Col, Layout, Modal, Button, Input, Table, Form } from "antd";
import { ReservasService } from "../../../api/microservices/Reservas";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useHistory, useLocation, useParams } from "react-router-dom";
import RollbackOutlined from "@ant-design/icons/lib/icons/RollbackOutlined";
import Column from "antd/lib/table/Column";
import ContadorCar from "../utilidades/contadorCar";
import { SolicitudesService } from "../../../api/microservices/Solicitudes";

    const Solicitudes : FC<any> = ({ loadCounter}) => {
    const location = useLocation();
    const history = useHistory();
    const [data, setData] = useState([] as any)
    const [isLoading, setIsLoading] = useState(false)
    const [enviando, setEnviando] = useState(false)

    useEffect(() => {
         loadReservas().then();
    }, [location,loadCounter])

    const loadReservas = async () => {
        let body = {
            token :sessionStorage.getItem('key')
        }
        setIsLoading(true);
        ReservasService.finByToken(body).then((result) => {
    
          if (result.error) {
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
            if (result.data !== undefined) {
                setIsLoading(false);
               if(result.data.length > 0){
                let array = [] as any 
                result.data.map((productos: any) => {
                    let json = {
                        id:productos.id,
                        cantidad:productos.cantidad,
                        precio_unitario:productos.precio_unitario,
                        nombre: productos.id_carta.nombre,
                        numero: productos.id_carta.numero,
                        imagen:productos.id_carta_index.imagen,
                        tipo_concatenado:productos.id_carta_index.tipo_concatenado,
                        edicion: productos.id_carta_index.id_edicion.nombre,
                        condicion: productos.id_carta_index.id_condicion.nombre,
                        estado:  productos.id_carta_index.id_terminacion.nombre,
                        idioma:  productos.id_carta_index.id_lenguaje.nombre,
                        nombre_carta:productos.id_carta_index.nombre,
                        action : <ContadorCar producto={productos} onChangeCantidad={onChangeCantidad} valor={productos.cantidad} stock={productos.stock} />,
                        delete :  <input type="button" onClick={() => { remove(productos.id); }} className="selButton-delete" value="X"/>
                    }
                        array.push(json)
                    })
                    setData(array)
                }else{
                    setData([] as any )
                }
            }
          }
        })
      }
      
      const remove = (producto:any) => {
                ReservasService.desactiveReserva({id_reserva:producto}).then((result) => {
                    if (result.error) {
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
                        if (result.data !== undefined) {
                           loadCounter()
                           loadReservas().then()
                        }
                      }
                })
      };

      const onChangeCantidad = (values:any,producto:any) => {
        producto.cantidad = values;
        ReservasService.updateContador(producto).then((result) => {
            if (result.error) {
                setIsLoading(false);
                let mensaje = ''
                if (typeof result.error === 'object') {
                  const obj = result.error as any;
                  mensaje = obj.data.error;
                  Modal.error({
                    content: mensaje,
                  });
                } else if (typeof result.error === 'string') {
                  mensaje = result.error;
                } else {
                  Modal.error({
                    content: 'Lo sentimos, ha ocurrido un error',
                  });
                }
              } else {
                if (result.data !== undefined) {
                    setIsLoading(false);
                   if(result.data.length > 0){
                    let array = [] as any 
                    result.data.map((productos: any) => {
                        let json = {
                            id:productos.id,
                            cantidad:productos.cantidad,
                            precio_unitario:productos.precio_unitario,
                            nombre: productos.id_carta.nombre,
                            numero: productos.id_carta.numero,
                            imagen:productos.id_carta_index.imagen,
                            tipo_concatenado:productos.id_carta_index.tipo_concatenado,
                            edicion: productos.id_carta_index.id_edicion.nombre,
                            condicion: productos.id_carta_index.id_condicion.nombre,
                            estado:  productos.id_carta_index.id_terminacion.nombre,
                            idioma:  productos.id_carta_index.id_lenguaje.nombre,
                            nombre_carta:productos.id_carta_index.nombre,
                            action : <ContadorCar producto={productos} onChangeCantidad={onChangeCantidad} valor={productos.cantidad} stock={productos.stock} />,
                            delete :  <input type="button" onClick={() => { remove(productos.id); }} className="selButton-delete" value="X"/>
                        }
                            array.push(json)
                        })
                        setData(array)
                    }
                }
              }
        })
      };

      const onFinish = (values:any) => {
        setEnviando(true);
        values["token"] = sessionStorage.getItem('key');
        SolicitudesService.updateReserva(values).then((result) => {
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
                    sessionStorage.clear()
                    loadCounter();
                    Modal.success({
                        onOk : ()=> { succesSolicitud() ;},
                        content: 'Solicitud enviada con éxito',
                      });
                    }
                }
              }
        })
      };

    const validInputTextDirection = (value:any) => {
        if (/^[^$%&|<>?()/*@!¡¿·=]*$/.test(value)) {
          return true;
        } else {
          return false;
        }
  }

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
                                        <Col xs={24} md={20} className="container-solicitudes" > <h2> Solicitud de Pedido</h2> 
                                        <Row>
                                            <Col xs={0} md={1}></Col>
                                            <Col xs={24} md={7}>
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
                                            <Col md={1}></Col>
                                            <Col xs={24} md={7}>
                                                <Form.Item
                                                    name="apellido_pat"
                                                    rules={[
                                                    {
                                                        required: true,
                                                        message: 'Ingrese su apellido paterno',
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
                                                    <Input placeholder="Apellido Paterno" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={0} md={1}></Col>
                                            <Col xs={24} md={7}>
                                                <Form.Item
                                                        name="apellido_mat"
                                                        rules={[
                                                        {
                                                            required: true,
                                                            message: 'Ingrese su apellido materno',
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
                                                    <Input placeholder="Apellido Materno" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={0} md={1}></Col>
                                            <Col xs={24} md={7}>
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
                                            <Col xs={0} md={1}></Col>
                                            <Col xs={24} md={7}>
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
                                            <Col xs={24} md={7}>
                                                <Form.Item
                                                        name="direccion"
                                                        rules={[
                                                        {
                                                            required: true,
                                                            message: 'Ingrese su dirección',
                                                        },
                                                        {
                                                            message: 'No se permiten caracteres especiales',
                                                            validator: (_, value) => { 
                                                                if(validInputTextDirection(value)){
                                                                    return Promise.resolve();
                                                                }else{
                                                                    return Promise.reject('No se permiten caracteres especiales');
                                                                }
                                                            }
                                                        }
                                                        ]}>
                                                    <Input placeholder="Dirección" />
                                                </Form.Item>    
                                            </Col>
                                            <Col xs={0} md={1}></Col>
                                        </Row>
                                        </Col>
                                        <Col xs={0} md={2}></Col>
                                    </Row>                
                                    <Row> 
                                        <Col xs={0} md={2}></Col>
                                        <Col xs={24} md={20}>
                                            {
                                                data !== []
                                                ?
                                                <Table    
                                                  scroll={{
                                                    x: true,
                                                  }} dataSource={data}>
                                                    <Column title="Nombre Carta" dataIndex="nombre_carta" key="nombre_carta" responsive={['xs','sm','md']}/>
                                                    <Column title="Edición" dataIndex="edicion" key="edicion" responsive={['xs','sm','md']}/>
                                                    <Column title="Condición" dataIndex="condicion" key="condicion" responsive={['xs','sm','md']}/>
                                                    <Column title="Estado" dataIndex="estado" key="estado" responsive={['xs','sm','md']}/>
                                                    <Column title="Idioma" dataIndex="idioma" key="idioma" responsive={['xs','sm','md']}/>
                                                    <Column title="Precio" dataIndex="precio_unitario" key="precio_unitario" responsive={['xs','sm','md']}/>
                                                    <Column title="Cantidad" dataIndex="action" key="action" responsive={['xs','sm','md']} className="tr-cantidad" ></Column>
                                                    <Column title="Eliminar" dataIndex="delete" key="delete" responsive={['xs','sm','md']} className="tr-delete" ></Column>
                                                </Table>
                                                :

                                                null
                                            }

                                        </Col>
                                        <Col xs={0} md={2}></Col>
                                    </Row> 
                                    <Row>
                                        <Col xs={5} md={10}></Col>
                                        <Col xs={14} md={6} className="col-search-advance">
                                            <Button loading={enviando} htmlType="submit" className="selButton-search-advance">
                                            Enviar Solicitud
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

export default Solicitudes;
