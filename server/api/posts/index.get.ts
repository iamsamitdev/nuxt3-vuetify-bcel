import { PrismaClient } from '@prisma/client'

// Instantiate Prisma Client
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    
    // findMany with orderBy id descending limit 1
    const posts = await prisma.post.findMany({
        orderBy: {
            id: 'desc'
        },
        take: 2,
    })

    return {
        statusCode: 200,
        body: posts
    }
})