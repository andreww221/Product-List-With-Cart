

export class Button {

    constructor(buttonReference) {
        this.button = document.querySelector(buttonReference);
        this.buttonValue = this.button.querySelector("a");
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
        }else{
            this.status = true;
        }
    }


    undoButtonOneUpdate() {
        this.button.classList.remove("product__btn--update-1");
        this.buttonIncrement.classList.add("not-visible");
        this.buttonDecrement.classList.add("not-visible");
        this.buttonValue.innerHTML = "Add to Cart";
    }


    showButtonIncrementDecrement() {
        this.buttonIncrement.classList.remove("not-visible");
        this.buttonDecrement.classList.remove("not-visible");
        this.buttonIncrement.addEventListener("click", () => { this.incrementButton() });
        this.buttonDecrement.addEventListener("click", () => { this.decrementButton() });
    }


    incrementButton() {
        let value = Number(this.buttonValue.innerHTML);
        this.buttonValue.innerHTML = value + 1;
    }


    decrementButton() {
        let value = Number(this.buttonValue.innerHTML);
        if (value == 0) {
            this.undoButtonOneUpdate();
            this.status = false;
        } else {
            this.buttonValue.innerHTML = value - 1;
        }
    }


}









