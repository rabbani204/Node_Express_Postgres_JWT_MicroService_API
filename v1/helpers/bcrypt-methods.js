const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;

let bcryptMethods = {};

bcryptMethods.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        return bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(hash);
            }
        })
    })
}

bcryptMethods.tokenGenerate = (loggedUser, res) => {
    return new Promise((resolve, reject) => {
        const jwtToken = jwt.sign({
            id: loggedUser.id,
            name: loggedUser.name,
            email: loggedUser.email,
            type: loggedUser.type,
            phone: loggedUser.phone
        }, process.env.JWT_SECREAT, {
            expiresIn: "30d",
        })
        resolve(
            data = {
                token: jwtToken,
                user: {
                    id: loggedUser.id,
                    name: loggedUser.name,
                    email: loggedUser.email,
                    type: loggedUser.type,
                    phone: loggedUser.phone
                }
            }
        )
        reject(
            err = {
                success: false,
                message: 'Something went wrong'
            }
        )

    })
}

module.exports = bcryptMethods;