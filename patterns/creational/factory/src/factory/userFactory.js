//O Padrão factory serve para abstrair a complexidade da criação de um objeto e evitar
//a replicação de dependências

import UserRepository from "../repository/userRepository.js";
import UserService from "../service/userService.js";
import Database from "../util/database.js";

class UserFactory {
    static async createInstance() {
        const db = new Database({ connectionString: 'mongodb://localhost' });
        const dbConnection = await db.connect();
        const userRepository = new UserRepository({ dbConnection });
        const userService = new UserService({ userRepository });

        return userService;
    }
}

export default UserFactory;