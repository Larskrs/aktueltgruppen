import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET (req, ctx) {

    const articles = await db.article.findMany({
        where: {
          publishedAt: {
            // Use 'lt' (less than) operator to filter articles with publishedAt before the current time
            lt: new Date(),
          },
        },
        orderBy: {
          publishedAt: 'desc', // Sort by publishedAt in descending order to show most recent articles first
        },
        include: {
          _count: {
            select: { comments: true }
          }
        }
      });
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