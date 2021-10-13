const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin");
require("dotenv").config();

function generateToken(params = {}) {
  return jwt.sign(params, process.env.AUTH_CONFIG_SECRET, {
    expiresIn: 10800,
  });
}

module.exports = {
    async singUp(data){
        const { email } = data;

        if (await Admin.findOne({ email }))
            return { error: "User already exists" }

        const user = await Admin.create(data);
        const token = generateToken({ id: user.id });
        
        user.password = undefined;

        return { user, token };
    },

    async singIn(data){
        const { email, password } = data;
        const user = await Admin.findOne({ email }).select("+password");

        if (!user)
            return { error: "User not found" };
    
        if (!(await bcrypt.compare(password, user.password)))
            return { error: "Invalid password" };
        
        const token = generateToken({ id: user.id });
        user.password = undefined;

        return { user, token };
    }
};