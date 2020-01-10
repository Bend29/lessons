function Product(brand, price, discount) {

    // 1. Создает новый объект
    // 2. Создается контекст этого объекта this
    // 3. Возвращает этот объект

    this.brand = brand;
    this.price = price;
    this.discount = discount;
    // можно создать метод внутри конструктора

    // this.getPriceWithDiscount = function() {
    //   return (this.price * (100 - this.discount))/100;
    // };
}

//Можно записать метод getPriceWithDiscount в прототип класса
Product.prototype.getPriceWithDiscount = function () {
    return (this.price * (100 - this.discount)) / 100; // this будет указывать на конкретный экземпляр класса
};
Product.prototype.setPrice = function (newPrice) {
    this.price = newPrice;
    return newPrice;
};
const apple = new Product('apple', 100, 15);
const samsung = new Product('samsung', 200, 25);
// console.log(apple.getPriceWithDiscount());
// console.log(samsung.getPriceWithDiscount());
// console.log(apple.setPrice(500));

//Object.create()

const protoForObj = {
    sayHello() {
        return 'hello';
    },
};
const obj = Object.create(protoForObj, {
    firstName: { // в propertyDescription значения записываются так
        value: 'D',
    }
}); // создает пустой объект со свойством в прототипе
obj.sayHello();// вернет hello
// console.log(obj);


function User(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

User.prototype.getFullName = function () { // при вызове new customer не наследуется прототип
    return `${this.firstName} ${this.lastName}`;
};

const user = new User('Михаил', 'Михайлов');
// console.log(user, user.getFullName());

// функциональное наследование
function Customer(firstName, lastName, membership) {
    User.call(this, firstName, lastName);
    // если много параметров, то User.apply(this, arguments)
    this.membership = membership;
}

//Прототипное наследование
Customer.prototype = Object.create(User.prototype); // прототипное наследование (после этого в свойстве _proto_ пропадает ссылка на constructor)
Customer.prototype.constructor = Customer; //возвращаем ссылку constructor
// при прототипном наследовании только после этого можно дописывать свойства и методы в прототип

Customer.prototype.sayHello = function () {
    return `Hello, ${this.firstName}. You have a ${this.membership} status`
};
const customer = new Customer('Ivan', 'Ivanov', 'basic');

// console.log(customer, customer.getFullName(), customer.sayHello());


//ES6

class ProductES {
    constructor(brand, price, discount) {
        this._brand = brand;
        this.price = price;
        this.discount = discount;
    }

    get brand() {
        return this._brand;
    }

    set brand(name) {
        this._brand = name;
    }

    getPriceWithDiscount() {
        return (this.price * (100 - this.discount)) / 100;
    }

    //статичные мтеоды, которые можно вызвать без создания экземпляра, нельзя вызывать через экземпляр
    static plus(x, y) {
        return x + y;
    }
}
console.log(ProductES.plus(1, 2));
const newProduct = new ProductES('samsung', 200, 10);
console.log(newProduct.getPriceWithDiscount());

class UserES {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName() { // при вызове new customer не наследуется прототип
        return `${this.firstName} ${this.lastName}`;
    };
}

class CustomerES extends  UserES{
    constructor(firstName, lastName, membership) {
        super(firstName, lastName);
        this.membership = membership;
    }
    getFullName() {
        return super.getFullName();
    }

}
const customerES = new CustomerES('Ibvab', 'Ibvanov', 'basic');
// console.log(customerES);


