
export const getUserRole = () => {
  // Replace with real auth logic
  // Return 'seller' or 'buyer'
  return localStorage.getItem('role') || 'buyer';
};
