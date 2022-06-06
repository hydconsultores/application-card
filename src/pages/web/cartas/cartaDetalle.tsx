/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
import React, { FC, useEffect, useState } from "react";
import { Row, Col, Layout, Modal, Alert, Spin, Button, Input, Radio, AutoComplete, Tag, message } from "antd";
import { CartasService } from "../../../api/microservices/Cartas";

import { ReservasService } from "../../../api/microservices/Reservas";

import { CondicionesService } from "../../../api/microservices/Condiciones";
import { TerminacionesService } from "../../../api/microservices/Terminaciones";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useHistory, useLocation, useParams } from "react-router-dom";

import RollbackOutlined from "@ant-design/icons/lib/icons/RollbackOutlined";
import ContadorDetalle from "../utilidades/contadorDetalle";
import imageNotFound from '../../../images/not-found-image.jpeg';
var bcrypt = require('bcryptjs');

    const CartaDetallePage : FC<any> = ({ loadCounter, }) => {
    const location = useLocation();
    const _idPagina = useParams() as any;
    const history = useHistory();
    let idiomasCreados = [] as any
    
    const [cartasIndex, setCartasIndex] = useState([] as any)
    const [cartaLegalities, setCartaLegalities] = useState([] as any)

    const [nombre, setNombre] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [precio, setPrecio] = useState('')
    const [stock, setStock] = useState(0 as number)

    const [cartasIndexSelected, setCartasIndexSelected] = useState(0 as number)
    const [cantidad, setCantidad] = useState(0 as number)

    const [lenguaje, setLenguaje] = useState('')
    const [edicion, setEdicion] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [idiomaSeleccionado, setIdiomaSeleccionado] = useState({} as any)
    const [texto, setTexto] = useState('')
    const [rareza, setRareza] = useState('')
    const [tipoConcatenado, setTipoConcatenado] = useState('')

    const [condiciones, setCondiciones] = useState([] as any)
    const [terminaciones, setTerminaciones] = useState([] as any)
    const [conditionTermination, setConditionTermination] = useState('')



    useEffect(() => {
        let data = sessionStorage.getItem('key');
        let date: Date = new Date();
        let fecha_final= date.getDay()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
        if(data === null){
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(fecha_final, salt);
          var setsession = window.sessionStorage.setItem("key", hash);
        }

        loadCartas().then();
        loadCondiciones().then();
        loadTerminaciones().then();

    }, [location])



    const handleCantidadOnChange = (n: any) => {
        setCantidad(n)
    }


    const addCarro = () => {
        let idCartaPath = 0;
        if (Object.keys(_idPagina).length > 0) {
            if (location.pathname !== undefined) {
                let idCartaPathString = location.pathname.replace("/edition/cards/", "").replace("/cards/", "");
                idCartaPath = parseInt(idCartaPathString)
            }
        }
        if (cantidad <= 0) {
            message.error({
                content: "Cantidad debe ser mayor a 0 (cero)",
            });
            return;
        }

        if (conditionTermination == '') {
            message.error({
                content: "Debes seleccionar condición de la Carta",
            });
            return;
        }
        let body = {
            id_carta_index: cartasIndexSelected,
            cantidad: cantidad,
            precio_unitario: precio,
            stock: stock,
            id_carta: idCartaPath,
            id_solicitud : {
                token :sessionStorage.getItem('key')
            }
        }
        ReservasService.crearReserva(body).then((result) => {
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
                Modal.error({
                    content: mensaje,
                });
            } else {
                if (result.status == 200 || result.status == 201) {
                    if (result.data !== undefined) {
                        let carta = result.data.cartaIndex

                        setCartasIndex(result.data.cartasIndex)
                        setCartasIndexSelected(carta.id)
                        setStock(carta.stock)
                        setNombre(carta.nombre)
                        setImageUrl(carta.imagen)
                        setIdiomaSeleccionado(carta.id_lenguaje)
                        setTexto(carta.texto)
                        setRareza(carta.id_rareza.nombre)
                        setTipoConcatenado(carta.tipo_concatenado)

                        message.success({
                            content: "Producto agregado con éxito",
                        });

                        loadCounter()
                    }
                } else {
                    Modal.error({
                        content: result.data.description,
                    });
                }

            }
        })
        
    }


    const changeConditionTermination = (condicion: any, terminacion: any) => {
        setConditionTermination(condicion + "-" + terminacion)

        let encontrado = 0;
        cartasIndex.map((cartas: any) => {

            if (cartas.id_condicion.id == condicion &&
                cartas.id_terminacion.id == terminacion &&
                cartas.id_lenguaje.id == idiomaSeleccionado.id) {//encontré la condicion
                encontrado = 1;
                setNombre(cartas.nombre)
                setImageUrl(cartas.imagen)
                setPrecio(cartas.precio)
                setStock(cartas.stock)
                setCartasIndexSelected(cartas.id)
                setLenguaje(cartas.id_lenguaje.nombre)
                setIdiomaSeleccionado(cartas.id_lenguaje)
                setEdicion(cartas.id_edicion.nombre)
                setTexto(cartas.texto)
                setRareza(cartas.id_rareza.nombre)
            }

        })

        if (encontrado == 0) {
            setPrecio("0")
            setStock(0)
        }
    }

    const changeIdioma = (carta: any) => {
        setCartasIndexSelected(carta.id)

        setNombre(carta.nombre)
        setImageUrl(carta.imagen)
        setIdiomaSeleccionado(carta.id_lenguaje)
        setTexto(carta.texto)
        setRareza(carta.id_rareza.nombre)
        setTipoConcatenado(carta.tipo_concatenado)

        if (conditionTermination != '') {
            let arr = conditionTermination.split("-");
            let condicion = arr[0]
            let terminacion = arr[1]
            let encontrado = 0;
            cartasIndex.map((cartas: any) => {

                if (cartas.id_condicion.id == condicion &&
                    cartas.id_terminacion.id == terminacion &&
                    cartas.id_lenguaje.id == carta.id_lenguaje.id) {//encontré la condicion
                    encontrado = 1;
                    setNombre(cartas.nombre)
                    setImageUrl(cartas.imagen)
                    setPrecio(cartas.precio)
                    setStock(cartas.stock)
                    setCartasIndexSelected(cartas.id)
                    setLenguaje(cartas.id_lenguaje.nombre)
                    setIdiomaSeleccionado(cartas.id_lenguaje)
                    setEdicion(cartas.id_edicion.nombre)
                    setTexto(cartas.texto)
                    setRareza(cartas.id_rareza.nombre)
                }

            })

            if (encontrado == 0) {
                setPrecio("0")
                setStock(0)
            } else {
                setStock(carta.stock)
            }
        }



    }

    const loadCondiciones = async () => {
        CondicionesService.findActive().then((result) => {

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
                        content: 'Lo sentimos, no hemos podido las condiciones',
                    });
                }
            } else {
                if (result.data !== undefined) {
                    setCondiciones(result.data)
                }
            }
        })
    }

    const loadTerminaciones = async () => {
        TerminacionesService.findActive().then((result) => {

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
                        content: 'Lo sentimos, no hemos podido las condiciones',
                    });
                }
            } else {
                if (result.data !== undefined) {
                    setTerminaciones(result.data)
                }
            }
        })
    }

    const loadCartas = async () => {
        let idCartaPath = 0;
        if (Object.keys(_idPagina).length > 0) {
            if (location.pathname !== undefined) {
                let idCartaPathString = location.pathname.replace("/edition/cards/", "").replace("/cards/", "");
                idCartaPath = parseInt(idCartaPathString)
            }
        }

        setIsLoading(true);
        CartasService.obtenerCartasId(idCartaPath).then((result) => {

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
                        content: 'Lo sentimos, no hemos podido cargar los roles',
                    });
                }
            } else {
                if (result.data !== undefined) {
                    setCartasIndex(result.data.cartasIndex)
                    setNombre(result.data.nombre)
                    setImageUrl(result.data.cartasIndex[0].imagen)
                    setPrecio(result.data.cartasIndex[0].precio)
                    setStock(result.data.cartasIndex[0].stock)
                    setCartasIndexSelected(result.data.cartasIndex[0].id)
                    setLenguaje(result.data.cartasIndex[0].id_lenguaje.nombre)
                    setIdiomaSeleccionado(result.data.cartasIndex[0].id_lenguaje)
                    setEdicion(result.data.cartasIndex[0].id_edicion.nombre)
                    setTexto(result.data.cartasIndex[0].texto)
                    setRareza(result.data.cartasIndex[0].id_rareza.nombre)
                    setTipoConcatenado(result.data.cartasIndex[0].tipo_concatenado)
                    setCartaLegalities(result.data.carta_legalities)
                    setIsLoading(false);

                }
            }
        })
    }
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
                        <Col md={2}> <Button className="list-galeria-volver" type="primary" onClick={() => { history.push("/") }} icon={<RollbackOutlined />}>
                            Volver
                        </Button></Col>
                        <Col md={10} className="container-image-details">
                            {
                                imageUrl ?
                                <img
                                loading="lazy"
                                src={imageUrl}
                                alt="Imagen"
                                />
                            :
                                <img
                                className='image-notfound'
                                loading="lazy"
                                src={imageNotFound}
                                alt="Imagen"
                              />
                            }


                        </Col>
                        <Col md={10} className="containet-tittle-card">
                            <Row className="">
                                <Col md={2} >
                                </Col>
                                <Col md={22} >
                                    {

                                        cartasIndex !== undefined
                                            ?

                                            cartasIndex.map((carta: { stock: string, id_lenguaje: { nombre: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; }; }) => {

                                                let classNew = "selButtonIdioma selected"
                                                if (idiomaSeleccionado.nombre === carta.id_lenguaje.nombre) {
                                                    classNew = "selButtonIdioma selected"
                                                } else {
                                                    classNew = "selButtonIdioma"
                                                }
                                                let encontrado = 0
                                                idiomasCreados.map((idioma: any) => {
                                                    if (idioma.nombre == carta.id_lenguaje.nombre) {
                                                        encontrado = 1;
                                                    }
                                                })

                                                if (encontrado == 0) {
                                                    idiomasCreados.push(carta.id_lenguaje)
                                                    return (

                                                        <Button className={classNew}
                                                            onClick={() => { changeIdioma(carta); }}

                                                        >
                                                            {carta.id_lenguaje.nombre} ({carta.stock})
                                                        </Button>
                                                    );
                                                } else {
                                                }
                                            })
                                            : null
                                    }
                                </Col>


                            </Row>
                            <Row className="title-card">
                                <h4>{nombre} -  {edicion}</h4>
                            </Row>

                            <Row className="price-card">
                                <h5>${precio} Hay {stock} unidades en stock</h5>
                            </Row>

                            <Row>
                                <Col md={12} >
                                    <Row className="container-quantity">
                                        <ContadorDetalle cantidadOnChange={handleCantidadOnChange} />
                                    </Row>
                                </Col>
                                <Col md={12} className="container-addcar" >
                                    {
                                        stock > 0
                                            ?
                                            <Button className="selButton plus" onClick={() => { addCarro(); }} >Agregar al carro</Button>
                                            :
                                            <Button disabled className="selButton plus">Agregar al carro</Button>
                                    }

                                </Col>
                            </Row>

                            <Row className="container-carac">
                                <Col md={16}>
                                    {
                                        terminaciones !== undefined
                                            ?
                                            terminaciones.map((terminacion: any) => {
                                                return (
                                                    <>
                                                        <Col md={24}><h5><b>{terminacion.nombre}</b></h5></Col>
                                                        <Col md={24}>
                                                            <Radio.Group className="container-carac-radiogp" value={conditionTermination} >
                                                                {
                                                                    condiciones !== undefined
                                                                        ?
                                                                        condiciones.map((condicion: any) => {
                                                                            return (
                                                                                <Radio className="container-carac-radio" value={condicion.id + "-" + terminacion.id} onClick={() => { changeConditionTermination(condicion.id, terminacion.id); }} >{condicion.nombre}</Radio>
                                                                            )
                                                                        })
                                                                        : null
                                                                }
                                                            </Radio.Group>
                                                        </Col>
                                                    </>
                                                );

                                            })
                                            : null
                                    }

                                </Col>
                                <Col md={8}>
                                    <h5><b>Stock's</b></h5>
                                    {

                                        cartasIndex !== undefined
                                            ?

                                            cartasIndex.map((carta: {
                                                stock: string, id_lenguaje: { nombre: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; },
                                                id_condicion: { nombre: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; },
                                                id_terminacion: { nombre: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; },
                                            }) => {
                                                if (carta.id_lenguaje.nombre == idiomaSeleccionado.nombre) {


                                                    return (
                                                        <Row>
                                                            <Col md={1}></Col>
                                                            <Col className="container-especificaciones" md={23}>
                                                            <b> {carta.stock} </b> - {carta.id_terminacion.nombre} {carta.id_condicion.nombre} 
                                                            </Col>
                                                        </Row>
                                                    );
                                                }
                                            })
                                            : null
                                    }

                                </Col>
                            </Row>

                            <h3><b>Información sobre la carta</b></h3>
                            <Row className="container-carac">
                                <Col md={6}><b>Edición</b> </Col><Col className="container-especificaciones" md={18}>{edicion}<hr /> </Col>
                                <Col md={6}><b>Texto  </b> </Col><Col className="container-especificaciones" md={18}>{texto}<hr /> </Col>
                                <Col md={6}><b>Rareza </b> </Col><Col className="container-especificaciones" md={18}>{rareza}<hr /> </Col>
                                <Col md={6}><b>Tipo   </b> </Col><Col className="container-especificaciones" md={18}>{tipoConcatenado}<hr /> </Col>
                                <Col md={6}><b>Legalities</b>  </Col>
                                <Col md={18}>

                                    {
                                        cartaLegalities.length > 0
                                            ?

                                            cartaLegalities.map((legal: any) =>
                                                <Row>
                                                    <Col md={6}>
                                                        {
                                                            (() => {
                                                                if (legal.valor === "Banned")
                                                                    return <Tag color="red" > {legal.valor} </Tag>
                                                                if (legal.valor === "Legal")
                                                                    return <Tag color="red"> {legal.valor} </Tag>
                                                                if (legal.valor === "Restricted")
                                                                    return <Tag color="yellow"> {legal.valor} </Tag>
                                                            })()
                                                        }

                                                    </Col>
                                                    <Col md={6} className="container-especificaciones">{legal.id_legalities.nombre}</Col>
                                                </Row>

                                            )



                                            : "Sin registros"
                                    }
                                    <hr />
                                </Col>

                            </Row>



                        </Col>

                        <Col md={2}></Col>
                    </Row>

                }
            </Layout>
        </>
    );
}

export default CartaDetallePage;
