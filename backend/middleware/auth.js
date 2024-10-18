// auth.js (JWT Authentication Middleware)
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified; // Pass user info from token to request object
    next(); // Proceed to next middleware or route
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};





// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
//   if (!token) {
//     return res.status(403).send("Access denied!");
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET); // Verify token
//     req.user = decoded; // Attach decoded user info to request object
//   } catch (error) {
//     return res.status(401).send("Invalid or expired token!");
//   }

//   return next();
// };

// module.exports = auth;
