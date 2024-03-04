// pages/api/tasks.ts
import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from "next";

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const tasks = await prisma.tasks.findMany({
            orderBy: {
                id: 'desc'
            } as any
        })
        res.status(200).json(tasks)
    } else if (req.method === 'POST') {
        const newTask = req.body
        const createdTask = await prisma.tasks.create({
            data: newTask
        })
        res.status(201).json(createdTask)
    } else if (req.method === 'PUT') {
        const {id, content} = req.body
        const updatedTask = await prisma.tasks.update({
           where: {id} as any,
            data: {content} as any
        })
        res.status(200).json(updatedTask)
    } else if (req.method === 'DELETE') {
        const {id} = req.body
        const deletedTask = await prisma.tasks.delete({
            where: {id} as any
        })
        res.status(200).json(deletedTask)
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}