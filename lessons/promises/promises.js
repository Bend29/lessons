// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => reject('error'), 1000);
// });
// console.log(promise);
// promise.then(x => {
//     console.log(x);
//     return x;
//     })
//     .then(y => console.log(y))
//     .catch(err => console.log(err));
//
//
//
//
// fetch( 'https://jsonplaceholder.typicode.com/posts')
//     .then(response =>  {
//         return response.json();
//     })
//     .then(posts => console.log(posts))
//     .catch(err => console.log(err));
//


function getPost(id) {
    const [userType, userId] = id.split('-');
    return fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
        .then(res => res.json());
}

function getPost2(id) {
    //помогает при несовпадении приходящего id, срабатывает error
    return Promise.resolve().then(() => {
        const [userType, userId] = id.split('-');
        return fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
            .then(res => res.json());
    });

}

// getPost2('user-2').then(post => console.log(post)).catch(err => console.log(err));

// отдельная функция для получения данных
async function getPostAsync(id) {
    try {
        const response = await fetch(`https://jsonplaceho lder.typicode.com/posts/${id}`,
        ).then(res => res.json());
        return response;
    } catch (err) {
        return Promise.reject(err) // ИЛИ throw err;
    }

}
//
// getPostAsync(1)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));


// отдельная функция для вызова функции для нескольких эл-тов
async function getAll() {
   const [res1, res2] = await Promise.all([getPostAsync(1), getPostAsync(2)]);
    console.log(res1, res2)
}
getAll();







