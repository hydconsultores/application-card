//Importamos las Clases reutilizables para el consumo de APIS creadas previamente
import { RequestResponse } from '../dto/request-response';
import { Request } from '../request';
import { MICROSERVICIOS } from '../constants';
//importamos las clases necesarias para esta API en específico
//import { LoginDTO } from '../dto/login.dto';

export class CartasService {
    
    static async obtenerCartas(data: any): Promise<RequestResponse> {
        return new Request(MICROSERVICIOS.API).get(`/cartas/busqueda/${data}`);
    }


    static async obtenerCartasAll(): Promise<RequestResponse> {
        return new Request(MICROSERVICIOS.API).get(`/cartas/busquedaAll`);
    }
    static async obtenerCartasId(idCarta: number): Promise<RequestResponse> {
        return new Request(MICROSERVICIOS.API).get(`/cartas/busquedaId/${idCarta}`); 
    }
   
    static async obtenerGaleria(idEdicion: any,desde :number, hasta:number,isOrder:string, current: number): Promise<RequestResponse> {
        return new Request(MICROSERVICIOS.API).get(`/cartas/busquedaGaleria/${idEdicion}/${desde}/${hasta}/${isOrder}/${current}`); 
    }

    static async busquedaAvanzada(jsonData:{},desde :number, hasta:number,isOrder:string, current:number): Promise<RequestResponse> {
        return new Request(MICROSERVICIOS.API).post(`/cartas/busquedaAvanzadaGaleria/${desde}/${hasta}/${isOrder}/${current}`,jsonData);
      }
    
}