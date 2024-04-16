import { NextResponse } from "next/server";
import { Broadcast } from "../../server/socket";

export async function GET () {

    Broadcast({text: "hello world"})
    return  NextResponse.json({
        hello: "world"
    })
    
}