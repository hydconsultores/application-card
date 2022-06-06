//Importamos las Clases reutilizables para el consumo de APIS creadas previamente
import { RequestResponse } from '../dto/request-response';
import { Request } from '../request';
import { MICROSERVICIOS } from '../constants';
//importamos las clases necesarias para esta API en específico
//import { LoginDTO } from '../dto/login.dto';

export class ReservasService {
    
      static async crearReserva(data: any): Promise<RequestResponse> {
        return new Request(MICROSERVICIOS.API).post('/reservas/crear', data);
      }
      static async finByToken(data: any): Promise<RequestResponse> {
        return new Request(MICROSERVICIOS.API).post('/reservas/fin-by-token',data);
      }

      static async updateContador(data: any): Promise<RequestResponse> {
        return new Request(MICROSERVICIOS.API).put('/reservas/update-contador',data);
      }

      static async desactiveReserva(data: any): Promise<RequestResponse> {
        return new Request(MICROSERVICIOS.API).put('/reservas/desactive',data);
      }


}