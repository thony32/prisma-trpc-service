import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const prisma = new PrismaClient()

// Define the schema for the product
const ProductSchema = z.object({
    design: z.string(),
    price: z.number(),
    quantity: z.number(),
})

// NOTE: CRUD Controller for the products
const ProductsController = {
    getAllProducts: async () => {
        return await prisma.product.findMany()
    },
    getProduct: async (id: number) => {
        return await prisma.product.findUnique({
            where: { id },
        })
    },
    createProduct: async (data: z.infer<typeof ProductSchema>) => {
        return await prisma.product.create({
            data,
        })
    },
    updateProduct: async (id: number, data: z.infer<typeof ProductSchema>) => {
        return await prisma.product.update({
            where: { id },
            data,
        })
    },
    deleteProduct: async (id: number) => {
        return await prisma.product.delete({
            where: { id },
        })
    },
}

export { ProductsController }
