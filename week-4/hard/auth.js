const bcrypt = require('bcrypt');
const { z } = require('zod');

const signupSchema = z.object({
    username: z.string().min(5).max(30),
    email: z.string().email(),
    password: z.string().min(6).max(30)
});

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 5);
};

const validateSignupData = (data) => {
    return signupSchema.safeParse(data);
};

module.exports = {
    hashPassword,
    validateSignupData
};