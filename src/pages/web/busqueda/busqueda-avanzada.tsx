import React, { useEffect, useState } from "react";
import { Row, Col, Layout, Modal, Button, Tag, Collapse, Select } from "antd";
import { useHistory } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { TerminacionesService } from "../../../api/microservices/Terminaciones";
import { CondicionesService } from "../../../api/microservices/Condiciones";
import RollbackOutlined from "@ant-design/icons/lib/icons/RollbackOutlined";
import ClearOutlined from "@ant-design/icons/lib/icons/ClearOutlined";
import { EdicionesService } from "../../../api/microservices/Ediciones";
import { ColoresService } from "../../../api/microservices/Colores";
import { LegalitiesService } from "../../../api/microservices/Legalities";
import { LenguajesService } from "../../../api/microservices/Lenguajes";
import { RarezasService } from "../../../api/microservices/Rarezas";
import { SuperTiposService } from "../../../api/microservices/SuperTipos";
import { TiposService } from "../../../api/microservices/Tipos";
import { SubTiposService } from "../../../api/microservices/SubTipos";
import DetalleBusqueda from "./detalle-busqueda";
const { Panel } = Collapse;

type Props = {
    stateMenu: any | null;
    idCarta: any | null;
    carta: string | null;
    title: string;
    loadCounter:any;
}

