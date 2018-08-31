/* This javascript is used to generate the tables

using an external library from https://datatables.net/

the guide tation to setup and use it is available 

in the link https://datatables.net/manual/installation

*/





/*

The variables start and end are used to set the date range 

in which data will be retrieved from the DB to compose the 

JSON content that will be feeding the tables.

*/

var start = moment().subtract(20, 'days');

var end = moment();



/*

You can instantiate many objects of type table in your page

in our example we are just setting 3 tables and for each one we need

to pass the source url and also the basic parameters to assemble them

*/

var tables = new Array();

var url0  = "http://dev003.badiee.com/readTable.php";

var url1 = "http://dev003.badiee.com/readTableAccountTotal.php";

var url2 = "http://dev003.badiee.com/readTableAccount.php";





/*

The funciont dataTableUpdate is used to generate and update

the tables, as arguments that function receives the basic

parameters to identify which table will be created, and

according to these parameters we check which constructor must

be used

*/



function dataTableUpdate(url, table, start,end){

    if(url==url0){

        tables[0] = $('#table0').DataTable({

            "processing" : true,

            "ajax" : { 

                "url" :url0,

                /*

                when calling the URL we are passing some arguments to receive 

                JSON content from a specific range

                */

                data : {"startDate": start.toString(), "endDate": end.toString()},

                dataSrc:""

            },

            "columns" : [

                {"data" : "LocationName"},

                {"data" : "GLCategoryName"},

                {"data" : "GLAccountName"},

                {"data" : "AverageValue"},

                {"data" : "HighValue"},

                {"data" : "TotalValue"}

            ]

        });

    }else if(url==url1){

        tables[1] = $('#table1').DataTable({

            "processing" : true,

            "ajax" : { 

                "url" :url1,

                data : {"startDate": start.toString(), "endDate": end.toString()},

                dataSrc:""

            },

            "columns" : [

                {"data" : "GLAccountName"},

                {"data" : "TotalValue"}

            ]

        });

    }else{

        tables[2] = $('#table2').DataTable({

            "processing" : true,

            "ajax" : { 

                "url" :url2,

                data : {"startDate": start.toString(), "endDate": end.toString()},

                dataSrc:""

            },

            "columns" : [

                {"data" : "GLAccountName"},

            ]

        });

    }

}



/*

Through jQuery we will identify when the page is fully 

loaded and start calling our function to generate the tables 

as well setting the properties of DatePicker that is generated

using another external library available on http://www.daterangepicker.com

*/

$(document).ready(function() {



    dataTableUpdate(url0, tables[0], start,end);   

    dataTableUpdate(url1, tables[1], start,end);

    dataTableUpdate(url2, tables[2], start,end);   



    function cb(start, end) {

        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));

        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));

        tables[0].destroy();

        tables[1].destroy();

        dataTableUpdate(url0, tables[0], start,end);   

        dataTableUpdate(url1, tables[1], start,end);   

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



    $('a.toggle-vis').on( 'click', function (e) {

        e.preventDefault();

        var column = tables[0].column( $(this).attr('data-column') );

        column.visible( ! column.visible() );

    } );        

});