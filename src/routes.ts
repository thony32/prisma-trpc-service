import { publicProcedure, router } from "./trpc"
import { ProductsController } from "./controller/products.controller"
import { z } from "zod"

// Define the schema for the product
const ProductSchema = z.object({
    // id: z.number(),
    design: z.string(),
    price: z.number(),
    quantity: z.number(),
})

// Define the schema for the product id
const ProductId = z.object({id: z.number()})


// NOTE: Define the router
export const appRouter = router({
    getAllProducts: publicProcedure
        .query(async () => {
            ProductsController.getAllProducts()
        }
    ),
    getProduct: publicProcedure
        .input(ProductId)
        .query(async (options) => {
            const { input } = options 
            ProductsController.getProduct(input.id)
        }
    )
    ,
    createProduct: publicProcedure
        .input(ProductSchema)
        .mutation(async (options) => {
            const { input } = options
            ProductsController.createProduct(input)
        }
    ),
    // updateProduct: publicProcedure
    //     .input(ProductSchema)
    //     .mutation(async (options) => {
    //         const { input } = options
    //         ProductsController.updateProduct(input.id, input)
    //     }
    // ),
    deleteProduct: publicProcedure
        .input(ProductId)
        .mutation(async (options) => {
            const { input } = options
            ProductsController.deleteProduct(input.id)
        }
    )
})

export type AppRouter = typeof appRouter
