function init() {
	
	
	System.Gadget.background = 'img/bg4.png';
	
	System.Gadget.settingsUI = 'Settings.html';
	System.Gadget.onSettingsClosed = updateMedalsTable;

	updateMedalsTable();
	
	checkVersion();
	
}

function updateMedalsTable() {
	medals.innerHTML = '<img src="img/loading.gif" id="loading" />';	

	var mycountry = System.Gadget.Settings.read("country");

	fetchMedalsData(function(data) {
		var table = '';
		for (var i = 0; i < data.length - 1; i++) {
			if (!data[i]) break;
			var country = data[i];
			if (country.name == mycountry) {
				table += medalTableRow(country, true);
				break;
			}
		}

		for (var i = 0; i < data.length - 1; i++) {
			if (!data[i]) break;
			var country = data[i];
			if (country.name == mycountry) continue;
			table += medalTableRow(country);
		}

		medals.innerHTML = '<table cellspacing="0" id="results">' + table + '</tbody></table>';
	});
	setTimeout("updateMedalsTable()", 45000);
}

function medalTableRow(country, is_mycountry) {
	var total = country.gold + country.silver + country.bronze;
	var row_class = ' class="medalRow"';
	if (is_mycountry) {
		row_class = ' class="mycountry"';
	}
	return '<tr' + row_class + '><td class="name"><img src="img/flags/' + country.code + '.png" />' + country.name + '</td><td>' + country.gold + '</td><td>' + country.silver + '</td><td>' + country.bronze + '</td><td class="total">' + total + '</td></tr>';
}

function fetchMedalsData(onSuccess) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4) {
			onSuccess(eval('(' + xhttp.responseText + ')'));
		}
	}

	xhttp.open("GET","http://norexmedals.appspot.com/api/json?"+Math.floor(Math.random()*104),false);
	xhttp.send("");
}
function checkVersion(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4) {
			var data = eval('(' + xhttp.responseText + ')');
			if (data.windows && data.windows > System.Gadget.version){
				medals.innerHTML = "There's an update available <br />";
				medals.innerHTML += "from  v."+System.Gadget.version+" to v." + data.windows+ " <br />";
				medals.innerHTML += "<a href='http://norex.ca/content/olympics#sidebar'><h2>Update Now!</h2></a>";
				medals.innerHTML += "<br /><br /><p>It is strongly recommended that you apply this update. If you do not wish to update, the medals will refresh shortly.</p>"
			}
		}
	}
	xhttp.open("GET","http://norexmedals.appspot.com/api/version?"+Math.floor(Math.random()*104),false);
	xhttp.send("");
}