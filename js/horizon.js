function Horizon(wellManager) {
    this.wellManager = wellManager;
    this.selectedCounty = null;
}


Horizon.prototype = {
    constructor: Horizon,
    
    drawHorizon: function (county) {
        let self = this;
        this.selectedCounty = county;
        let wells = self.wellManager.getWellsByCounty(county);


        let wellList = [
            // {id: 100, series: [120, 130, 120, 230], color: '#ff0000'},
            // {id: 101, series: [100, 89, 89, 300], color: '#00ff00'},
            // {id: 102, series: [99, 88, 77, 66], color: '#0000ff'},
        ];

        wells.sort(function (w1, w2) {
            let val = 0;
            if (+w1['water_level'] > +w2['water_level']) {
                val = -1;
            }
            else if (+w1['water_level'] < +w2['water_level']) {
                val = 1;
            }
            return val;
        });

         // Clean of any previus horizons
        d3.select("#horizonChart").selectAll('.horizon').remove();
        d3.select("#horizonChart").selectAll('.horizonSVG').remove();
        let div = d3.select("body").append("div")
          .attr("class", "tooltip horizon-tooltip")
          .style("opacity", 0);
        let count = 0;
        let max_well = 20 > wells.length ?  wells.length : 20;
        let c20 = d3.scale.category20();

        for(let i=0; i < max_well; i++) {
            let curWell = wells[i];
            curWell.color = c20(i);

            // let timeseries = self.wellManager.getLoadedWellTimeSeries(curWell.id);
            // curWell.series = timeseries.map(function (ts) {
            //     return parseFloat(ts['water_level']);
            // });

            curWell.series = curWell.interpolated_series;
            // curWell.series = curWell.interpolated_series.map(function (val) {
            //     return val - 20;
            // });

            wellList.push(curWell);
        }

        var select_colors = function (val) {
            let colors;

            let band_count = Math.ceil((val - 20) / 60);
            if (band_count < 2) { // 1 band
                colors = ['#313695', '#ffcdb1'];
            }
            else if (band_count < 3) { // 2 bands
                colors = ['#313695', '#313695', '#ffcdb1', '#e2a38d'];
            }
            else if (band_count < 4) { // 3 bands
                colors = ['#313695', '#313695', '#313695', '#ffcdb1', '#e2a38d', '#b9976f'];
            }
            else if (band_count < 5) { // 4 bands
                colors = [  '#313695', '#313695', '#313695', '#313695',
                            '#ffcdb1', '#e2a38d', '#b9976f', '#61906e'];

            }
            else if (band_count < 6) { // 5 bands
                colors = [  '#313695', '#313695', '#313695', '#313695', '#313695',
                            '#ffcdb1', '#e2a38d', '#b9976f', '#61906e', '#007597'];
            }
            else if (band_count < 7) { // 6 bands
                colors = [  '#313695', '#313695', '#313695', '#313695', '#313695', '#313695',
                            '#ffcdb1', '#e2a38d', '#b9976f', '#61906e', '#007597', '#00658c'];
            }
            else if (band_count < 8) { // 7 bands
                colors = [  '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695',
                            '#ffcdb1', '#e2a38d', '#b9976f', '#61906e', '#007597', '#00658c', '#005781'];
            }
            else if (band_count < 9) { // 8 bands
                colors = [  '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695',
                            '#ffcdb1', '#e2a38d', '#b9976f', '#61906e', '#007597', '#00658c', '#005781', '#004976'];
            }
            else if (band_count < 10) { // 9 bands
                colors = [  '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695',
                            '#ffcdb1', '#e2a38d', '#b9976f', '#61906e', '#007597', '#00658c', '#005781', '#004976', '#003b69'];
            }
            else { // 10 bands
                  colors = ['#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695',
                            '#ffcdb1', '#e2a38d', '#b9976f', '#61906e', '#007597', '#00658c', '#005781', '#004976', '#003b69', '#002d5a'];
            }


            // if (val < 80) { // 1 band
            //     colors = ['#313695', '#ffcdb1'];
            // }
            // else if (val < 140) { // 2 bands
            //     colors = ['#313695', '#313695', '#ffcdb1', '#e2a38d'];
            // }
            // else if (val < 200) { // 3 bands
            //     colors = ['#313695', '#313695', '#313695', '#ffcdb1', '#e2a38d', '#b9976f'];
            // }
            // else if (val < 260) { // 4 bands
            //     colors = [  '#313695', '#313695', '#313695', '#313695',
            //                 '#ffcdb1', '#e2a38d', '#b9976f', '#61906e'];
            //
            // }
            // else if (val < 320) { // 5 bands
            //     colors = [  '#313695', '#313695', '#313695', '#313695', '#313695',
            //                 '#ffcdb1', '#e2a38d', '#b9976f', '#61906e', '#007597'];
            // }
            // else if (val < 380) { // 6 bands
            //     colors = [  '#313695', '#313695', '#313695', '#313695', '#313695', '#313695',
            //                 '#ffcdb1', '#e2a38d', '#b9976f', '#61906e', '#007597', '#00658c'];
            // }
            // else if (val < 440) { // 7 bands
            //     colors = [  '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695',
            //                 '#ffcdb1', '#e2a38d', '#b9976f', '#61906e', '#007597', '#00658c', '#005781'];
            // }
            // else if (val < 500) { // 8 bands
            //     colors = [  '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695',
            //                 '#ffcdb1', '#e2a38d', '#b9976f', '#61906e', '#007597', '#00658c', '#005781', '#004976'];
            // }
            // else if (val < 560) { // 9 bands
            //     colors = [  '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695',
            //                 '#ffcdb1', '#e2a38d', '#b9976f', '#61906e', '#007597', '#00658c', '#005781', '#004976', '#003b69'];
            // }
            // else { // 10 bands
            //       colors = ['#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695', '#313695',
            //                 '#ffcdb1', '#e2a38d', '#b9976f', '#61906e', '#007597', '#00658c', '#005781', '#004976', '#003b69', '#002d5a'];
            // }


            return colors;

        };

        d3.select("#horizonChart").selectAll('.horizon')
            .data(wellList)
            .enter()
            .append('div')
            .attr('class', 'horizon')
            .each(function(d) {

                let count_above_200 = 0;
                let tmp_series = d.series.map(function (v) {
                    if (v > 200) {
                        // v = 0;
                        count_above_200 = count_above_200 + 1;
                    }
                    return v;
                });

                var max_val = tmp_series.reduce(function(a, b) {
                    if (a === undefined) {
                        a = 0;
                    }
                     if (b === undefined) {
                        b = 0;
                    }

                    return Math.max(+a, +b);
                });

                // max_val = max_val+20;

                let my_colors = select_colors(max_val);


                console.log("max val: " + max_val);

                d3.horizonChart()
                    .title("well "+d.id)
                    .colors(my_colors) // can not add 'rgb(0,0,60)' because the max saturated thickness is 548.9
                    .height(27)
                    .extent([0, 20 + Math.ceil(max_val / 60)*60])
                    .call(this, tmp_series)
                ;
            });

            d3.selectAll('.horizon')
                .on("mouseover", function(d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html("id:" + d['id'] +  "<br/>County: " + d.county + ", Water level:" + d.water_level)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");

                    comparisonChart.generateChart(self.selectedCounty, d.id);
                })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
                .insert('svg', ':nth-child(2)')
                  .attr('width', 14)
                  .attr('height', 14)
                  .attr('preserveAspectRatio', "none")
                  .attr("class", "horizon-chart-well")
                .append('circle')
                  .attr('cx', 6)
                  .attr('cy', 6)
                  .attr('stroke-width', 0.5)
                  .attr('stroke', '#000')
                  .attr('r', 5)
                  .style('fill', function (d) {
                      return d.color;
                  })
            ;


            var startYear = 95;
            var endYear = 117;
            var numMonths = (endYear-startYear)*12;

            // Draw x axis *********************************
            var mindate = new Date(1900+startYear,1,1),
              maxdate = new Date(1900+endYear,1,1);

            // define the y axis
            var xScale = d3.time.scale()
                  .domain([mindate, maxdate])    // values between for month of january
                  .range([0, 2*numMonths]);   // map these the the chart width = total width minus padding at both sides

            var xAxis = d3.svg.axis()
                    .orient("bottom")
                    .scale(xScale);

            var svgAxis = d3.select("#horizonChart").append("svg")
                    .attr("class", "horizonSVG")
                    .attr("width", 700)
                    .attr("height", 20)
                    .append("g")
                      .attr("transform", "translate(" + 85 + "," + 20 +")");

            svgAxis.append("g")
              .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
              .attr("dy", -13)
              .attr("transform", "translate(" + 0 + "," + -20 +")")
              .call(xAxis)
            ;
        }
};
