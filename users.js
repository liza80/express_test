const express = require('express')
const router = express.Router()
const pool = require('./db');

const getUsers = async (req, res) => {
    try {
        const text = 'SELECT * FROM users';
        const result = await pool.query(text);
        //then (=>)
        res.json({
            users: result.rows
        });
        // pool.query(text, (err, result) => {
        //     console.log("in callback")
        //     res.json({
        //         users: result.rows
        //     });
        // })

        // pool.query(text)
        //     .then(result => {
        //         console.log("in callback")
        //         return result.rows
        //     })
        //     .then(rows => {
        //         res.json({
        //             users: rows
        //         });
        //     })
        //     .catch(err => {

        //     })
        // console.log("Here")

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

const addUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {

        const text = `
            INSERT INTO users (username, email, password_hashm, is_active)
            VALUES (${username}, ${email}, ${password}, true) RETURNING *`;

        const result = await pool.query(text);
        res.status(201).json({
            message: 'User added successfully',
            user: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { user_id } = req.params;
    const { username, email, password_hash, is_active } = req.body;

    try {
        const text = `
            UPDATE users 
            SET username = '${username}', email = '${email}', password_hash='${password_hash}', is_active = ${is_active}, updated_at = CURRENT_TIMESTAMP
            WHERE id = '${user_id}' RETURNING *`;

        const result = await pool.query(text);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'User updated successfully',
            user: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }

}

router.get('/', getUsers)
router.post('/', addUser)
router.put('/:user_id', updateUser)

module.exports = router

