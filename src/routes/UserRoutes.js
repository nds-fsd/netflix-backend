const express = require('express');
const User = require('../mongo/schemas/user');

const UserRouter = express.Router();

 // GET all users
UserRouter.get('/', async(request, response) => {
    const users = await User.find({})
    try {
        response.send(users)
        } catch (error) {
            response.status(500).json(error)
        }
})



// GET one user
UserRouter.get('/:id', async(request, response) => {
    const id = request.params.id
    try {
        const user = await User.findById({_id: id});
        if(!user) response.status(404).json("No user found")
        return response.status(200).json(user)
    } catch (error) {
        console.log(error)
        response.status(500).json(error)
    }
})


//  DELETE one user
UserRouter.delete('/:id', async (request, response)=>{
    try{
         // find user by id and then delete user
        const user = await User.findByIdAndDelete(request.params.id)
         // if user doesn't exist, then error 404 with message "User not found" if exist then delete user
        if(!user){
            return response.status(404).json("No user found")
        }else{
            return response.status(204).json("User deleted")
            console.log(`User ${user.name} deleted`)
        }
        console.log(user)
    }
     // return error 500 if there is an error with the server-side
    catch(err){
        return response.status(500).json({error: err.message})
    }
})



// PATCH 
UserRouter.patch('/:id', async(request, response)=>{
    try{
        // find user by id and then update user data
        const userUpdate = await User.findByIdAndUpdate({_id : request.params.id }, request.body, {new: true})
        // if user doesn't exist, then error 404 with message "User not found"
        if(!user) response.status(404).json({error: "User not found"})
        // if request auth doesn't match with any user id, then return error 403 with message "Not allowed"
        if(request.auth.id !== user.id) response.status(403).json({error: "Not allowed"}) ;
        // if user exists, return user data updated
        return response.status(200).json(userUpdate)
    }
        // return error 500 if there is an error with the server-side
    catch(err){
        response.status(500).json({error: err.message})
    }
})



module.exports = UserRouter;
