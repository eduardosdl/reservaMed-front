import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Consult } from '../types/consult/consult';
import { ConsultRequest } from '../types/consult/consultRequest';
import { ClinicalRecord } from '../types/clinicalRecord';
import { Prescription } from '../types/prescription';
import { APIError } from '../errors/ApiError';

export class ConsultService {
  private static instance: ConsultService;
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8081',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static getInstance(): ConsultService {
    if (!ConsultService.instance) {
      ConsultService.instance = new ConsultService();
    }
    return ConsultService.instance;
  }

  public async getAllConsults(): Promise<Consult[]> {
    try {
      const response: AxiosResponse<Consult[]> =
        await this.apiClient.get('/consults');
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao buscar consultas: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao buscar consultas, tente novamente mais tarde',
      );
    }
  }

  public async getHistoryConsults(): Promise<Consult[]> {
    try {
      const response: AxiosResponse<Consult[]> =
        await this.apiClient.get('/historyConsult');
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao buscar o historico de consultas: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao buscar o historico de consultas, tente novamente mais tarde',
      );
    }
  }

  public async getPrescription(consultId: number): Promise<Prescription> {
    try {
      const response: AxiosResponse<Prescription> = await this.apiClient.get(
        `/historyConsult/consult/${consultId}`,
      );
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao criar consultas: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao buscar consultas, tente novamente mais tarde',
      );
    }
  }

  public async getConsultsByCpf(cpf: string): Promise<Consult[]> {
    try {
      const response: AxiosResponse<Consult[]> = await this.apiClient.get(
        `/consults/${cpf}`,
      );
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao criar consultas: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao buscar consultas, tente novamente mais tarde',
      );
    }
  }

  public async createConsult(consult: ConsultRequest): Promise<Consult> {
    try {
      const response: AxiosResponse<Consult> = await this.apiClient.post(
        '/consults',
        consult,
      );
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao criar consultas: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao criar consultas, tente novamente mais tarde',
      );
    }
  }

  public async completeConsult(
    consultId: number,
    clinicalRecord: ClinicalRecord,
  ): Promise<Consult> {
    try {
      const response: AxiosResponse<Consult> = await this.apiClient.put(
        `/consults/complete/${consultId}`,
        clinicalRecord,
      );
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao criar consultas: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao criar consultas, tente novamente mais tarde',
      );
    }
  }

  public async updateConsult(
    consultId: number,
    consultData: ConsultRequest,
  ): Promise<Consult> {
    try {
      const response: AxiosResponse<Consult> = await this.apiClient.put(
        '/consults/reschedule/update',
        { id: consultId, ...consultData },
      );
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao criar consultas: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao criar consultas, tente novamente mais tarde',
      );
    }
  }

  public async cancelConsult(id: number, reason: string): Promise<void> {
    try {
      await this.apiClient.delete<number>('/consults', {
        data: { id, reason },
      });
    } catch (error) {
      console.log(`Houve um erro ao criar consultas: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao criar consultas, tente novamente mais tarde',
      );
    }
  }
}
