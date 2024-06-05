// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import { stat } from "fs/promises";
import { NextResponse } from "next/server";
import { pipeline } from 'stream';
import { promisify } from 'util';
import mime from "mime-types"
const pump = promisify(pipeline);
import { db } from "@/lib/db"
import { auth } from "@/auth";


export const POST = auth(async (req) => {

    try{
        const formData = await req.formData();

        // const groupId = formData.getAll('group')[0]

        // const group = await db.group.findUnique({
        //     where: {
        //         id: groupId
        //     }
        // })

        // const directoryPath = `./files/${groupId}`;;

        // if (!fs.existsSync(directoryPath)) {
        //     fs.mkdirSync(directoryPath);
        //     console.log(`Directory '${directoryPath}' created.`);
        // } else {
        //     console.log(`Directory '${directoryPath}' already exists.`);
        // }



        const file = formData.getAll('files')[0]
        const filePath = `./files/${file.name}`;
        await pump(file.stream(), fs.createWriteStream(filePath));
        return NextResponse.json({status:"success",data:file.size})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
    
})

export async function GET (req, ctx) {

    let res = new Response()
    let fileName = req.nextUrl.searchParams.get("fileId");
    fileName = fileName.replace("/",'')
    const [ id, extension ] = fileName.split(".")

    let filePath = `./files/${fileName}`;
    const mimeType = mime.lookup(fileName)

    let status = 200
    const options = {};
    
    let start;
    let end;
    
    const range = req.headers.range;
    if (range) {
        const bytesPrefix = "bytes=";
        if (range.startsWith(bytesPrefix)) {
            const bytesRange = range.substring(bytesPrefix.length);
            const parts = bytesRange.split("-");
            if (parts.length === 2) {
                const rangeStart = parts[0] && parts[0].trim();
                if (rangeStart && rangeStart.length > 0) {
                    options.start = start = parseInt(rangeStart);
                }
                const rangeEnd = parts[1] && parts[1].trim();
                if (rangeEnd && rangeEnd.length > 0) {
                    options.end = end = parseInt(rangeEnd);
                }
            }
        }
    }
    
    // res.headers.append("content-type", "Image/jpeg")
    //   res.setHeader("content-type", GetContentType(extension));
    
    let fileStat = null;
    let fileSize = null;
    try {
        fileStat = await stat(filePath)
        fileSize = fileStat.size
    } catch (err) {
        return NextResponse.json({error: "File not found"});
    }
    
    let contentLength = stat.size;
    
    
    let retrievedLength;
    if (start !== undefined && end !== undefined) {
        retrievedLength = (end+1) - start;
    }
    else if (start !== undefined) {
        retrievedLength = contentLength - start;
    }
    else if (end !== undefined) {
        retrievedLength = (end+1);
    }
    else {
        retrievedLength = contentLength;
    }
    
    status = start !== undefined || end !== undefined ? 206 : 200;

    res.headers.append("content-length", retrievedLength);
    if (range !== undefined) {  
              res.headers.append("content-range", `bytes ${start || 0}-${end || (contentLength-1)}/${contentLength}`);
              res.headers.append("accept-ranges", "bytes");
    }
    res.headers.append("filename", fileName);
    res.headers.append("content-disposition", "filename=" + fileName)

    const stream = streamFile(filePath)
    const fileStream = fs.createReadStream(filePath, options);

    fileStream.on("error", error => {
        console.log(`Error streaming file ${filePath}.`);
        console.log(error);
        return NextResponse.json({  });
    });

    
    const rangeHeader = req.headers.get("range");

    if (rangeHeader) {
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = (end - start) + 1;

      return new Response(fs.createReadStream(filePath, { start, end }), {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": mimeType,
        },
      });
    } else {
      return new Response(fs.createReadStream(filePath), {
        headers: {
          "Content-Length": fileSize,
          "Content-Type": mimeType,
        },
      });
    }
    
}
    

    async function* nodeStreamToIterator(stream) {
        for await (const chunk of stream) {
            yield new Uint8Array(chunk);
        }
    }
    
    function streamFile(path) {
        const nodeStream = fs.createReadStream(path);
        const iterator = nodeStreamToIterator(nodeStream);
        return iteratorToStream(iterator);
    }
    
    function iteratorToStream(iterator) {
        return new ReadableStream({
            async pull(controller) {
                try {
                    const { value, done } = await iterator.next();
                    if (done) {
                        controller.close();
                    } else {
                        controller.enqueue(value);
                    }
                } catch (error) {
                    controller.error(error);
                }
            },
            cancel() {
                iterator.return();
            }
        })
    }