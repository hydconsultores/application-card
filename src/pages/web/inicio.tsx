/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Row, Col, Layout, Modal, Button,Dropdown, Menu, Pagination } from "antd";
import { CartasService } from "../../api/microservices/Cartas";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import RollbackOutlined from "@ant-design/icons/lib/icons/RollbackOutlined";
import { SolicitudesService } from "../../api/microservices/Solicitudes";
import HomePage from "./home";
import ModalForm from "./cartas/formModal"
import imageNotFound from '../../images/not-found-image.jpeg';

var bcrypt = require('bcryptjs');
type Props = {
  stateMenu: any | null;
  idCarta: any | null;
  carta: string | null;
  title: string;
  type: "COTIZA" | "AGENCIA" | "SEGUIMIENTO";
  loadCounter:any;
};


export default function InicioPage(props: Props) {
  //para notificaciones de cargas
  const location = useLocation();
  const _idPagina = useParams() as any;
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false)
  const [cartasInicio, setCartasInicio] = useState([] as any)

  const [isLimit, setIsLimit] = useState(12)
  const [isOrder, setIsOrder] = useState("Recientes")
  const [isFrom, setIsFrom] = useState(1)
  const [cartaSelected, setCartaSelected] = useState(null)
  const [idCartaSelected, setIdCartaSelected] = useState(null)
  const [current, setCurrent] = useState(1);
  const [contadorPaginacion, setContadorPaginacion] = useState(0 as number);
  
  const selectedLimit = (ide: any) => {
    setIsLimit(ide);
    setCurrent(1)
  }

  const mostrar = (
    <Menu>
      <Menu.Item key="12">
        <a onClick={e => selectedLimit(12) } >Mostrar 12</a>
      </Menu.Item>
      <Menu.Item key="24">
        <a onClick={e => selectedLimit(24)}>Mostrar 24</a>
      </Menu.Item>
      <Menu.Item key="36">
        <a onClick={e => selectedLimit(36)}>Mostrar 36</a>
      </Menu.Item>
      <Menu.Item key="48">
        <a onClick={e => selectedLimit(48)}>Mostrar 48</a>
      </Menu.Item>
      <Menu.Item key="60">
        <a onClick={e => selectedLimit(60)}>Mostrar 60</a>
      </Menu.Item>
    </Menu>
  );

  const ordenar = (
    <Menu>
      <Menu.Item key="R">
        <a onClick={e => setIsOrder("Recientes")} >Recientes</a>
      </Menu.Item>
      <Menu.Item key="A">
        <a onClick={e => setIsOrder("Precio Ascendente")}>Precio Ascendente</a>
      </Menu.Item>
      <Menu.Item key="D">
        <a onClick={e => setIsOrder("Precio Descendiente")}>Precio Descendiente</a>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    let data = sessionStorage.getItem('key');
    let date: Date = new Date();
    let fecha_final= date.getDay()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
    if(data === null){
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(fecha_final, salt);
      var setsession = window.sessionStorage.setItem("key", hash);
      createSolicitud().then();
    }
    
    loadCartas().then();

  }, [isLimit,isOrder,current])

  const createSolicitud = async () => {
    let body = {
      token: sessionStorage.getItem('key')
  }
  SolicitudesService.crearSolicitud(body).then((result) => {
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

            }
        } else {
            Modal.error({
                content: result.data.description,
            });
        }

    }
})
}

const onChange = (page: number) => {
  setCurrent(page);
};

const loadCartas = async () => {
    let idEdicion = null;
    if (Object.keys(_idPagina).length > 0) {
      if (location.pathname !== undefined) {
        let idCartaPathString = location.pathname.replace("/edition/", "");
        idEdicion = parseInt(idCartaPathString)
      }
    }

    setIsLoading(true);
    CartasService.obtenerGaleria(idEdicion, isLimit, isFrom,isOrder,current).then((result) => {

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
          setIsLoading(false)
          setCartasInicio(result.data.cartas)
          setContadorPaginacion( (Math.round(result.data.contador/isLimit))*10 )
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
            <Col md={1}></Col>
            {cartaSelected !== null
              ?
              <Col md={2}> <Button className="list-galeria-volver"  onClick={e => window.location.reload()} icon={<RollbackOutlined />}>
                Volver
              </Button></Col>
              :
              <Col md={2}></Col>
            }

            <Col xs={0} md={13}></Col>
            <Col xs={11} md={3} className="list-galeria" >
              <a href={"/advance-search"}>
                <Button icon={<SearchOutlined />}>
                  Búsqueda Avanzada
                </Button>
              </a></Col>

            <Col xs={7} md={2}>
              <Dropdown overlay={mostrar} className="list-galeria">
                <Button>
                  Mostrar {isLimit} <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
            <Col xs={6} md={3}  >
              <Dropdown overlay={ordenar} className="list-galeria">
                <Button>
                   {isOrder} <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
            {
              cartaSelected !== null
                ?
                <HomePage stateMenu={props.stateMenu} idCarta={idCartaSelected} carta={cartaSelected} type="SEGUIMIENTO" title="Starken | Home" />
                :

                cartasInicio.map((cartas: any) =>
                  <Col xs={11} md={6} className="container-image-inicio" >

                    <Row className='container-title-image-inicio'>
                      <Col md={2}></Col>
                      <Col md={20} className='container-title-card'><b>{cartas.nombre}</b></Col>
                      <Col md={2}></Col>
                    </Row>
                    <a href={"cards/" + cartas.id}>
                      {
                        cartas.imagen != null  ?
                          <img
                          className='container-image'
                          loading="lazy"
                          src={cartas.imagen}
                          alt="Imagen"
                        />
                        :
                        <img
                        
                        className='container-image image-notfound'
                        loading="lazy"
                        src={imageNotFound}
                        alt="Imagen"
                      />
                      }

                    </a>
                    <Row className='container-pie-image-inicio'>
                      <Col xs={10} md={14} className="galeria-price-input"><b>${cartas.precio}</b></Col>
                      <Col xs={14} md={10}>
                        <ModalForm carta={cartas} loadCounter={props.loadCounter}/>
                      </Col>

                    </Row>

                  </Col>
                )
            }
  
              <Col md={24} className="container-pagination">
                  <Pagination current={current} onChange={onChange} total={contadorPaginacion} showSizeChanger={false} />
              </Col>

          </Row>

        }
      </Layout>
    </>
  );
}


