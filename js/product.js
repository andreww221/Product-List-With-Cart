

export class Product {
    constructor(product){
        this.name =  product.querySelector(".product_name").textContent;
        this.category =  product.querySelector(".product_category").textContent;
        this.price =   product.querySelector(".product_price").textContent;
        this.urlPicture = product.querySelector(".product__image").src;
        this.amount = product.querySelector(".product_add").textContent;
        this.id = product.querySelector(".product__btn").dataset.id;
    }
}

