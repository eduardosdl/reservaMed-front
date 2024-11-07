import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Patient } from '../types/patient';
import { APIError } from '../errors/ApiError';

export class PatientService {
  private static instance: PatientService;
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8081',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static getInstance(): PatientService {
    if (!PatientService.instance) {
      PatientService.instance = new PatientService();
    }
    return PatientService.instance;
  }

  public async getAllPatients(): Promise<Patient[]> {
    try {
      const response: AxiosResponse<Patient[]> =
        await this.apiClient.get('/patients');
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao buscar pacientes: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao buscar pacientes, tente novamente mais tarde',
      );
    }
  }

  public async createPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
    try {
      const response: AxiosResponse<Patient> = await this.apiClient.post(
        '/patients',
        patient,
      );
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao criar paciente: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao criar paciente, tente novamente mais tarde',
      );
    }
  }

  public async updatePatient(
    id: number,
    patient: Omit<Patient, 'id'>,
  ): Promise<Patient> {
    try {
      const response: AxiosResponse<Patient> = await this.apiClient.put(
        `/patients/${id}`,
        patient,
      );
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao criar paciente: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao criar paciente, tente novamente mais tarde',
      );
    }
  }

  public async deletePatient(cpf: string): Promise<void> {
    try {
      await this.apiClient.delete(`/patients/${cpf}`);
    } catch (error) {
      console.log(`Houve um erro ao excluir paciente: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new APIError(error.response?.data.message);
      }
      throw new APIError(
        'Houve um erro ao excluir paciente, tente novamente mais tarde',
      );
    }
  }
}
