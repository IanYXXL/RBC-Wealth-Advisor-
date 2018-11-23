/**

Author: Zhongshi Xi

provide basic functions for easy manipulation of HTML contents.

Assumption & Dependency:

1. Require JQuery.

**/


/**

Replace a html element with another html element using their ids.

parameters:

idOrigin: string, id representing the html element needs to be replaced.

idNew: string, id representing the new html element that takes the place of the old.

**/
function replaceHTMLByID(idOrigin, idNew){

	$("#"+idOrigin).replaceWith("#"+idNew);

}


/**

Replace a html element with another html element using html code.

parameters:
	idOrigin: string, id representing the html element needs to be replaced.

	newHTML: string, code representing the new html element.

**/

function replaceHTMLWithCode(idOrigin, newHTML){

	$("#"+idOrigin).replaceWith(idNew);
}

/**
compare similarity function 

parameters: 
	userInterest: integer arrary
	advisorAttribute: integer arrary

return:
	similarity integer
**/

function dotproduct(array1, array2) {
    var n = 0; 
    var lim = Math.min(array1.length, array2.length);

    for (var i = 0; i < lim; i++) n += array1[i] * array2[i];
    return n;
 }

function norm2(array) {
    var sumsqr = 0; 
    for (var i = 0; i < array.length; i++) sumsqr += array[i]*array[i];
    return Math.sqrt(sumsqr);
}

function similarity(userInterest,advisorAttribute) 
{
    var similarity = dotproduct(userInterest,advisorAttribute) / norm2(userInterest) / norm2(advisorAttribute);
    return similarity;
}


/**
location, assets and specialty compare.

parameters: 
	userInterest: integer arrary
	advisorAttribute: integer attribute

return:
	order of advistors
 
**/

























