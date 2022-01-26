import UserController from "../http/controllers/UserController.js";


const routes = [
    {
        method: 'GET',
        url: '/api/users',
        callback: (request) => {
            const controller = (new UserController(request));
            return controller.index();
        },
    },
    {
        method: 'GET',
        url: '/api/users/:user',
        callback: (request, queryParams) => {
            const controller = (new UserController(request));

            return controller.show(queryParams.user);
        },
    },
    {
        method: 'POST',
        url: '/api/users',
        callback: (request) => {
            const controller = (new UserController(request));
            return controller.store();
        },
    },
    {
        method: 'DELETE',
        url: '/api/users/:user',
        callback: (request, queryParams) => {
            const controller = (new UserController(request));

            return controller.delete(queryParams.user);
        },
    },
    {
        method: 'PUT',
        url: '/api/users/:user',
        callback: (request, queryParams) => {
            const controller = (new UserController(request));

            return controller.update(queryParams.user);
        },
    },
];

export default routes;