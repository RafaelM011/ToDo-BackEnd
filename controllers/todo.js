const getTodo = (db) => (req,res) => {
    const {username} = req.params;

    db("todos")
    .select("*")
    .where({username})
    .then( data => {
        res.json(data)
    })
    .catch( err => {
        res.json(err)
    })
}

const addTodo = (db) => (req,res) => {
    const {username, description} = req.body;

    db('todos')
    .insert({username, description})
    .then( () => {
        db("todos")
        .returning('*')
        .where({username})
        .then(data => {
            res.status(200).json(data);
        })
        .catch( err => {
            res.status(400).json(err)
        })
    })
    .catch( err => {
        res.status(400).json(err)
    })
}

const removeTodo = (db) => (req,res) => {
    const {id, username} = req.body

    db('todos')
    .where({id})
    .del()
    .then( () => {
        db('todos')
        .where({username})
        .returning('*')
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            res.status(400).json(err)
        })

    })
    .catch( err => {
        res.status(400).json(err)
    })
}

export { getTodo,addTodo, removeTodo}