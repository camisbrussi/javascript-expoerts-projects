import Http from 'http'

async function handler(req, res) {

  try {
    for await(const data of req) {
      await Promise.reject('error')
    res.end()
  }
    
  } catch (error) {
    console.log('a server error has happened', error)
    res.writeHead(500)
    res.white(JSON.stringify({ message: 'Server error'}))
    res.end()
  }
  
}

Http.createServer(handler)
    .listen(3000, () => console.log('running at 3000'))