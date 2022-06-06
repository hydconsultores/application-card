/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { Row, Col, Layout, Modal,Button, Radio } from "antd";
import { CartasService } from "../../api/microservices/Cartas";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Contador from "./utilidades/contador";
type Props = {
  stateMenu: any  | null;
  idCarta: any | null;
  carta: string | null;
  title: string;
  type: "COTIZA" | "AGENCIA" | "SEGUIMIENTO";
};


export default function HomePage(props: Props) {
  //para notificaciones de cargas
  const [value, setValue] = React.useState(1);
  const [cartasIndex, setCartasIndex] = useState([] as any)
  const [nombre, setNombre] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [lenguaje, setLenguaje] = useState('')
  const [edicion, setEdicion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState({} as any)
  const [texto, setTexto] = useState('')
  const [rareza, setRareza] = useState('')
  const [tipoConcatenado, setTipoConcatenado] = useState('')
  
  useEffect(() => {
    loadCartas().then();

  }, [props])

  const changeIdioma = (carta: any) => {
    setImageUrl(carta.imagen)
    setIdiomaSeleccionado(carta.id_lenguaje)
    setTexto(carta.texto)
    setRareza(carta.id_rareza.nombre)
    setTipoConcatenado(carta.tipo_concatenado)
}

  const loadCartas = async () => {
    setIsLoading(true);
    CartasService.obtenerCartasId(props.idCarta).then((result) => {

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
          setLenguaje(result.data.cartasIndex[0].id_lenguaje.nombre)
          setIdiomaSeleccionado(result.data.cartasIndex[0].id_lenguaje)
          setEdicion(result.data.cartasIndex[0].id_edicion.nombre)
          setTexto(result.data.cartasIndex[0].texto)
          setRareza(result.data.cartasIndex[0].id_rareza.nombre)
          setTipoConcatenado(result.data.cartasIndex[0].tipo_concatenado)
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
            <Col md={2}></Col>
            <Col md={10} className="container-image">
              <img
                loading="lazy"
                src={imageUrl}
                alt="Imagen"
              />

            </Col>
            <Col md={10} className="containet-tittle-card">
              <Row className="">
                <Col md={6} >
                  Idiomas
                </Col>
                <Col md={2} >
                  -
                </Col>
                <Col md={16} >
                  {
                    cartasIndex !== undefined
                      ?
                      cartasIndex.map((carta: { id_lenguaje: { nombre: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; }; }) => {
                        let classNew="selButtonIdioma selected"
                        if (idiomaSeleccionado.nombre === carta.id_lenguaje.nombre) {
                          classNew="selButtonIdioma selected"
                        }else{
                          classNew="selButtonIdioma"
                        }
                        return (

                          <Button className={classNew}  
                          onClick={() => { changeIdioma(carta); }}

                          >
                            {carta.id_lenguaje.nombre}
                          </Button>
                        );
                      })
                      : null
                  }
                </Col>
              </Row>
              <Row className="title-card">
                <h1>{nombre} -  {edicion}</h1>
              </Row>

              <Row className="price-card">
                <h1>${precio} Hay {stock} unidades en stock</h1>
              </Row>

              <Row>
                <Col md={12} >
                  <Row className="container-quantity">
                  <Contador />
                  </Row>
                </Col>
                <Col md={12} className="container-addcar" >
                  <Button className="selButton plus">Agregar al carro</Button>
                </Col>
              </Row>

              <Row className="container-carac">
                <Col md={24}>Foil</Col>
                <Col md={24}>
                  <Radio.Group className="container-carac-radiogp" value={value}>
                    <Radio className="container-carac-radio" value={1}>NM - 800</Radio>
                    <Radio className="container-carac-radio" value={2}>NM SPANISH - 830</Radio>
                    <Radio className="container-carac-radio" value={3}>MP - 600</Radio>
                    <Radio className="container-carac-radio" value={4}>HP - 400</Radio>
                  </Radio.Group>
                </Col>

              </Row>


              <Row className="container-carac">
                <Col md={24}>DESCRIPCIÓN</Col>
                <Col md={4}>Edición </Col><Col md={20}>{edicion} </Col>
                <Col md={4}>Texto   </Col><Col md={20}>{texto}</Col>
                <Col md={4}>Rareza  </Col><Col md={20}>{rareza}</Col>
                <Col md={4}>Tipo  </Col><Col md={20}>{tipoConcatenado}</Col>
                
              </Row>



            </Col>

            <Col md={2}></Col>
          </Row>

        }
      </Layout>
    </>
  );
}
