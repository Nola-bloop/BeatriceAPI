import express from 'express'
const app = express()
const PORT = 8888

//routes
import playlistRouter from './routes/playlist.route.js'

app.use("/playlist", playlistRouter);

app.get('/', (req, res) => {
  res.send('Empty route.')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
