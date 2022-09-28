const express = require('express');
const app = express();
var request = require('request');


const hostname = '127.0.0.1';
const port = 3000;

app.get('/trainings', function (req, res) {
    res.end( "{}" );
})

app.get('/get-strava-token', function (req, res) {

    console.log("Strava token")
    console.log(req.query.code)

    // Following code disables the CORS stuff and make the endpoint unsafe
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers','Origin,Content-Type,X-Requested-With,Accept,Authorization');

    /*
    * curl -X POST https://www.strava.com/api/v3/oauth/token \
        -d client_id=94269 \
        -d client_secret=8e66bcb0b1c10912d500ec770bd85392d78b8458  \
        -d code=de2553ed6b05a432d5c5445deda75c7dd48bd9ee \
         -d grant_type=authorization_code
    * */
    request.post(
        'https://www.strava.com/api/v3/oauth/token',
        { json: {
            client_id:'94269',
            client_secret:'8e66bcb0b1c10912d500ec770bd85392d78b8458',
            code:req.query.code,
            grant_type:'authorization_code'},
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                res.end(JSON.stringify(body));
            }else{
               console.log(error)
            }

        }
    );
})

const server = app.listen(port, hostname, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Trainings at http://%s:%s/trainings", host, port)
    console.log("Trainings at http://%s:%s/get-strava-token", host, port)
})