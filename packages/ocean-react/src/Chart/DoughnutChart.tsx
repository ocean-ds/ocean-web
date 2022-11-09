import React, { ReactNode } from 'react';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames';

export type DoughnutChartProps = {
  /**
   * Determines the chart title
   * @requires
   */
  title: string;
  /**
   * Determines the chart subtitle
   * @requires
   */
  subtitle: string;
  /**
   * Determines the center chart value
   */
  centerChartValue?: string;
  /**
   * Determines the center chart label
   */
  centerChartLabel?: string;
  /**
   * Determines graphic counts and legends
   * @requires
   */
  data: IDoughnutChartData[];
  /**
   * ClassName to overwrite default style
   * @default null
   */
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

export type IDoughnutChartData = {
  id: string | number;
  count: number;
  percentage: number;
  color: string;
  descriptionLevel1: string | number | ReactNode;
  descriptionLevel2?: string | number | ReactNode;
};

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    borderWidth: 0,
    cutout: '64%',
  };

  return (
    <div className={classNames('ods-chart', className)} {...rest}>
      <div className="ods-chart__title-and-subtitle">
        <div className="ods-typography ods-typography__heading4">{title}</div>
        <div className="ods-typography ods-typography__caption">{subtitle}</div>
      </div>
      <div className="ods-chart__canvas">
        <Doughnut
          height={180}
          width={180}
          data={{ ...formatedData }}
          options={options}
        />
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
