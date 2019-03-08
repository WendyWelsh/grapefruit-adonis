'use strict'
//Needs worked on...
//calling change handler from props seems to be slower
//need to get user and inspector from redux
//need to verify that createroom is working from postman then make it work here
//need to finish theme
const Chatkit = require('@pusher/chatkit-server');
const Env = use('Env');
const chatkit = new Chatkit.default({
    instanceLocator: Env.get('CHATKIT_INSTANCE_LOCATOR'),
    key: Env.get('CHATKIT_KEY')
})
///note changed cors.js origin to true from false to allow messages to other sites
class MessageController {
    async createUser({ request, response }) {
        const user_id = request.input('user_id');
        const user_name = request.input('user_name');
        return chatkit.createUser({
            id: user_id,
            name: user_name,
        })
            .then((user) => {
                return response.send(user)
            }).catch((err) => {
                return response.send({ "message": 'user already exists' });
            });
    }
    async getUser({ request, response }) {
        const user_id = request.input('user_id');
        return chatkit.getUser({
            id: user_id,
        })
            .then(user => {
                return response.send(user)
            })
            .catch(err => {
                return response.send(err)
            })
    }
    async deleteUser({ request, response }) {
        const user_id = request.input('user_id')
        return chatkit.deleteUser({ userId: user_id })
            .then(() => {
                return response.send({ message: 'deleted successfully' });
            }).catch(() => {
                return response.send({ message: 'unable to delete' });
            });
    }
    async createRoom({ request, response }) {
        const user_id = request.input('user_id')
        const inspector_id = request.input('inspector_id')
        const room_name = user_id + ' and ' + inspector_id
            // this calls event.js
            Event.emit('send::notification', {message:request.input('message'),user_id:id,inspector_id:request.input('inspector_id')})
            // return response.send(message)
        let roomExists = await chatkit.getUserRooms({ userId: user_id, userId: inspector_id })
            .then((res) => {
                if (res.length) {
                    console.log("Room Exist")
                    return true;
                } else {
                    console.log("Room Doesnt Exists")
                    return false;
                }
            })
            .catch(() => {
                console.log("Room Check failed")
                return false;
            })
        if (!roomExists) {
            //create room
            console.log("Attempt to create Room")
            return chatkit.createRoom({
                creatorId: user_id,
                name: room_name,
                customData: { foo: 42 },
                userIds: [user_id, inspector_id],
                isPrivate: true
            })
                .then((room) => {
                    console.log("Room Created")
                    return response.send(room);
                }).catch((err) => {
                    console.log("Room Failed")
                    return response.send(err);
                });
        }
    }
    //multidirectional. users can send to inspectors and inspectors can send to users
    async sendMessage({ request, response }) {
        const sender_id = request.input('sender_id')
        const reciever_id = request.input('reciever_id')
        const message = request.input('message')
        //grab the room the pair share
        const room_id = await chatkit.getUserRooms({ userId: sender_id, userId: reciever_id })
            .then((res) => {//should only return one room
                return (res[0].id);//send message to that first room
            })
            .catch(err => console.error(err))
        return chatkit.sendMessage({
            userId: sender_id,
            roomId: room_id,
            text: message,
        })
            .then(res => {
                return response.send(res.message_id)
            })
            .catch(err => {
                return response.send(err)
            })
    }
    async getMessages({ request, response }) {
        const roomId = request.input('room_id')
        return chatkit.getRoomMessages({
            roomId: roomId,
            direction: "newer",// old at top new at bottom
            limit: 10,
        })
            .then(messages => {
                return response.send(messages)
            })
            .catch(err => response.send(err))
    }
}
module.exports = MessageController
