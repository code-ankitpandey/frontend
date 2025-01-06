// utils/auth.j


export const getAuthToken = () => {
    const token = localStorage.getItem('jwtToken')
    return token;
  };
  
  export const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    } catch (e) {
      return null;
    }
  };
  
  export const isTokenValid = (token) => {
    const decoded = decodeToken(token);
    return decoded && decoded.exp * 1000 > Date.now(); // Check if the token is expired
  };
  
  export const getRoleFromToken = (token) => {
    const decoded = decodeToken(token);
    return decoded ? decoded.role : null;
  };
  