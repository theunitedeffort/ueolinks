export default (data) => {

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${ data.shortURL.split("://")[1] }</title>
    <meta property="og:image" content="${ data.data }"/>
    <meta property="og:url" content="https://ueolinks.org/" />
    <meta property="og:title" content="The United Effort Organization" />
    <meta property="og:description" content="${ data.shortURL }" />
  
    <style>
      
      * {
        margin:0;
        padding:0;
      }
    
      html,
      body {
        background-color: #eeeeee;
        font-family: sans-serif;
        font-size: 18px;
        line-height:1.4
      } 

      main,
      header,
      footer {
        text-align: center;
        display:block;
      }
      img {
        display:block;
        width: 60vh;
        max-width: 40%;
        margin: 2em auto 3em;
        border-radius: 10px;
        padding: 10px;
        background-color: #fff;
      }
      h1 {
        font-size: 2em;
        padding-top: 1em;
      }
      a:link,
      a:visited {
        color: #333;
        text-decoration-color:#999999;
      }
      .dest {
        color:#666;
        display: block;
        max-width: 90%;
        margin: 0 auto;
        overflow-wrap: break-word;
      }
    </style>
  </head>
  <body>
    <header>
      <h1><a href="${ data.shortURL }">${ data.shortURL.split("://")[1] }</a></h1>
      </header>    
      <main>
      <img src='${ data.data }' title="${ data.shortURL }">
      <p>
        <a class="dest" href="${ data.destinationURL }" title="${ data.destinationURL }">${ data.destinationURL }</a>
      </p>
    </main>
  </body>
  </html>`;

}
