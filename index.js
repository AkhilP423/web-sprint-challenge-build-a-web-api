//server seems functional, can change port if needed

const server = require('./api/server')

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
    console.log("Server is up.")
}) 