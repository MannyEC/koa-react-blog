'use strict';
exports.layout = function (content, initState) {
  return `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="theme-color" content="#000000">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <link href="/main.css" rel="stylesheet">
  <style type="text/css">
    body {
      margin: 0;
      background: #222c35;
    }
  </style>
  <title>Eckid Blooooooog</title>
</head>

<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root">${content}</div>
  <script>window.__INITIAL_STATE__ =${JSON.stringify(initState)}</script>
  <script type="text/javascript" src="/babel-polyfill.eckidecho.js"></script>
  <script type="text/javascript" src="/react.eckidecho.js"></script>
  <script type="text/javascript" src="/react-dom.eckidecho.js"></script>
  <script type="text/javascript" src="/vendor.eckidecho.js"></script>
  <script type="text/javascript" src="/app.eckidecho.js"></script>
</body>

</html>
`;
};
