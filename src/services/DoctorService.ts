import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Doctor } from '../types/doctor';
import { APIError } from '../errors/ApiError';
import { DoctorConsults } from '../types/doctorConsult';

export class DoctorService {
  private static instance: DoctorService;
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8081',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static getInstance(): DoctorService {
    if (!DoctorService.instance) {
      DoctorService.instance = new DoctorService();
    }
    return DoctorService.instance;
  }

  public async getAllDoctors(): Promise<Doctor[]> {
    try {
      const response: AxiosResponse<Doctor[]> =
        await this.apiClient.get('/doctors');
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao buscar médicos: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao buscar médicos, tente novamente mais tarde',
      );
    }
  }

  public async getAllConsults(crm: string): Promise<DoctorConsults> {
    try {
      const response: AxiosResponse<DoctorConsults> = await this.apiClient.get(
        `/doctors/${crm}/consults`,
      );
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

  public async createDoctor(doctor: Omit<Doctor, 'id'>): Promise<Doctor> {
    try {
      const response: AxiosResponse<Doctor> = await this.apiClient.post(
        '/doctors',
        doctor,
      );
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao criar médicos: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao criar médicos, tente novamente mais tarde',
      );
    }
  }

  public async updateDoctor(
    crm: string,
    doctor: Omit<Doctor, 'id'>,
  ): Promise<Doctor> {
    try {
      const response: AxiosResponse<Doctor> = await this.apiClient.put(
        `/doctors/${crm}`,
        doctor,
      );
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao atualizar médicos: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao atualizar médicos, tente novamente mais tarde',
      );
    }
  }

  public async deleteDoctor(crm: string): Promise<void> {
    try {
      await this.apiClient.delete(`/doctors/${crm}`);
    } catch (error) {
      console.log(`Houve um erro ao excluir médico: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao excluir médico, tente novamente mais tarde',
      );
    }
  }
}
