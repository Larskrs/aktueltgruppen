import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req, context) {

    // const data = await req.json()
    // const { url } = req.nextUrl.searchParams
    const url = req.nextUrl.searchParams.get("url")
    console.log(`Loading data from url: ${url}`)

    try {
        const response = await axios.get(url);
        const html = response.data;
    
        // Extracting title
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : '';
    
        // Extracting description
        const descriptionMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
        const description = descriptionMatch ? descriptionMatch[1] : '';
    
        // Extracting icon
        const iconMatch = html.match(/<link\s+rel="icon"\s+href="([^"]*)"/i);
        const icon = iconMatch ? iconMatch[1] : '';
    
        return NextResponse.json({ title, description, icon });
      } catch (error) {
        console.error('Error fetching metadata:');
        return NextResponse.json({ error: 'Failed to fetch metadata' });
      }
    }
