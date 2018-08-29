/* This javascript is used to generate the charts

using an external library from https://c3js.org/

the basic orientation to setup and use it is available 

in the link https://c3js.org/gettingstarted.html

*/



/*

The variables start and end are used to set the date range 

in which data will be retrieved from the DB to compose the 

JSON content that will be feeding the charts.

*/
var arrJSONContent;
var testenome;
var xmlhttp;
var data;
var chart;
var options;

var start = moment().subtract(20, 'days');

var end = moment();

/*

You can instantiate many objects of type chart in your page
in our example we are just setting 1 chart in case we create more than one 
we need for each one pass the source url and also the basic 
parameters to assemble them, in this case we need tho change chartupdade 
function

*/

var url0= "http://dev003.badiee.com/readChart.php?startDate="+ start.toString()+"&endDate="+end.toString();
var url1= "http://dev003.badiee.com/readChartAccountPie.php?startDate="+ start.toString()+"&endDate="+end.toString();

var myChart0="", myChart1="";


/*

The funciont chartUpdate is used to generate and update

the charts, as arguments that function receives the basic

parameters to identify how the chart will be created

*/

function chartUpdateC3(url, chart, start, end){
    myChart0 = c3.generate({
        data: {
            
            url: url0,
            mimeType: 'json',
            keys: {
                x:'GLAccountName',
                value:['AverageValue','HighValue', 'TotalValue']
            },
            names: {
                AverageValue: 'Average',
                HighValue: 'Highest',
                TotalValue:'Total'
            },
            type: 'bar'
        },
        color: {
            pattern: ['#1b9ccf', '#94dbf7', '#63a7c2']
        },
        axis: {
            x: {
                type: 'category'
            }
        },
        bar: {
            width: {
                ratio: 0.7
            }
        },
        bindto: '#chart'        
    });
}



/*

Through jQuery we will identify when the page is fully 

loaded and start calling our function to generate the chars 

as well setting the properties of DatePicker that is generated

using another external library available on http://www.daterangepicker.com

*/
$(document).ready(function() {
    

    chartUpdateC3(url0, myChart0,start, end);
    
    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        url0= "http://dev003.badiee.com/readChart.php?startDate="+ start.toString()+"&endDate="+end.toString();
        url1= "http://dev003.badiee.com/readChartAccount.php?startDate="+ start.toString()+"&endDate="+end.toString();
        myChart0.unload();
        chartUpdateC3(url0, myChart0,start, end);
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);
    cb(start, end);    

} );        

function chartUpdateGoogleCharts(){
    arrJSONContent = new Array();
    testenome = 'TOP 5 Entries by GL Account';

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            result = JSON.parse(this.responseText);
            receivingJSON(result);
        }
    };
    xmlhttp.open("GET", url1, true);
    xmlhttp.send();

    function receivingJSON(json) {
        console.log(" Total Value = "+ json[0].TotalValue);
        for(i = 0; i < json.length; i++){
            arrJSONContent.push(json[i]);
        }
        console.log(arrJSONContent);
        console.log(arrJSONContent[0].GLAccountName);
    }

    google.charts.load('current', {
        callback: function () {
            drawChart();
            setInterval(drawChart, (15 * 60 * 1000));
        
            function drawChart() {
            data =  new google.visualization.DataTable();
            data.addColumn('string', 'GLAccountName');
            data.addColumn('number', 'TotalValue');

            for(i = 0; i < arrJSONContent.length; i++){
                console.log(arrJSONContent[i].GLAccountName + " novo " +arrJSONContent[i].TotalValue);
                data.addRow([arrJSONContent[i].GLAccountName, arrJSONContent[i].TotalValue]);
            }

            options = {
                'title': testenome,
                'width':800,
                'height':600,
                pieHole: 0.4,
                titleTextStyle: { color: '#005de0'},
                legend: {position:'right', textStyle:{color:'#0069fc', fontSize: 12}},
                colors: ['#63a7c2', '#00b5fc', '#1b9ccf', '#94dbf7', '#a1d0e3']



            };
            chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(data,options);
            }
        },
        packages: ['corechart']
    });
}
chartUpdateGoogleCharts();





