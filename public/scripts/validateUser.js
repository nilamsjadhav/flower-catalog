const readFormData = function (formElement) {
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData);
  return body;
};

const createXhrPost = function (path, body, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => callback(xhr);
  xhr.open('POST', path);
  xhr.send(body);
};

const validateUser = function () {
  const formElement = document.querySelector('form');
  const body = readFormData(formElement);

  const xhrPost = (xhr) => {
    formElement.reset();

    if (xhr.status === 401) {
      const message = document.getElementById('message')
      message.innerText = 'Invalid User...!'
      return;
    }
    window.location.href = '/guest-book';
  }
  createXhrPost('/login', body.toString(), xhrPost);
};
