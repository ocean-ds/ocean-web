export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  borderWidth: 0,
  cutout: '64%',
};

export const dataEmptyChart = [
  {
    color: '#F7F9FF',
    percentage: 100,
  },
];

export const mockedDoughnutData = [
  {
    id: 1,
    count: 35,
    percentage: 35,
    color: '#13BDBD',
    descriptionLevel1: 'A vencer',
    descriptionLevel2: 35,
  },
  {
    id: 2,
    count: 10,
    percentage: 10,
    color: '#FFA347',
    descriptionLevel1: 'Vencidos',
    descriptionLevel2: 10,
  },
  {
    id: 3,
    count: 50,
    percentage: 50,
    color: '#3DCC64',
    descriptionLevel1: 'Pagos',
    descriptionLevel2: 50,
  },
  {
    id: 4,
    count: 5,
    percentage: 5,
    color: '#F5456E',
    descriptionLevel1: 'Cancelados',
    descriptionLevel2: 5,
  },
];
