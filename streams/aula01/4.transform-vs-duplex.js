import { Duplex, Transform } from 'stream'

let count = 0;
const server = new Duplex({
    objectMode: true, // nao precisa trabalhar com buffer pois gasta mais memoria
    encoding: 'utf-8',
    read() {
        const everySecond = (intervalContext) => {
            if (count++ <= 5) {
                this.push(`My name is Cami[${count}]`)
                return;
            }
            clearInterval(intervalContext)
            this.push(null)
        }

        setInterval(function () { everySecond(this) })
    },
   
    write(chunk, enconding, cb) {
        console.log(`[writable] saving`, chunk)
        cb()
    }
})


server.write('[duplex] hey this is a writable!\n')
server.push(`[duplex] hey this is also a readable!\n`)

const transformToUpperCase = Transform({
    objectMode: true,
    transform(chunk, enc, cb) {
        cb(null, chunk.toUpperCase())
    }
})

transformToUpperCase.write('[transform] hello from write!')
transformToUpperCase.push('[transform] hello from push!\n')

server
    .pipe(transformToUpperCase)
    .pipe(server)