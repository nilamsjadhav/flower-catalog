const toHtml = (content) => `<html><body><h2>${content}</h2><body><html>`;

const generateList = (comments) => {
  return comments.map(({ dateTime, name, comment }) => {
    return `<li>${dateTime} ${name} ${comment}</li>`;
  }).join('');
};

module.exports = { toHtml, generateList };
