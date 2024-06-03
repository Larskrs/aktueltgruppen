import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from "@/auth";

export const POST = auth(async (req) => {

    const data = await req.json();
    console.log(data)

    console.log(req.auth)
    // return NextResponse.json(req.auth)

    const comment = await db.comment.create({
        data: {
            articleId: data.articleId,
            userId: req.auth.user.id,
            text: data.text
        }
    })

    return NextResponse.json(comment)

})

export async function GET (req, ctx) {
    
    const articles = await db.comment.findMany({})

    return NextResponse.json(articles)

}