// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import busboy from "busboy";
import fs from "fs";
import { stat } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req, ctx) {
  const bb = busboy({ headers: req.headers });
  let fileName;

  bb.on("file", (_, file, info) => {
    fileName = info.filename;
    const filePath = `./files/${fileName}`;
    const stream = fs.createWriteStream(filePath);
    file.pipe(stream);
  });

  bb.on("close", async () => {
    return NextResponse.json({}, 200);
  });

  req.pipe(bb);

  return NextResponse.json({});
}

export async function GET(req, ctx) {
  let fileName = req.nextUrl.searchParams.get("fileId").replace("/", "");
  const [id, extension] = fileName.split(".");
  let filePath = `./files/${fileName}`;

  let res = new Response(null, {
    headers: {
      "Content-Type": "video/mp4",
    },
  });

  try {
    const stats = await stat(filePath);
    const fileSize = stats.size;

    const rangeHeader = req.headers.get("range");

    if (rangeHeader) {
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = (end - start) + 1;

      res = new Response(fs.createReadStream(filePath, { start, end }), {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": "video/mp4",
        },
      });
    } else {
      res = new Response(fs.createReadStream(filePath), {
        headers: {
          "Content-Length": fileSize,
          "Content-Type": "video/mp4",
        },
      });
    }

  } catch (error) {
    return NextResponse.json({ error: "File not found" });
  }

  return new NextResponse(res);
}
