'use strict';

const randomNumber = (Math.random() * 1000000).toFixed();

const article = document.createElement('article');
article.textContent = randomNumber;

document.body.append(article);
