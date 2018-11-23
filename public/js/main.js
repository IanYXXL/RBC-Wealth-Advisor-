


"use strict";


/***********************************************


 main.js is dependent on jquery, jquery-ui, j


************************************************/


/******

---------------------------------------------------------
|															
|		Misc
|
|		contains misc variables that are globally shared by other module.
|
|
---------------------------------------------------------

Author: Zhongshi Xi

******/

//time in milliseconds for fade in and out of html elements.
var fadeTime = 200;


//state of our page
var STATE = {

	SIGNIN : 0,
	MAIN : 1,

};


//navigation items in the banner
var navAbout = $("#about-nav");
var navTryit = $("#tryit-nav");
var navLogIn = $("#login-nav");
var navSearch = $("#search-nav");
var navChat = $("#chat-nav");
var navWealth = $("#wealth-nav");
var navAccount = $("#account-nav");
var navLogOut = $("#logout-nav");


//page items 
var pageLogIn = $("#login-page");
var pageAbout = $("#about-page");
var pageTryit = $("#tryit-page");
var pageSurvey = $("#survey-page");
var pageSearch = $("#search-page");
var pageChat = $("#chat-page");
var pageAccount = $("#account-page");

var HTMLAdvisorList = $("#advisor-list");

var HTMLProfile = $("#advisor-profile");
var HTMLProfileName = $("#profile-name");
var HTMLProfileImg =  $("#profile-img");
var HTMLProfileWorkId = $("#profile-work-id");
var HTMLProfileLocation = $("#profile-location");
var HTMLProfileEmail = $("#profile-email");
var HTMLProfilePhone = $("#profile-phone");
var HTMLProfileDescription = $("#profile-description");
var HTMLSearchList =  $("#search-list");


HTMLProfile.hide();
HTMLSearchList.hide();



var advisorList;


//Query keys for advisor
var keyAgree= "agreeableness";
var keyAssetLvl = "assetLevel";
var keyCons = "conscientiousness";
var keyDes = "description";
var keyEmail = "email";
var keyEmo = "emotionalRange";
var keyExtra = "extraversion";
var keyFirstName = "firstName";
var keyLastName = "lastName";
var keyLocation = "location";
var keyOpenness = "openness";
var keyPhone = "phone";
var keyProfilePic = "profilePic";
var keySpecialty =  "specialty";
var keyWorkId = "workId";


var app = angular.module('rbcapp', ['ui.radialplot']);
app.controller('radialPlotCtrl', function($scope) {

	$scope.dataset_a =  [ 
                                { id: 0 , name: "Openness" , value: 0},
                                { id: 1 , name: "Conscientiousness" , value: 0 },
                                { id: 2 , name: "Extraversion" , value: 0},
                                { id: 3 , name: "Agreeableness" , value: 0 },
                                { id: 4 , name: "Emotional range" , value: 0 },
                                
                        	];

    $scope.dataset_b =  [ 
                                { id: 0 , name: "Openness" , value: 0 },
                                { id: 1 , name: "Conscientiousness" , value: 0},
                                { id: 2 , name: "Extraversion" , value: 0 },
                                { id: 3 , name: "Agreeableness" , value: 0 },
                                { id: 4 , name: "Emotional range" , value: 0 },
                        ];


});

