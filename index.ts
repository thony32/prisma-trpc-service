import express from "express"
import * as trpcExpress from "@trpc/server/adapters/express"
import { appRouter } from "./src/routes"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext: () => ({}),
    }),
)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
