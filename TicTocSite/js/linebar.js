d3.json("linePlusBarData.json",function(error,data) {
  nv.addGraph(function() {
      var chart = nv.models.linePlusBarChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
            .tooltips(false)
            //We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
            .x(function(d,i) { return i })
            .y(function(d,i) {return d[1] })
            .color(['#aec7e8', '#FF00FF']);
 
      // returns date
      chart.xAxis
          .tickFormat(function(d) {
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


      // Hack job - Not able to disable y2 axis. This removes y2 axis before returning chart.  
     // d3.select('.nv-y2.nv-axis').remove();

      nv.utils.windowResize(chart.update);

      //chart.y2Axis.scale().domain(chart.y1Axis.scale().domain()); 

      return chart;
  });
 
});