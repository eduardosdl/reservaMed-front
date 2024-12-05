import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Specialty } from '../types/Specialty';
import { APIError } from '../errors/ApiError';

export class SpecialtyService {
  private static instance: SpecialtyService;
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8081',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static getInstance(): SpecialtyService {
    if (!SpecialtyService.instance) {
      SpecialtyService.instance = new SpecialtyService();
    }
    return SpecialtyService.instance;
  }

  public async getAllSpecialty(): Promise<Specialty[]> {
    try {
      const response: AxiosResponse<Specialty[]> =
        await this.apiClient.get('/specialty');
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao buscar especialidade: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao buscar especialidade, tente novamente mais tarde',
      );
    }
  }

  public async createSpecialty(data: Omit<Specialty, 'id'>): Promise<void> {
    try {
      await this.apiClient.post('/specialty', data);
    } catch (error) {
      console.log(`Houve um erro ao criar especialidade: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao criar especialidade, tente novamente mais tarde',
      );
    }
  }

  public async updateSpecialty(
    id: number,
    data: Omit<Specialty, 'id'>,
  ): Promise<void> {
    try {
      await this.apiClient.put(`/specialty/${id}`, data);
    } catch (error) {
      console.log(`Houve um erro ao atualizar especialidade: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao atualizar especialidade, tente novamente mais tarde',
      );
    }
  }

  public async deleteSpecialty(id: number): Promise<void> {
    try {
      await this.apiClient.delete(`/specialty/id/${id}`);
    } catch (error) {
      console.log(`Houve um erro ao deletar especialidade: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao deletar especialidade, tente novamente mais tarde',
      );
    }
  }
}
