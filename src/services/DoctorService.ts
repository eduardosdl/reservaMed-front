import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Doctor from '../types/doctor';

class DoctorService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8081',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async getAllDoctors(): Promise<Doctor[]> {
    const response: AxiosResponse<Doctor[]> =
      await this.apiClient.get('/doctors');
    return response.data;
  }

  public async createDoctor(doctor: Doctor): Promise<Doctor> {
    try {
      const response: AxiosResponse<Doctor> = await this.apiClient.post(
        '/doctors',
        doctor,
      );
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao criar médicos: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error(error.response?.data.message);
      }
      throw new Error(
        'Houve um erro ao criar médicos, tente novamente mais tarde',
      );
    }
  }

  public async updateDoctor(crm: string, doctor: Doctor): Promise<Doctor> {
    try {
      const response: AxiosResponse<Doctor> = await this.apiClient.put(
        `/doctors/${crm}`,
        doctor,
      );
      return response.data;
    } catch (error) {
      console.log(`Houve um erro ao criar médicos: ${error}`);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error(error.response?.data.message);
      }
      throw new Error(
        'Houve um erro ao criar médicos, tente novamente mais tarde',
      );
    }
  }

  public async deleteDoctor(crm: string): Promise<void> {
    await this.apiClient.delete(`/doctors/${crm}`);
  }
}

export default new DoctorService();
