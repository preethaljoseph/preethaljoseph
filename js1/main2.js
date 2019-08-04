

d3.csv("data1/superstore.csv").then(function(data){

var margin = { left:80, right:100, top:50, bottom:100 },
    height = 500 - margin.top - margin.bottom, 
    width = 800 - margin.left - margin.right;

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + 
            ", " + margin.top + ")");


var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    var text = "<strong>Sales:</strong> <span style='color:red'>" + d.sales + "</span><br>";
    text += "<strong>State:</strong> <span style='color:red'>" + d.state + "</span><br>";
    return text;
  })


//X Label
g.append("text")
    .attr("y", height + 70)
    .attr("x", width/2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("State");

//Y label
g.append("text")
    .attr("y", -60)
    .attr("x", -(height/2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Sales");


var x  = d3.scaleBand()
        .domain(data.map(function(d){
            return d.state;
        }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

var y = d3.scaleLinear()
        .domain([0, 20000])
        .range([height, 0]);


var xAxisCall = d3.axisBottom(x);
g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+ height + ")")
    .call(xAxisCall)
    .selectAll("text")
        .attr("y","10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");


var yAxisCall = d3.axisLeft(y)
.tickFormat(function(d){ return "$" + d; });
g.append("g")
.attr("class", "y axis")
.call(yAxisCall);

g.call(tip);

var rects = g.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", function(d){
                return y(d.sales);
            })
            .attr("x", function(d){
                return x(d.state);
            })
            .attr("width", x.bandwidth)
            .attr("height", function(d){
                return height - y(d.sales);
            })
            .style("fill", "pink")
            .on('mouseover',tip.show)
            .on('mouseout',tip.hide);

});

