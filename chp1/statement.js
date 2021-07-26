const { plays } = require('./data');

const playFor = (aPerformance) => {
  return plays[aPerformance.playId];
}

function amountFor(aperfomance) {
  let result = 0

  switch (playFor(aperfomance).type) {
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
      throw new Error(`알 수 없는 장르 : ${playFor(aperfomance).type} `);
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

function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(aNumber/100);
}

function totalVolumeCredits(invoice) {
  let result = 0;
  for (let perf of invoice.performances) {
    result += volumeCreditsFor(perf);
  }
  return result;
}

function totalAmount(invoice) {
  let result = 0;
  for (let perf of invoice.performances) {
    result += amountFor(perf);
  }
  return result;
}

const renderPlainText = (data) => {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} 석)\n`;
  }

  result += `총액: ${usd(totalAmount(data))}\n`;
  result += `적립 포인트: ${totalVolumeCredits(data)}점`;
  return result;
};

const statement = (invoice) => {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances;
  return renderPlainText(statementData);
};

module.exports = {
  statement,
}






