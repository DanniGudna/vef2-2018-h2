
const baseurl = process.env.REACT_APP_SERVICE_URL;

async function get(endpoint) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const options = {
    headers: {},
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url);
  const result = await response.json();
  
  return { result, status: response.status };
}

/* todo aðrar aðgerðir */

export default {
  get,
};
