export default class Controller {
    constructor(request) {
        this.request = request;
    }

    response (data, status = 200) {
        return {data: data, status};
    }
}