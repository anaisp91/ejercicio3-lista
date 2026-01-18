// /server/server.js
import * as http from "node:http";
import * as url from "node:url";

http.createServer(function server_onRequest (request, response) {
    var pathname = url.parse(request.url).pathname;

    console.log("Request for " + pathname + " received.");

    response.writeHead(200, {'Content-Type': 'text/html'});
    /*
    // Router:

    switch(pathname) {
         case "/":
            response.write(getPageLayout(getHomePage()));
            break;
        case "/form":
            response-write(getPageLayout(getFormPage()));
            break;
        default:
            response.write(getPageLayour(getNotFoundPage()))
            break;
}
*/
    response.end();
}).listen(process.env.PORT, process.env.IP);

console.log('Server running at http://' + process.env.IP + ':' + process.env.PORT + '/');



//FUNCIONES DE SWITCH PATA PATHNAME
/*
function getHormPage(page){
    return `
       <html>
           <head>
               <title>servidor node JS</title>
               <style>
                   nav ul {
                       display: flex;
                       list-style-type: none;
                       gap: 20px
                       }
               </style>
           </head>
           <body>
               ${page}
           </body>
       </html>
       ';

}

function getFormPage(page){

}

function getNotFoundPage(page){

}
*/