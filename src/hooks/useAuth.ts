import { useState } from 'react';
import { login as loginService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await loginService(email, password);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/admin/consultas');
    } catch {
      setError('Falha na autenticação');
      throw new Error('falha')
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
