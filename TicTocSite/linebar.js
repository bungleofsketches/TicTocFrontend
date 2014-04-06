function redraw(input){
  alert("Testing button.\nThis button will be used for an API call.");
  //drawG(input);
  /*var a = document.createElement('a');
  var linkText = document.createTextNode("Refresh page.\n");
  a.appendChild(linkText);
  a.title = "Click me.";
  a.href = "http://mjacob.netsoc.ie/WebApp/";
  document.body.appendChild(a);*/

  /*var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://tictocplatforms.apiary-mock.com/ctclips");
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      alert('Status: '+this.status+'\nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'\nBody: '+this.responseText);
    }
  };
xhr.send(null);*/
}

function drawG1(){
  alert("drawG1() reached.\n");
}

/*function drawG(input){
  var input1 = input;
  if(input1==null)
  {
    input1 = '%x';
  } */

d3.json("linePlusBarData2.json",function(error,data) {
  d3.json("data.json",function(error,data2) {

    var newData = d3.nest()
    .key(function(d,i){ return d.id; })
    .entries(data);
    
    newData[0]['bar']=true;
    

    var newData2 = d3.nest()
    .key(function(d,i){ return d.id; })
    .entries(data2);
    newData.push(newData2[0]);

    newData[0]['key']= "Your Data"; 
    newData[1]['key']= "Average Data"; 

  nv.addGraph(function() {
      var date1 = new Date();
      var chart = nv.models.linePlusBarChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
            .tooltips(true) 
            .showLegend(false)
            .x(function(d){
                return new Date(d.timestamp);
                //convert the string to a date object
            })
            .y(function(d,i) {return d.value })
            .color(['#aec7e8', '#FFD700'])
            ;

     chart.xAxis
       .tickFormat(function(d) {
           //return d3.time.format.utc('%x')(new Date(d) ); // time as month/day/year
           return d3.time.format.utc('%X')(new Date(d) ); // time as Hour/Min/Sec
       });
 
      chart.y1Axis
          .tickFormat(d3.format(',f'));
 
      chart.y2Axis
          .tickFormat(d3.format(',f'));

      chart.bars.forceY([0, 20000]);
      chart.lines.forceY([0, 20000]);

      d3.select('#chart1 svg')
        .datum(newData)
        .transition()
        .duration(0)
        .call(chart);

      nv.utils.windowResize(chart.update);

      // Hack job - This hides y2 axis but does not alter any data, scale, etc..  
      d3.select('.nv-y2.nv-axis').remove();

      //chart.y2Axis.scale(chart.y1Axis.scale());

      return chart;
  });
}); 
}); 

//// The below code changes the timestamp format for compatibility with NVD3.

Date.prototype.setISO8601 = function(dString){
 
var regexp = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)(:)?(\d\d)(\.\d+)?(Z|([+-])(\d\d)(:)?(\d\d))/;
 
if (dString.toString().match(new RegExp(regexp))) {
var d = dString.match(new RegExp(regexp));
var offset = 0;
 
this.setUTCDate(1);
this.setUTCFullYear(parseInt(d[1],10));
this.setUTCMonth(parseInt(d[3],10) - 1);
this.setUTCDate(parseInt(d[5],10));
this.setUTCHours(parseInt(d[7],10));
this.setUTCMinutes(parseInt(d[9],10));
this.setUTCSeconds(parseInt(d[11],10));
if (d[12])
this.setUTCMilliseconds(parseFloat(d[12]) * 1000);
else
this.setUTCMilliseconds(0);
if (d[13] != 'Z') {
offset = (d[15] * 60) + parseInt(d[17],10);
offset *= ((d[14] == '-') ? -1 : 1);
this.setTime(this.getTime() - offset * 60 * 1000);
}
}
else {
this.setTime(Date.parse(dString));
}
return this;
};