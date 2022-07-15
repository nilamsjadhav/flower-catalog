const createXhrPost = function (path, body, callback) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => callback(xhr));
  xhr.open('POST', path);
  xhr.send(body);
};

const readFormData = function (formElement) {
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData);
  return body;
}

const showSuccessMsg = function () {
  const message = document.getElementById('message');
  message.innerText = 'You registered successfully...!';

  setTimeout(() => {
    window.location.href = '/login.html';
  }, 200);
}

const registerUser = function () {
  const formElement = document.querySelector('form');
  const body = readFormData(formElement);

  const xhrPost = (xhr) => {
    if (xhr.status !== 201) {
      return;
    }
    showSuccessMsg()
  }
  createXhrPost('/register', body, xhrPost);
};
