const users = []

const addUser = ({id, username, room})=>{
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate data 
    if(!username ||!room){
        return{
            error: 'Username and room are required'
        }
    }

    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username
    })

    //validate username 
    if(existingUser){
        return{
            error: 'username is in use'
        }
    }

    //Store user 
    const user = {id, username, room}
    users.push(user)
    return { user }
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=> user.id === id)

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

addUser({
    id: 22,
    username: 'mamun',
    room: 'Dhaka one'
})

console.log(users)


const removedUser =  removeUser(22)

console.log(removedUser)
console.log(users)