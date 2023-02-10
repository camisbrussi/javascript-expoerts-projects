import { promises as fs } from 'fs';
import Person from './person.js';
import TerminalController from './terminalController.js';

const DEFAULT_LANG = "pt-BR";
const STOP_TERM = ":q";
const DATABASE_FILE = './database.json';

const terminalController = new TerminalController();

async function initializeTerminal() {
  try {
    const data = await fs.readFile(DATABASE_FILE, 'utf8');
    const database = JSON.parse(data);
    terminalController.initializeTerminal(database, DEFAULT_LANG);
  } catch (error) {
    console.error(error);
  }
}

async function mainLoop() {
  try {
    const answer = await terminalController.question(' ');

    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log('Process finished');
      return;
    }
    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formattedVehicles(DEFAULT_LANG));
    await savePerson(person);
  } catch (error) {
    console.log('Erro', error);
  }

  await mainLoop();
}

async function savePerson(person) {
  try {
    const data = await fs.readFile(DATABASE_FILE, 'utf8');
    const database = JSON.parse(data);
    database.push(person);
    await fs.writeFile(DATABASE_FILE, JSON.stringify(database));
  } catch (error) {
    console.error(error);
  }
}

await initializeTerminal();
await mainLoop();