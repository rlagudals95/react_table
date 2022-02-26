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
  //   const myData = [
  //     { x: "male", y: 300 },
  //     { x: "female", y: 1900 },
  //   ];
  // 10은 100에서 몇 퍼센트?
  //   result = (10 / 100) * 100;
  //   document.write(result, "%<br />");
  // 출력 결과: 10%
  useEffect(() => {
    console.log("chartData", chartData);
    let _total = 0;
    let percent;
    for (let i = 0; i < chartData.length; i++) {
      percent = (chartData[i].y / 1000) * 100;
      //chartData[i].x = percent;
      //chartData[i].z = 111;

      console.log(parseInt(percent));
    }
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
