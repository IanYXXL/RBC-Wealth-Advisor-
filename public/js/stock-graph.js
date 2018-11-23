var margin = {top: 20, right: 30, bottom: 30, left: 50},

    width = 960 - margin.left - margin.right,

    height = 500 - margin.top - margin.bottom,

    padding = 0.05;



var x = d3.scale.ordinal()

    .rangeRoundBands([0, width], padding);



var y = d3.scale.linear()

    .range([height, 0]);





var xAxis = d3.svg.axis()

    .scale(x)

    .orient("bottom");



var yAxis = d3.svg.axis()

    .scale(y)

    .orient("left")

    .tickFormat(function(d) { return dollarFormatter(d); });



var chart2 = d3.select(".chart")

    .attr("width", width + margin.left + margin.right)

    .attr("height", height + margin.top + margin.bottom)

  .append("g")

    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//rym


var data1

//d3.csv("data.csv", type, function(error, data) {



  // Transform data (i.e., finding cumulative values and total) for easier chart2ing

  var start = 4000000;

  var cumulative = 400000;

  /*

  for (var i = 0; i < data.length; i++) {

    data[i].start = cumulative;

    cumulative += data[i].value/10;

    data[i].end = cumulative;



    data[i].class = ( data[i].value >= 0 ) ? 'positive' : 'negative'

  }

  

  data.push({

    name: 'Revenue',

    end: cumulative,

    start: 0,

    class: 'total'

  });

*/



var data = [{"name":"2015-03","value":50000,"start":400000,"end":405000,"class":"positive"}
,{"name":"2015-04","value":80000,"start":405000,"end":413000,"class":"positive"}
,{"name":"2015-05","value":-20000,"start":413000,"end":411000,"class":"negative"}
,{"name":"2015-06","value":110000,"start":411000,"end":422000,"class":"positive"}
,{"name":"2015-07","value":-40000,"start":422000,"end":418000,"class":"negative"}
,{"name":"2015-08","value":100000,"start":418000,"end":428000,"class":"positive"}
,{"name":"2015-09","value":-90000,"start":428000,"end":419000,"class":"negative"}
,{"name":"2015-10","value":20000,"start":419000,"end":421000,"class":"positive"}
,{"name":"2015-11","value":60000,"start":421000,"end":427000,"class":"positive"}
,{"name":"2015-12","value":40000,"start":427000,"end":431000,"class":"positive"}
,{"name":"2016-01","value":-10000,"start":431000,"end":430000,"class":"negative"}
,{"name":"2016-02","value":140000,"start":430000,"end":444000,"class":"positive"}
,{"name":"2016-03","value":120000,"start":444000,"end":456000,"class":"positive"}
,{"name":"2016-04","value":-100000,"start":456000,"end":446000,"class":"negative"}
,{"name":"2016-05","value":230000,"start":446000,"end":469000,"class":"positive"}
,{"name":"2016-06","value":-130000,"start":469000,"end":456000,"class":"negative"}
,{"name":"2016-07","value":70000,"start":456000,"end":463000,"class":"positive"}
,{"name":"2016-08","value":60000,"start":463000,"end":469000,"class":"positive"}
,{"name":"2016-09","value":-20000,"start":469000,"end":467000,"class":"negative"}
,{"name":"2016-10","value":90000,"start":467000,"end":476000,"class":"positive"}];





  x.domain(data.map(function(d) { return d.name; }));

  y.domain([d3.max(data, function(d) { return d.end; })*0.75, d3.max(data, function(d) { return d.end; })]);



  chart2.append("g")

      .attr("class", "x axis")

      .attr("transform", "translate(0," + height + ")")

      .call(xAxis);



  chart2.append("g")

      .attr("class", "y axis")

      .call(yAxis);



  var bar = chart2.selectAll(".bar")

      .data(data)

    .enter().append("g")

      .attr("class", function(d) { return "bar " + d.class })

      .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });



  bar.append("rect")

      .attr("y", function(d) { return y( Math.max(d.start, d.end) ); })

      .attr("height", function(d) { return Math.abs( y(d.start) - y(d.end) ); })

      .attr("width", x.rangeBand());



  bar.append("text")

      .attr("x", x.rangeBand() / 2)

      .attr("y", function(d) { return (d.class=='negative')?(y(d.start) + 5):(y(d.end) - 15); })

      .attr("dy", function(d) { return ((d.class=='negative') ? '-' : '') + ".75em" })

      .text(function(d) { return dollarFormatter(d.end - d.start);});



  bar.filter(function(d) { return d.class != "total" }).append("line")

      .attr("class", "connector")

      .attr("x1", x.rangeBand() + 5 )

      .attr("y1", function(d) { return y(d.end) } )

      .attr("x2", x.rangeBand() / ( 1 - padding) - 5 )

      .attr("y2", function(d) { return y(d.end) } );



  var line = chart2.append("line")

      .attr("x1",355)

      .attr("x2",355)

      .attr("y1",margin.top)

      .attr("y2",500 - margin.top - margin.bottom)

      .attr("stroke-width",4)

      .attr("stroke","blue");

  chart2.append("text")

      .attr("x", 365)

      .attr("y", 100)
      .attr("stroke","blue")

      .text(function(d) { return "Nov 22"});



      

