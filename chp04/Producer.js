module.exports = class Producer {
  constructor(aProvince, data) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production || 0;
  }

  get name() { return this._name; }
  get cost() { return this._cost; }
  set cost(value) { this._cost = value; }

  get production() { return this._production; }
  set production(value) {
    const amount = parseInt(value);
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this._province.totalProduction += newProduction - this._production;
    this._province = newProduction;
  }
}
