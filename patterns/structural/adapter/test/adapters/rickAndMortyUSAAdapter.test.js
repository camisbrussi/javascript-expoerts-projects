import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter';
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA';

describe('RickAndMortyUSAAdapter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getCharacters should return the result of RickAndMortyUSA.getCharactersFromXML', async () => {
        const mockResponse = [];
        const spy = jest.spyOn(RickAndMortyUSA, 'getCharactersFromXML').mockResolvedValue(mockResponse);

        const result = await RickAndMortyUSAAdapter.getCharacters();
        expect(result).toEqual(mockResponse);
        expect(spy).toHaveBeenCalled();
    });
});