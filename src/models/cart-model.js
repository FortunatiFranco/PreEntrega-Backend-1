import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            product: {
            type: Schema.Types.ObjectId,
            ref: "products",
            default: [],
            required: true
        },
    quantity: { type: Number, default: 1 },
}
]
})

cartSchema.pre('find', function(){
    this.populate('products.product');
})

cartSchema.pre('findById', function(){
    this.populate('products.product');
})

export const CartModel = model("carts", cartSchema);