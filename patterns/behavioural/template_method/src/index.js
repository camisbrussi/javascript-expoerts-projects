/*
A proposta do padrão é garantir o fluxo de métodos, definindo uma sequencia,
a ser executada. 
Uma super classe define o equeleto da função 

*/ 

import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
    customerId: 'abc123',
    amount: 200.000,
    products: [{ description: 'shampoo'}]
});

const orderBusiness = new OrderBusiness();
console.info('orderCreated', orderBusiness.create(order));
