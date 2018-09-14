var d3;
d3.json('Output/jsonFile1.json', (datafile1) => {
  let obj = {};
  let obj1 = {};
  function InitChart() {
    const data1 = [];
    const data2 = [];
    datafile1.forEach((element) => {
      obj = {};
      obj.data = element.arrest.toString();
      obj.year = element.year.toString();
      data1.push(obj);
      obj1 = {};
      obj1.data = element.assault.toString();
      obj1.year = element.year.toString();
      data2.push(obj1);
    });


    const vis = d3.select('#visualisation');


    const WIDTH = 1000;


    const HEIGHT = 500;


    const MARGINS = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 100,
    };


    const xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right])
      .domain([2001, 2016]);


    const yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom])
      .domain([0, 30000]);


    const xAxis = d3.svg.axis()
      .scale(xScale);


    const yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');


    vis.append('svg:g')
      .attr('class', 'x axis1')
      .attr('transform', `translate(0,${HEIGHT - MARGINS.bottom})`)
      .call(xAxis);

    vis.append('svg:g')
      .attr('class', 'y axis1')
      .attr('transform', `translate(${MARGINS.left},0)`)
      .call(yAxis);

    const lineGen = d3.svg.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.data))
      .interpolate('basis');

    vis.append('svg:path')
      .attr('d', lineGen(data1))
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    vis.append('text')
      .attr('transform', `translate(${(MARGINS.top) + 70},${(MARGINS.right + 0)})`)
      .attr('dy', '.35em')
      .attr('text-anchor', 'start')
      .style('fill', 'BLUE')
      .style('font-size', '20px')
      .text('Assault');

    vis.append('svg:path')
      .attr('d', lineGen(data2))
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    vis.append('text')
      .attr('transform', `translate(${(MARGINS.bottom + 60)},${(MARGINS.right + (290))})`)
      .attr('dy', '.35em')
      .attr('text-anchor', 'start')
      .style('fill', 'green')
      .style('font-size', '20px')
      .text('Arrest');
  }


  InitChart();
});
