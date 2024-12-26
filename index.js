const express = require('express')
require('express-async-errors');
const users = require('./users')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const { Client } = require('pg')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/', (req, res) => {
    res.json({ status: 'ok', query: req.query });
})

app.post('/', (req, res) => {
    res.send('Got a POST request')
})
app.use('/users', users);

// app.get('/users/:userId/books/:bookId', (req, res) => {
//     res.send(req.params)
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// const main = async () => {
//     const client = new Client(
//         {
//             user: 'postgres',
//             password: 'changeme',
//             host: 'localhost',
//             port: 5432,

//         }
//     )

//     try {
//         await client.connect()

//         const res = await client.query(
//             `
//             SELECT * 
//             FROM users
//             `,
//         )
//         console.log(res.rows[0]) // Hello world!
//         await client.end()
//     } catch (err) {
//         console.error(err);
//     } finally {
//         await client.end()
//     }
// }

// main();