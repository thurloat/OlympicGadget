function load()
{
		System.Gadget.onSettingsClosing = settingsClosing;
		createCountryDropDown();
}

function createCountryDropDown() {
	fetchMedalsData(function(data) {
		var selected = System.Gadget.Settings.read("country");

		var countries = new Array();
		for (var i = 0; i < data.length - 1; i++) {
			if (!data[i]) break;
			countries.push(data[i].name);
		}

		countries.sort();
		
		for (var i = 0; i < countries.length; i++) {
			var country = countries[i];
			var objEntry = document.createElement("option");
			objEntry.text = country;
			objEntry.value = country; 
			objEntry.title = country;
			if(country == selected)
			{
				objEntry.selected = true;
			}
			countrySelect.add(objEntry);
		}
	});
}

function settingsClosing(event)
{
	if(event.closeAction == event.Action.commit)
	{
		System.Gadget.Settings.write("country", countrySelect.options(countrySelect.selectedIndex).value);
	}
	else if (event.closeAction == event.Action.cancel)
	{
	}
	event.cancel = false;
}
