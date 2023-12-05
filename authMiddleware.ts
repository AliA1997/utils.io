import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export async function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => Promise<void>
) {
  const { accessToken, refreshToken } = req.cookies;

  //Check if access token is valid, if it is continue onto api call.
  const isAccessTokenValid = await verifyAccessToken(accessToken);

  if (isAccessTokenValid) {
    await next();
    return;
  }

  //When access token is expired, refresh it.
  const newAccessToken = await refreshAccessToken(refreshToken);
  if (newAccessToken) {
    req.headers.authorization = `Bearer ${newAccessToken}`;
    await next();
    return;
  }

  //If refresh token is expired then return a 401 unauthorized error.
  return res.status(401).json({ error: "Unauthorized" });
}

async function verifyAccessToken(accessToken: string | undefined) {
  // Implement your logic to verify the access token validity
  // Check if the token is not expired and is correctly signed
  const decodedToken = decodeToken(accessToken!);
  if (!decodedToken) {
    return false;
  }
  const expirationTime = decodedToken.exp;
  const currentTime = Math.floor(Date.now() / 1000);
  return expirationTime > currentTime;
}

async function refreshAccessToken(refreshToken: string | undefined) {
  // Implement your logic to refresh the access token
  // Make an API request to the token refresh endpoint with the refresh token
  // Return the new access token if the refresh was successful, or null otherwise
  // Set the expiration time for the new access token to two weeks from now
  const newAccessToken = generateToken(
    {
      /* Include relevant user information */
    },
    "2w"
  );
  return newAccessToken;
}

function decodeToken(token: string): any {
  // Implement your token decoding logic here
  // Decode the token to extract the payload (claims)
  // Verify the token's signature and expiration time
  // Return the decoded token if valid, or null otherwise
  // You can use JWT libraries or other authentication libraries to handle token decoding and verification
  // Example with jsonwebtoken library:
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    return decoded;
  } catch (error) {
    return null;
  }
}

function generateToken(payload: any, expiresIn: string): string {
  // Implement your token generation logic here
  // Generate a new access token with the provided payload and expiration time
  // You can use JWT libraries or other authentication libraries to handle token generation
  // Example with jsonwebtoken library:
  const token = jwt.sign(payload, "your-secret-key", { expiresIn });
  return token;
}
