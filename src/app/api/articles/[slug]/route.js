import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET (req, ctx) {

    const { slug } = ctx.params;
    
    const articles = await db.article.findUnique({
        where: {
            slug: slug
        },
        include: {
            comments: {
                take: 5,
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    user: true
                }
            },
            group: true
        }
    })
    return NextResponse.json(articles)

}

export async function POST (req, ctx) {

    const data = await req.json();
    console.log(data)

    const article = await db.article.create({
        data: data,
    })

    return NextResponse.json(article)

}

export async function DELETE (req, ctx) {

    const data = await req.json();
    console.log(data)

    const article = await db.article.delete({
        where: {
            id: data.id
        }
    })

    return NextResponse.json(article)

}