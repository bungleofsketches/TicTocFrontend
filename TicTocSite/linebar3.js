d3.json("data.json",function(error,data) {
  nv.addGraph(function() {  
  var chart = nv.models.discreteBarChart()
      .margin({top: 30, right: 60, bottom: 50, left: 70})
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .staggerLabels(false)
      //.staggerLabels(historicalBarChart[0].values.length > 8)
      .tooltips(false)
      .showValues(true)
      .transitionDuration(250)
      ;

  d3.select('#chart1 svg')
      .datum(data)
      .call(chart);

  nv.utils.windowResize(chart.update);

  return chart;
});
 
});

d3.json("linePlusBarData.json",function(error,data) {
  nv.addGraph(function() {
      var chart = nv.models.linePlusBarChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
            .tooltips(false) // turns off tooltips 
            //We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
            .x(function(d,i) { return i })
            .y(function(d,i) {return d[1] })
            .color(['#aec7e8', '#FF00FF'])
            ;
 
      chart.xAxis.tickFormat(function(d) {
        var dx = data[0].values[d] && data[0].values[d][0] || 0;
        return d3.time.format('%x')(new Date(dx))
      });
 
      chart.y1Axis
          .tickFormat(d3.format(',f'));
 
      chart.y2Axis
          .tickFormat(function(d) { return '$' + d3.format(',f')(d) });

      chart.bars.forceY([0]);
      chart.lines.forceY([0]);

      d3.select('#chart svg')
        .datum(data)
        .transition()
        .duration(0)
        .call(chart);

      nv.utils.windowResize(chart.update);

      // Hack job - This hides y2 axis but does not alter any data, scale, etc..  
      //d3.select('.nv-y2.nv-axis').remove();

      //chart.y2Axis.scale(chart.y1Axis.scale());

      return chart;
  });
 
});
