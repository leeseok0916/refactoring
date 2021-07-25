const { statement } = require('./statement');
const { plays, invoices } = require('./data');

describe('statement test', () => {
  test('statement test', () => {
    const result = statement(invoices[0], plays);
    expect(`청구 내역 (고객명: seokLee)\nhamlet: $650.00 (55 석)\nas-like: $490.00 (35 석)\nothello: $550.00 (45 석)\n총액: $1,690.00\n적립 포인트: 52점`).toBe(result);
  });
});