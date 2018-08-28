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


var myChart;


/*

The funciont chartUpdate is used to generate and update

the charts, as arguments that function receives the basic

parameters to identify how the chart will be created

*/


function chartUpdate(start, end){

    myChart = c3.generate({

        data: {

            x:'GLAccountName',

            url: 'http://dev003.badiee.com/readChart.php?startDate='+ start.toString()+'&endDate='+end.toString(),

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

        }

    

    });

}



/*

Through jQuery we will identify when the page is fully 

loaded and start calling our function to generate the chars 

as well setting the properties of DatePicker that is generated

using another external library available on http://www.daterangepicker.com

*/

$(document).ready(function() {

    chartUpdate(start, end);

    function cb(start, end) {

        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));

        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));

        myChart.destroy();

        chartUpdate(start, end);

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






