import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET (req, ctx) {

    const articles = await prisma.article.findMany()
    return NextResponse.json(articles)

}

export async function POST (req, ctx) {

    const data = await req.json();
    console.log(data)

    const article = await prisma.article.create({
        data: data
    })

    return NextResponse.json(article)

}