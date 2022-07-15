const createListItem = function ({ dateTime, name, comment }) {
  const listItem = document.createElement('li');
  listItem.innerHTML = [dateTime, name, comment].join(' ');
  return listItem;
}

const generateList = function (response) {
  const commentList = JSON.parse(response);
  const listElement = document.querySelector('.comment-list');
  listElement.innerHTML = null;

  commentList.forEach(comment => {
    const listItem = createListItem(comment);
    listElement.appendChild(listItem);
  });
}

const readFormData = function (formElement) {
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData);
  return body;
}

const createXhrPost = function (path, body, callback) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => callback(xhr));
  xhr.open('POST', path);
  xhr.send(body);
}

const createXhrGet = function (path, callback) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => callback(xhr));
  xhr.open('GET', path);
  xhr.send();
}

const showComments = function () {
  xhrGet = (xhr) => {
    if (xhr.status !== 200) {
      return;
    }
    generateList(xhr.response)
  };
  createXhrGet('/api/guest-book', xhrGet);
}

const addComments = function () {
  const formElement = document.querySelector('form');
  const body = readFormData(formElement);
  const xhrPost = (xhr) => {
    if (xhr.status !== 201) {
      return;
    }
    showComments(xhr.response);
    formElement.reset();
  }
  createXhrPost('/add-comment', body, xhrPost);
}
