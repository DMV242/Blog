const jwt = require("jsonwebtoken");

const protect = function (req, res, next) {
  let token;
  const { authorization } = req.headers;
  if (
    authorization.startsWith("Bearer") &&
    authorization.split(" ").length == 2
  ) {
    token = authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!(decoded.iat < parseInt(Date.now() / 1000)))
        throw new Error("you need to login again !");
      next();
    } catch (err) {
      res.status(401).json({
        success: false,
        error: "You need to login to perform this operation",
      });
    }
  }
};

export default protect;
