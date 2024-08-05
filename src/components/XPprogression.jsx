import { useRef, useEffect } from "react";
import React from "react";

export function XPprogression(props) {
  console.log(props);
  const chartRef = useRef();

  useEffect(() => {
    if (chartRef.current) {
      let containerWidth = chartRef.current.parentElement.clientWidth;

      const updateChart = () => {
        d3.select(chartRef.current).selectAll("*").remove();

        // Sort the timeline data
        const sortedTimeline = props.Data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        // Map data to chart data points
        const chartDataPoints = sortedTimeline.map((item) => ({
          x: new Date(item.createdAt),
          y: item.amount,
        }));

        // Calculate chart dimensions
        const chartWidth = containerWidth * 0.95;
        const chartHeight = containerWidth * 0.3;
        const margin = {
          top: containerWidth * 0.01,
          right: containerWidth * 0.01,
          bottom: containerWidth * 0.03,
          left: containerWidth * 0.06,
        };

        // Find the maximum and minimum values for x and y
        const maxX = Math.max(...chartDataPoints.map((point) => point.x));
        const maxY = Math.max(...chartDataPoints.map((point) => point.y));

        // Create an SVG element
        const svg = d3
          .select(chartRef.current)
          .attr("width", chartWidth)
          .attr("height", chartHeight);

        // Create scales for x and y
        const xScale = d3
          .scaleTime()
          .domain([new Date(sortedTimeline[0].createdAt), maxX])
          .range([margin.left, chartWidth - margin.right]);

        const yScale = d3
          .scaleLinear()
          .domain([0, maxY])
          .range([chartHeight - margin.bottom, margin.top]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale).tickFormat((d) => {
          if (d >= 1000) {
            return d / 1000 + "k";
          } else {
            return d;
          }
        });

        svg
          .append("g")
          .attr("transform", `translate(0, ${chartHeight - margin.bottom})`)
          .call(xAxis)
          .selectAll("text")
          .attr("class", "axis-text");

        svg
          .append("g")
          .attr("transform", `translate(${margin.left}, 0)`)
          .call(yAxis)
          .selectAll("text")
          .attr("class", "axis-text");
        /*
        // X axis label
        svg
          .append("text")
          .attr(
            "transform",
            `translate(${chartWidth / 2}, ${chartHeight + 10})`
          )
          .style("text-anchor", "middle")
          .style("fill", "rgba(255, 255, 255, 0.644)")
          .text("Time");

        // Y axis label
        svg
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 5)
          .attr("x", 0 - chartHeight / 2)
          .style("text-anchor", "middle")
          .style("fill", "rgba(255, 255, 255, 0.644)")
          .text("XP");
          */
        // Create line
        const line = d3
          .line()
          .x((d) => xScale(d.x))
          .y((d) => yScale(d.y));

        // Append path for the line chart
        svg
          .append("path")
          .datum(chartDataPoints)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 2)
          .attr("d", line);

        // Add circles for data points
        const dataPoints = svg
          .selectAll("g")
          .data(chartDataPoints)
          .enter()
          .append("g")
          .attr("transform", (d) => `translate(${xScale(d.x)}, ${yScale(d.y)})`)
          .on("mouseover", function (event, d) {
            d3.select(this).select("circle").style("opacity", 1); // Show the circle on hover
            d3.select(this)
              .append("text")
              .attr("x", -10)
              .attr("y", -10)
              .style("fill", "rgba(255, 255, 255, 0.644)")
              .text(
                `(${d.x.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}, ${d.y})`
              )
              .attr("class", "axis-text");
          })
          .on("mouseout", function (event) {
            d3.select(this).select("circle").style("opacity", 0); // Hide the circle when not hovered
            d3.select(this).selectAll("text").remove(); // Remove the text label
          });

        dataPoints
          .append("circle")
          .attr("r", 5)
          .style("fill", "rgba(255, 255, 255, 0.644)")
          .style("opacity", 0);
      };

      updateChart(); // Initial chart setup

      const handleResize = () => {
        containerWidth = chartRef.current.parentElement.clientWidth;
        updateChart();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [props.Data]);

  return (
    <div className="XPprogression-container graph">
      <p>XP Progression</p>
      <svg className="chart-container" ref={chartRef}></svg>
    </div>
  );
}
