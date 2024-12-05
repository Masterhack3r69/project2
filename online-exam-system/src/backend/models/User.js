const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    static async findByUsername(username) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    static async create(userData) {
        const { username, password, email, role } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);

        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)',
                [username, hashedPassword, email, role],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }

    static async getAllByRole(role) {
        return new Promise((resolve, reject) => {
            db.query('SELECT id, username, email, created_at FROM users WHERE role = ?', [role], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}
