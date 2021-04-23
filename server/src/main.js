const dotenv = require('dotenv');
const server = require('./server.js');

require("./services/database.js").startDB();

if (process.env.NODE_ENV === 'test') {
  dotenv.config();
}

const PORT = process.env.PORT || 4040;

server.listen(PORT, () => {
  console.log('Started server at', PORT);
});
