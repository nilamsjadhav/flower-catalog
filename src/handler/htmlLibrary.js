const toHtml = (content) => `<html><body><h2>${content}</h2><body><html>`;

const generateList = (comments) => {
  return comments.map(({ dateTime, username, comment }) => {
    return `<li>${dateTime} ${username} ${comment}</li>`;
  }).join('');
};

module.exports = { toHtml, generateList };