/**
 class Advisor
	
 to create instance of class, using new keywoard.

 parameters:
 
 first_name: string, first name of advisor.
 last_name: string. last name of advisor.
 work_id: string, working id of advisor.
 pro_pic: string, url to the picture.
 des: string, description of advisor.
 email: string, email address.
 phone: string, phone number.
 loc: string, location of advisor.
 intst: string, speciality of advisor.
 ass_lvl: string, assets level that advisor deals with.
 po: integer, personality openness.
 pc: integer, personality conscientiousness.
 pex: integer, personality extraversion.
 pa: integer, agreeableness.
 pemo: integer, motion range.
**/
function Advisor(first_name, last_name, work_id, pro_pic, des, email, phone, loc, intst, asset_lvl, po, pc, pex, pa, pemo){

	this.firstName = first_name;
	this.lastName = last_name;
	this.workId = work_id;
	this.proPic = pro_pic;
	this.des = des;
	this.email = email;
	this.phone = phone;
	this.loc = loc;
	this.intst = intst;
	this.asset_lvl = asset_lvl;

	this.po = po;
	this.pc = pc;
	this.pex = pex;
	this.pa = pa;
	this.pemo =pemo;
	

	//float number
	this.sim = null;


	//array of personalities
	this.personalities = [this.po, this.pc, this.pex, this.pa, this.pemo];

}

 
var sampleAdvisor = new Advisor("x", "b","1111", 
	"../assets/pictures/superman.jpg", "aaaa", "a@gmail.com",
	"999-888-8888","AL", "realestate","level2",20,30,40,50,60
	);




/******

---------------------------------------------------------
|															
|		Log In
|
|		JavaScript for log-in seciton of page
|
|		
|
---------------------------------------------------------

Author: Zhongshi Xi

******/

/* parse init */
Parse.initialize("9mYTpqnzKyp7njDg6Upt0mSheXj6obWbOYgFVPWm", "jj1Z4ZmddMmZPcJ4a9VdY9UAWqrcVZXIUAbmGG0w");

var inputUsername = $("#username");
var inputPassword = $("#password");

var user;

//click listener when log-in button is clicked.
$("#login-btn").click(function(){

	var username = inputUsername.val();
	var password = inputPassword.val();

	console.log(username +'-' + password);
	Parse.User.logIn(username, password, {
	  success: function(userC) {
	    // Do stuff after successful login.
	    user = userC;
	    console.log("logged in");
	  },
	  error: function(userC, error) {
	  	console.log("error loggin");
	    // The login failed. Check error to see why.
	  }
	});
});








/******

---------------------------------------------------------
|															
|		Search
|
|		JavaScript section for search page section
|
|
---------------------------------------------------------

Author: Zhongshi Xi

******/


var optionLocation = $( "#province-option" );
var optionInterest = $( "#speciality-option");
var optionAssets = $("#assets-option");



//slider bar variables
var sliderOpeness = $("#slider-openness");
var sliderOpenessVal = $("#slider-openness-val");

var sliderCons = $("#slider-cons");
var sliderConsVal = $("#slider-cons-val");

var sliderExtra = $("#slider-extra");
var sliderExtraVal = $("#slider-extra-val");

var sliderAgree = $("#slider-agree");
var sliderAgreeVal = $("#slider-agree-val");

var sliderEmotion = $("#slider-emotion");
var sliderEmotionVal = $("#slider-emotion-val");



//Initialize search section page, add slide bar.
function initSliderBar(sliderHTML, valueHTML){

	valueHTML.html(50);
 	sliderHTML.slider({
       value:50,
       min: 0,
       max: 100,
       step: 1,
       slide: function( event, ui ) {
          valueHTML.html( ui.value );
       }
   });

}

/* saving to user profile */
// var User =  Parse.Object.extend("User");
// var user = new User();
// 	user.

//var user = new Parse.User();
// user.set("username", "my name1");
// user.set("password", "my pass");
// user.set("email", "email1@example.com");


// other fields can be set just like with Parse.Object

initSliderBar(sliderOpeness, sliderOpenessVal);
initSliderBar(sliderCons, sliderConsVal);
initSliderBar(sliderExtra, sliderExtraVal);
initSliderBar(sliderAgree, sliderAgreeVal);
initSliderBar(sliderEmotion, sliderEmotionVal);

