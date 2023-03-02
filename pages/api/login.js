import cookie from "cookie";

const handler = (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (
      username === "admin" && password === "12MyPas$5") {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "SWdw4CV||663Z{p3|ZXtP%0k6Ejj;F", {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json("Succesfull");
    } else { 
      res.status(400).json("Wrong Credentials!");
    }
  }
};

export default handler;
