import { mockLogin } from './mock/mockData';

export const login = async (email: string, password: string) => {
  try {
    const data = await mockLogin(email, password);
    return data;
  } catch (error) {
    console.log(`authetication error: ${error}`)
    throw new Error('Falha na autenticação');
  }
};