//Add event listener when the personality button is clicked.
//The function should submit values of personality to the server, wait for server
//to respond and then generates the a list of advisors
//Invoke function constructAdvisorListItem to display a single advisor list item.
$("#search-btn").click(function(){

	var location = optionLocation.children("option:selected").val();
	var interest = optionInterest.children("option:selected").val();
	var assetLvl = optionAssets.children("option:selected").val();


	var openness = parseInt(sliderOpenessVal.html());
	var cons = parseInt(sliderConsVal.html());
	var extra = parseInt(sliderExtraVal.html());
	var agree = parseInt(sliderAgreeVal.html());
	var emot = parseInt(sliderEmotionVal.html());


	//console.log(location + " " + interest + " " + assetLvl);

	//using the sample advisor, replace with queryAdvisor();
	//console.log(advisorList);
	queryAdvisor(openness, cons, extra, agree, emot, location, interest, assetLvl);
	//console.log(advisorList);

	

	//saveUserPref();

});


function constructAdvisorList(query_advisors){

	advisorList=[];

	HTMLAdvisorList.empty();


	var location = optionLocation.children("option:selected").val();
	var interest = optionInterest.children("option:selected").val();
	var assetLvl = optionAssets.children("option:selected").val();


	var openness = parseInt(sliderOpenessVal.html());
	var cons = parseInt(sliderConsVal.html());
	var extra = parseInt(sliderExtraVal.html());
	var agree = parseInt(sliderAgreeVal.html());
	var emot = parseInt(sliderEmotionVal.html());



	for (var i = 0; i < query_advisors.length; i++){

		var queryAdvisor = query_advisors[i];

		var queryURL = queryAdvisor.get(keyProfilePic);
		var url;

		if (queryURL){

			url = queryURL.url();

		}else{

			url = "http://placehold.it/240x240";

		}

		advisorList.push( new Advisor (

		queryAdvisor.get(keyFirstName),
		queryAdvisor.get(keyLastName),
		queryAdvisor.get(keyWorkId),
		url,
		queryAdvisor.get(keyDes),
		queryAdvisor.get(keyEmail),
		queryAdvisor.get(keyPhone),
		queryAdvisor.get(keyLocation),
		queryAdvisor.get(keySpecialty),
		queryAdvisor.get(keyAssetLvl),
		queryAdvisor.get(keyOpenness),
		queryAdvisor.get(keyCons),
		queryAdvisor.get(keyExtra),
		queryAdvisor.get(keyAgree),
		queryAdvisor.get(keyEmo)
		));


	}
	HTMLAdvisorList.show();
	HTMLSearchList.show();
	if (advisorList.length == 0){

		HTMLAdvisorList.text("Sorry, no search result match");


	}else{

		var expPersonalities = [openness, cons, extra, agree, emot];

		for (var i = 0; i <  advisorList.length; i++){

			var advisor = advisorList[i];

			//replace i with similarity function
			advisor.sim = similarity(expPersonalities, advisor.personalities) * 100;

		}

		advisorList.sort(function(a,b){

			if (a.sim < b.sim)
				return 1;

			if (a.sim > b.sim)
				return -1;

			return 0;
			
		});

		for (var i = 0; i < advisorList.length; i++){

			var advisor = advisorList[i];
			constructAdvisorListItem(HTMLAdvisorList,advisor);

		}

		var HTMLAdvisorItem = HTMLAdvisorList.children().click(function(){

			var index = $(this).index();
			var advisor = advisorList[index];

			createAdvisorProfile([openness, cons, extra, agree, emot], advisor);
			createComparisonDiagram([openness, cons, extra, agree, emot], advisor.personalities);

		});
		

	}


}

/**

 expPersonalties: array contains five variables: openness, cons, extra, agree, emot.
 advisorPersonalities: array contains five variables: openness, cons, extra, agree, emot.

**/
function createComparisonDiagram(expPersonalities, advisorPersonalities){

	
	var scope = angular.element('body').scope();


	for ( var i = 0 ; i < scope.dataset_a.length ; i++){

		scope.dataset_b[i].value = expPersonalities[i];
		scope.dataset_a[i].value = advisorPersonalities[i];

	}
	
	
	scope.$digest();
		
		
}

