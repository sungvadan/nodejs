var express = require('express')
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser')

var app = express()

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
    name: 'session',
    keys: ['secret-key-todolist']
}))

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {
    var todoList = req.session.todoList || []
    console.log(todoList)
    res.render('index.ejs', { todoList } )
})

app.post('/add', function(req, res) {
    var todoList = req.session.todoList || []
    todoList.push(req.body.todo)
    req.session.todoList = todoList
    res.render('index.ejs', { todoList } )
})

app.get('/delete/:id', function(req, res) {
    var todoList = req.session.todoList || []
    if (req.params.id) {
        todoList.splice(req.params.id, 1)
    }
    req.session.todoList = todoList
    res.render('index.ejs', { todoList } )
})

app.listen(8089)