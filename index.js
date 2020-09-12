// Create express application.
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Create middleware, body-parser
const bodyParser = require('body-parser');
// Configure express to use body-parser as middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Use double qoute to object names and values in voca.json file
const mysql = require('mysql');
const config = require('./config/voca.json');
// Connect database in localhost
// const dbConnect = mysql.createConnection(config);

// Connect database in browser
var db = mysql.createPool(config);

// Database connection control
mysql.createConnection(config).connect((err) => {
    if(err) {
        console.log('Not connected to database');
    }
    else {
        console.log('Connected to database.');
    }
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

// ADD page
app.get('/', (req, res) => {
    res.render("add", {
        title: "Vocabulary note | ADD"
    })
});

// NOTE page
app.get('/note', (req, res) => {
    let sql = `CALL show_note();`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.render('note', {
            title: "Vocabulary note | NOTE",
            data: result[0]
        });
    });
});

app.post('/', (req, res) => {
    let value = [req.body.word, req.body.def, req.body.ex];
    let sql = `CALL add_word(?, ?, ?);`;
    db.query(sql, value, (err, result) => {
        if(err) throw err;
        res.redirect('/')
        });
    });

// Edit page
app.get('/note/edit/:word', (req, res) => {
    let word = req.params.word;
    let sql = `CALL show_word(?);`;
    db.query(sql, word, (err, result) => {
        if(err) throw err;
        res.render('edit', {
            title: "Vocabulary note | EDIT",
            data: result[0][0]

        });
    });
});

// Edit word
app.post('/note/edit', (req, res) => {
    let value = [req.body.word, req.body.def, req.body.ex];
    let sql = `CALL edit_word(?, ?, ?);`;
    db.query(sql, value, (err, result) => {
        if(err) throw err;
        res.redirect('/note');
    });
});

// Delete word
app.get('/note/delete/:word', (req, res) => {
    let word = req.params.word;
    let sql = `CALL delete_word(?);`;
    db.query(sql, word, (err, result) => {
        if(err) throw err;
        res.redirect('/note');
    });
});

// Search page
app.get('/search', (req, res) => {
    res.render('search', {
        title: "Vocabulary note | SEARCH",
    })
});

// Search word
app.get('/search/result', (req, res) => {
    let search = req.query.search;
    let sql = `CALL search_word(?);`;
    db.query(sql, '%' + search + '%', (err, result) => {
        if(err) throw err;
        res.render('result', {
            title: "Vocabulary note | SEARCH",
            data: result[0]
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
