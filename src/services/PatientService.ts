import axios, { AxiosInstance, AxiosResponse } from "axios"
import Patient from "../models/patient";

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
    try {
      const response: AxiosResponse<Patient[]> = await this.apiClient.get('/patients');
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  }

  public async deletePatient(cpf: string): Promise<void> {
    try {
      await this.apiClient.delete(`/patients/${cpf}`);
      console.log(`Patient with id ${cpf} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  }
}

export default new PatientService();