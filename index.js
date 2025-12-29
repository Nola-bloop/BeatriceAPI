import express from 'express'
const app = express()
const PORT = 8888

//routes
import collaborationRouter from './routes/collaboration.route.js'
import playlistRouter from './routes/playlist.route.js'
import songRouter from './routes/song.route.js'
import userRouter from './routes/user.route.js'
import birthdayRouter from './routes/birthday.route.js'

app.use("/collaboration", collaborationRouter);
app.use("/playlist", playlistRouter);
app.use("/song", songRouter);
app.use("/user", userRouter);
app.use("/birthday", birthdayRouter);

app.get('/', (req, res) => {
  res.send('Empty route.')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
