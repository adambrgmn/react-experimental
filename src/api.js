import axios from 'axios';

export const userResource = (username) => {
  const userPromise = fetchUser(username);
  const reposPromise = fetchRepos(username);
  const followersPromise = fetchFollowers(username);

  return {
    user: wrapPromise(userPromise),
    repos: wrapPromise(reposPromise),
    followers: wrapPromise(followersPromise),
  };
};

function wrapPromise(promise, type) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    },
  );

  return {
    read() {
      switch (status) {
        case 'pending':
          throw suspender;
        case 'error':
          throw result;
        case 'success':
          return result;
        default:
      }
    },
  };
}

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

function fetchUser(username) {
  console.log(`Fetch DATA for ${username}`);
  return axios
    .get(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.hellcat-preview+json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
    .then(({ data, headers }) => {
      return delayResponse(data, 3000).then((r) => {
        console.log(`DATA fetched for ${username}`);
        return r;
      });
    })
    .catch((error) => {
      console.log(error.response.data);
      throw error;
    });
}

function fetchRepos(username) {
  console.log(`Fetch REPOS for ${username}`);
  return axios
    .get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Accept: 'application/vnd.github.hellcat-preview+json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
    .then(({ data }) => {
      return delayResponse(data, 7000).then((r) => {
        console.log(`REPOS fetched for ${username}`);
        return r;
      });
    })
    .catch((error) => {
      console.log(error.response.data);
      throw error;
    });
}

function fetchFollowers(username) {
  console.log(`Fetch FOLLOWERS for ${username}`);
  return axios
    .get(`https://api.github.com/users/${username}/followers`, {
      headers: {
        Accept: 'application/vnd.github.hellcat-preview+json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
    .then(({ data }) => {
      return delayResponse(data, 5000).then((r) => {
        console.log(`FOLLOWERS fetched for ${username}`);
        return r;
      });
    })
    .catch((error) => {
      console.log(error.response.data);
      throw error;
    });
}

function delayResponse(response, delay = 2000, label) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, delay);
  });
}
