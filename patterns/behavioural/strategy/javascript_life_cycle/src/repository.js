import fs from 'fs';
import path from 'path';

const save = async (data) => {
  const databaseFile = path.join(__dirname, './../database.json');
  let currentData = [];
  try {
    const dataString = await fs.promises.readFile(databaseFile, 'utf-8');
    currentData = JSON.parse(dataString);
  } catch (error) {
    console.error(`Error reading database file: ${error.message}`);
  }

  currentData.push(data);
  await fs.promises.writeFile(databaseFile, JSON.stringify(currentData), 'utf-8');
};

export default save;