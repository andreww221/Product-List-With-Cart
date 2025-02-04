import { Button } from './button.js';
import { Cart } from './cart.js'


let cart = new Cart();

let buttonsCart = document.querySelectorAll(".product__btn");


for (let i = 0; i < buttonsCart.length; i++) {
    let id = buttonsCart[i].dataset.id;
    let product = new Button(`[data-id="${id}"]`,cart);
    product.init();
}








