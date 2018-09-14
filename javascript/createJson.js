const fs = require('fs');


const readline = require('readline');


const Stream = require('stream');

const instream = fs.createReadStream('../csvFiles/Crimes_-_2001_to_present.csv');
const outstream = new Stream();

const rl = readline.createInterface({
  input: instream,
  output: outstream,
});
let heading = []; const under500 = []; const over500 = []; const json1 = []; let start = 0; const
  year = [];
let i;
let index = 0; let nonIndex = 0; let violent = 0; let property = 0;
const assaultArrest = []; const assaultCase = []; const json2 = [];


const indexArray = [
  '0110', '0130', '0261', '0262', '0263', '0264', '0265', '0266', '0271', '0272',
  '0273', '0274', '0275', '0281', '0291', '1753', '1754', '0312', '0313', '031A',
  '031B', '0320', '0325', '0326', '0330', '0331', '0334', '0337', '033A', '033B',
  '0340', '051A', '051B', '0520', '0530', '0550', '0551', '0552', '0553', '0555',
  '0556', '0557', '0558', '041A', '041B', '0420', '0430', '0450', '0451', '0452',
  '0453', '0461', '0462', '0479', '0480', '0481', '0482', '0483', '0485', '0488',
  '0489', '0490', '0491', '0492', '0493', '0495', '0496', '0497', '0498', '0510',
  '0610', '0620', '0630', '0650', '0810', '0820', '0840', '0841', '0842', '0843',
  '0850', '0860', '0865', '0870', '0880', '0890', '0895', '0910', '0915', '0917',
  '0918', '0920', '0925', '0927', '0928', '0930', '0935', '0937', '0938', '1010',
  '1020', '1025', '1090',
];


const nonIndexArray = [
  '0141', '0142', '0545', '0554', '0560', '0580', '0581', '0583', '0440', '0454',
  '0460', '0475', '0484', '0486', '0487', '0494', '1120', '1121', '1122', '1110',
  '1130', '1135', '1150', '1151', '1152', '1160', '1170', '1185', '1195', '1205',
  '1206', '1210', '1220', '1230', '1235', '1240', '1241', '1242', '1245', '1255',
  '1260', '1261', '1265', '1305', '1140', '1200', '1310', '1320', '1340', '1345',
  '1370', '1375', '141A', '141B', '141C', '142A', '142B', '1435', '143A', '143B',
  '143C', '1440', '1450', '1460', '1475', '1476', '1477', '2900', '1505', '1506',
  '1507', '1510', '1511', '1512', '1513', '1515', '1520', '1521', '1525', '1526',
  '1530', '1531', '1537', '1542', '1544', '1549', '1535', '1536', '1540', '1541',
  '1562', '1563', '1564', '1565', '1566', '1570', '1572', '1574', '1576', '1578',
  '1580', '1582', '1585', '1590', '2830', '5004', '1811', '1812', '1821', '1822',
  '1840', '1850', '1860', '1900', '2010', '2011', '2012', '2013', '2014', '2015',
  '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025',
  '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2040', '2050', '2060',
  '2070', '2080', '2090', '2094', '2095', '2110', '2170', '1610', '1611', '1620',
  '1621', '1622', '1623', '1624', '1625', '1626', '1627', '1630', '1631', '1632',
  '1633', '1640', '1650', '1651', '1661', '1670', '1680', '1681', '1690', '1691',
  '1692', '1693', '1694', '1695', '1696', '1697', '1720', '1750', '1751', '1752',
  '1790', '1791', '1792', '2210', '2220', '2230', '2240', '2250', '2251', '0470',
  '2840', '2860', '2870', '3100', '3610', '3710', '3720', '3730', '3740', '3750',
  '3751', '3760', '1030', '1035', '1330', '1335', '1350', '1360', '1365', '1710',
  '1715', '1725', '1755', '1775', '1780', '2091', '2092', '2093', '2111', '2120',
  '2160', '2500', '2820', '2825', '2826', '2850', '2851', '2890', '2895', '3000',
  '3200', '3300', '3400', '3770', '3800', '3910', '3920', '3960', '3966', '3970',
  '3975', '3980', '4210', '4220', '4230', '4230', '4255', '4310', '4387', '4388',
  '4410', '4420', '4510', '4625', '4650', '4651', '4652', '4740', '4750', '4800',
  '4810', '4860', '5000', '5001', '5002', '5003', '5007', '5008', '500E', '500N',
  '5011', '501A', '501H', '502P', '502R', '502T',
];


