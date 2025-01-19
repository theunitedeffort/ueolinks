const { builder }   = require("@netlify/functions");
const QRCode        = require('qrcode');
const rootURL       = "https://ueolinks.org";
const pageTemplate  = require('../../includes/page.js');

const handler = async event => {

  // Get the original short URL (without the qr part of the path)
  const path = event.path.split("/qr/")[1];
  const shortURL = `${rootURL}/${path}`; 

  // follow the redirect to get the destination to display
  const destinationURL = await fetch(shortURL);

  return QRCode.toDataURL(shortURL, { width: 1000 } )
  .then(data => {
    // render the data into the template
    console.log(`ODB render of ${shortURL}`);
    console.log(`data ${data}`);
    return {
      statusCode: 200,
      body: pageTemplate({
        shortURL : shortURL,
        destinationURL : destinationURL.url,
        data: data
      })
    };
  })
  .catch(err => {
    console.error(err)
  })
};

exports.handler = builder(handler);
