import 'dotenv/config'
import http from 'http';
import UrlPattern from 'url-pattern';
import routes from './src/routes/api.js'

const hostname = process.env.APP_URL;
const port = process.env.APP_PORT;

const server = http.createServer((request, response) => {
    if (request.url === '/favicon.ico') {
        response.writeHead(200, {'Content-Type': 'image/x-icon'} );
        console.log('favicon requested');
        return;
    }

    routes.forEach((route) => {
        const pattern = new UrlPattern(route.url);
        const queryParams = pattern.match(request.url);
        if (queryParams && route.method.toUpperCase() === request.method) {
            const {status, ...result} = route.callback(request, queryParams);
            response.setHeader('Content-Type', 'application/json');
            response.statusCode = status;
            return response.end(JSON.stringify(result));
        }
    });

    response.statusCode = 404;
    return response.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
