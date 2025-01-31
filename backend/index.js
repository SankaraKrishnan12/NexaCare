const express = require("express")

const app = express()

app.use(express.json())

app.post("/", (req, res) => {
    res.status(200).json({success : true, data : req.body.name})
})

app.listen(5000, () => {
    console.log("Server")
})