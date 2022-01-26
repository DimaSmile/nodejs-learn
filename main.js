import 'dotenv/config'
import http from 'http';
import UrlPattern from 'url-pattern';
import routes from './src/routes/api.js'
import responseMessages from './src/messages/responses.js'

const hostname = process.env.APP_URL;
const port = process.env.APP_PORT;

const server = http.createServer(async (request, response) => {
    if (request.url === '/favicon.ico') {
        response.writeHead(200, {'Content-Type': 'image/x-icon'} );
        console.log('favicon requested');
        return;
    }

    for (const route of routes) {
        const pattern = new UrlPattern(route.url);
        const queryParams = pattern.match(request.url);

        if (queryParams && route.method.toUpperCase() === request.method) {
            let body = '';

            for await (const chunk of request) {
                body += chunk;
            }

            const {status, ...result} = route.callback({request}, queryParams);
            console.log(result)

            response.writeHead(status, { "Content-Type": "application/json" });
            return response.end(JSON.stringify(result));
        }
    }

    response.statusCode = 404;
    response.end(responseMessages.not_found);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
