document.addEventListener('DOMContentLoaded', function () {

    const btn = document.querySelector('.js-btn-get-posts');
    const btnAddPost = document.querySelector('.js-btn-add-post');
    const container = document.querySelector('.list-container');
    //
    // function getPosts(cb) {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    //     xhr.addEventListener('load', () => {
    //         const response = JSON.parse(xhr.responseText);
    //         cb(response);
    //     });
    //
    //     xhr.addEventListener('error', () => {
    //         console.log('error');
    //     });
    //
    //     xhr.send();
    // }
    //
    // function createPost(body, cb) {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');
    //     xhr.addEventListener('load', () => {
    //         const response = JSON.parse(xhr.responseText);
    //         cb(response);
    //     });
    //
    //     xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    //
    //     xhr.addEventListener('error', () => {
    //         console.log('error');
    //     });
    //
    //     xhr.send(JSON.stringify(body));
    // }


    // function cardTemplate(post) {
    //     const card = document.createElement('div');
    //     card.classList.add('card');
    //     const cardBody = document.createElement('div');
    //     cardBody.classList.add('card-body');
    //     const title = document.createElement('h5');
    //     title.classList.add('card-title');
    //     title.textContent = post.title;
    //     const article = document.createElement('p');
    //     article.classList.add('card-text');
    //     article.textContent = post.body;
    //     cardBody.appendChild(title);
    //     cardBody.appendChild(article);
    //     card.appendChild(cardBody);
    //     return card;
    // }
    //
    // function renderPosts(response) {
    //     const fragment = document.createDocumentFragment();
    //     response.forEach(post => {
    //         const card = cardTemplate(post);
    //         fragment.appendChild(card);
    //     });
    //     container.appendChild(fragment);
    // }
    //
    // btn.addEventListener('click', e => {
    //     getPosts(renderPosts);
    // });
    //
    // btnAddPost.addEventListener('click', e => {
    //     const newPost = {
    //         title: 'foo',
    //         body: 'bar',
    //         userId: 1,
    //     };
    //     createPost(newPost, response => {
    //         const card = cardTemplate(response);
    //         container.insertAdjacentElement('afterbegin', card);
    //     });
    // });

    function httpRequest({method, url} = {}, callback) {


    }

    // httpRequest(
    //     {
    //         method: 'GET',
    //         url: 'https://jsonplaceholder.typicode.com/posts',
    //     },
    //     (err, response) => {
    //         if (err) {
    //             console.log('error');
    //             return;
    //         }
    //         console.log(response);
    //     }
    // )

    // function http() {
    //     return {
    //         get(url, callback) {
    //             try {
    //                 const xhr = new XMLHttpRequest();
    //
    //                 xhr.open('GET', url);
    //
    //                 xhr.addEventListener('load', () => {
    //                     if (Math.floor(xhr.status / 100) !== 2) {
    //                         callback(`Error. Status code: ${xhr.status}`, xhr);
    //                         return;
    //                     }
    //                     const response = JSON.parse(xhr.responseText);
    //                     callback(null, response);
    //                 });
    //
    //                 xhr.addEventListener('error', () => {
    //                     callback(`Error. Status code: ${xhr.status}`, xhr);
    //                 });
    //
    //                 xhr.send();
    //
    //             } catch (error) {
    //                 callback(error);
    //             }
    //         },
    //         post(url, body, headers, callback) {
    //             try {
    //                 const xhr = new XMLHttpRequest();
    //
    //                 xhr.open('GET', url);
    //
    //                 xhr.addEventListener('load', () => {
    //                     if (Math.floor(xhr.status / 100) !== 2) {
    //                         callback(`Error. Status code: ${xhr.status}`, xhr);
    //                         return;
    //                     }
    //                     const response = JSON.parse(xhr.responseText);
    //                     callback(null, response);
    //                 });
    //
    //                 if (headers) {
    //                     Object.entries(headers).forEach(([key, value]) => {
    //                         xhr.setRequestHeader(key, value);
    //                     })
    //                 }
    //                 xhr.addEventListener('error', () => {
    //                     callback(`Error. Status code: ${xhr.status}`, xhr);
    //                 });
    //
    //                 xhr.send(JSON.stringify(body));
    //
    //             } catch (error) {
    //                 callback(error);
    //             }
    //         }
    //     }
    // }
    function http() {
        return {
            get(url, cb) {
                try {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', url);
                    xhr.addEventListener('load', () => {
                        if (Math.floor(xhr.status / 100) !== 2) {
                            cb(`Error. Status code: ${xhr.status}`, xhr);
                            return;
                        }
                        const response = JSON.parse(xhr.responseText);
                        cb(null, response);
                    });

                    xhr.addEventListener('error', () => {
                        cb(`Error. Status code: ${xhr.status}`, xhr);
                    });

                    xhr.send();
                } catch (error) {
                    cb(error);
                }
            },
            post(url, body, headers, cb) {
                try {
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', url);
                    xhr.addEventListener('load', () => {
                        if (Math.floor(xhr.status / 100) !== 2) {
                            cb(`Error. Status code: ${xhr.status}`, xhr);
                            return;
                        }
                        const response = JSON.parse(xhr.responseText);
                        cb(null, response);
                    });

                    xhr.addEventListener('error', () => {
                        cb(`Error. Status code: ${xhr.status}`, xhr);
                    });

                    if (headers) {
                        Object.entries(headers).forEach(([key, value]) => {
                            xhr.setRequestHeader(key, value);
                        });
                    }

                    xhr.send(JSON.stringify(body));
                } catch (error) {
                    cb(error);
                }
            },
        };
    }

    const myHttp = http();

    myHttp.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
            title: 'foo',
            body: 'bar',
            userId: 1,
        },
        { 'Content-Type': 'application/json', 'x-auth': 'asd9387ydh9iuashdis' },
        (err, res) => {
            console.log(err, res);
        },
    );

});
