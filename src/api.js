
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

async function post(endpoint, data) {
  console.log('DATA', data)
  const url = `${baseurl}${endpoint}`;
  console.log('URL', url)

  const options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  const token = window.localStorage.getItem('token');

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);
  console.log('RESPONSE', response)
  const result = await response.json();
  console.log('RESULT', result)

  return { result, status: response.status };
}

async function patch(endpoint, data) {
  const url = `${baseurl}${endpoint}`;

  console.info(JSON.stringify(data));

  const options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
    method: 'PATCH',
  };

  const token = window.localStorage.getItem('token');
  
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);
  const result = await response.json();

  return { result, status: response.status };
}

export default {
  get, post, patch,
};
