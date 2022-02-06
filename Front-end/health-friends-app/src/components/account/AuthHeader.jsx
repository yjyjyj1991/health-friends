export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}
// 아래처럼 활용한다.
// getUserBoard() {
//   return axios.get(API_URL + 'user', { headers: authHeader() });
// }