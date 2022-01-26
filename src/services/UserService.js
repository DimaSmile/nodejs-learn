export default class UserService {
    getAll() {
        return [{}];
    }

    getOne(userId) {
        return {id: userId, name: 'Test'};
    }

    create(data) {
        return true;
    }

    update(userId, data) {
        return true;
    }

    delete(userId) {
        return true;
    }
}