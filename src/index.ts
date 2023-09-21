// test function
// function printName(name:string):void{
//     console.log(name)
// }

// printName("Kenai")

// import to generate UUID
import { v4 as uuidv4 } from 'uuid'

// interfaces for item and user

interface ShoppingCartItem {
    id: string;
    name: string;
    price: number;
    description: string;
}

interface ShoppingCartUser {
    id: string;
    name: string;
    age: number;
    cart: ShoppingCartItem[];

    addToCart(item: ShoppingCartItem): void;
    removeFromCart(item: ShoppingCartItem): void;
    removeQuantityFromCart(item: ShoppingCartItem, quantity: number): void
    cartTotal(): number;
    printCart(): void;
}

// class for shopping cart item
class Product implements ShoppingCartItem {
    private id$: string;
    private name$: string;
    private price$: number;
    private description$: string;

    constructor(name: string, price: number, description: string){
        this.id$ = uuidv4();
        this.name$ = name;
        this.price$ = price;
        this.description$ = description;
    }
    // getters and setters

    get id(): string {
        return this.id$;
    }

    get name(): string {
        return this.name$
    }

    set name(value :string){
        this.name$ = value;
    }

    get price(): number {
        return this.price$;
    }

    set price(value: number) {
        this.price$ = value;
    }

    get description(): string {
        return this.description$;
    }

    set description(value: string){
        this.description$ = value;
    }
}

// class for a user
class Person implements ShoppingCartUser{
    private id$: string;
    private name$: string;
    private age$: number;
    private cart$: ShoppingCartItem[] = [];

    constructor(name: string, age: number){
        this.id$ = uuidv4();
        this.name$ = name;
        this.age$ = age;
    }

    get id(): string {
        return this.id$;
    }

    get name(): string {
        return this.name$
    }

    set name(value: string) {
        this.name$ = value;
    }

    get age(): number {
        return this.age$;
    }

    set age(value: number) {
        this.age$ = value;
    }

    get cart(): ShoppingCartItem[] {
        return this.cart$;
    }

    addToCart(item: ShoppingCartItem){
        this.cart$.push(item);
    }

    removeFromCart(item: ShoppingCartItem){
        this.cart$ = this.cart$.filter(cartItem => cartItem.id !== item.id)
    }

    removeQuantityFromCart(item: ShoppingCartItem, quantity: number){
        // keep a count of the quantity
        let count = 0;
        this.cart$ = this.cart$.filter(cartItem => {
            if (cartItem.id === item.id && count < quantity){
                count++;
                return false;
            }
            return true
        });
    }

    cartTotal(): number {
        return this.cart$.reduce((total, item) => total + item.price, 0);
    }

    printCart() {
        console.log(this.cart$);
    }
}

// classes for items and users
class Item extends Product {}
class User extends Person {}

// functions to create items and users
function createItem(name: string, price: number, description: string): Item {
    return new Item(name, price, description);
}

function createUser(name: string, age: number): Person {
    return new User(name, age)
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
    console.log('After adding the first item:')
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
    user.removeFromCart(redApples)

    // Print contents of the cart
    console.log("After removing all Red Apples:")
    user.printCart();

    // Print total of the cart
    console.log("Cart Total:", user.cartTotal().toFixed(2))

};

main();