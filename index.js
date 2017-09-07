const express = require('express')
const multer = require('multer')

const bodyParser = require('body-parser')
const Jimp = require('jimp')
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file')


app.post('/upload', upload, (req, res) => {

    Jimp.read(req.file.path).then(function (lenna) {
        if (req.file.originalname.match(/.+\.(jpg|png)$/)) {
            lenna.resize(10, 10)
                .write(__dirname + '/uploadsMini/' + req.file.originalname)
        }
    }).catch(function (err) {
        console.error(err)
    })

    res.sendFile(__dirname+'/index.html')
});


app.listen(80)