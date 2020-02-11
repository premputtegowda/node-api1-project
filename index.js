// implement your API here
const express = require('express')

const Users = require('./data/db.js')

const server = express();

server.use(express.json());

server.get('/',(req, res)=> {
    res.status(500).json({hello: 'Hello World!'})
})

server.get('/api/users',(req, res)=> {
    Users.find()
    .then( users => {
        res.status(500).json(users)
    }

    ).catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'Sorry, unable to retrieve users at this point'})
    })
    
})

server.get('/api/users/:id',(req, res)=> {
    const id = req.params.id
    Users.findById(id)
    .then( user => {
        !user ? res.status(404).json({message : "The user with the specified ID does not exist."}) : 
        res.status(200).json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'Sorry, unable to retrieve the user at this point'})
    })
    
})

server.delete('/api/users/:id',(req, res)=> {
    const id = req.params.id

    Users.findById(id)
        .then( user => {
            if(!user) {
                console.log(user)
                res.status(404).json({message : "The user with the specified ID does not exist."})
            } else {
                return user
        }
        })
        .then( user =>{ 
                    Users.remove(user.id)
                        .then(count => res.status(200).json({deletedCount: count}))
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ errorMessage: "The user could not be removed" })
                    })
                })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: 'Sorry, unable to delete'})
        })
            
 
})


server.post('/api/users',(req, res) => {
    const userInfo =  req.body;
    if(!userInfo.name || !userInfo.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else {
        Users.insert(userInfo)
            .then(user => res.status(201).json(user))
            .catch(error => {
                console.log(error);
               res.status(500).json({errorMessage : 'Sorry we ran into an error adding a user'})
              })
    }


})
server.put('/api/users/:id',(req, res) => {
    const id = req.params.id;
    const data = req.body;
    Users.findById(id)
        .then( user => {
            if(!user) {
                console.log(user)
                res.status(404).json({message : "The user with the specified ID does not exist."})
            } else {
                return user
        }
        })
        .then( user =>{ 
                    Users.update(user.id,data)
                        .then(updatedUser => res.status(200).json(updatedUser))
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({ errorMessage: "The user could not be updated" })
                    })
                })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: 'Sorry, unable to update at this point'})
        })

})

const port=5000;
server.listen(port, ()=> console.log(`server running on ${port}`));