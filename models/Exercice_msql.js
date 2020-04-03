// MODELS FILE
const connection = require('../config/db')

class Exercice {
    constructor (ex) {
        this.ex=ex
    }
    get user_id () {
        return this.ex.user_id
    }
     get title () {
        return this.ex.title
    }
    get ennonce () {
        return this.ex.ennonce
    }
    get correct () {
        return this.ex.correct
    }
    get false1 () {
        return this.ex.false1
    }
    get false2 () {
        return this.ex.false2
    }
    get false3 () {
        return this.ex.false3
    }
    
    static create(title, ennonce, correct, false1, false2, false3, cb) {
        console.log(title)
        connection.query('INSERT INTO exercices SET title=?, ennonce=?, correct=?, false1=?, false2=?, false3=?', [title, ennonce, correct, false1, false2, false3], (err,res) => {
            if (err) throw err
            cb(res)
        })
    }
    
    static getAll(cb) {
        connection.query('SELECT * FROM exercices', (err, exs) => {
            if (err) throw err
            console.log(exs[0].ennonce)
            cb(exs.map((ex) => new Exercice(ex)))
        })
    }
    
     static find(user_id,cb) {
        connection.query('SELECT * FROM exercices WHERE user_id=? LIMIT 1', [user_id], (err, exs) => {
            if (err) throw err
            console.log(exs[0])
            cb(new Exercice(exs[0]))
        })
    }

    static delete(user_id, cb) {
            connection.query('DELETE FROM exercices WHERE user_id=?', [user_id], (err, res) => {
                if (err) throw err 
                cb(res)
            })
    } 
    
    static update(title, ennonce, correct, false1, false2, false3, user_id, cb) {
        connection.query('UPDATE exercices SET title=?, ennonce=?, correct=?, false1=?, false2=?, false3=? WHERE user_id=?', [title, ennonce, correct, false1, false2, false3, user_id], (err, res) => {
            if (err) throw err
            cb(res)
        })
    } 
}

module.exports= Exercice
