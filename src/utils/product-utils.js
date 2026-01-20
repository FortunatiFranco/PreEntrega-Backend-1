import fs from "fs";

export const createProducts = () => {
    try {
        const data = fs.readFileSync("../data/products.json", "utf-8");
        const products = JSON.parse(data)
        return products;
    } catch (error) {
        throw new Error(`Error al crear productos: ${error.message}`)
    }
}