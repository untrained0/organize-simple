import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {url} = await req.json();

  if(!url){
    return NextResponse.json({ error: "No URL Provided" }, { status: 401 });
  }

  const res = await fetch("http://localhost:3000/v1.0.0/parsers/pdf/url", {
    method: "POST",
    headers: {
       "X-API-KEY": "1234", 
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  })

//   console.log(await res.json());
  

  const {content} = await res.json();

  return NextResponse.json({ text: content }, { status: 200 });
//   return NextResponse.json({ text: await res.json() }, { status: 200 });
}