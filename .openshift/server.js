// server.js

// MYSQL connection

// mysql://$OPENSHIFT_MYSQL_DB_HOST:$OPENSHIFT_MYSQL_DB_PORT/
// OPENSHIFT_MYSQL_DB_URL

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var conn 	   = "";

//Lainattu Villeltä https://github.com/vpii/mediaplayer/blob/master/server.js
if (process.env.OPENSHIFT_MYSQL_DB_HOST == undefined) // if local connection 
    conn = 'mysql://root:2013opinnot@localhost/mediaplayer';
else   
    conn = 'mysql://mediaplayer@' + process.env.OPENSHIFT_MYSQL_DB_HOST + ':' + process.env.OPENSHIFT_MYSQL_DB_PORT + '/mediaplayer';
var connection = mysql.createConnection(conn);

connection.connect();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var port = process.env.PORT || 8080;        // set our port
    var ipaddress = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
    var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

router.get('/api', function(req, res) {
    //res.json({ message: 'hooray! welcome to our api!' });


  connection.query('SELECT * FROM kappale;', function(err, rows, fields) {
    console.log("rows:", rows);
    if (err) {
      console.log(err);
      throw err;
    }
    res.json({ playlist: rows});
  });


});

//* Handle login POST request */
router.post('/api/login', function(req, res) {
  console.log("some login data just arrived:", req.body);
  
  if(undefined !== (req.body.password) &&  undefined !== req.body.username) {
    // TODO get personal playlist from database
       connection.query('SELECT * FROM kappale INNER JOIN soittolista ON id = soittolista.kappaleid AND soittolista.kayttajaid = (SELECT id FROM kayttaja WHERE tunnus = "'+ req.body.username +'" AND salasana = "' + req.body.password + '");'
, function(err, rows, fields)  {
  	  if (err) {
      console.log(err);
      throw err;
    }  
    res.json({login:'ok', playlist: rows });
 
    
  });
  }
  else {
    res.json({login: 'failed'});
  }

});
// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

app.use(express.static(__dirname + '/'));

// START THE SERVER
// =============================================================================
app.listen(port, ipaddress);
console.log('Magic happens on ' + 'http://' + ipaddress +':'+ port);
console.log('Magic happens on ' + 'http://' + ipaddress +':'+ port + '/api');
console.log('Magic happens on ' + 'http://' + ipaddress +':'+ port + '/api/login');
