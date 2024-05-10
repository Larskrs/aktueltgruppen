import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET (req, ctx) {

    const groups = await prisma.group.findMany()
    return NextResponse.json(groups)

}

export async function POST (req, ctx) {

    const data = await req.json();
    console.log(data)

    const article = await prisma.group.create({
        data: data
    })

    return NextResponse.json(article)

}