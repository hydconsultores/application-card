/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from "react";
import { Menu, Row, Col, Modal, Tooltip, Layout, Badge } from "antd";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faLinkedin,
  faTwitterSquare,
  faInstagramSquare,
  faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";

import { CartasService } from "../../api/microservices/Cartas";
import { MenuService } from "../../api/microservices/Menu";
import {
  ShoppingCartOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

  const Header : FC<any> = ({ loadCounter,carCounter }) => {
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
    setStateMenu({
      current: e.key,
    });
  }

  useEffect(() => {
    loadMenu().then();
  }, [stateMenu])

  const searchOptions = async (data: any) => {
    if (data.target.value.length > 3) {
      CartasService.obtenerCartas(data.target.value).then((result) => {
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



  const loadMenu = async () => {
    MenuService.obetnerMenu("ACTIVE").then((result) => {
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
      }
    })
  }
  const onSelect = (data: any) => {
    if(data!=null){
      setCartaSelected(data.id)
      options.forEach((cartas: any) => {
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

          <Col xs={0} md={6} className="container-network-social">
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
          <Col xs={18} md={14} className="container-searhing">

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
          <Col xs={6} md={4} className="info-company">
            <p>Lago Bertrand 120</p>
          </Col>
        </Row>
        <Row >
          <Col xs={0} md={1} className="container-menu"></Col>
          <Col xs={20} md={18} className="container-menu">
            {
              menu.length > 0
                ?
                <Menu
                overflowedIndicator={<PlusCircleOutlined className="menu-compress"/>}
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
          <Col xs={4} md={4} className="container-menu car-menu">
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
          <Col xs={0} md={1} className="container-menu"></Col>
        </Row>
      </Layout>


    </>
  );
}
export default Header