const violentArray = [
  '0110', '0130', '0261', '0262', '0263', '0264', '0265', '0266', '0271', '0272',
  '0273', '0273', '0274', '0275', '0281', '0291', '1753', '1754', '0312', '0313',
  '031A', '031B', '0320', '0325', '0326', '0330', '0331', '0334', '0337', '033A',
  '033B', '0340', '051A', '051B', '0520', '0530', '0550', '0551', '0552', '0553',
  '0555', '0556', '0557', '0558', '041A', '041B', '0420', '0430', '0450', '0451',
  '0452', '0453', '0461', '0462', '0479', '0480', '0481', '0482', '0483', '0485',
  '0488', '0489', '0490', '0491', '0492', '0493', '0495', '0496', '0497', '0498',
  '0510',
]; 
  const propertyArray = [
    '0610', '0620', '0630', '0650', '0810', '0820', '0840', '0841', '0842', '0843',
    '0850', '0860', '0865', '0870', '0880', '0890', '0895', '0910', '0915', '0917',
    '0918', '0920', '0925', '0927', '0928', '0930', '0935', '0937', '0938', '1010',
    '1020', '1025', '1090',
  ];
for (i = 0; i <= 15; i += 1) {
  under500[i] = 0;
  over500[i] = 0;
  assaultArrest[i] = 0;
  assaultCase[i] = 0;
  year[i] = 2001 + i;
}
rl.on('line', (line) => {
  let tempArray = [];
  tempArray.push(line);
  tempArray = tempArray.toString().replace(', ', ' ').split(',');
  if (start === 0) {
    heading = tempArray;
    start += 1;
  } else {
    let tempValue = 0;

    if ((tempArray[heading.indexOf('Primary Type')] === 'THEFT')) {
      if ((tempArray[heading.indexOf('Description')] === '$500 AND UNDER')) {
        tempValue = under500[(tempArray[heading.indexOf('Year')] % 2000) - 1];
        tempValue += 1;
        under500[(tempArray[heading.indexOf('Year')] % 2000) - 1] = tempValue;
      }
      if ((tempArray[heading.indexOf('Description')] === 'OVER $500')) {
        tempValue = over500[(tempArray[heading.indexOf('Year')] % 2000) - 1];
        tempValue += 1;
        over500[(tempArray[heading.indexOf('Year')] % 2000) - 1] = tempValue;
      }
    }

    if (tempArray[heading.indexOf('Primary Type')] === 'ASSAULT') {
      tempValue = assaultCase[(tempArray[heading.indexOf('Year')] % 2000) - 1];
      tempValue += 1;
      assaultCase[(tempArray[heading.indexOf('Year')] % 2000) - 1] = tempValue;
    }
    if ((tempArray[heading.indexOf('Primary Type')] === 'ASSAULT') && (tempArray[heading.indexOf('Arrest')] === 'true')) {
      tempValue = assaultArrest[(tempArray[heading.indexOf('Year')] % 2000) - 1];
      tempValue += 1;
      assaultArrest[(tempArray[heading.indexOf('Year')] % 2000) - 1] = tempValue;
    }
    if ((indexArray.includes(tempArray[heading.indexOf('IUCR')]) === true) && (tempArray[heading.indexOf('Year')] === '2015')) {
      index += 1;
    }
    if ((nonIndexArray.includes(tempArray[heading.indexOf('IUCR')]) === true) && (tempArray[heading.indexOf('Year')] === '2015')) nonIndex += 1;
    if ((violentArray.includes(tempArray[heading.indexOf('IUCR')]) === true) && (tempArray[heading.indexOf('Year')] === '2015')) violent += 1;
    if ((propertyArray.includes(tempArray[heading.indexOf('IUCR')]) === true) && (tempArray[heading.indexOf('Year')] === '2015')) property += 1;
  }
});
rl.on('close', () => {
  for (i = 0; i < 16; i += 1) {
    const obj1 = {};
    obj1.year = i + 2001;
    obj1.over500 = over500[i];
    obj1.under500 = under500[i];
    json1.push(obj1);

    const obj2 = {};
    obj2.year = i + 2001;
    obj2.assault = assaultCase[i];
    obj2.arrest = assaultArrest[i];
    json2.push(obj2);
  }
  const obj3 = {};
  obj3.index = index;
  obj3.nonIndex = nonIndex;
  obj3.violent = violent;
  obj3.property = property;

  let wr = fs.createWriteStream('../Output/jsonFile.json');
  wr.write(JSON.stringify(json1));
  wr = fs.createWriteStream('../Output/jsonFile1.json');
  wr.write(JSON.stringify(json2));
  wr = fs.createWriteStream('../Output/jsonFile2.json');
  wr.write(JSON.stringify(obj3));
});
