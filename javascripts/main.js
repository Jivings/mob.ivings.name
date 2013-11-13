!function (d3, _) {

  var container = d3.select("#skills");

  var render = function(err, cv) {
    var skills, qualifications;
    skills        = cv.skills;
    qualiications = cv.qualiications;

    _.each(skills, renderChart);
    // _.each(qualiications, renderQualification);
    
  }

  // var renderQualifications = function(q) {
  //   var el = d3.select('#qualifications')
    
    
  // }

  var renderChart = function(skills, name) {

    var maxWidth = parseInt(container.style('width')) - 15;

    var chart = container.append("svg")
     .attr("class", "chart")
     .attr("width", maxWidth)
     .attr("height", 20 * skills.length)

    chart.append('defs')
      
      .append('pattern')
      .attr('id', 'background')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 362)
      .attr('height', 242)
    .append('image')
      .attr('xlink:href', 'images/background.jpg')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 220)
      .attr('height', 30);

    var names = _.pluck(skills, 'name');
    var data = _.pluck(skills, 'confidence');
    var x = d3.scale.linear()
      .domain([0, 100])
      .range([0, maxWidth]);
    var y = d3.scale.ordinal()
      .domain(data)
      .rangeBands([0, 120]);
    
    chart.selectAll("rect")
      .data(data)
    .enter().append("rect")
      .attr("y", function(d, i) { return i * 20; })
      .attr("width", 0)
      .transition()
      .duration(1000)
      .attr('width', x)
      .attr("height", 20)

    chart.selectAll(".confidence")
      .data(data)
    .enter().append("text")
      .attr('class', "confidence")
      .attr("x", x)
      .attr("y", function(d, i) { return (i * 20) + 6; })
      .attr("dx", -5) // padding-right
      .attr("dy", ".65em") // vertical-align: middle
      .attr("text-anchor", "end") // text-align: right
      .text(function(d) {
        return d + '%';
      });

    chart.selectAll(".name")
      .data(names)
    .enter().append("text")
      .attr('class', 'name')
      .attr('x', 5)
      .attr("y", function(d, i) { return (i * 20) + 6; })
      .attr("dx", 3)
      .attr("dy", ".65em") 
      .attr("text-anchor", "start") // text-align: right
      .text(String);

     chart.append("line")
      .attr("y1", 0)
      .attr("y2", 20 * skills.length)
      .style("stroke", "#000");

    return 0;
  };

  d3.json('javascripts/cv.json', render);

}(d3, _);