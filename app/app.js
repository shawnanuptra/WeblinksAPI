var express = require('express');
var app = express();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./app/weblinksDB');

var multer = require('multer');
var upload = multer();





app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/quote', function (req, res) {
    res.send('Life is good');
});

app.get('/testjson', function (req, res) {
    res.json({
        "url": "http://www.google.com",
        "rating": 10
    });
});

/**
 * @api {get} /goodrating/ Displays in json all websites with rating above 8
 * @apiVersion 1.0.0
 * @apiGroup WEBLINKS
 * 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 2,
 *      "url": "http://www.bbc.com",
 *      "rating": 10
 *    },
 *      {
 *      "id": 10,
 *      "url": "testing.com",
 *      "rating": 10
 *      }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/goodrating', (req, res) => {
    db.all("SELECT * FROM weblinks WHERE rating > 8", (err, rows) => {
        res.json(rows);
    })
})

/**
 * @api {get} /middle-rating/ Displays in json all websites with rating between 4 and 6 inclusive
 * @apiVersion 1.0.0
 * @apiGroup WEBLINKS
 * 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "url": "http://www.bbc.co.uk",
 *      "rating": 6
 *    },
 *      {
 *      "id": 4,
 *      "url": "www.beeb.com",
 *      "rating": 5
 *      }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/middle-rating', (req, res) => {
    db.all("SELECT * FROM weblinks WHERE rating >= 4 AND rating <= 6", (err, rows) => {
        res.json(rows);
    })
})

/**
 * @api {get} /com/ Displays in json all websites ending with 'com'
 * @apiVersion 1.0.0
 * @apiGroup WEBLINKS
 * 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "url": "http://bbc.com",
 *      "rating": 10,
 *      "id": 2
 *      },
 *      {
 *      "url": "beeb.com",
 *      "rating": 5,
 *      "id": 4
 *      },
 *      {
 *      "url": "testing2.com",
 *      "rating": 3,
 *         "id": 11
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/com', (req, res) => {
    db.all("SELECT * FROM weblinks WHERE url LIKE '%.com'", (err, rows) => {
        res.json(rows)
    })
})



/**
 * @api {get} /weblink Display all weblinks
 * @apiVersion 1.0.0
 * @apiGroup WEBLINKS
 * @apiSuccess {id} id Weblink unique identifier
 * @apiSuccess {String} url Full web address including http
 * @apiSuccess {Number} weblink Rating of the site between 1 and 10.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "url": "http://www.bbc.co.uk",
 *      "rating": 6
 *    },
 *      {
 *      "id": 2,
 *      "url": "http://www.microsoft.co.uk",
 *      "rating": 9
 *      },
 *     {
 *      "id": 3,
 *      "url": "http://www.youtube.com",
 *      "rating": 7
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/weblink', function (req, res) {
    db.all("SELECT * FROM weblinks", function (err, rows) {
        res.json(rows);
    });
});


/**
 * @api {get} /weblink/:id Read a specific weblink
 * @apiVersion 1.0.0
 * @apiGroup WEBLINKS
 * @apiParam {Number} id Weblinks unique ID.
 *
 * @apiSuccess {Number} weblink.id Weblink id
 * @apiSuccess {String} weblink.url Weblink url
 * @apiSuccess {Number} weblink.rating Weblink rating
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "id": 1,
 *      "url": "http://www.bbc.co.uk",
 *      "rating": 6
 *     }
 */
app.get('/weblink/:id', function (req, res) {
    let id = req.params.id;
    db.all("SELECT * FROM weblinks WHERE id=?", [id], function (err, rows) {
        res.json(rows);
    });
});


/**
 * @api {post} /weblink/ Create a new weblink
 * @apiVersion 1.0.0
 * @apiGroup WEBLINKS
 * @apiParam {String} url The URL of the site you want to add
 * @apiParam {Number} rating The rating of the site between 1 and 10. 1 is poor. 10 is fantastic.
 *
 * @apiParamExample {json} Input
 *    {
 *      "url": "http://www.bbc.co.uk",
 *      "rating": 10
 *    }
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
app.post('/weblink', upload.array(), function (req, res, next) {
    console.log(req.body.url);
    console.log(req.body.rating);
    let url = req.body.url;
    let rating = req.body.rating;

    db.run("INSERT INTO weblinks (url,rating) VALUES (?, ?)",
        url, rating,
        function (error) {
            if (error) {
                console.log(error);
                res.status(500); //error
            } else {
                res.status(201); //created 
            }
            res.end();
        });
});



/**
 * @api {put} /weblink/:id Update an existing weblink
 * @apiVersion 1.0.0
 * @apiGroup WEBLINKS
 * 
 * @apiParam {id} id Weblink identifier
 * @apiParam {String} url The updated URL
 * @apiParam {Number} rating The rating of the site between 1 and 10. 1 is poor. 10 is fantastic.

 * @apiParamExample {json} Input
 *    {
 *      "url": "http://www.bbc.co.uk",
 *      "rating": 10
 *    }
 * 
 * @apiParam {String} url The URL of the site you want to add
 * @apiParam {Number} rating The rating of the site between 1 and 10. 1 is poor. 10 is fantastic.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
app.put('/weblink/:id', upload.array(), function (req, res, next) {
    console.log(req.body.url);
    console.log(req.body.rating);

    let url = req.body.url;
    let rating = req.body.rating;
    let id = req.params.id;

    db.run("UPDATE weblinks SET url=?, rating=? where id=?",
        url, rating, id,
        function (error) {
            if (error) {
                console.err(error);
                res.status(500); //error
            } else {
                res.status(201); //created 
            }
            res.end();
        });
});




/**
 * @api {delete} /weblink/:id Delete an existing weblink
 * @apiVersion 1.0.0
 * @apiGroup WEBLINKS
 * 
 * @apiParam {id} id Weblink identifier
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
app.delete('/weblink/:id', function (req, res, next) {
    let id = req.params.id;
    db.run("DELETE from weblinks WHERE id=?",
        id,
        function (error) {
            if (error) {
                console.err(error);
                res.status(500); //error
            } else {
                res.status(201); //deleted 
            }
            res.end();
        });
});








//CORS setup for testing
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// app.listen(3000);
module.exports = app; // exporting for supertest
console.log("Up and running..");
