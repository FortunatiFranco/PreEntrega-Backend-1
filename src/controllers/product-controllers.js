import { productManager } from "../managers/productManager.js";
import { createProducts } from "../utils/product-utils.js";

class ProductControllers {
    constructor(manager) {
        this.manager = manager;
}

getAll = async(req, res)=> {
    try {
        const response = await this.manager.getAll();
        res.json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

getById = async(req, res) => {
    try {
        const { id } = req.params;
        const response = await this.manager.getById(id);
        if (!response) throw new Error("Producto no encontrado");
        return res.json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

create = async(req, res) => {
    try {
        const response = await this.manager.create(req.body);
        res.json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

update = async(req, res) => {
    try {
        const { id } = req.params;
        const response = await this.manager.update(id, req.body);
        if (!response) throw new Error("Producto no encontrado");
        return res.json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

delete = async(req, res) => {
    try {
        const { id } = req.params;
        const response = await this.manager.delete(id);
        if (!response) throw new Error("Producto no encontrado");
        return res.json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

createManyProducts = async(req, res) =>{
    try {
        const data = createProducts();
        const response = await this.manager.create(data)
        res.json({message: `${response.length} productos creados`})
    } catch (error) {
        res.status(400).json(error.message)
    }
}
}

export const productControllers = new ProductControllers(productManager);