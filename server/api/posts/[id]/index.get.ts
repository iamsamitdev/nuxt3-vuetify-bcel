import { PrismaClient } from '@prisma/client'

// Instantiate Prisma Client
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    // Get the id from the event
    const id = event.context.params?.id

    if (!id) {
        throw new Error("Id is required")
    } else {
        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        })

        return {
            statusCode: 200,
            body: post
        }
    }
})