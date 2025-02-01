import type { Config, Context } from "@netlify/edge-functions";
import pageTemplate from "../../includes/page.js";
import QRCode from "qrcode";

const sheetURL = `https://docs.google.com/spreadsheets/d/14x_OV2siy3bny7SsjwjCLFf6HtohPgg9A86mf7XNJ4Y/edit`
const dataURL = `${sheetURL.split("/edit")[0]}/gviz/tq?tqx=out:json`;

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
  routesJSON.table.rows.map((route) => { 
    // only add routes that have both a short and long URL
    // and trim any whitespace that might have been added by mistake
    // We'll also make the path lowercae and make the lookup case-insensitive
    if(route.c[0] && route.c[1]) {
      return routes.set(
        route.c[0].v.trim().toLowerCase(),
        route.c[1].v.trim()
      )
    }
  });

  console.log(`The sheet has ${routes.size} URLs`);

  if (!path.endsWith("/qr")) {
    // if the request is for a short link, redirect to the destination
    if (path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    const destinationURL = routes.get(path.toLowerCase());
    console.log(`${path} is the path for ${destinationURL}`);

    if(!destinationURL) return;
    return Response.redirect(destinationURL, 302);
  } 
  else {
    // if the request is for a QR code, return the QR code page
    path = path.replace("/qr", "");  
    console.log(`${path} is the path for ${routes.get(path.toLowerCase())}`);

    const page = pageTemplate({
      shortURL: `${rootURL}/${path}`,
      destinationURL: routes.get(path.toLowerCase()),
      data: await QRCode.toDataURL(`${rootURL}/${path.toLowerCase()}`, { width: 1000 } )
    })
    return new Response(page, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  }
}

export const config: Config = {
  path: "/*",
  onError: "bypass",
  excludedPath: ["/favicon.ico", "/robots.txt"]
};






