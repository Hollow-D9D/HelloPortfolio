$.getJSON("data/populations.json", function(jsonData){
	console.log(jsonData)
	
	var colData = [];

  // TODO
  // populate colData

	for(let data of jsonData["USA"]) {
		colData.push([
			data.age[0] + data.age[1] + " - " + data.age[2] + data.age[3],
			data.value * 1000
		])
	}

	chart = c3.generate({
		bindto: "#population-chart",
		size: {
			height: 450
		},	
		data: {
			columns: colData,
			type : 'pie'
		}
	});	
});
