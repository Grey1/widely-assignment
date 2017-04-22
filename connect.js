var counter;
  
  var config = {
  apiKey: "AIzaSyBDCmFGoHFseRc7mIsFJdFhgORaWItCiw8",
  authDomain: "dummy-b4c72.firebaseapp.com",
  databaseURL: "https://dummy-b4c72.firebaseio.com/",
  storageBucket: "gs://dummy-b4c72.appspot.com/",
};

firebase.initializeApp(config);

function addToContainer(user){
	$("#user-container").append(
			'<div> UID-: '+user.uid+'</div>'+
			'<div> Node name-: '+user.name+'</div>'
		)
}

var uid1_ref = firebase.database().ref('uid1');
var uid2_ref = firebase.database().ref('uid2');
var Users = function(uid,name,isNew){
	this.uid = uid;
	this.name = name;
	this.isNew = isNew;
}

function resetCounter(){
	if(counter == 2){
		counter = 0;
		$('#loading').hide();
	}
}

uid1_ref.on('child_added', function(snapshot) {
	
	addToContainer(new Users(1,snapshot.val().name,snapshot.val().isNew));
});

uid2_ref.on('child_added', function(snapshot) {
	
	addToContainer(new Users(2,snapshot.val().name,snapshot.val().isNew));
});
var uid1count = firebase.database().ref('uid1Count');
uid1count.on('value',function(snapshot){
	counter = !counter?1:++counter;
	resetCounter();
	window.uid1 = snapshot.val();
		
});		
var uid2count = firebase.database().ref('uid2Count');
uid2count.on('value',function(snapshot){
	counter = !counter?1:++counter
	resetCounter();
	window.uid2 = snapshot.val();
});



$('#submit').on('click',addData);

function checkValidData(data){
	if(data !== undefined && data !== "" && data !== null){
		return true
	}
	else return false;
}

function addData(event) {
	// body...
	
	event.preventDefault();

	var uid = $('#uidData').val();
	if(!checkValidData(uid)){
		alert("uid is mandatory");
		return;
	};

	if(uid!== "uid1" && uid!="uid2"){
		alert("wrong uid");
		return;
	}
	var data = {};
	var userName = $('#userName').val();
	if(!checkValidData(userName)){
		alert("user name is mandatory");
		return;
	}

	data[uid+'/'+window[uid]]= {
			name:userName,
			isNew:true
		}
	data[uid+'Count'] = window[uid]+1;
	
   	firebase.database().ref().update(data);	
}

