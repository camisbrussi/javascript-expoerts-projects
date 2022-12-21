const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')
    ;
(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        Date.prototype.getFullYear = () => 2020
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
          {
            "name": "Camila Sbrussi",
            "id": 123,
            "profession": "Software Developer",
            "birthDay": 1990
          },
          {
            "name": "Juca Bala",
            "id": 321,
            "profession": "Javascript Specialist",
            "birthDay": 1940
          },
          {
            "name": "Mariazinha",
            "id": 456,
            "profession": "Software Developer",
            "birthDay": 1995
          }
        ]
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()