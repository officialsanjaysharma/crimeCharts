// Setup svg using Bostock's margin convention

const margin = {
  top: 20, right: 160, bottom: 35, left: 30,
};
var d3;


const width = 960 - margin.left - margin.right;


const height = 500 - margin.top - margin.bottom;
const svg = d3.select('body')
  .append('svg')
  .attr('id', 'x')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);
let obj = {};

/* Data in strings like it would be if imported from a csv */
d3.json('Output/jsonFile.json', (dataFile1) => {
  const data = [];
  dataFile1.forEach((element) => {
    obj = {};
    obj.year = element.year.toString();
    obj.over500 = element.over500.toString();
    obj.under500 = element.under500.toString();
    data.push(obj);
  });

  const parse = d3.time.format('%Y').parse;


  // Transpose the data into layers
  const dataset = d3.layout.stack()(['over500', 'under500'].map(crime => data.map(d => ({ x: parse(d.year), y: +d[crime] }))));


  // Set x, y and colors
  const x = d3.scale.ordinal()
    .domain(dataset[0].map(d => d.x))
    .rangeRoundBands([10, width - 10], 0.02);

  const y = d3.scale.linear()
    .domain([0, d3.max(dataset, d => d3.max(d, d => d.y0 + d.y))])
    .range([height, 0]);

  const colors = ['b33040', '#d25c4d'];


  // Define and draw axes
  const yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(15)
    .tickSize(-width, 0, 0)
    .tickFormat(d => d);

  const xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .tickFormat(d3.time.format('%Y'));

  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0,${height})`)
    .call(xAxis);


  // Create groups for each series, rects for each segment
  const groups = svg.selectAll('g.cost')
    .data(dataset)
    .enter().append('g')
    .attr('class', 'cost')
    .style('fill', (d, i) => colors[i]);

  groups.selectAll('rect')
    .data(d => d)
    .enter()
    .append('rect')
    .attr('x', d => x(d.x))
    .attr('y', d => y(d.y0 + d.y))
    .attr('height', d => y(d.y0) - y(d.y0 + d.y))
    .attr('width', x.rangeBand())
    .on('mouseover', () => { tooltip.style('display', null); })
    .on('mouseout', () => { tooltip.style('display', 'none'); })
    .on('mousemove', function (d) {
      const xPosition = d3.mouse(this)[0] - 15;
      const yPosition = d3.mouse(this)[1] - 25;
      tooltip.attr('transform', `translate(${xPosition},${yPosition})`);
      tooltip.select('text').text(d.y);
    });


  // Draw legend
  const legend = svg.selectAll('.legend')
    .data(colors)
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => `translate(30,${i * 19})`);

  legend.append('rect')
    .attr('x', width - 18)
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', (d, i) => colors.slice().reverse()[i]);

  legend.append('text')
    .attr('x', width + 5)
    .attr('y', 9)
    .attr('dy', '.35em')
    .style('text-anchor', 'start')
    .text((d, i) => {
      switch (i) {
        case 0: return '$500 and under';
        default: return 'Over $500';
      }
    });


  // Prep the tooltip bits, initial display is hidden
  let tooltip = svg.append('g')
    .attr('class', 'tooltip')
    .style('display', 'none');

  tooltip.append('rect')
    .attr('width', 30)
    .attr('height', 20)
    .attr('fill', 'white')
    .style('opacity', 0.5);

  tooltip.append('text')
    .attr('x', 15)
    .attr('dy', '1.2em')
    .style('text-anchor', 'middle')
    .attr('font-size', '12px')
    .attr('font-weight', 'bold');
});
