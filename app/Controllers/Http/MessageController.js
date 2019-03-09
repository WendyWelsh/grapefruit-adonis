'use strict'

const Chatkit = require('@pusher/chatkit-server');
const Env = use('Env');

const chatkit = new Chatkit.default({
    instanceLocator: Env.get('CHATKIT_INSTANCE_LOCATOR'),
    key: Env.get('CHATKIT_KEY')
})

///note changed cors.js origin to true from false to allow messages to other sites
class MessageController {

//Function for creating the users and a room for them and returning the room number
//If a user already exists we skip it
//If a room already exists we return the room number
    async createRoom({ request, response }) {
        const user_id = request.input('user_id');
        const inspector_id = request.input('inspector_id');
        const room_name = user_id + ' and ' + inspector_id;

        //Check to see if user1 already exists
        let user1Exists = await chatkit.getUser({ id: user_id })
            .then(() => {
                return true;
            }).catch(() => {
                return false;
            })
        //Create User one if it doesnt exist
        if (!user1Exists) {
            await chatkit.createUser({ id: user_id, name: user_id })
        }

        //Check to see if user 2 exists
        let user2Exists = await chatkit.getUser({ id: inspector_id })
            .then(() => {
                return true;
            }).catch(() => {
                return false;
            })
        //if user 2 doesnt exist then create it
        if (!user2Exists) {
            await chatkit.createUser({ id: inspector_id, name: inspector_id })
        }

        //grab all the rooms that exist for user 1
        let user1Rooms = await chatkit.getUserRooms({ userId: user_id })
            .then((res) => {
                if (res.length) {
                    return res;
                } else {
                    return [];
                }
            })
            .catch(() => {
                return [];
            })
        //grab all the rooms that exist for user 2
        let user2Rooms = await chatkit.getUserRooms({ userId: inspector_id })
            .then((res) => {
                if (res.length) {
                    return res;
                } else {
                    return [];
                }
            })
            .catch(() => {
                return [];
            })

        //compare the sets of rooms see if one exists that contains both users 
        //if so send its id back   
        let roomExists = false;
        for (let i = 0; i < user1Rooms.length; i++) {
            for (let j = 0; j < user2Rooms.length; j++) {
                if (user1Rooms[i].id === user2Rooms[j].id) {
                    roomExists = true;
                    return response.send(user1Rooms[i].id);
                }
            }
        }

        //if a room that contains both users does not exist create one
        if (!roomExists) {
            return chatkit.createRoom({
                creatorId: user_id,
                name: room_name,
                customData: { foo: 42 },
                userIds: [user_id, inspector_id],
                isPrivate: true
            })
                .then((room) => {
                    return response.send(room.id);
                }).catch((err) => {
                    return response.send(err);
                });
        }
    }

//Function to send a message to a room
    async sendMessage({ request }) {
        const sender_id = request.input('sender_id')
        const room_id = request.input('room_id')
        const message = request.input('message')
        
        await chatkit.sendMessage({
            userId: sender_id,
            roomId: room_id,
            text: message,
          })
            .then(res => console.log('sent message with id', res.id))
            .catch(err => console.error(err))
    }

}

module.exports = MessageController