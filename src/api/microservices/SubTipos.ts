//Importamos las Clases reutilizables para el consumo de APIS creadas previamente
import { RequestResponse } from '../dto/request-response';
import { Request } from '../request';
import { MICROSERVICIOS } from '../constants';
//importamos las clases necesarias para esta API en específico
//import { LoginDTO } from '../dto/login.dto';

export class SubTiposService {
    
    static async findActive(): Promise<RequestResponse> {
        return new Request(MICROSERVICIOS.API).get(`/sub-tipos/busquedaAll`);
    }


}