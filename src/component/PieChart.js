import React, { useEffect } from "react";
import { VictoryPie } from "victory-pie";
import { useSelector, shallowEqual } from "react-redux";

const PieChart = () => {
  const { patient_list, filterm, chartData } = useSelector(
    (state) => ({
      patient_list: state.patient.patient_list,
      filter: state.patient.filter,
      chartData: state.patient.chartData,
    }),
    shallowEqual
  );
  //   const myData = [
  //     { x: "male", y: 300 },
  //     { x: "female", y: 1900 },
  //   ];
  useEffect(() => {
    console.log("chartData", chartData);
  }, [chartData]);
  return (
    <div>
      <VictoryPie
        data={chartData}
        colorScale={[
          "blue  ",
          "deeppink ",
          "mediumspringgreen",
          "mediumorchid ",
          "darkorange ",
          "coral ",
          "saddlebrown ",
          "darkkhaki ",
          "navy ",
          "cornflowerblue ",
          "mediumturquoise ",
        ]}
        radius={100}
      />
    </div>
  );
};

export default PieChart;
