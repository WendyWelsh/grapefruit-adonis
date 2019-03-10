"use strict";
const User = use("App/Models/User");

class UserController {

  async getUser({ request, response }) {
    let users = await User.all();
    response.send({
      users: users
    });
  }

  async login({ request, auth, response }) {
    try {
      const token = await auth
        .withRefreshToken()
        .attempt(request.input("email"), request.input("password"));
      // return response.redirect('/home')
      try{
          console.log('heyhey')
        const user = await User.findBy('email', request.input('email'))
        console.log(user)
        return response.json({
            status: "success!",
            data: token,
            role: user.role_id
          });
      }
      catch (error) {response.status(400).json({
          status: "error!",
          data: "user not found."
      })}
    //   console.log(user)
      
    } catch (error) {
      response.status(400).json({
        status: "error",
        message: "Invalid Credentials"
      });
    }
  }

  async createUser({ request, auth, response }) {
    const { username, email, password, role } = request.post();
    const user = await User.create({
      username,
      email,
      password,
      role_id: parseInt(role)
    });
    const token = await auth.generate(user);
    console.log(user);
    response.json({
      message: "${user.username} added to the database",
      data: token,
      role: user.role_id
    });
  }

  async deleteUser({ request, response, params: { id } }) {
    var deleteUserById = await User.find(id);
    await deleteUserById.delete();
    let users = await User.all();
    response.json({
      Message: "Time for Mickey D's!",
      users: users
    });
  }
}

module.exports = UserController;
