"use strict";
// test function
// function printName(name:string):void{
//     console.log(name)
// }
Object.defineProperty(exports, "__esModule", { value: true });
// printName("Kenai")
// import to generate UUID
const uuid_1 = require("uuid");
// class for shopping cart item
class Product {
    constructor(name, price, description) {
        this.id$ = (0, uuid_1.v4)();
        this.name$ = name;
        this.price$ = price;
        this.description$ = description;
    }
    // getters and setters
    get id() {
        return this.id$;
    }
    get name() {
        return this.name$;
    }
    set name(value) {
        this.name$ = value;
    }
    get price() {
        return this.price$;
    }
    set price(value) {
        this.price$ = value;
    }
    get description() {
        return this.description$;
    }
    set description(value) {
        this.description$ = value;
    }
}
// class for a user
class Person {
    constructor(name, age) {
        this.cart$ = [];
        this.id$ = (0, uuid_1.v4)();
        this.name$ = name;
        this.age$ = age;
    }
    get id() {
        return this.id$;
    }
    get name() {
        return this.name$;
    }
    set name(value) {
        this.name$ = value;
    }
    get age() {
        return this.age$;
    }
    set age(value) {
        this.age$ = value;
    }
    get cart() {
        return this.cart$;
    }
    addToCart(item) {
        this.cart$.push(item);
    }
    removeFromCart(item) {
        this.cart$ = this.cart$.filter(cartItem => cartItem.id !== item.id);
    }
    removeQuantityFromCart(item, quantity) {
        // keep a count of the quantity
        let count = 0;
        this.cart$ = this.cart$.filter(cartItem => {
            if (cartItem.id === item.id && count < quantity) {
                count++;
                return false;
            }
            return true;
        });
    }
    cartTotal() {
        return this.cart$.reduce((total, item) => total + item.price, 0);
    }
    printCart() {
        console.log(this.cart$);
    }
}
// classes for items and users
class Item extends Product {
}
class User extends Person {
}
// functions to create items and users
function createItem(name, price, description) {
    return new Item(name, price, description);
}
function createUser(name, age) {
    return new User(name, age);
}
// Driver Code
const main = () => {
    // User creation
    const user = createUser("Kenai", 38);
    // Items to sell
    const redApples = createItem("Red Apples", 3.00, "Washington Red Apples");
    const georgiaPeach = createItem("Georgia Peach", 2.50, "Grown in South Georgia");
    const blackberries = createItem("Organic Blackberries", 6.50, "Grown in California - The Freshest Blackberries in the Country");
    // add the first item (redApples) to the cart
    user.addToCart(redApples);
    // Print contents of cart
    console.log('After adding the first item:');
    user.printCart();
    // print the total of cart
    console.log("Cart Total:", user.cartTotal().toFixed(2));
    // add 3 more items to the cart
    user.addToCart(georgiaPeach);
    user.addToCart(blackberries);
    user.addToCart(georgiaPeach);
    // print contents of cart after new items have been added
    console.log("Added three more items: 2 Georgia Peaches and 1 container of Blackberries");
    user.printCart();
    // total of the cart after the new items have been added
    console.log("Cart Total:", user.cartTotal().toFixed(2));
    // remove all items from cart
    // commenting this out to test out only removing one item
    // user.removeFromCart(georgiaPeach);
    // user.removeFromCart(redApples);
    // user.removeFromCart(blackberries);
    // remove only red apples from cart
    user.removeFromCart(redApples);
    // Print contents of the cart
    console.log("After removing all Red Apples:");
    user.printCart();
    // Print total of the cart
    console.log("Cart Total:", user.cartTotal().toFixed(2));
};
main();
