import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENTE_ID);

const googleVerify = async (token = "") => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENTE_ID
  });

  const { name, email, ...resto } = ticket.getPayload();
  //console.log('getPayload',name, picture, email);

  return { name, email };
};

export default googleVerify;