//});



function type(d) {

  d.value = +d.value;

  return d;

}



function dollarFormatter(n) {

  n = Math.round(n);

  var result = n;

  if (Math.abs(n) > 1000) {

    result = Math.round(n/1000) + 'K';

  }

  return '$' + result;

}


//chart 2





var chart2 = d3.select(".chart2")

    .attr("width", width + margin.left + margin.right)

    .attr("height", height + margin.top + margin.bottom)

  .append("g")

    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



var data1

//d3.csv("data1.csv", type, function(error, data1) {



  // Transform data1 (i.e., finding cumulative values and total) for easier chart2ing

  var start = 4000000;

  var cumulative = 400000;

  var data1=[{"name":"2015-03","value":30000,"start":400000,"end":403000,"class":"positive"},{"name":"2015-04","value":30000,"start":403000,"end":406000,"class":"positive"},{"name":"2015-05","value":-50000,"start":406000,"end":401000,"class":"negative"},{"name":"2015-06","value":10000,"start":401000,"end":402000,"class":"positive"},{"name":"2015-07","value":40000,"start":402000,"end":406000,"class":"positive"},{"name":"2015-08","value":10000,"start":406000,"end":407000,"class":"positive"},{"name":"2015-09","value":-10000,"start":407000,"end":406000,"class":"negative"},{"name":"2015-10","value":20000,"start":406000,"end":408000,"class":"positive"},{"name":"2015-11","value":60000,"start":408000,"end":414000,"class":"positive"},{"name":"2015-12","value":40000,"start":414000,"end":418000,"class":"positive"},{"name":"2016-01","value":-10000,"start":418000,"end":417000,"class":"negative"},{"name":"2016-02","value":40000,"start":417000,"end":421000,"class":"positive"},{"name":"2016-03","value":20000,"start":421000,"end":423000,"class":"positive"},{"name":"2016-04","value":-10000,"start":423000,"end":422000,"class":"negative"},{"name":"2016-05","value":30000,"start":422000,"end":425000,"class":"positive"},{"name":"2016-06","value":-30000,"start":425000,"end":422000,"class":"negative"},{"name":"2016-07","value":70000,"start":422000,"end":429000,"class":"positive"},{"name":"2016-08","value":60000,"start":429000,"end":435000,"class":"positive"},{"name":"2016-09","value":-20000,"start":435000,"end":433000,"class":"negative"},{"name":"2016-10","value":30000,"start":433000,"end":436000,"class":"positive"}];


  x.domain(data1.map(function(d) { return d.name; }));

  y.domain([d3.max(data1, function(d) { return d.end; })*0.85, d3.max(data1, function(d) { return d.end; })]);



  chart2.append("g")

      .attr("class", "x axis")

      .attr("transform", "translate(0," + height + ")")

      .call(xAxis);



  chart2.append("g")

      .attr("class", "y axis")

      .call(yAxis);



  var bar2 = chart2.selectAll(".bar")

      .data(data1)

    .enter().append("g")

      .attr("class", function(d) { return "bar " + d.class })

      .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });



  bar2.append("rect")

      .attr("y", function(d) { return y( Math.max(d.start, d.end) ); })

      .attr("height", function(d) { return Math.abs( y(d.start) - y(d.end) ); })

      .attr("width", x.rangeBand());



  bar2.append("text")

      .attr("x", x.rangeBand() / 2)

      .attr("y", function(d) { return (d.class=='negative')?(y(d.start) + 5):(y(d.end) - 15); })

      .attr("dy", function(d) { return ((d.class=='negative') ? '-' : '') + ".75em" })

      .text(function(d) { return dollarFormatter(d.end - d.start);});



  bar2.filter(function(d) { return d.class != "total" }).append("line")

      .attr("class", "connector")

      .attr("x1", x.rangeBand() + 5 )

      .attr("y1", function(d) { return y(d.end) } )

      .attr("x2", x.rangeBand() / ( 1 - padding) - 5 )

      .attr("y2", function(d) { return y(d.end) } );



  var line2 = chart2.append("line")

      .attr("x1",355)

      .attr("x2",355)

      .attr("y1",margin.top)

      .attr("y2",500 - margin.top - margin.bottom)

      .attr("stroke-width",3)

      .attr("stroke","blue");

  chart2.append("text")

      .attr("x", 365)

      .attr("y", 300)
       .attr("stroke", "blue")


      .text(function(d) { return "Nov 22"});



      

