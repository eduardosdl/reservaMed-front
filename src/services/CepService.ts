import axios, { AxiosInstance } from 'axios';
import Address from '../types/address';

class CepService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://viacep.com.br/ws',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async getAddressFromCep(cep: string): Promise<Address> {
    const response = await this.apiClient.get(`/${cep}/json/`);
    return response.data;
  }
}

export default new CepService();
