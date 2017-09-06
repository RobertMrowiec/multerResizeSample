const express = require('express')
const multer = require('multer')

const bodyParser = require('body-parser')
const Jimp = require('jimp')
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

app.post('/upload', multer({ dest: './uploads/' }).single('file'), (req, res) => {

    Jimp.read(__dirname + "/" + req.file.path).then(function (lenna) {
        if (req.file.originalname.match(/.+\.(jpg|png)$/)) {
            lenna.resize(10, 10)
                .write(__dirname + '/uploads/' + req.file.originalname)
        }
    }).catch(function (err) {
        console.error(err)
    })

    res.sendFile(__dirname+'/index.html')
});


app.listen(80)