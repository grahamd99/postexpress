
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const { v4: uuidv4 } = require('uuid')

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 
// for parsing application/json
app.use(express.json()) 

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

const comments = [
	{
		id: uuidv4(),
		username: 'Todd',
		comment: 'lol that is so funny'
	},
	{
		id: uuidv4(),
		username: 'Skyler',
		comment: 'I like to go birdwatching'
	},
	{
		id: uuidv4(),
		username: 'Sk8rboi',
		comment: 'plz delete your account'
	}
]

console.log(comments)

app.get('/comments', (req, res) => {
	  console.log("GET response for /comments")
  res.render('comments/index', {comments})
})

app.get('/comments/new', (req, res) => {
  console.log("initial new GET response")
  res.render('comments/new')
})

app.get('/comments/:id', (req, res) => {
  const {id} = req.params
  const comment = comments.find(c => c.id === id)
  res.render('comments/show', {comment})
})



app.post('/comments', (req, res) => {
  const { username, comment } = req.body
  comments.push( { username, comment, id: uuidv4()  } )
  res.redirect('/comments')
})

app.get('/tacos', (req, res) => {
  res.send('GET tacos reponse')
})

app.post('/tacos', (req, res) => {
  console.log(req.body)
  const {type, qty} = req.body
  res.send(`Here are your ${qty} ${type} tacos`)
})
   
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})