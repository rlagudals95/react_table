import React, { useEffect, useState } from "react";
import { VictoryPie, datum } from "victory-pie";
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

  const [total, setTotal] = useState(0);

  useEffect(() => {
    //console.log("chartData :", chartData);
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
        width={400}
        height={400}
        //labels={(datum) => ${datum.y / total}%}
        style={{ labels: { fontSize: 15 } }}
      />
    </div>
  );
};

export default PieChart;
