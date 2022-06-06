import axios, { AxiosResponse } from 'axios';
import { REQUEST_TIMEOUT } from './constants';
import { RequestResponse } from './dto/request-response';
import { history } from '../index'

export class Request {
  private endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  isNetworkError = (err: any) => {
    
    if(err.response && err.response.status === 401) {
      localStorage.clear();
    }

    return !!err.isAxiosError && !err.response;
  }

  async _getHeader() {
    let header: any = { timeout: 1000 * REQUEST_TIMEOUT };
    header = {
      headers: {
        ContentType: 'application/json',
      },
      timeout: 1000 * REQUEST_TIMEOUT + 1000,
    };
    return header;
  }
 
  async get(url: string): Promise<RequestResponse> {
    const header = await this._getHeader();
    return new Promise(async resolve => {
      setTimeout(() => {
        resolve({
          status: -1,
          description: 'Supero el tiempo de espera',
          error: 'Tiempo de espera superado',
        });
      }, 1000 * REQUEST_TIMEOUT);
      try {
        const response = await axios.get(this.endpoint.concat(url), header);
        resolve({
          status: response.status,
          description: response.statusText,
          data: response.data,
        });
      } catch (error) {
        if (this.isNetworkError(error)) {
          resolve({
            status: -1,
            description: 'No hay conexión a internet',
            data: null,
            error: 'No hay conexión a internet',
          });
        } else {
          resolve({
            status: error.response.status,
            description: error.response.data.error,
            data: error.response.data,
            error: error.response,
          });
        }
      }
    });
  }

  async delete(url: string): Promise<RequestResponse> {
    const header = await this._getHeader();
    return new Promise(async resolve => {
      setTimeout(() => {
        resolve({
          status: -1,
          description: 'Supero el tiempo de espera',
          error: 'Tiempo de espera superado',
        });
      }, 1000 * REQUEST_TIMEOUT);
      try {
        const response = await axios.delete(this.endpoint.concat(url), header);
        resolve({
          status: response.status,
          description: response.statusText,
          data: response.data,
        });
      } catch (error) {
        if (this.isNetworkError(error)) {
          resolve({
            status: -1,
            description: 'No hay conexión a internet',
            data: null,
            error: 'No hay conexión a internet',
          });
        } else {
          resolve({
            status: error.response.status,
            description: error.response.data.error,
            data: error.response.data,
            error: error.response,
          });
        }
      }
    });
  }

  async put(
    url: string,
    body: any,    
  ): Promise<RequestResponse> {
    console.log('update user', body);
    const header = await this._getHeader();
    return new Promise(async resolve => {
      setTimeout(() => {
        resolve({
          status: -1,
          description: 'Supero el tiempo de espera',
          error: 'Tiempo de espera superado',
        });
      }, 1000 * REQUEST_TIMEOUT);
      try {
        const response = await axios.put(
          this.endpoint.concat(url),
          body,
          header,
        );
        resolve({
          status: response.status,
          description: response.statusText,
          data: response.data,
        });
      } catch (error) {
        if (this.isNetworkError(error)) {
          resolve({
            status: -1,
            description: 'No hay conexión a internet',
            data: null,
            error: 'No hay conexión a internet',
          });
        } else {
          resolve({
            status: error.response.status,
            description: error.response.data.error,
            data: error.response.data,
            error: error.response,
          });
        }
      }
    });
  }

  async patch(
    url: string,
    body: any,    
  ): Promise<RequestResponse> {
    const header = await this._getHeader();
    return new Promise(async resolve => {
      setTimeout(() => {
        resolve({
          status: -1,
          description: 'Supero el tiempo de espera',
          error: 'Tiempo de espera superado',
        });
      }, 1000 * REQUEST_TIMEOUT);
      try {
        const response = await axios.patch(
          this.endpoint.concat(url),
          body,
          header,
        );
        resolve({
          status: response.status,
          description: response.statusText,
          data: response.data,
        });
      } catch (error) {
        if (this.isNetworkError(error)) {
          resolve({
            status: -1,
            description: 'No hay conexión a internet',
            data: null,
            error: 'No hay conexión a internet',
          });
        } else {
          resolve({
            status: error.response.status,
            description: error.response.data.error,
            data: error.response.data,
            error: error.response,
          });
        }
      }
    });
  }

  async post(
    url: string,
    body: any,    
  ): Promise<RequestResponse> {
    
    const header = await this._getHeader();
    
    return new Promise(async resolve => {
      setTimeout(() => {
        resolve({
          status: -1,
          description: 'Supero el tiempo de espera',
          error: 'Tiempo de espera superado',
        });
      }, 1000 * REQUEST_TIMEOUT);
      try {
        const response = await axios.post(
          this.endpoint.concat(url),
          body,
          header,
        );
        console.warn('post', response);
        resolve({
          status: response.status,
          description: response.statusText,
          data: response.data,
        });
      } catch (error) {
        if (this.isNetworkError(error)) {
          resolve({
            status: -1,
            description: 'No hay conexión a internet',
            data: null,
            error: 'No hay conexión a internet',
          });
        } else {
          resolve({
            status: error.response.status,
            description: error.response.data.error,
            data: error.response.data,
            error: error.response,
          });
        }
      }
    });
  }

  async postMediaFiles(
    url: string,
    body: any,    
  ): Promise<RequestResponse> {

    let header: any = { timeout: 1000 * REQUEST_TIMEOUT };
    const tokenInput = document.getElementById("tkn") as any;
    let token = '';
    if (tokenInput !== null) {
      token = tokenInput.value;
      if (tokenInput.title === 'bearer'){
        token = `Bearer ${token}`;
      }
    }

    header = {
      headers: {
        Authorization: token
      },
      timeout: 1000 * REQUEST_TIMEOUT + 1000,
    };
    
    return new Promise(async resolve => {
      setTimeout(() => {
        resolve({
          status: -1,
          description: 'Supero el tiempo de espera',
          error: 'Tiempo de espera superado',
        });
      }, 1000 * REQUEST_TIMEOUT);
      try {
        const response = await axios.post(
          this.endpoint.concat(url),
          body,
          header,
        );
        console.warn('post', response);
        resolve({
          status: response.status,
          description: response.statusText,
          data: response.data,
        });
      } catch (error) {
        if (this.isNetworkError(error)) {
          resolve({
            status: -1,
            description: 'No hay conexión a internet',
            data: null,
            error: 'No hay conexión a internet',
          });
        } else {
          resolve({
            status: error.response.status,
            description: error.response.data.error,
            data: error.response.data,
            error: error.response,
          });
        }
      }
    });
  }
}
