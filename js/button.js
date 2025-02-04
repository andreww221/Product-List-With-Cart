

export class Button {

    constructor(buttonReference, cart) {
        this.cart = cart;
        this.button = document.querySelector(buttonReference);
        this.idItemCart = this.button.dataset.id;
        this.buttonParent = this.button.parentElement;
        this.buttonValue = this.button.querySelector(".product_add");
        this.buttonIncrement = this.button.querySelector(".product__increment");
        this.buttonDecrement = this.button.querySelector(".product__decrement");
        this.status = true;
    }


    init() {
        this.button.addEventListener("click", (e) => {
            e.preventDefault();
            this.addProductoToCart();
        });
    }


    addProductoToCart() {
        if (!this.button.classList.contains("product__btn--update-1")) {
            this.updateButtonOne();
        }

    }


    updateButtonOne() {
        if (this.status == true) {
            this.button.classList.add("product__btn--update-1");
            this.buttonValue.innerHTML = 1;
            this.showButtonIncrementDecrement();
            this.cart.addProductToCart(this.buttonParent.parentElement);
        } else {
            this.status = true;
        }
    }


    undoButtonOneUpdate() {
        this.button.classList.remove("product__btn--update-1");
        this.buttonIncrement.classList.add("not-visible");
        this.buttonDecrement.classList.add("not-visible");
        this.buttonValue.innerHTML = "Add to Cart";
        this.buttonParent.querySelector("picture img").classList.remove("product__picture-selected");
    }


    showButtonIncrementDecrement() {
        this.buttonIncrement.classList.remove("not-visible");
        this.buttonDecrement.classList.remove("not-visible");
        this.buttonIncrement.addEventListener("click", () => { this.incrementButton() });
        this.buttonDecrement.addEventListener("click", () => { this.decrementButton() });
        this.buttonParent.querySelector("picture img").classList.add("product__picture-selected");

    }


    incrementButton() {
        let value = Number(this.buttonValue.innerHTML);
        this.buttonValue.innerHTML = value + 1;
        this.cart.updateCartItem(this.buttonParent.parentElement, this.idItemCart);
    }


    decrementButton() {
        let value = Number(this.buttonValue.innerHTML);
        console.log("valor del decremento" + value);
        if (value == 1) {
            this.undoButtonOneUpdate();
            this.status = false;
            this.cart.deleteCartElement(this.idItemCart);
            this.cart.hiddeCartItem();
        } else {
            if (value) {
                this.buttonValue.innerHTML = value - 1;
                this.cart.updateCartItem(this.buttonParent.parentElement, this.idItemCart);
            }
        }
    }

}









