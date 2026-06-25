import crypto from "crypto";

const generateToken = () => {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    return { rawToken, hashToken };
};

const generateHashToken = (rawToken) => {
    return crypto.createHash("sha256").update(rawToken).digest("hex");
}

const verifyHash = (rawToken, verificationToken) => {
    const hashToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    return hashToken === verificationToken;
}

export { generateToken, verifyHash, generateHashToken };