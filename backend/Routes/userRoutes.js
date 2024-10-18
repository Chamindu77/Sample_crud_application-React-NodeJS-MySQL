// userRoutes.js
const express = require('express');
const { registration, login, getUser } = require('../Controllers/userControllers');
const auth = require('../middleware/auth');  // Middleware for authentication
const router = express.Router();

// Route for user registration
router.post("/api/u/register", registration);

// Route for user login
router.post("/api/u/login", login);

// Route to get user details, protected by auth middleware
router.get("/api/u/user", auth, getUser);

module.exports = router;





// const express = require('express');
// const { registration, login, getUser } = require('../Controllers/userControllers');
// const auth = require("../middleware/auth")
// const cookieParser = require('cookie-parser');
// const router = express.Router();




// router.post("/api/u/register", registration);
// router.post("/api/u/login", login);
// router.get("/api/u/user", auth, getUser);

// module.exports = router;