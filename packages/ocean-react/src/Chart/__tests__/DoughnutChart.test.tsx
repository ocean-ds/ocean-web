import React from 'react';

import { render } from '@testing-library/react';

import DoughnutChart from '../DoughnutChart';
import { mockedDoughnutData } from '../utils/chartUtils';
import { DoughnutChartProps } from '../types/DoughnutChart.types';

const setup = (
  props: DoughnutChartProps = {
    title: 'Doughnut chart title',
    subtitle: 'Doughnut chart subtitle',
    centerChartValue: 'Doughnut center value',
    centerChartLabel: 'Doughnut center label',
    data: mockedDoughnutData,
  }
) => {
  return render(<DoughnutChart {...props} />);
};

test('renders element properly', () => {
  const { container } = setup();
  expect(document.querySelector('.ods-chart')).toBeInTheDocument();
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-chart"
    >
      <div
        class="ods-chart__title-and-subtitle"
      >
        <div
          class="ods-typography ods-typography__heading4"
        >
          Doughnut chart title
        </div>
        <div
          class="ods-typography ods-typography__description"
        >
          Doughnut chart subtitle
        </div>
      </div>
      <div
        class="ods-chart__canvas"
      >
        <canvas
          height="150"
          role="img"
          width="300"
        />
        <div
          class="ods-chart__canvas__center-legend"
        >
          <div
            class="ods-typography ods-typography__heading2"
          >
            Doughnut center value
          </div>
          <p
            class="ods-typography ods-typography__description"
          >
            Doughnut center label
          </p>
        </div>
      </div>
      <div
        class="ods-chart__legend"
      >
        <div
          class="ods-chart__legend__row"
        >
          <div>
            <div
              class="ods-chart__legend__row__description"
            >
              <div
                class="ods-chart__legend__row__description-circle"
                style="background-color: rgb(19, 189, 189);"
              />
              <div
                class="ods-typography ods-typography__description"
              >
                A vencer
              </div>
            </div>
            <div
              class="ods-typography ods-typography__caption ods-chart__legend__row__description-level-2"
            >
              35
            </div>
          </div>
          <div
            class="ods-chart__legend__row__percent"
          >
            35
            %
          </div>
        </div>
        <div
          class="ods-chart__legend__row"
        >
          <div>
            <div
              class="ods-chart__legend__row__description"
            >
              <div
                class="ods-chart__legend__row__description-circle"
                style="background-color: rgb(255, 163, 71);"
              />
              <div
                class="ods-typography ods-typography__description"
              >
                Vencidos
              </div>
            </div>
            <div
              class="ods-typography ods-typography__caption ods-chart__legend__row__description-level-2"
            >
              10
            </div>
          </div>
          <div
            class="ods-chart__legend__row__percent"
          >
            10
            %
          </div>
        </div>
        <div
          class="ods-chart__legend__row"
        >
          <div>
            <div
              class="ods-chart__legend__row__description"
            >
              <div
                class="ods-chart__legend__row__description-circle"
                style="background-color: rgb(61, 204, 100);"
              />
              <div
                class="ods-typography ods-typography__description"
              >
                Pagos
              </div>
            </div>
            <div
              class="ods-typography ods-typography__caption ods-chart__legend__row__description-level-2"
            >
              50
            </div>
          </div>
          <div
            class="ods-chart__legend__row__percent"
          >
            50
            %
          </div>
        </div>
        <div
          class="ods-chart__legend__row"
        >
          <div>
            <div
              class="ods-chart__legend__row__description"
            >
              <div
                class="ods-chart__legend__row__description-circle"
                style="background-color: rgb(245, 69, 110);"
              />
              <div
                class="ods-typography ods-typography__description"
              >
                Cancelados
              </div>
            </div>
            <div
              class="ods-typography ods-typography__caption ods-chart__legend__row__description-level-2"
            >
              5
            </div>
          </div>
          <div
            class="ods-chart__legend__row__percent"
          >
            5
            %
          </div>
        </div>
      </div>
    </div>
  `);
});
