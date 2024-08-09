import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: string;
}

export const decodeHashedId = (hashedId: string): string | null => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const decoded = jwt.verify(hashedId, secret) as DecodedToken;
    if (typeof decoded === "object" && "userId" in decoded) {
      return decoded.userId;
    }
    return null;
  } catch (error) {
    console.error("Error decoding hashed ID:", error);
    return null;
  }
};
