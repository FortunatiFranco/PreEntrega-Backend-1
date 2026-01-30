import { productManager } from "../managers/productManager.js";
import { createProducts } from "../utils/product-utils.js";

class ProductControllers {
    constructor(manager) {
        this.manager = manager;
}

getAll = async(req, res, sort)=> {
    try {
        const {page, limit} = req.query;
        const response = await this.manager.getAll(page, limit, sort);
        const nextPage = response.hasNextPage
        ? `http://localhost:8080/api/products?page=${response.nextPage}`
        : null;
        const prevPage = response.hasPrevPage
        ? `http://localhost:8080/api/products?page=${response.prevPage}`
        : null;
        res.json({
            payload: response.docs,
            info: {
                count: response.totalDocs,
                totalPages: response.totalPages,
                nextLink: nextPage,
                prevLink: prevPage,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
            },
        });
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