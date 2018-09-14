const w = 400;
const h = 400;
const r = h / 2;
var d3;

const aColor = [
  'rgb(178, 55, 56)',
  'rgb(213, 69, 70)',
  'rgb(230, 125, 126)',
  'rgb(239, 183, 182)',
];

d3.json('Output/jsonFile2.json', (data) => {
  data = [
    { label: 'Index Crimes', value: data.index },
    { label: 'Non-Index Crimes', value: data.nonIndex },
    { label: 'Violent Crimes', value: data.violent },
    { label: 'Property Crimes', value: data.property },
  ];


  const vis = d3.select('#chart').append('svg:svg').data([data]).attr('width', w)
    .attr('height', h)
    .append('svg:g')
    .attr('transform', `translate(${r},${r})`);

  const pie = d3.layout.pie().value(d => d.value);

  // Declare an arc generator function
  const arc = d3.svg.arc().outerRadius(r);

  // Select paths, use arc generator to draw
  const arcs = vis.selectAll('g.slice').data(pie).enter().append('svg:g')
    .attr('class', 'slice');
  arcs.append('svg:path')
    .attr('fill', (d, i) => aColor[i])
    .attr('d', d => arc(d));

  // Add the text
  arcs.append('svg:text')
    .attr('transform', (d) => {
      d.innerRadius = 100; /* Distance of label to the center */
      d.outerRadius = r;
      return `translate(${arc.centroid(d)})`;
    })
    .attr('text-anchor', 'middle')
    .text((d, i) => data[i].label);
});
