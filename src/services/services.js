function fetcher(url, options = {}) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    })
      .then((response) => {
        if (response.ok)
          response.json().then((a) => {
            resolve(a.data);
          });
        else
          response.json().then((a) => {
            reject(a.message);
          });
      })
      .catch((e) => {
        console.log(`[service: ${e.message}]`);
      });
  });
}
function post(base, url, data = {}, options = {}) {
  return new Promise((resolve, reject) => {
    fetcher(base + url, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    })
      .then(resolve)
      .catch(reject);
  });
}
function get(base, url, data = {}, options = {}) {
  let str = "";
  Object.entries(data).forEach((d, i) => {
    str += (i ? "&" : "?") + d[0] + "=" + d[1];
  });
  return fetcher(base + url + str, options);
}

function privateGet(base, url, data = {}, options = {}) {
  return get(base, url, data, {
    ...options,
    headers: {
      AUTHORIZATION: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
}
function privatePost(base, url, data = {}, options = {}) {
  return post(base, url, data, {
    ...options,
    headers: {
      AUTHORIZATION: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
}

function postFormData(url, body) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: { AUTHORIZATION: localStorage.getItem("token") },
      body,
    })
      .then((response) => {
        if (response.ok)
          response.json().then((a) => {
            resolve(a.data);
          });
        else
          response.json().then((a) => {
            reject(a.message);
          });
      })
      .catch((e) => {
        console.log(`[service: ${e.message}]`);
      });
  });
}
const services = {
  public: {
    post,
    get,
  },
  private: {
    post: privatePost,
    formData: postFormData,
    get: privateGet,
  },
};

export default services;
