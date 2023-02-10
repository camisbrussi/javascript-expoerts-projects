import { expect, describe, test, jest } from '@jest/globals';
import OrderBusiness from '../src/business/orderBusiness.js';
import Order from '../src/entities/order.js';

describe('Test suite for Template Method design pattern', () => {
  describe('#OrderBusiness', () => {
    test('order business execution without using template method pattern', () => {
      const order = new Order({
        customerId: 1,
        amount: 100.000,
        products: [{ description: 'ferrari' }],
      });

      const orderBusiness = new OrderBusiness();

      const isValid = orderBusiness._validateRequiredFields(order);
      expect(isValid).toBeTruthy();

      const result = orderBusiness._create(order);
      expect(result).toBeTruthy();
    });

    test('order business execution using template method pattern', () => {
      const order = new Order({
        customerId: 1,
        amount: 100.000,
        products: [{ description: 'ferrari' }],
      });

      const orderBusiness = new OrderBusiness();
      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name,
      );

      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name,
      );

      const result = orderBusiness.create(order);
      expect(result).toBeTruthy();
      expect(calledValidationFn).toHaveBeenCalled();
      expect(calledCreateFn).toHaveBeenCalled();
    });
  });
});