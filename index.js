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
        user.length ? res.status(404).json({message : "The user with the specified ID does not exist."}) : 
        res.status(200).json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'Sorry, unable to retrieve the user at this point'})
    })

    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'Sorry, unable to retrieve users at this point'})
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

// server.get('api/users', (req, res) => {
//     Users.find()
//         .then(users => {
//             res.status(200).json(users)
//         })
//         .catch(err => { 
//             console.log(err)
//         res.status(500).json({ errorMessage: "There was an error while retrieving the users" })})

// })

const port=5000;
server.listen(port, ()=> console.log(`server running on ${port}`));