export default function BusquedaAvanzada(props: Props) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false)
    const [condiciones, setCondiciones] = useState([] as any)
    const [terminaciones, setTerminaciones] = useState([] as any)
    const [ediciones, setEdiciones] = useState([] as any)
    const [colores, setColores] = useState([] as any)
    const [legalities, setLegalities] = useState([] as any)
    const [lenguajes, setLenguajes] = useState([] as any)
    const [rarezas, setRarezas] = useState([] as any)

    const [superTipos, setSuperTipos] = useState([] as any)
    const [tipos, setTipos] = useState([] as any)
    const [subTipos, setSubTipos] = useState([] as any)

    const [selectedCondition,setSelectedCondition] = useState([] as any)
    const [selectedTermination,setSelectedTermination] = useState([] as any)
    const [selectedEdition,setSelectedEdition] = useState([] as any)
    const [selectedColors,setSelectedColors] = useState([] as any)
    const [selectedLegalities,setSelectedLegalities] = useState([] as any)
    const [selectedLenguajes,setSelectedLenguajes] = useState([] as any)
    const [selectedRarezas,setSelectedRarezas] = useState([] as any)

    const [selectedConditionValues,setSelectedConditionValues] = useState([] as any)
    const [selectedTerminationValues,setSelectedTerminationValues] = useState([] as any)
    const [selectedEditionValues,setSelectedEditionValues] = useState([] as any)
    const [selectedColorsValues,setSelectedColorsValues] = useState([] as any)
    const [selectedLegalitiesValues,setSelectedLegalitiesValues] = useState([] as any)
    const [selectedLenguajesValues,setSelectedLenguajesValues] = useState([] as any)
    const [selectedRarezasValues,setSelectedRarezasValues] = useState([] as any)

    const [selectedSuperTipos,setSelectedSuperTipos] = useState([] as any)
    const [selectedTipos,setSelectedTipos] = useState([] as any)
    const [selectedSubTipos,setSelectedSubTipos] = useState([] as any)

    const [selectedSuperTiposValues,setSelectedSuperTiposValues] = useState([] as any)
    const [selectedTiposValues,setSelectedTiposValues] = useState([] as any)
    const [selectedSubTiposValues,setSelectedSubTiposValues] = useState([] as any)
    const [searchOk, setSearchOk] = useState(false)
    const [jsonData, setJsonData] = useState({} as any)
    const [activeKey, setActiveKey] = useState("0")
    
    const [opciones,setOpciones] = useState([] as any)
    const arrayColores = ["gold","pink","red","yellow",
    "orange","cyan","green","blue","purple","geekblue",
    "magenta","volcano","lime","Brown","black","violet",
    "Turquoise","Fuchsia","lemon"];
    const [openCollapse,setOpenCollapse] = useState("1" as string)
    
    useEffect(() => {
        loadCondiciones().then();
        loadTerminaciones().then();
        loadEdiciones().then();
        loadColores().then();
        loadLegalities().then();
        loadLenguajes().then();
        loadRarezas().then();

        loadSuperTipos().then();
        loadTipos().then();
        loadSubTipos().then();
       
    }, [])


      
    const searchColorArray = (datos:[], values:[]) => {
        let arrayTemp: string[] = [];
        values.map((val: any) => {
            datos.map((dato: any) => {
                if(val === dato.value){
                    arrayTemp.push(dato.id);
                }
            });
        });
       return arrayTemp;
    }

    const searchToArray = (datos:[], values:[]) => {
        let arrayTemp: string[] = [];
        values.map((val: any) => {
            datos.map((dato: any) => {
                if(val === dato.nombre){
                    arrayTemp.push(dato.id);
                }
            });
        });
       return arrayTemp;
    }

    const crearArray = (datos:any) => {
        let arrayTemp: { label: any; value: string;id: number; }[] = [];
        let numberColor = 0;
        datos.map((dato: any) => {
            if(numberColor >= arrayColores.length){
                numberColor = 0;
            }
            arrayTemp.push({label:dato.nombre,value: arrayColores[numberColor],id:dato.id});
            numberColor++;
        });
       return arrayTemp;
    }

    const handleChange = (selectedItems: any,type :string) => {
        setSearchOk(false)
        if(type === 'condition'){
            setSelectedConditionValues(selectedItems);
            setSelectedCondition(searchColorArray(condiciones,selectedItems));
        }else if(type === 'termination'){
            setSelectedTerminationValues(selectedItems);
            setSelectedTermination(searchColorArray(terminaciones,selectedItems));
        }else if(type === 'edition'){
            setSelectedEditionValues(selectedItems)
            setSelectedEdition(searchToArray(ediciones,selectedItems))
        }else if(type === 'colors'){
            setSelectedColorsValues(selectedItems)
            setSelectedColors(searchColorArray(colores,selectedItems))
        }else if(type === 'legalities'){
            setSelectedLegalitiesValues(selectedItems)
            setSelectedLegalities(searchColorArray(legalities,selectedItems))
        }else if(type === 'lenguajes'){
            setSelectedLenguajesValues(selectedItems)
            setSelectedLenguajes(searchToArray(lenguajes,selectedItems))
        }else if(type === 'rarezas'){
            setSelectedRarezasValues(selectedItems)
            setSelectedRarezas(searchToArray(rarezas,selectedItems))
        }else if(type === 'super-tipos'){
            setSelectedSuperTiposValues(selectedItems)
            setSelectedSuperTipos(searchToArray(superTipos,selectedItems))
        }else if(type === 'tipos'){
            setSelectedTiposValues(selectedItems)
            setSelectedTipos(searchToArray(tipos,selectedItems))
        }else if(type === 'sub-tipos'){
            setSelectedSubTiposValues(selectedItems)
            setSelectedSubTipos(searchToArray(subTipos,selectedItems))
        }
        
      };

    const loadSubTipos = async () => {
        SubTiposService.findActive().then((result) => {

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
                        content: 'Lo sentimos, no hemos podido las ediciones',
                    });
                }
            } else {
                if (result.data !== undefined) {
                    setSubTipos(result.data)
                }
            }
        })
    }
    const loadTipos = async () => {
        TiposService.findActive().then((result) => {

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
                        content: 'Lo sentimos, no hemos podido las ediciones',
                    });
                }
            } else {
                if (result.data !== undefined) {
                    setTipos(result.data)
                }
            }
        })
    }
    const loadSuperTipos = async () => {
        SuperTiposService.findActive().then((result) => {

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
                        content: 'Lo sentimos, no hemos podido las ediciones',
                    });
                }
            } else {
                if (result.data !== undefined) {
                    setSuperTipos(result.data)
                }
            }
        })
    }
    const loadRarezas = async () => {
        RarezasService.findActive().then((result) => {

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
                        content: 'Lo sentimos, no hemos podido las ediciones',
                    });
                }
            } else {
                if (result.data !== undefined) {
                    setRarezas(crearArray(result.data))
                }
            }
        })
    }
    const loadLenguajes = async () => {
        LenguajesService.findActive().then((result) => {

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
                        content: 'Lo sentimos, no hemos podido las ediciones',
                    });
                }
            } else {
                if (result.data !== undefined) {
                    setLenguajes(result.data)
                }
            }
        })
    }
    const loadLegalities = async () => {
        LegalitiesService.findActive().then((result) => {

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
                        content: 'Lo sentimos, no hemos podido las ediciones',
                    });
                }
            } else {
                if (result.data !== undefined) {
                    setLegalities(crearArray(result.data))
                }
            }
        })
    }
    const loadColores = async () => {
        ColoresService.findActive().then((result) => {

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
                        content: 'Lo sentimos, no hemos podido las ediciones',
                    });
                }
            } else {
                if (result.data !== undefined) {
                    setColores(crearArray(result.data))
                }
            }
        })
    }
    const loadEdiciones = async () => {
        EdicionesService.obtenerEdiciones().then((result) => {

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
                        content: 'Lo sentimos, no hemos podido las ediciones',
                    });
                }
            } else {
                if (result.data !== undefined) {
                    setEdiciones(result.data)
                }
            }
        })
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
                    setCondiciones(crearArray(result.data))
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
                    setTerminaciones(crearArray(result.data))
                }
            }
        })
    }

    function tagRender(props:any) {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event:any) => {
          event.preventDefault();
          event.stopPropagation();
        };
        return (
          <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginRight: 3 }}
          >
            {label}
          </Tag>
        );
      }

    const closePanel= () =>{
        if(activeKey == "1"){
            setActiveKey("0");     
        }else{
            setActiveKey("1");
        }
        
        setSearchOk(false);
    }

    const clearFilter = () => {
        setSelectedTiposValues([])
        setSelectedSubTiposValues([])
        setSelectedSuperTiposValues([])
        setSelectedRarezasValues([])
        setSelectedColorsValues([])
        setSelectedLegalitiesValues([])
        setSelectedLenguajesValues([])
        setSelectedTerminationValues([])
        setSelectedConditionValues([])
        setSelectedEditionValues([])
    }

    const onFinish = () => {
        setOpenCollapse("0");
        setJsonData({
            terminaciones:selectedTermination,
            condiciones:selectedCondition,
            ediciones:selectedEdition,
            colores:selectedColors,
            legalities:selectedLegalities,
            lenguajes:selectedLenguajes,
            rarezas:selectedRarezas,
            super_tipos:selectedSuperTipos,
            tipos:selectedTipos,
            sub_tipos:selectedSubTipos
        })
        setActiveKey("1");
        setSearchOk(true);        
      };

    return (
        <>
      <Layout >
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

            <Row className="container-bloque-cabecera">
                <Col md={10}> <Button className="list-galeria-volver" type="primary" onClick={() => { history.push("/") }} icon={<RollbackOutlined />}>
                Volver
                </Button></Col>
            </Row>
            <Row className="container-bloque-cabecera">
                <Col xs={2} md={10}></Col>    
                <Col xs={20} md={8} className="container-bloque-cabecera-title">
                    <h4>Búsqueda Avanzada</h4>
                </Col>
                <Col  xs={2} md={6}></Col>
            </Row>

            <Collapse  activeKey={[activeKey]} onChange={ closePanel} style={{width:"100%"}}>
            {
                
                <Panel  showArrow={false}  header="Filtros" key="0" >

                <Row className="container-bloque-form">
    
                    <Col md={1} ></Col>
                    <Col md={11} className="container-search-advance">
                        <Row>
                        <Col xs={24} md={24} className="container-search-advance">
                            <Row>
                            {/* tipos*/} 
                            <Col xs={8} md={8}>Tipos:</Col>
                            <Col xs={16} md={16}>
                                <Select
                                    mode="multiple"
                                    placeholder="Seleccione tipos"
                                    value={selectedTiposValues}
                                    onChange={(e) => {
                                        handleChange(e, "tipos");
                                    }}
                                    style={{ width: '100%' }}
                                    >
                                    {tipos.map((item:any) => (
                                    <Select.Option key={item.nombre} value={item.nombre}>
                                        {item.nombre}
                                    </Select.Option>
                                    ))}
                                </Select>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} md={24} className="container-search-advance">
                            <Row>
                            {/*sub-tipos*/} 
                            <Col xs={8} md={8}>Sub Tipos:</Col>
                            <Col xs={16} md={16}>
                                <Select
                                    mode="multiple"
                                    placeholder="Seleccione sub tipos"
                                    value={selectedSubTiposValues}
                                    onChange={(e) => {
                                        handleChange(e, "sub-tipos");
                                    }}
                                    style={{ width: '100%' }}
                                    >
                                    {subTipos.map((item:any) => (
                                    <Select.Option key={item.nombre} value={item.nombre}>
                                        {item.nombre}
                                    </Select.Option>
                                    ))}
                                </Select>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} md={24} className="container-search-advance">
                            <Row>
                            {/*super tipos*/} 
                            <Col xs={8} md={8}>Super Tipos:</Col>
                            <Col xs={16} md={16}>
                                <Select
                                    mode="multiple"
                                    placeholder="Seleccione super tipos"
                                    value={selectedSuperTiposValues}
                                    onChange={(e) => {
                                        handleChange(e, "super-tipos");
                                    }}
                                    style={{ width: '100%' }}
                                    >
                                    {superTipos.map((item:any) => (
                                    <Select.Option key={item.nombre} value={item.nombre}>
                                        {item.nombre}
                                    </Select.Option>
                                    ))}
                                </Select>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} md={24} className="container-search-advance">
                            <Row>
                            {/*rarezas*/} 
                            <Col xs={8} md={8}>Rarezas:</Col>
                            <Col xs={16} md={16}>
                                <Select
                                    mode="multiple"
                                    placeholder="Seleccione rarezas"
                                    value={selectedRarezasValues}
                                    onChange={(e) => {
                                        handleChange(e, "rarezas");
                                    }}
                                    style={{ width: '100%' }}
                                    tagRender={tagRender}
                                    options={rarezas}
                                    >
                                </Select>
                            </Col>
                            </Row>
                        </Col>
                        <Col xs={24} md={24} className="container-search-advance">
                            <Row> 
                            {/*colors*/} 
                            <Col xs={8} md={8}>Colores:</Col>
                            <Col xs={16} md={16}>
                                <Select
                                    mode="multiple"
                                    placeholder="Seleccione colores"
                                    value={selectedColorsValues}
                                    onChange={(e) => {
                                        handleChange(e, "colors");
                                    }}
                                    style={{ width: '100%' }}
                                    tagRender={tagRender}
                                    options={colores}
                                    >
                                </Select>
                                </Col>
                            </Row>
                        </Col>  
                        </Row>
                    </Col>
    
                    <Col md={11} className="container-search-advance">
                        <Row>
                        <Col xs={24} md={24} className="container-search-advance">
                            <Row> 
                            {/*legalities*/} 
                            <Col xs={8} md={8}>Legalidad:</Col>
                            <Col xs={16} md={16}>
                                <Select
                                    mode="multiple"
                                    placeholder="Seleccione Legalidad"
                                    value={selectedLegalitiesValues}
                                    onChange={(e) => {
                                        handleChange(e, "legalities");
                                    }}
                                    style={{ width: '100%' }}
                                    tagRender={tagRender}
                                    options={legalities}
                                    >
                                </Select>
                                </Col>
                            </Row>
                        </Col>  
                        <Col xs={24} md={24} className="container-search-advance">
                            <Row>
                                {/*lenguajes*/} 
                                <Col xs={8} md={8}>Idiomas:</Col>
                                <Col xs={16} md={16}>
                                    <Select
                                        mode="multiple"
                                        placeholder="Seleccione idiomas"
                                        value={selectedLenguajesValues}
                                        onChange={(e) => {
                                            handleChange(e, "lenguajes");
                                        }}
                                        style={{ width: '100%' }}
                                        >
                                        {lenguajes.map((item:any) => (
                                        <Select.Option key={item.nombre} value={item.nombre}>
                                            {item.nombre}
                                        </Select.Option>
                                        ))}
                                    </Select>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} md={24} className="container-search-advance">
                            <Row>
                            {/*termination*/}
                            <Col xs={8} md={8}>Terminaciones:</Col>
                            <Col xs={16} md={16}>
                                    <Select
                                        mode="multiple"
                                        placeholder="Seleccione terminaciones"
                                        value={selectedTerminationValues}
                                        onChange={(e) => {
                                            handleChange(e, "termination");
                                        }}
                                        style={{ width: '100%' }}
                                        tagRender={tagRender}
                                        options={terminaciones}
                                        >
                                    </Select>
                                    
                            </Col>
                            </Row>
                        </Col>    
                        <Col xs={24} md={24} className="container-search-advance">
                            <Row> 
                            {/*condition*/} 
                            <Col xs={8} md={8}>Condiciones:</Col>
                            <Col xs={16} md={16}>
                                <Select
                                    mode="multiple"
                                    placeholder="Seleccione condiciones"
                                    value={selectedConditionValues}
                                    onChange={(e) => {
                                        handleChange(e, "condition");
                                    }}
                                    style={{ width: '100%' }}
                                    tagRender={tagRender}
                                    options={condiciones}
                                    >
                                </Select>
                                </Col>
                            </Row>
                        </Col>  
                        <Col xs={24} md={24} className="container-search-advance">
                            <Row> 
                            {/*edition*/} 
                            <Col xs={8} md={8}>Ediciones:</Col>
                            <Col xs={16} md={16}>
                                <Select
                                    mode="multiple"
                                    placeholder="Seleccione ediciones"
                                    value={selectedEditionValues}
                                    onChange={(e) => {
                                        handleChange(e, "edition");
                                    }}
                                    style={{ width: '100%' }}
                                    >
                                    {ediciones.map((item:any) => (
                                    <Select.Option key={item.nombre} value={item.nombre}>
                                        {item.nombre}
                                    </Select.Option>
                                    ))}
                                </Select>
                                </Col>
                            </Row>
                        </Col>  
                        </Row>    
                    </Col>
                    <Col md={1} ></Col>
                    
                    <Row className="container-button-advance">
                    <Col xs={1} md={8}></Col>
                    <Col xs={10} md={4} className="col-search-advance">
                        <Button className="selButton-search-advance" onClick={onFinish}>
                        Buscar
                        </Button>
                    </Col>
                    <Col xs={2} md={1}></Col>
                    <Col xs={10} md={4} className="col-search-advance">
                        <Button className="selButton-search-advance" onClick={clearFilter}>
                        <ClearOutlined />
                        Limpiar filtros
                        </Button>
                    </Col>
                    <Col xs={1} md={7}></Col>
                    </Row>                    
                </Row>
                </Panel>
                
            }    

            </Collapse>
        </Row>

        }

{
            searchOk == true ?
            <DetalleBusqueda 
            jsonData = {jsonData}
            searchOk = {searchOk}
            openCollapse = {openCollapse}
            loadCounter={props.loadCounter} stateMenu={props.stateMenu} idCarta={props.idCarta} carta={props.carta} title={""}></DetalleBusqueda>
            :
            null
        }
        </Layout>
      </>
    );
  }
  