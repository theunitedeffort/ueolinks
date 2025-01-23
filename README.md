# ueolinks.org

A URL shortener, and QR code generator for the United Effort Organization.

Deployed to Netlify at https://ueolinks.org 

## Usage

Links are created an managed in this Google Sheet: [UEO Links](https://docs.google.com/spreadsheets/d/14x_OV2siy3bny7SsjwjCLFf6HtohPgg9A86mf7XNJ4Y/edit?gid=0#gid=0).

To create a new short link, add a new row to the sheet providing a destination (where the short link will redirect to) and a path (which will appear in the short URL like so: `https://ueolinks.org/{PATH}`).

Requests made to `https://ueolinks.org/{PATH}` will determine the destination URL on-demand, and redirect the user to the destination URL, so updates to this sheet will be reflected in the short links available immediately.

Any requests to `https://ueolinks.org/{PATH}` which do not have a corresponding row in the sheet will return a default URL, which is set (in the `netlify.toml` file) to be the home page of the United Effort Organization.

## Making QR Codes for any of the short links

For convenience, you can generate a QR code for any of the short links in by appedning `/qr` to any of the available short links, like so: `https://ueolinks.org/{PATH}/qr`.

This will return a page containing an image of a QR code for the short link, and a description of the destination URL. 

The generated QR code image resolves to the short link rather than the destination URL, so can continute to be used if the desired destination URL is updated.


## Google Sheets requirements

Editing the Google Sheet requires approprate permissions to be set in the Google Sheet.

In order for this application to read the Google Sheet, the following permissions must be set in the Google Sheet:

- The sheet must be shared for read only access for anyone with the link.
- The sheet must be published to the web "as Web Page" via the `Publish to the web` button in the `File` > `Share` menu.

