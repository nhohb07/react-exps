import zlib from 'zlib'

export function writeError(msg, res) {
  res.writeHead(500, { 'Content-Type': 'text/html' })
  res.write('ERROR!')
  res.end()
}

export function redirect(location, res) {
  res.writeHead(303, { 'Location': location })
  res.end()
}

export function writeNotFound(res) {
  res.writeHead(404, { 'Content-Type': 'text/html' })
  res.write('Not Found')
  res.end()
}

export function write(string, type, res) {
  zlib.gzip(string, (err, result) => {
    res.writeHead(200, {
      'Content-Length': result.length,
      'Content-Type': type,
      'Content-Encoding': 'gzip'
    })
    res.write(result)
    res.end()
  });
}

export function createPage(html) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>iBookNail Version 2.0 - React</title>
      <!--link href="/assets/css/bootstrap.min.css" rel="stylesheet"-->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
      <link href="/assets/css/app.css" rel="stylesheet">
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="http://code.jquery.com/jquery-2.2.2.min.js"></script>
      <script src="/__build__/main.js"></script>
    </body>
  </html>
  `
}