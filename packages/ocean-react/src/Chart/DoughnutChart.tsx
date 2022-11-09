import React from 'react';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { DoughnutChartProps } from './types/DoughnutChart.types';
import { options } from './utils/chartUtils';
import classNames from 'classnames';

ChartJS.register(ArcElement);

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  title,
  subtitle,
  className,
  centerChartLabel,
  centerChartValue,
  data,
  ...rest
}) => {
  const formatedData = {
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: data.map((item) => item.color),
      },
    ],
  };

  return (
    <div className={classNames('ods-chart', className)} {...rest}>
      <div className="ods-chart__title-and-subtitle">
        <div className="ods-typography ods-typography__heading4">{title}</div>
        <div className="ods-typography ods-typography__description">
          {subtitle}
        </div>
      </div>
      <div className="ods-chart__canvas">
        <Doughnut data={{ ...formatedData }} options={options} />
        <div className="ods-chart__canvas__center-legend">
          <div className="ods-typography ods-typography__heading2">
            {centerChartValue}
          </div>
          <p className="ods-typography ods-typography__description">
            {centerChartLabel}
          </p>
        </div>
      </div>
      <div className="ods-chart__legend">
        {data.map((item) => (
          <div key={item.id} className="ods-chart__legend__row">
            <div>
              <div className="ods-chart__legend__row__description">
                <div
                  className="ods-chart__legend__row__description-circle"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
                <div className="ods-typography ods-typography__description">
                  {item.descriptionLevel1}
                </div>
              </div>
              {item.descriptionLevel2 && (
                <div className="ods-typography ods-typography__caption ods-chart__legend__row__description-level-2">
                  {item.descriptionLevel2}
                </div>
              )}
            </div>
            <div className="ods-chart__legend__row__percent">
              {Math.abs(item.percentage)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChart;
