var express = require('express');
var Parse = require('parse/node').Parse;
//var $ = require('jQuery');
//require("jsdom").jsdom;
Parse.initialize("9mYTpqnzKyp7njDg6Upt0mSheXj6obWbOYgFVPWm", "jj1Z4ZmddMmZPcJ4a9VdY9UAWqrcVZXIUAbmGG0w");



var app = express();
app.use(express.static('public'));
app.use('/css', express.static('/public'));
//app.use(express.static('public/assets/pictures'));
app.use(express.static('public/assets/pictures'));
app.set('views', __dirname + '/public/htmls');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
  res.render('index.html');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

// var TestObject = Parse.Object.extend("TestObject");
//     var testObject = new TestObject();
//     testObject.set('foo','bar8');
//       testObject.save(null, {
//       success: function(object) {
//        console.log('New object created with objectId: ' + testObject.id);
// 		 var query = new Parse.Query(TestObject);
// 		 query.equalTo("foo","bar8");
// 		 query.find({
// 		  success: function(results) {
// 		    console.log("Successfully retrieved " + results.length + " scores.");
// 		    // Do something with the returned Parse.Object values
// 		    for (var i = 0; i < results.length; i++) {
// 		      var object = results[i];
// 		      console.log(object.id + ' - ' + object.get('foo'));
// 		    }
// 		  },
// 		  error: function(error) {
// 		    console.log("Error: " + error.code + " " + error.message);
// 		  }
// 		});
//       },
//       error: function(model, error) {
//        // $(".error").show();
//       }
//  });

//  