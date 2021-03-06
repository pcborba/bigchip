<?php
	include('header.php');
?>	
<script src="js/mytable.js" defer></script>
<h1 class="borba">REPORT</h1>
<hr><br>

<div id="reportrange">
    <p><b>Select the date range to filter the data:</b> <i class="fa fa-calendar"></i>&nbsp; <span></span> <i class="fa fa-caret-down"></i></p>
</div>

<!-- These a elements are used to toggle the columns in a specific table, in our case the first table from id table0   -->
<div>
        <b>Toggle column: </b><a class="toggle-vis" data-column="0">Location</a><a class="toggle-vis" data-column="1">Category</a><a class="toggle-vis" data-column="2">Account</a><a class="toggle-vis" data-column="3">Average Value</a><a class="toggle-vis" data-column="4">Highest Value</a><a class="toggle-vis" data-column="5">Total Value</a>
</div>

<div class="containerTable">
<!-- For each table that you need to add on your page you must insert a table tag and assign it a class attribute and and id to identify that element on Javascritp code that will generate the table   -->
    <table id="table0" class="display" style="width:100%">
            <thead>
                <tr>
                    <tr>
                        <th>Location</th>
                        <th>Category</th>
                        <th>Account</th>
                        <th>Average Value</th>
                        <th>Highest Value</th>
                        <th>Total Value</th>
                    </tr>
                </tr>
            </thead>

    </table>

</div>

<div class="containerTable">

    <table id="table1" class="display" style="width:100%">
            <thead>
                <tr>
                    <tr>
                        <th>Account</th>
                        <th>Total Value</th>
                    </tr>
                </tr>
            </thead>

    </table>

</div>

<div class="containerTable">

    <table id="table2" class="display" style="width:100%">
            <thead>
                <tr>
                    <tr>
                        <th>Account</th>
                    </tr>
                </tr>
            </thead>

    </table>

</div>


<?php
	include('footer.php');
?>	