function createAdvisorProfile(expPersonalities, advisor){

	HTMLProfileName.html(advisor.firstName + " " + advisor.lastName);
	HTMLProfilePhone.html(advisor.phone);
	HTMLProfileEmail.html(advisor.email);
	HTMLProfileLocation.html(advisor.loc);
	HTMLProfileImg.attr('src', advisor.proPic);
	if(advisor.des){
		HTMLProfileDescription.html(advisor.des);
	
	}else{
		HTMLProfileDescription.html("No description yet");
	}
	HTMLProfileWorkId.html(advisor.workId);
	HTMLProfile.fadeIn(300);
	console.log(advisor.personalities);
	



}



/**
Function that saves user pref to _User

**/
function saveUserPref(user){
	user.set("openness", sliderOpenessVal.html());
	user.set("conscientiousness",sliderConsVal.html());
	user.set("extraversion",sliderExtraVal.html());
	user.set("agreeableness",sliderAgreeVal.html());
	user.set("emotionalRange",sliderEmotionVal.html());

	user.save(null, {
	  success: function(user) {
	    console.log("saved!");
	  },
	  error: function(user, error) {
	   	HTMLAdvisorList.text("connection error: " + error.message);
	    console.log("Error: " + error.code + " " + error.message);
	  }
	});

}

/**
Query advisor info based on user pref and survey results
(int) po: openness
(int) pc: conscientiousness
(int) pex: extraversion
(int) pa: agreeableness
(int) pemo: emo range
(string) loc: province location of the client
(string) intst: area of interest of the client
(string) ass: assets of the client
**/

function queryAdvisor(po, pc, pex, pa, pemo, loc, intst, ass){
	var Advisor = Parse.Object.extend("Advisor");
	var query = new Parse.Query(Advisor);
	
	query.equalTo("assetLevel", ass);
	query.equalTo("location", loc);
	query.equalTo("specialty", intst);
	query.find({
		success: function(advisors) {
			
			constructAdvisorList(advisors);
	
		},
		error: function(error) {
		    console.log("Error: " + error.code + " " + error.message);
		}
	});

	
}








/**

Function that dynamically constructs the list item of advisor and attachs the item to html element denoted by
a jquery object.

parameters:

jquery_ele: a jquery object rerpresenting an HTML element.

advisor: a Advisor Object.

return:

a JQuery object representing the constructed single item of advisor list.

**/
function constructAdvisorListItem(jquery_ele, advisor){

	var advisorListItemBuilder = '<div class = "btn btn-default btn-primary btn-wide btn-info advisor-list-item col-xs-10 col-xs-offset-1 col-sm-offset-2 col-sm-8">'+
			                    	'<div class = "img-wrapper col-xs-6 max-size-240 horizontal-middle">'+
			                        	'<img class = "img-responsive" src = "%imgsrc%">'+
			                    	'</div>'+
			                    	'<div class = "col-xs-6 ">'+
			                        	'<p>Name: <span class = "advisor-name">%name%</span></p>'+
			                        	'<p>Work ID: <span class = "advisor-work-id">%workId%</span></p>'+
			                        	'<p>Similarity: <span class = "advisor-similarity">%sim%</span></p>'+
			                    	'</div>'+
			                    '</div>'




	var jqueryObj = $('<div/>').html(advisorListItemBuilder.
					replace("%imgsrc%", advisor.proPic).
					replace("%name%",advisor.firstName + " " + advisor.lastName).
					replace("%workId%", advisor.workId).
					replace("%sim%", Math.round(advisor.sim)+ "%")).contents();


	
	//console.log(jqueryObj);
	//jqueryObj.click(callback(advisor));

	jquery_ele.append(jqueryObj);

	

}

/**
account section JavaScrip file
**/

function HiddenControl(from, to){
    document.getElementById(from).style.display = "none";
    document.getElementById(to).style.display = "block";
    
}




