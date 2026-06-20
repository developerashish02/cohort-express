import User from "./auth.modal.js";

const authService = async ({ name, email, password }) => {
    const isExist = await User.findOne({
        email: email
    })

    console.log(`[isExist] : ${isExist}`);
}

export { authService };