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

const showComments = function () {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => generateList(xhr.response));

  const formElement = document.querySelector('form');
  const body = readFormData(formElement);
  xhr.open('GET', '/api/guest-book');
  xhr.send(body);
}

const readFormData = function (formElement) {
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData);
  return body;
}

const addComments = function () {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    if (xhr.status !== 201) {
      return;
    }
    showComments(xhr.response);
    formElement.reset();
  })
  const formElement = document.querySelector('form');
  const body = readFormData(formElement);
  xhr.open('POST', '/add-comment');
  xhr.send(body);
}
