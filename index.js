var express = require('express')
var app = express()
var firebase = require("firebase");
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var config = {
  apiKey: " AIzaSyBDCmFGoHFseRc7mIsFJdFhgORaWItCiw8",
  authDomain: "dummy-b4c72.firebaseapp.com",
  databaseURL: "https://dummy-b4c72.firebaseio.com/",
  storageBucket: "gs://dummy-b4c72.appspot.com/",
};
firebase.initializeApp(config);

app.use('/', express.static(__dirname+'/'));

app.get('/', function (req, res) {

	var uid1_ref = firebase.database().ref('uid1/');
	uid1_ref.on('child_added',function(snapshot){
		if(snapshot){	
			if(snapshot.child('isNew').val() == true){
				snapshot.ref.update({isNew:false});
			}
			else{
				return;
			}
		}
		else{
			return;
		}
	});


	var uid2_ref = firebase.database().ref('uid2/');
	uid2_ref.on('child_added',function(snapshot){
		if(snapshot){	
			if(snapshot.child('isNew').val() == true){
				snapshot.ref.update({isNew:false});
			}
			else{
				return;
			}
		}
		else{
			return;
		}
	});
	
 res.sendFile(__dirname+"/main.html");
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
