export const mockUserData = {
  token: 'mock-token',
  user: {
    id: 1,
    name: 'John Doe',
    role: 'admin',
  },
};

export const mockLogin = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        resolve(mockUserData);
      } else {
        reject(new Error('Credenciais inválidas'));
      }
    }, 1000);
  });
};
