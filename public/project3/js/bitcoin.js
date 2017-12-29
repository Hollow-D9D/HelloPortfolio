$.getJSON("data/bitcoin.11-17.json", function(allJSON){
	// console.log(allJSON)
	xDateArray = ["x"], lowArray =  ["low"], highArray = ["high"], openArray = ["open"], closeArray = ["close"],
	volumeArray = ["volume"], weightArray = ["Weighted price"];
	
	// TODO
	// populate xDateArray, lowArray, highArray


	// console.log(allJSON['dataset']['data'])

	
	for(let i = 1451; i < allJSON['dataset']['data'].length; i+=7) 
	{
		data = allJSON['dataset']['data'][i];
		xDateArray.push(data[0]);
		lowArray.push(data[3]);
		highArray.push(data[2]);
		openArray.push(data[1]);
		closeArray.push(data[4]);
		volumeArray.push(data[6]);
		
	}

	var chart = c3.generate({
		bindto: "#bitcoin-chart",
		data: {
			x: 'x',
			xFormat: '%Y-%m-%d',
			columns: [
				xDateArray,
				highArray,
				lowArray,
				openArray,
				closeArray,
				volumeArray
			]
		},
		axis: {
			x: {
				type: 'timeseries',
				tick: {
					format: '%Y-%m-%d'
				}
			}
		}
	});
});