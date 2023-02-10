import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter';
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL';

describe('RickAndMortyBRLAdapter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getCharacters should return the result of RickAndMortyBRL.getCharactersFromJSON', async () => {
        const mockResponse = [];
        const spy = jest.spyOn(RickAndMortyBRL, 'getCharactersFromJSON').mockResolvedValue(mockResponse);

        const result = await RickAndMortyBRLAdapter.getCharacters();
        expect(result).toEqual(mockResponse);
        expect(spy).toHaveBeenCalled();
    });
});