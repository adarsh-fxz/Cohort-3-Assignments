// Try to create a promisified version of setTimeout, fetch and fs.readFile.

// setTimeout
function setPromisifiedTimeout(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

setPromisifiedTimeout(2000).then(() => console.log('2 seconds passed'));


// fetch
function fetchPromisified(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

fetchPromisified('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));


// fs.readFile
const fs = require('fs');

function readFilePromisified(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

readFilePromisified('week-2-async-js/easy/example.txt')
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
