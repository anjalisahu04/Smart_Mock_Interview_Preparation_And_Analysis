// export default function authHeader() {
//   const user = JSON.parse(localStorage.getItem('user'));

//   if (user && user.token) {
//     return { Authorization: 'Bearer ' + user.token };
//   } else {
//     return {};
//   }
// }








// services/auth-header.js
export default function authHeader() {
  const userStr = localStorage.getItem('user');
  
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
      }
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
    }
  }
  return {};
}