//});



//chart 3

var chart3 = d3.select(".chart3")

    .attr("width", width + margin.left + margin.right)

    .attr("height", height + margin.top + margin.bottom)

  .append("g")

    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



var data2

//d3.csv("data1.csv", type, function(error, data1) {



  // Transform data1 (i.e., finding cumulative values and total) for easier chart2ing

  var start = 4000000;

  var cumulative = 400000;

  var data2=[{"name":"2015-03","value":20000,"start":400000,"end":402000,"class":"positive"},{"name":"2015-04","value":20000,"start":402000,"end":404000,"class":"positive"},{"name":"2015-05","value":-10000,"start":404000,"end":403000,"class":"negative"},{"name":"2015-06","value":10000,"start":403000,"end":404000,"class":"positive"},{"name":"2015-07","value":20000,"start":404000,"end":406000,"class":"positive"},{"name":"2015-08","value":30000,"start":406000,"end":409000,"class":"positive"},{"name":"2015-09","value":-10000,"start":409000,"end":408000,"class":"negative"},{"name":"2015-10","value":20000,"start":408000,"end":410000,"class":"positive"},{"name":"2015-11","value":20000,"start":410000,"end":412000,"class":"positive"},{"name":"2015-12","value":10000,"start":412000,"end":413000,"class":"positive"},{"name":"2016-01","value":-10000,"start":413000,"end":412000,"class":"negative"},{"name":"2016-02","value":20000,"start":412000,"end":414000,"class":"positive"},{"name":"2016-03","value":20000,"start":414000,"end":416000,"class":"positive"},{"name":"2016-04","value":-10000,"start":416000,"end":415000,"class":"negative"},{"name":"2016-05","value":10000,"start":415000,"end":416000,"class":"positive"},{"name":"2016-06","value":10000,"start":416000,"end":417000,"class":"positive"},{"name":"2016-07","value":20000,"start":417000,"end":419000,"class":"positive"},{"name":"2016-08","value":20000,"start":419000,"end":421000,"class":"positive"},{"name":"2016-09","value":-10000,"start":421000,"end":420000,"class":"negative"},{"name":"2016-10","value":20000,"start":420000,"end":422000,"class":"positive"}];
  /*

  for (var i = 0; i < data1.length; i++) {

    data1[i].start = cumulative;

    cumulative += data1[i].value/10;

    data1[i].end = cumulative;



    data1[i].class = ( data1[i].value >= 0 ) ? 'positive' : 'negative'

  }

  

  data1.push({

    name: 'Revenue',

    end: cumulative,

    start: 0,

    class: 'total'

  });

*/





  x.domain(data2.map(function(d) { return d.name; }));

  y.domain([d3.max(data2, function(d) { return d.end; })*0.90, d3.max(data2, function(d) { return d.end; })]);



  chart3.append("g")

      .attr("class", "x axis")

      .attr("transform", "translate(0," + height + ")")

      .call(xAxis);



  chart3.append("g")

      .attr("class", "y axis")

      .call(yAxis);



  var bar3 = chart3.selectAll(".bar")

      .data(data2)

    .enter().append("g")

      .attr("class", function(d) { return "bar " + d.class })

      .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });



  bar3.append("rect")

      .attr("y", function(d) { return y( Math.max(d.start, d.end) ); })

      .attr("height", function(d) { return Math.abs( y(d.start) - y(d.end) ); })

      .attr("width", x.rangeBand());



  bar3.append("text")

      .attr("x", x.rangeBand() / 2)

      .attr("y", function(d) { return (d.class=='negative')?(y(d.start) + 5):(y(d.end) - 15); })

      .attr("dy", function(d) { return ((d.class=='negative') ? '-' : '') + ".75em" })

      .text(function(d) { return dollarFormatter(d.end - d.start);});



  bar3.filter(function(d) { return d.class != "total" }).append("line")

      .attr("class", "connector")

      .attr("x1", x.rangeBand() + 5 )

      .attr("y1", function(d) { return y(d.end) } )

      .attr("x2", x.rangeBand() / ( 1 - padding) - 5 )

      .attr("y2", function(d) { return y(d.end) } );



  var line3 = chart3.append("line")

      .attr("x1",355)

      .attr("x2",355)

      .attr("y1",margin.top)

      .attr("y2",500 - margin.top - margin.bottom)

      .attr("stroke-width",3)

      .attr("stroke","blue");

  chart3.append("text")

      .attr("x", 365)

      .attr("y", 300)
       .attr("stroke", "blue")


      .text(function(d) { return "Nov 22"});


