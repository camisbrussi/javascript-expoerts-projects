import { createServer} from 'http'
import { parse, fileURLToPath } from 'url'
import { Worker } from 'worker_threads'

import sharp from 'sharp'

import { dirname } from 'path'
const currentFolder = dirname(fileURLToPath(import.meta.url))
const workerFileName = 'worker.js'

async function joinImages(images) {
  return new Promise((resolve, reject ) => {
    const worker  = new Worker(`${currentFolder}/${workerFileName}`)
    worker.postMessage(images)
    worker.once('message', resolve)
    worker.once('error', reject)
    worker.once('exit', code => {
      if(code !== 0) {
        return reject(new Error(`Thread ${worker.threadId} stopped with exit code ${code}`))
      }

      console.log(`the thread ${worker.threadId} exited!`)
    })
  })
  
}

async function handler(req, res) {
  if(req.url.includes('joinImages')) {
    const { query: { background, img }} = parse(req.url, true)
    const imageBase64 = await joinImages({
      image: img,
      background
    });


    res.writeHead(200, {
      'Content-Type': 'text/html',
    })

    res.end(`<img style="width:100%;height:100%" src="data:image/jpeg;base64,${imageBase64}" />`)
    return;
  }

  return res.end('ok')
 }

createServer(handler)
  .listen(3000, () => console.log('running at 3000'))




/* bg

http://localhost:3000/joinImages?img=https://imagensemoldes.com.br/wp-content/uploads/2020/06/Imagem-Star-Wars-PNG.png&background=https://static.vecteezy.com/ti/fotos-gratis/p1/7359962-galaxy-stars-in-the-universe-outside-earth-abstract-graphic-design-wallpaper-card-3d-gratis-foto.jpg

https://static.vecteezy.com/ti/fotos-gratis/p1/7359962-galaxy-stars-in-the-universe-outside-earth-abstract-graphic-design-wallpaper-card-3d-gratis-foto.jpg

https://imagensemoldes.com.br/wp-content/uploads/2020/06/Imagem-Star-Wars-PNG.png
https://i.pinimg.com/originals/b6/af/5a/b6af5aeff0ee43a4253fc70c167bb6db.png
*/