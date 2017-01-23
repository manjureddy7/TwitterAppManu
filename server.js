//1. used for installing express on nodejs
var express=require('express');



var MongoClient=require('mongodb').MongoClient;
var ObjectId=require('mongodb').ObjectId;
var mongojs = require('mongojs');
var db = mongojs('anunirva', ['details','users']);

var bodyParser=require('body-parser');
var bcrypt=require('bcryptjs');
var jwt=require('jwt-simple');

//2.app uses express now
var app=express();

var path=require('path');
var JWT_SECRET='explosion';


MongoClient.connect("mongodb://localhost:27017/anunirva",function(err,dbconn){
	if(!err){
		console.log("we are connected to db");
		db=dbconn;
	}
});

//3.the file should be in static folder in order to run
app.use(express.static('public'));

app.use(bodyParser.json());






app.get('/detail',function(req, res, next){

	db.collection('details',function(err,detailsCollection){
		detailsCollection.find().toArray(function(err,details){
			// console.log(details);
			return res.json(details);
		})
	});
	
});

app.post('/detail',function(req, res, next){

	var token=req.headers.authorization;
	var user=jwt.decode(token,JWT_SECRET);
	

	db.collection('details',function(err,detailsCollection){

		var newalert={
			text:req.body.newalert,
			user:user._id,
			username:user.username
		};

		detailsCollection.insert(newalert,{w:1},function(err){
			
			return res.send();
		})
	});
	
});


app.put('/detail/remove',function(req, res, next){

	var token=req.headers.authorization;
	var user=jwt.decode(token,JWT_SECRET);

	db.collection('details',function(err,detailsCollection){

		var myId=req.body.x._id;
		// console.log(myId);

		detailsCollection.remove({_id:ObjectId(myId),user:user._id},{w:1},function(err){
			
			return res.send();
		})
		
	});
	
});



app.post('/users',function(req, res, next){



	db.collection('users',function(err,usersCollection){
		
		bcrypt.genSalt(10,function(err,salt){
			bcrypt.hash(req.body.password,salt,function(err,hash){
				var newUser={
			username:req.body.username,
			password:hash
		};
		usersCollection.insert(newUser,{w:1},function(err){
			// console.log(req.body);
			return res.send();
		});
			});
		});
		
	});
	
});



app.put('/users/signin',function(req, res, next){



	db.collection('users',function(err,usersCollection){

		usersCollection.findOne({username:req.body.username},function(err,user){
			bcrypt.compare(req.body.password,user.password,function(err,result){
				if(result){
					var token=jwt.encode(user,JWT_SECRET);
					return res.json({token:token});
				}
				else{
					return res.status(400).send();
				}
			})
		})
		
		
	});
	
});

	
app.put('/edit',function(req, res, next){

	db.collection('details',function(err,detailsCollection){

		var myId=req.body.x._id;
		// var text=req.body.x.text;
		var mydata=req.body.x;
	
		// console.log(mydata);

		detailsCollection.findOne({_id:ObjectId(myId)},function(err,docs){
			
		res.json(docs);
		})
		
	});
	
});



app.post('/update',function(req,res){
		
			console.log(req.body);
			
db.collection('details',function(err,detailsCollection){
		console.log("1gfsdg");
		// detailsCollection.update(

		// 					{ _id: req.body._id },
		// 		   { $set:
		// 		      {
		// 		       text:req.body.text
		// 		      }
		// 		   },
		// 		   { upsert: true,multi: true,},
		// 		   { sort: { rating: 1 }}
		// 		)
		// console.log(docs);
		detailsCollection.update(
					    { _id: req.body._id },
					    {
					      $set: {" text":req.body.text }
					    }
					)
			
		 

		    

          });

		
		
		}); 
		
		


// 4.used for port number and to run on it
app.listen(3000,function(){
	console.log("Welcome to _anunirva!!! on 3000");
});
