import { Product } from './product.js'

export class Cart {
    cart = [];
    cartEmpty = document.querySelector(".cart__content--empty");
    cartFull = document.querySelector(".cart_full");
    cartFullItems = document.querySelector(".cart_full .cart__items");
    cartTitleNumber = document.querySelector(".cart .cart__title span");
    cartTotal = document.querySelector(".cart__total--total");
    confirmButton = document.querySelector(".cart__total-confirm-button");
    modal = document.querySelector(".modal");
    modalConfirmButton = document.querySelector(".modal .cart__total-confirm-button");
    modalItems = document.querySelector(".modal .modal__content-items-s")

    constructor() {
        this.confirmButton.addEventListener("click", () => {
            this.confirmOrder();
        })
        this.modalConfirmButton.addEventListener("click", () => {
            this.hiddeConfirmOrder();
        })

    }

    addProductToCart(infoProduct) {
        let product = new Product(infoProduct);
        this.cart.push(product);
        this.showCartItem(product);
        let productPrice = product.price
        let productPriceConvert = productPrice.replace("$", '');
        let productAmout = Number(product.amount);
        let totalProduct = (productPriceConvert * productAmout).toFixed(2);
        let elementCartText = `<li class="cart__item" data-id="${product.id}">
                                <h4 class="cart__item-title text-preset-4-bold">${product.name}</h4>
                                <ul class="cart__items-details">
                                    <li class="cart__items-details-amount text-preset-4-bold">x${product.amount}</li>
                                    <li class="cart__items-details-price text-preset-4">@ ${product.price}</li>
                                    <li class="cart__items-details-total text-preset-4-bold">$${totalProduct}</li>
                               </ul>
                                <span class="cart__item-remove" data-id="${product.id}" >
                                    <img src="assets/images/icon-remove-item.svg" alt="Icon remove producto">
                                </span>
                            </li>`;
        let elementCart = document.createElement("li");
        elementCart.innerHTML = elementCartText;
        elementCart.querySelector(".cart__item-remove").addEventListener("click", () => { this.deleteCartElement(product.id, true); });
        this.cartFullItems.appendChild(elementCart);
        this.updateNumberProductsCart();
        this.updateTotalProductsCart();
    }

    showCartItem(product) {
        this.cartEmpty.classList.add("not-visible");
        this.cartFull.classList.remove("not-visible");
        this.cartFull.classList.add("show_cart");
       
    }

    hiddeCartItem(DisabledButtons = false) {

        if (this.cart.length < 1) {
            this.cartEmpty.classList.remove("not-visible");
            this.cartEmpty.classList.add("show_cart");
            this.cartFull.classList.add("not-visible");
        }
        if (DisabledButtons) {
            let buttons = document.querySelectorAll(".product__btn--update-1");
            buttons.forEach((item, index) => {
                item.classList.remove("product__btn--update-1");
                item.querySelector(".product__increment").classList.add("not-visible");
                item.querySelector(".product__decrement").classList.add("not-visible");
                item.querySelector(".product_add").innerHTML = "Add to Cart";
                item.parentElement.querySelector("picture img").classList.remove("product__picture-selected");
            })
        }
    }

    updateNumberProductsCart() {
        this.cartTitleNumber.textContent = this.cart.length;

    }

    updateTotalProductsCart() {
        let totalCart = 0;
        this.cart.forEach(item => {
            let priceCart = item.price.replace("$", '');
            let priceCartConvert = Number(priceCart)
            let priceAmount = item.amount.replace("x", '');
            let priceAmountConvert = Number(priceAmount)
            totalCart += (Number(priceCartConvert) * Number(priceAmountConvert));
        });
        this.cartTotal.textContent = "$" + totalCart.toFixed(2);
    }

