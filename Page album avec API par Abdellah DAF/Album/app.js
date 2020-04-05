const express = require('express');
var path = require('path');
const app = express();
const Joi = require('joi');
var fs = require('fs');
const data = fs.readFileSync('public/data.json');
var parsedata = JSON.parse(data);
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.json());
app.use(express.static(__dirname + '/public'));





app.get('/', (req, res) => {
  res.sendFile('album.html', {root: path.join(__dirname, '.')});
});



app.get('/albums', (req, res)=>{
  res.sendFile('album.html', {root: path.join(__dirname, '.')});

});




app.post('/albums',urlencodedParser, (req,res)=>{
    const { error } = validateAlbum(req.body); // result.error
    if (error) return res.status(400).send(error.details[0].message);

    const album = {
        id: parsedata.albums.length +1,
        title: req.body.title,
        release : req.body.release,
        img: req.body.img

    };

    parsedata.albums.push(album);
    parsedata  = JSON.stringify(parsedata, null ,2)


    fs.writeFile("public/data.json", parsedata, (err, data)=>{
        if (err) throw err;
        console.log(`Saved to file ${parsedata}`);

    });


    res.sendFile(path.join(__dirname + '/album.html'));

});


function validateAlbum(album){
    const schema={
        title: Joi.string().required(),
        release: Joi.string().required(),
        img: Joi.string().required()
    }
    return Joi.validate(album, schema);
}



app.get('/albums/:id', (req, res)=>{
    const album = parsedata.albums.find(c => c.id ===parseInt(req.params.id));

    if (!album)
    return res.status(404).send('The Album with the given ID was not found ..')
    res.send(album)
})


app.listen(3000);
