import axios, { AxiosInstance } from 'axios';
import Address from '../types/address';

export class CepService {
  private static instance: CepService;
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://viacep.com.br/ws',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static getInstance(): CepService {
    if (!CepService.instance) {
      CepService.instance = new CepService();
    }
    return CepService.instance;
  }

  public async getAddressFromCep(cep: string): Promise<Address> {
    const response = await this.apiClient.get(`/${cep}/json/`);
    return response.data;
  }
}
