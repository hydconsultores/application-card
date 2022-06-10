//Importamos las Clases reutilizables para el consumo de APIS creadas previamente
import { RequestResponse } from '../dto/request-response';
import { Request } from '../request';
import { MICROSERVICIOS } from '../constants';
//importamos las clases necesarias para esta API en específico
//import { LoginDTO } from '../dto/login.dto';

export class ContactoService {
    
    static async crearContacto(data: any): Promise<RequestResponse> {
        return new Request(MICROSERVICIOS.API).post('/contacto/crear', data);
      }

}