import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Consult from '../types/consult';
import CreateConsult from '../types/createConsult';

class ConsultService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8081',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async getAllConsults(): Promise<Consult[]> {
    const response: AxiosResponse<Consult[]> =
      await this.apiClient.get('/consults');
    return response.data;
  }

  public async createConsult(consult: CreateConsult): Promise<Consult> {
    try {
      const response: AxiosResponse<Consult> = await this.apiClient.post(
        '/consults',
        consult,
      );
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao criar consultas: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error(error.response?.data.message);
      }
      throw new Error(
        'Houve um erro ao criar consultas, tente novamente mais tarde',
      );
    }
  }

  // public async updateDoctor(crm: string, doctor: Doctor): Promise<Doctor> {
  //   try {
  //     const response: AxiosResponse<Doctor> = await this.apiClient.put(
  //       `/doctors/${crm}`,
  //       doctor,
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(`Houve um erro ao criar médicos: ${error}`);
  //     if (axios.isAxiosError(error) && error.response?.status === 400) {
  //       throw new Error(error.response?.data.message);
  //     }
  //     throw new Error(
  //       'Houve um erro ao criar médicos, tente novamente mais tarde',
  //     );
  //   }
  // }

  // public async deleteDoctor(crm: string): Promise<void> {
  //   await this.apiClient.delete(`/doctors/${crm}`);
  // }
}

export default new ConsultService();
