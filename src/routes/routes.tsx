import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Headers from "../pages/web/header";
import Footers from "../pages/web/footer";
import InicioPage from "../pages/web/inicio";
import CartaDetallePage from "../pages/web/cartas/cartaDetalle";
import { ReservasService } from "../api/microservices/Reservas";
import { Modal } from "antd";
import Solicitudes from "../pages/web/solicitudes/solicitudes";
import BusquedaAvanzada from "../pages/web/busqueda/busqueda-avanzada";
import FormContacto from "../pages/web/forms/form-contacto";
export default function Routes() {
  const [carCounter, setCarCounter] = useState(0 as number);
  
  useEffect(() => {
    loadCounter().then();
  })

  const loadCounter = async () => {
    let tokenSession = sessionStorage.getItem('key')
    if(tokenSession !== null){
      let body={
        token:sessionStorage.getItem('key')
      }
      ReservasService.finByToken(body).then((result) => {
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
            Modal.error({
                content: mensaje,
            });
        } else {
            if (result.status == 200 || result.status == 201) {
                if (result.data !== undefined) {
                  setCarCounter(result.data.length)
                  window.sessionStorage.setItem("carcounter", result.data.length);
                }
            } else {
                Modal.error({
                    content: result.data.description,
                });
            }
    
        }
    })
    }else{
      setCarCounter(0)
      window.sessionStorage.setItem("carcounter", "0");
    }
  }
    return (
        <Switch>
        <Route exact path={"/"}>
          <Headers loadCounter={loadCounter} carCounter={carCounter}/>
          <InicioPage loadCounter={loadCounter} stateMenu={null} idCarta={undefined} carta={null} title={""} type={"COTIZA"} />
          <Footers />
        </Route>

        <Route exact path={"/edition/:id"}>
          <Headers loadCounter={loadCounter} carCounter={carCounter}/>
          <InicioPage loadCounter={loadCounter} stateMenu={null} idCarta={undefined} carta={null} title={""} type={"COTIZA"} />
          <Footers />
        </Route>
        <Route  path={["/request/:id", "/cards/request/:id","/edition/request/:id"]} >
          <Headers loadCounter={loadCounter} carCounter={carCounter}/>
          <Solicitudes loadCounter={loadCounter}  />
          <Footers />
        </Route>
        
        <Route  path={["/cards/:id", "/edition/cards/:id"]} >
          <Headers loadCounter={loadCounter} carCounter={carCounter}/>
          <CartaDetallePage loadCounter={loadCounter}  />
          <Footers />
        </Route>

        <Route exact path={"/advance-search"}>
          <Headers loadCounter={loadCounter} carCounter={carCounter}/>
          <BusquedaAvanzada loadCounter={loadCounter} stateMenu={null} idCarta={undefined} carta={null} title={""}/>
          <Footers />
        </Route>

        <Route exact path={"/form-contacto"}>
          <Headers loadCounter={loadCounter} carCounter={carCounter}/>
          <FormContacto loadCounter={loadCounter} />
          <Footers />
        </Route>

        </Switch>
    )
}
    