import RickAndMortyBRLAdapter from "./business/adapters/rickAndMortyBRLAdapter.js";
import RickAndMortyUSAAdapter from "./business/adapters/rickAndMortyUSAAdapter.js";

async function getCharactersData() {
    const data = [
        RickAndMortyBRLAdapter.getCharacters(),
        RickAndMortyUSAAdapter.getCharacters()
    ];

    const all = await Promise.allSettled(data);

    const successes = all
        .filter(({ status }) => status === "fulfilled")
        .map(({ value }) => value)
        .reduce((prev, next) => [...prev, ...next], []);

    const errors = all.filter(({ status }) => status === "rejected");

    console.table(successes);
    console.table(errors);
}

getCharactersData();