const { deepStrictEqual } = require('assert');
const { Console } = require('console');
let counter = 0;
let counter2 = counter
counter2++

//TIPO PRIMITIVO GERA UMA CÓPIA NA MEMÓRIA
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

//TIPO DE REFERÊNCIA, COPIA O ENDEREÇO DE MEMORIA E APOSTA PARA O MESMO LUGAR
const item = { counter: 0 }
const item2 = item

item2.counter ++
deepStrictEqual(item, {counter: 1})
item.counter ++
deepStrictEqual(item2, {counter: 2})

//DESSA FORMA, SOBRESCREVO O COMPORTAMENTO DAS FUNÇÕES E CONSIGO 
//IMPRIMIR, NÃO FICA [OBJECT, OBJECT]
const object = {
  name: 'Camila Sbrussi',
  age: 25,
  // string: 1 se não for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  // number: 1 se não for primitivo, chama o to string
  valueOf() {
    return 007
  }
}

console.log(''.concat(object)) // result: Name: Camila Sbrussi, Age: 25
console.log('toString', String(object)) // result: toString Name: Camila Sbrussi, Age: 25
console.log('valueOF', Number(object)) // result: valueOF 7


const object2 = {
  name: 'Camila Sbrussi',
  age: 25,
  // string: 1 se não for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  // number: 1 se não for primitivo, chama o to string
  valueOf() {
    return {hey: 'dude'}
  },
  // tem prioridade
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to convert to', coercionType)
    const types = {
      string: JSON.stringify(this), //result: String {"name":"Camila Sbrussi","age":25}
      number: '00007' //result: Number 7
    }

    return types[coercionType] || types.string
  }
}

//antes de adicionar o primitive
console.log('toString', String(object2)) // result: toString Name: Camila Sbrussi, Age: 25
console.log('valueOF', Number(object2)) // result: valueOf NaN - to string retornou a string

//depois de adicionar o primitive
console.log('String', String(object2)) //undefined
console.log('Number', Number(object2)) //NaN
//chama a conversão default!
console.log('Date', new Date(item)) //Date Invalid Date
