<?php

	include('header.php');

?>

<script src="js/mychart.js" defer></script>

<h1 class="borba">DASHBOARD</h1>

<hr><br>

<div id="reportrange">
    <p><b>Select the date range to filter the data:</b> <i class="fa fa-calendar"></i>&nbsp; <span></span> <i class="fa fa-caret-down"></i></p>
</div>

<!-- For each chart that you need to add on your page you must insert a div and assign it an ID attribute to identify that element on Javascritp code that will generate the charts   -->

<div class="containerTable">
    <div id="chart"></div>
</div>
    
<div class="containerTable">

    <div id="chart_div"></div>

</div>

<div class="containerTable">
    <div id="chart1"></div>
</div>


<?php

    include('footer.php');

?>	