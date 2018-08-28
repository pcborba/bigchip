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


var start = moment().subtract(20, 'days');

var end = moment();

/*

You can instantiate many objects of type chart in your page
in our example we are just setting 1 chart in case we create more than one 
we need for each one pass the source url and also the basic 
parameters to assemble them, in this case we need tho change chartupdade 
function

*/
var url0= "http://localhost/bigchip_/readChart.php?startDate="+ start.toString()+"&endDate="+end.toString();
var url1= "http://localhost/bigchip_/readChartAccount.php?startDate="+ start.toString()+"&endDate="+end.toString();

var myChart0="", myChart1="";


/*

The funciont chartUpdate is used to generate and update

the charts, as arguments that function receives the basic

parameters to identify how the chart will be created

*/


function chartUpdate(url, chart, start, end){
    if(url == url0){
        myChart0 = c3.generate({
            data: {
                x:'GLAccountName',
                url: url0,
                mimeType: 'json',
                keys: {
                    value:['GLAccountName','AverageValue','HighValue', 'TotalValue']
                },
                names: {
                    AverageValue: 'Average',
                    HighValue: 'Highest',
                    TotalValue:'Total'
                },
                type: 'bar'
            },
            color: {
                pattern: ['#1f77b4', '#1777e0', '#1927e9']
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
    }else if(url == url1){
        myChart1 = c3.generate({
            data: {
                x:'GLAccountName',
                url: url1,
                mimeType: 'json',
                keys: {
                    value:['GLAccountName','TotalValue'],
                },
                names: {
                    GLAccountName: 'Account',
                    TotalValue:'Total'
                },
                type: 'pie'
            },
            bindto: '#chart1'        
        });
    }

}



/*

Through jQuery we will identify when the page is fully 

loaded and start calling our function to generate the chars 

as well setting the properties of DatePicker that is generated

using another external library available on http://www.daterangepicker.com

*/

$(document).ready(function() {


    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        url0= "http://localhost/bigchip_/readChart.php?startDate="+ start.toString()+"&endDate="+end.toString();
        url1= "http://localhost/bigchip_/readChartAccount.php?startDate="+ start.toString()+"&endDate="+end.toString();
        myChart0.unload();
        myChart1.unload();
        //myChart0.flush();
        //myChart1.flush();
        chartUpdate(url0, myChart0,start, end);
        chartUpdate(url1, myChart1,start, end); 
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
chartUpdate(url0, myChart0,start, end);
chartUpdate(url1, myChart1,start, end);





