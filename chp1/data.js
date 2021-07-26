const plays = {
  hamlet: {
    name: 'hamlet',
    type: 'tragedy',
  },
  'as-like': {
    name: 'as-like',
    type: 'comedy',
  },
  othello: {
    name: 'othello',
    type: 'tragedy',
  }
};

const invoices = [
  {
    customer: "seokLee",
    performances: [
      {
        playId: 'hamlet',
        audience: 55,
      },
      {
        playId: 'as-like',
        audience: 35,
      },
      {
        playId: 'othello',
        audience: 45,
      }
    ],
  }
];

module.exports ={
  plays,
  invoices,
}
