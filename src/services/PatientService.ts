import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Patient from '../types/patient';

class PatientService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8081',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async getAllPatients(): Promise<Patient[]> {
    const response: AxiosResponse<Patient[]> =
      await this.apiClient.get('/patients');
    return response.data;
  }

  public async createPatient(patient: Patient): Promise<Patient> {
    try {
      const response: AxiosResponse<Patient> = await this.apiClient.post(
        '/patients',
        patient,
      );
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao criar paciente: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error(error.response?.data.message);
      }
      throw new Error(
        'Houve um erro ao criar paciente, tente novamente mais tarde',
      );
    }
  }

  public async updatePatient(cpf: string, patient: Patient): Promise<Patient> {
    try {
      const response: AxiosResponse<Patient> = await this.apiClient.put(
        `/patients/${cpf}`,
        patient,
      );
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao criar paciente: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error(error.response?.data.message);
      }
      throw new Error(
        'Houve um erro ao criar paciente, tente novamente mais tarde',
      );
    }
  }

  public async deletePatient(cpf: string): Promise<void> {
    await this.apiClient.delete(`/patients/${cpf}`);
  }
}

export default new PatientService();
