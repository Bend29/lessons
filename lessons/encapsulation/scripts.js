// const User = {
//     name: 'Jul',
//     getName() {
//         return this.name;
//     },
//     setName(name) {
//         this.name = name;
//     }
// };

// getName() и setName() - здесь публичные методы

// можно изменять методы
// function User(name) {
//     let userName = name;
//     return {
//         getName() {
//             return userName;
//         },
//         setName(name) {
//             userName = name;
//         }
//     }
// }
// const name = new User('Jul');
//
// console.log(name, name.getName());

// object.freeze не позволяет менять методы
// function User(name) {
//     let userName = name;
//     return Object.freeze({
//         getName() {
//             return userName;
//         },
//         setName(name) {
//             userName = name;
//         }
//     })
// }
// const name = new User('Jul');
// console.log(name);

function User(name) {
    const symbol = Symbol();
    // let userName = name;
    return {
        [symbol]:name,
        getName() {
            return this[symbol];
        },
        setName(name) {
            this[symbol] = name;
        }
    }
}
const name = new User('Jul');
console.log(name);
