let h = 200;
let w = 900;
let margin = {left: 50, right: 50, top: 40, bottom: 0};

let parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");


let svg = d3.select("body").append("svg").attr("width","100%").attr("height","100%");
let chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");


let data = d3.json("weather.json").then((d)=>{

let _data = d.slice(800);
let dateRange = d3.extent(_data,(d)=> parseDate(d.recorded_at));
let windRange = d3.extent(_data,(d)=> d.windspeedmph);
let x = d3.scaleUtc()
              .domain(dateRange)
              .range([0,w])

let xAxis = d3.axisBottom(x);

let y = d3.scaleLinear()
              .domain(windRange)
              .range([h,0])

let yAxis = d3.axisLeft(y);
let chartGroup = svg.append("g")
                        .attr("class","chartGroup")
                        .attr("transform","translate("+margin.left+","+margin.top+")");

let line = d3.line()
                .defined(d => !isNaN(d.windspeedmph))
                .x(d=>x(parseDate(d.recorded_at)))
                .y(d=>y(d.windspeedmph));

console.log(_data);
chartGroup.append("path").attr("d",line(_data));


chartGroup.append("g").attr("class","x axis")
                          .attr("transform","translate(0,"+h+")").call(xAxis);

chartGroup.append("g").attr("class","y axis").call(yAxis);

chartGroup.append("path")
      .datum(_data.filter(line.defined()))
      .attr("stroke", "#ccc")
      .attr("d", line);

chartGroup.append("path")
      .datum(_data)
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);


  }).catch((e)=>(console.error(e)))
