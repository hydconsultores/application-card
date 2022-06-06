/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect, useRef } from "react";
import { Menu, Row, Col, Form, Input, Modal, Tooltip, Affix, Layout, Button, Badge } from "antd";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";


import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faLinkedin,
  faTwitterSquare,
  faInstagramSquare,
  faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";

import { CartasService } from "../../api/microservices/Cartas";
import { EdicionesService } from "../../api/microservices/Ediciones";
import { MenuService } from "../../api/microservices/Menu";
import {
  CaretDownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import HomePage from "./home";
import { Redirect, useHistory } from "react-router-dom";
import { SolicitudesService } from "../../api/microservices/Solicitudes";
import { ReservasService } from "../../api/microservices/Reservas";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


  const Header : FC<any> = ({ loadCounter,carCounter }) => {
  console.log("carCounter",carCounter)
  let history = useHistory();

  const [top] = useState(0);
  const [stateMenu, setStateMenu] = useState({ current: "null" });
  const [options, setOptions] = useState<any[]>([])
  const [cartas, setCartas] = useState<any[]>([])
  const [menu, setMenu] = useState<any[]>([])
  const [cartaSelected, setCartaSelected] = useState(null)
  const [idCartaSelected, setIdCartaSelected] = useState(null)
  const [value, setValue] = useState('');


  const handleClick = (e: any) => {
    console.log('click ', e);
    setStateMenu({
      current: e.key,
    });

  }

  useEffect(() => {
    console.log("useEffect")
    loadMenu().then();
  }, [stateMenu])



  const searchOptions = async (data: any) => {
    console.log(data.target.value)
    if (data.target.value.length > 3) {
      CartasService.obtenerCartas(data.target.value).then((result) => {
        //setIsLoading(false);
        if (result.error) {
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
          setCartas(result.data)
          console.log("result.data", result.data)
          const options2: React.SetStateAction<any[]> = [];
          result.data.forEach((cartas: any) => {
            let json = {
              id: cartas.id,
              value: cartas.nombre + ' - ' + cartas.nombre_edicion,
            }
            options2.push(json);

          })
          setOptions(options2)
          setValue(data.target.value);
        }
      })
    }else if(data.target.value.length === 0){
      setOptions([])
    }



  }

  /*const loadEdition = async () => {
    EdicionesService.obtenerEdiciones().then((result) => {
      //setIsLoading(false);
      if (result.error) {
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
        console.log("ediciones", result.data)
      }
    })
  }*/

  const loadMenu = async () => {
    MenuService.obetnerMenu("ACTIVE").then((result) => {
      //setIsLoading(false);
      if (result.error) {
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
        setMenu(result.data)
        console.log("menu", result.data)
      }
    })
  }
  const onSelect = (data: any) => {
    console.log(data)
    if(data!=null){
      setCartaSelected(data.id)
      options.forEach((cartas: any) => {
        console.log(cartas)
        if (cartas.id === data.id){
          setIdCartaSelected(cartas.id)
          history.push("/cards/" + cartas.id);
        }
      })
    }else{
      setOptions([])
    }


  };

  let inputRef;
  return (
    <>
      <Layout>

        <Row className="container-header">

          <Col md={6} className="container-network-social">
            <Tooltip placement="bottom" title={"Facebook"} >
              <a target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  className="icon-social-network"
                  icon={faFacebookSquare}
                />
              </a>
            </Tooltip>

            <Tooltip placement="bottom" title={"Linkedin"} >
              <a target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  className="icon-social-network"
                  icon={faLinkedin}
                />
              </a>
            </Tooltip>

            <Tooltip placement="bottom" title={"Instagram"} >
              <a target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  className="icon-social-network"
                  icon={faInstagramSquare}
                />
              </a>
            </Tooltip>

            <Tooltip placement="bottom" title={"Youtube"} >
              <a target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  className="icon-social-network"
                  icon={faYoutubeSquare}
                />
              </a>
            </Tooltip>

            <Tooltip placement="bottom" title={"Twitter"} >
              <a target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  className="icon-social-network"
                  icon={faTwitterSquare}
                />
              </a>
            </Tooltip>
          </Col>
          <Col md={14} >

            <Autocomplete
            style={{backgroundColor:"white", marginTop:"2%"}}
              onChange={(event, newValue) => {
                 onSelect(newValue); //this will give you the selected value dictionary (source)
              }}
              options={options}
              getOptionLabel={option => option.value }
              getOptionSelected={option => option.id}
              openOnFocus
              onKeyUp={searchOptions}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Ingrese nombre de carta"
                  variant="outlined"
                  inputRef={(input: any) => {
                    inputRef = input;
                  }}
                />
              )}
            />
          </Col>
          <Col md={4} className="info-company">
            <p>Lago Bertrand 120</p>
          </Col>
        </Row>
        <Row >
          <Col md={1} className="container-menu"></Col>
          <Col md={18} className="container-menu">
            {
              menu.length > 0
                ?
                <Menu
                  onClick={handleClick}
                  selectedKeys={[stateMenu.current]}
                  mode="horizontal"
                  className="menu"
                >
                  <Menu.Item key={-1}>
                    <a className="ref-edition" href={"/"}>
                      Recientes
                    </a>
                  </Menu.Item>
                  {
                    menu.map((me: any) =>

                      <Menu.Item key={me.id}>
                        <a className="ref-edition" href={"/edition/" + me.id_edicion_menu.id}>
                          {me.nombre}
                        </a>
                      </Menu.Item>

                    )
                  }
                </Menu>
                : ''

            }

          </Col>
          <Col md={4} className="container-menu">
            {
              carCounter > 0
              ?
              <a href={"request/"+sessionStorage.getItem('key')}>
                <Badge count={carCounter} className="container-counter-card" style={{backgroundColor:"white",color:"black"}}>
                  <ShoppingCartOutlined className="container-cartadd"  />
                </Badge>
              </a>
              :
              <a title="No hay elementos en este carrito :(" className="cursor-not-allowed" >
              <Badge count={carCounter} className="container-counter-card" style={{backgroundColor:"white",color:"black"}}>
                <ShoppingCartOutlined className="container-cartadd"  />
              </Badge>
              </a>
            }

          </Col>
          <Col md={1} className="container-menu"></Col>
        </Row>
      </Layout>


    </>
  );
}
export default Header