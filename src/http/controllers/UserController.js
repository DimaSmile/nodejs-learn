import UserService from "../../services/UserService.js";
import Controller from "./Controller.js";

export default class UserController extends Controller {
    #userService;

    constructor(request) {
        super(request);
        this.#userService = new UserService();
    }

    index() {
        return super.response(this.#userService.getAll(), 200);
    }

    show(userId) {
        return super.response(this.#userService.getOne(userId), 200);
    }

    store() {
        // console.log(this.request);
        return this.response(this.#userService.create(this.request.JSON), 201);
    }

    update(userId) {
        return this.response(this.#userService.update(userId), 200);
    }

    delete(userId) {
        return this.response(this.#userService.delete(userId), 204);
    }
}