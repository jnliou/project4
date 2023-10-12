let modelPredictionCounts = {{ model_prediction_counts_json}};
    let userPredictionCounts = {{ user_prediction_counts_json}};
document.getElementById("submitButton").addEventListener("click", function(){
        const data = modelPredictionCounts.map((d, i) => ({
            submission: i + 1,
            model: d,
            user: userPredictionCounts[i]
        }));
    // D3.js code to render the bar chart
    const svg = d3.select("#predictionChart");
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);
    const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain(data.map(d => d.submission));
    y.domain([0, d3.max(data, d => Math.max(d.model, d.user))]);
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Predictions Count");
    g.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.submission))
        .attr("y", d => y(d.model))
        .attr("width", x.bandwidth() / 2)
        .attr("height", d => height - y(d.model))
        .attr("fill", "steelblue");
    g.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.submission) + x.bandwidth() / 2)
        .attr("y", d => y(d.user))
        .attr("width", x.bandwidth() / 2)
        .attr("height", d => height - y(d.user))
        .attr("fill", "orange");