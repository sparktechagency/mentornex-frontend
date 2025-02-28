import { jwtDecode } from 'jwt-decode';

export const decodedUser = (token: string) => {
      const decoded = jwtDecode(token);
      return decoded;
};
