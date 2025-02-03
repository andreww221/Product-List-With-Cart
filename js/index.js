import { Button } from './button.js';



let buttonsCart = document.querySelectorAll(".product__btn");

for (let i = 0; i < buttonsCart.length; i++) {
    let id = buttonsCart[i].dataset.id;
    let product = new Button (`[data-id="${id}"]`);
    product.init();
}








