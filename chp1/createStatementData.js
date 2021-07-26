const { plays } = require('./data');

const playFor = (aPerformance) => {
  return plays[aPerformance.playId];
}

function amountFor(aperfomance) {
  let result = 0

  switch (aperfomance.play.type) {
    case 'tragedy':
      result = 40000;
      if (aperfomance.audience > 30) {
        result += 1000 * (aperfomance.audience - 30);
      }
      break;
    case 'comedy':
      result = 30000;
      if (aperfomance.audience > 20) {
        result += 1000 + 500 * (aperfomance.audience - 20);
      }
      result += 300 * aperfomance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르 : ${perf.play.type} `);
  }
  
  return result;
}

function volumeCreditsFor(aperfomance) {
  let result = 0;
  result += Math.max(aperfomance.audience - 30, 0);
  if ('comedy' === playFor(aperfomance).type) {
    result += Math.floor(aperfomance.audience / 5);
  }
  return result;
}

function totalVolumeCredits(invoice) {
  // 반복문을 파이프라인으로 바꾸기
  // let result = 0;
  // for (let perf of invoice.performances) {
  //   result += perf.volumeCredits;
  // }
  // return result;
  return invoice.performances.reduce((total, p) => {
    return total + p.volumeCredits;
  }, 0);
}

function totalAmount(invoice) {
  // 반복문을 파이프라인으로 바꾸기
  // let result = 0;
  // for (let perf of invoice.performances) {
  //   result += perf.amount;
  // }
  // return result;
  return invoice.performances.reduce((total, p) => {
    return total + p.amount;
  }, 0);
}

function enrichPerformance(aPerformance) {
  const result = { ...aPerformance };
  result.play = playFor(result);
  result.amount = amountFor(result);
  result.volumeCredits = volumeCreditsFor(result);
  return result;
}

const createStatementData = (invoice) => {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  return statementData;
}

module.exports = createStatementData;