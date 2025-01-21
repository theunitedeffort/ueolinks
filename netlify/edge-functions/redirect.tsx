import type { Config, Context } from "@netlify/edge-functions";
import pageTemplate from "../../includes/page.js";
import QRCode from "qrcode";

const dataURL = "https://docs.google.com/spreadsheets/d/1sgGwMUINDDqK1N7-Ow635uyEPSqd-2jWugSwwsPea7M/gviz/tq?tqx=out:json"
const rootURL = "https://ueolinks.org";

export default async function handler(req: Request, context: Context) {

const url = new URL(req.url);
let path = url.pathname.replace("/", "");
if(!path) return;

// source the data from the google sheet where it is maintained
  const data = await fetch(dataURL, {
    headers: {
      "Content-Type": "application/json",
      "X-DataSource-Auth": "1",
    },
  }).then((res) => res.text());
  
  // clean up the data coming back from the API so it is a valid JSON object
  const routesJSON = JSON.parse(data.replace(/^\)]\}'\n/, ''));
  
  // create a map of routes for easy lookups
  const routes = new Map()
  routesJSON.table.rows.map((route) => { routes.set(route.c[0].v, route.c[1].v)} );

  if (!path.endsWith("/qr")) {
    // if the request is for a short link, redirect to the destination
    if (path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    const destinationURL = routes.get(path);
    if(!destinationURL) return;
    return Response.redirect(destinationURL, 302);
  } 
  else {
    // if the request is for a QR code, return the QR code
    path = path.replace("/qr", "");  
    const page = pageTemplate({
      shortURL: `${rootURL}/${path}`,
      destinationURL: routes.get(path),
      data: await QRCode.toDataURL(`${rootURL}/${path}`, { width: 1000 } )
    })
    return new Response(page, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  }
}

export const config: Config = {
  path: "/*",
};






