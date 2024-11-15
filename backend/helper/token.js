// Import libraries
import crypto from "crypto";
import { base64Url, base64UrlDecode } from "./base64Url.js";
function createToken(user) {
    // Create token
    const jwtSecret = process.env.JWT_SECRET;

    const header = {
        type: "JWT",
        alg: "HS256",
    };

    const payload = {
        email: user.email,
        role: user.role,
        userId: user._id,
        username: user.name,
        exp: Date.now() + 60 * 60 * 1000,
    };

    console.log(JSON.stringify(header));
    console.log(JSON.stringify(payload));

    // Encode header and payload base64
    const encodedHeader = base64Url(JSON.stringify(header));
    const encodedPayload = base64Url(JSON.stringify(payload));

    // Create token data
    const tokenData = `${encodedHeader}.${encodedPayload}`;

    // Create hmac sha256 signature
    const signature = crypto.createHmac("sha256", jwtSecret).update(tokenData).digest("base64url");

    // Create token
    const token = `${tokenData}.${signature}`;

    // Return token
    return token;
}

// Verify token
function verifytoken(token) {
    // Check token
    if (!token) {
        return null;
    } else {
        // Verify token
        const [header, payload, signature] = token.split("."); // get info token

        // Create token data
        const tokenData = `${header}.${payload}`;

        // Decode payload signature
        const decodedPayload = JSON.parse(base64UrlDecode(payload));
        console.log(decodedPayload, "decode");

        const jwtSecret = process.env.JWT_SECRET; // get secret key

        // Create signature check
        const signatureCheck = crypto
            .createHmac("sha256", jwtSecret)
            .update(tokenData)
            .digest("base64url");

        // Check signature is valid
        if (signature === signatureCheck && Date.now() <= decodedPayload.exp * 1000) {
            return decodedPayload;
        } else {
            return null;
        }
    }
}

export { createToken, verifytoken };
