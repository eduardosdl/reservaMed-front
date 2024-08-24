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
    const response: AxiosResponse<Patient> = await this.apiClient.post(
      '/patients',
      patient,
    );
    return response.data;
  }

  public async updatePatient(patient: Patient): Promise<Patient> {
    const response: AxiosResponse<Patient> = await this.apiClient.put(
      `/patients/${patient.cpf}`,
      patient,
    );
    return response.data;
  }

  public async deletePatient(cpf: string): Promise<void> {
    await this.apiClient.delete(`/patients/${cpf}`);
  }
}

export default new PatientService();
