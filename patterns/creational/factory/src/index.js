import UserFactory from './factory/userFactory.js';

(async () => {
  const userFactory = await UserFactory.createInstance();
  const result = await userFactory.find({ name: 'Camila*' });
  console.log({ result });
})();