    updateCartItem(infoProduct, id) {
        let producUpdate = "";
        let productUpdateObject = "";
        this.cart.forEach(item => {
            if (id == item.id) {
                producUpdate = this.cartFullItems.querySelector(`[data-id="${id}"]`);
                productUpdateObject = item;
                productUpdateObject.amount = infoProduct.querySelector(".product_add").textContent;
                productUpdateObject.price = infoProduct.querySelector(".product_price").textContent;
            }
        });
        let newMountProduct = productUpdateObject.amount;
        let productPriceUpdate = productUpdateObject.price;
        let productPriceUpdateConvert = productPriceUpdate.replace("$", '');
        let productAmountUpdateConvert = newMountProduct.replace("x", '');
        let totalProductUpdate = (productPriceUpdateConvert * productAmountUpdateConvert).toFixed(2);
        producUpdate.querySelector(".cart__items-details-amount").textContent = "x" + newMountProduct;
        producUpdate.querySelector(".cart__items-details-total").textContent = "$" + totalProductUpdate;
        this.updateTotalProductsCart();
    }


    deleteCartElement(id, verify) {
        let producDelete = "";
        this.cart.forEach((item, index) => {
            if (id == item.id) {
                if (verify) {
                    let elementProduct = document.querySelector(".products").querySelector(`[data-id="${id}"]`);
                    console.log(elementProduct);
                    elementProduct.classList.remove("product__btn--update-1");
                    elementProduct.querySelector(".product__increment").classList.add("not-visible");
                    elementProduct.querySelector(".product__decrement").classList.add("not-visible");
                    elementProduct.querySelector(".product_add").innerHTML = "Add to Cart";
                    elementProduct.parentElement.querySelector("picture img").classList.remove("product__picture-selected");
                }
                this.cart.splice(index, 1);
                producDelete = this.cartFullItems.querySelector(`[data-id="${id}"]`);
                producDelete.classList.add("delete_element");
                setTimeout(() => { producDelete.remove(); }, 400);
                if (!this.cart.length > 0) {
                    this.hiddeCartItem();
                }
            }
        });
        this.updateNumberProductsCart();
        this.updateTotalProductsCart();
    }

    deleteCartElementItem(id) {
        let producDelete = "";
        this.cart.forEach((item, index) => {
            if (id == item.id) {
                producDelete = this.cartFullItems.querySelector(`[data-id="${id}"]`);
                producDelete.remove();
            }
        });
        this.updateNumberProductsCart();
        this.updateTotalProductsCart();
    }





    confirmOrder() {
        this.modal.classList.remove("not-visible");
        let totalCart = 0;
        this.cart.forEach((item, index) => {
            let itemAmount = item.amount;
            let itemPrice = item.price;
            let itemAmountConvert = itemAmount.replace("$", '');
            let itemPriceConvert = itemPrice.replace("$", '');
            let totalItemUpdate = (itemAmountConvert * itemPriceConvert).toFixed(2);
            totalCart += Number(totalItemUpdate);
            let elementCartConfirmHTML = `<li class="modal__content-item">
                        <ul>
                            <li class="modal__content-item-detail">
                                <div class="modal__content-image">
                                    <img src="assets/images/image-tiramisu-thumbnail.jpg" alt="Classic Tiramisu">
                                </div>
                                <div class="modal__content-details">
                                    <h3 class="modal__content-details-title text-preset-4-bold">${item.name}</h3>
                                    <ul>
                                        <li class="modal__content-details-amount text-preset-4-bold">x${item.amount}</li>
                                        <li class="text-preset-4 modal__content-details-price">${item.price}</li>
                                    </ul>
                                </div>
                            </li>
                            <li class="modal__content-total text-preset-3">$ ${totalItemUpdate}</li>
                        </ul>
                    </li>`;
            let elementCartConfirm = document.createElement("li");
            elementCartConfirm.innerHTML = elementCartConfirmHTML;
            this.modalItems.appendChild(elementCartConfirm);
            this.modal.querySelector(".modal__content-total-price").textContent = "$" + totalCart.toFixed(2);
        });
    }




    hiddeConfirmOrder() {
        this.cart.forEach((item, index) => {
            this.deleteCartElementItem(item.id);
        })
        this.cart = [];
        this.updateNumberProductsCart();
        this.updateTotalProductsCart();
        this.hiddeCartItem(true);
        this.modal.classList.add("not-visible");

    }

}