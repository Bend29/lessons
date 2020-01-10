document.addEventListener('DOMContentLoaded', function () {

    const btn = document.querySelector('.js-btn-get-posts');
    const btnAddPost = document.querySelector('.js-btn-add-post');
    const container = document.querySelector('.list-container');

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

    const newsService = function () {
        const apiKey = 'aa9616a6d7854b9baf8e72a9eccfc5ec';
        const apiUrl = 'https://newsapi.org/v2/';
        const category = 'technology';
        return {
            topHeadlines(country = 'ru', callback) {
                myHttp.get(`${apiUrl}/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`, callback);
            },
            everything(query, callback) {
                myHttp.get(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`, callback)
            }
        }
    }();

    // Elements
    const form = document.forms['newsControls'];
    const countrySelect = form.elements['country'];
    const searchInput = form.elements['search'];


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        loadNews();

    });


    function loadNews() {
        const country = countrySelect.value;
        const searchText = searchInput.value;
        showLoader();
        if (!searchText) {
            newsService.topHeadlines(country, onGetResponse);
        } else {
            newsService.everything(searchText, onGetResponse);
        }
    }

    // Function on get response from server
    function onGetResponse(error, response) {
        removeLoader();
        if (error) {
            showAlert(error, 'error-msg');
            return
        }
        if (!response.articles.length) {
            showAlert('Ничего не найдено', 'error-msg');
        }
        renderNews(response.articles);

    }

    function renderNews(news) {
        const newsContainer = document.querySelector('.news-container .row');
        if (newsContainer.children.length) {
            clearContainer(newsContainer);
        }
        let fragment = '';
        news.forEach(newsItem => {
            const el = newsTemplate(newsItem);
            fragment += el;
        });
        newsContainer.insertAdjacentHTML('afterbegin', fragment);
    }

    function clearContainer(container) {
        container.innerHTML = '';
    }


    function newsTemplate({urlToImage, title, url, description}) {
        return `
            <div class='col s12'>
                <a href="${url}" class="card">
                    <div class="card-image">
                        <img src="${urlToImage}" alt="">
                         <span class="card-title">${title || ''}</span>
                    </div>
                  
                     <div class="card-content">
                        <p>${description || ''}</p>
                    </div>
                </a>
            </div>
        `;
    }

    function showAlert(msg, type = 'success') {
        M.toast({
            html: msg,
            classes: type
        })
    }

    function showLoader() {
        const loader = `<div class="progress js-loader">
                <div class="indeterminate"></div>
            </div>`;
        document.body.insertAdjacentHTML('afterbegin', loader);
    }

    function removeLoader () {
        const loader = document.querySelector('.js-loader');
        if(loader) {
            loader.remove();
        }
    }
    // инициализация для селектов из materialize
    M.AutoInit();

    loadNews();
});
