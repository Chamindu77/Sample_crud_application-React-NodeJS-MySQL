// require("dotenv").config();
// const app = require("./app");
//   const PORT = process.env.PORT || 4000 ;

// app.listen( PORT,()=>{

//     console.log(`App is listening at: http://localhost:${PORT}`);

// })


// index.js
require("dotenv").config(); // Load environment variables from .env file
const app = require("./app"); // Import app from app.js

const PORT = process.env.PORT || 4000; // Define the port, default to 4000 if not specified in .env

// Start server
app.listen(PORT, () => {
  console.log(`App is listening at: http://localhost:${PORT}`);
});
