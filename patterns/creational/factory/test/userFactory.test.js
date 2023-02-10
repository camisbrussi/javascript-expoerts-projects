//A biblioteca rewiremock, que você Erick usa, é destinada a testes de aplicações que usam o padrão CommonJS (require/module.exports). Para atualizar para última versão do node, utilizo o jest

import { deepStrictEqual } from 'assert';
import UserFactory from '../src/factory/userFactory.js';

import jest from 'jest';

const dbData = [{ name: 'Maria' }, { name: 'PAULO' }];

class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
}

jest.mock('../src/util/database', () => MockDatabase);

(async () => {
  {
    const expected = [{ name: 'MARIA' }, { name: 'PAULO' }];

    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
  }
})();