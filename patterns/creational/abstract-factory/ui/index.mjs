/*renderizando a mesma lista em ambientes diferentes no browser utilizando HTML5 e no terminal utilizando o console. */

import { database } from "../shared/data.mjs";

class Application {
    constructor(factory) {
        this.table = factory.createTable();
    }

    initialize() {
        this.table.render(database);
    }
}

async function main() {
    const platform = globalThis.window ? 'browser' : 'console';
    const { default: ViewFactory } = await import(`./../platforms/${platform}/index.mjs`);
    const app = new Application(new ViewFactory());
    app.initialize();
}

main();