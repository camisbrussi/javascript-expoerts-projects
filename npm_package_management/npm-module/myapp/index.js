// import FluentSQLBuilder from "./../fluentsql-jest-tdd-yt";
import FluentSQLBuilder from "@camisbrussi/fluentsql"

import database from './database/data.json'

const result = FluentSQLBuilder.for(database)
      .where({registered: /^(2020|2018)/})
      .select(['name'])
      .limit(3)
      .countBy('name')
      .build()

console.log(result)
