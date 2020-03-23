window.onload = function () {
	fetch('https://api.covid19india.org/data.json')
	.then(res=>res.json())
	.then(json=>
	{
		var dataPoints = []
		json.cases_time_series.forEach(day => {
			months = ['January','February','March','April','May','June','July','August','September','October','November','December']
			dataPoints.push({x: new Date(2020, months.indexOf(day.date.split(" ")[1])+1, parseInt(day.date.split(" ")[0])), y: parseInt(day.totalconfirmed)})
		});
		var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text: "Cases Registered In India"
	},
	axisX:{
		valueFormatString: "DD MMM YYYY",
		crosshair: {
			enabled: true,
			snapToDataPoint: true
		}
	},
	axisY: {
		title: "People",
		includeZero: false,
		valueFormatString: "##0",
		crosshair: {
			enabled: true,
			snapToDataPoint: true,
			labelFormatter: function(e) {
				return CanvasJS.formatNumber(e.value, "##0.00");
			}
		}
	},
	data: [{
		type: "area",
		xValueFormatString: "DD MMM",
		yValueFormatString: "##0",
		dataPoints :dataPoints
	}]
});
chart.render();
	})

	
	fetch('https://api.covid19india.org/data.json')
	.then(res=>res.json())
	.then(json=>{
		console.log(json.statewise[17]);
		var casesDataPoints = []
		var recoveredDataPoints = []
		var deathsDataPoints = []
		json.statewise.forEach(state => {
			casesDataPoints.push({y: this.parseInt(state.confirmed),label: state.state})
			recoveredDataPoints.push({y: this.parseInt(state.recovered),label: state.state})
			deathsDataPoints.push({y: this.parseInt(state.deaths),label: state.state})
		});

		var chart = new CanvasJS.Chart("chartContainer2", {
			animationEnabled: true,
			title:{
				labelFontSize: 10,
				text: "Statewise Effected (INDIA)"
			},
			axisX:{
				labelFontSize: 20,
			},
			axisY: {
				labelFontSize: 10,
				title: "Count Of People"
			},
			data: [{
				type: "bar",
				showInLegend: true,
				name: "Cases",
				color: "gold",
				dataPoints:casesDataPoints
			},
			{
				type: "bar",
				showInLegend: true,
				name: "Recovered",
				color: "silver",
				dataPoints:recoveredDataPoints
			},
			{
				type: "bar",
				showInLegend: true,
				name: "Deaths",
				color: "#A57164",
				dataPoints: deathsDataPoints
			}]
		});
		chart.render(); 
	})
}
