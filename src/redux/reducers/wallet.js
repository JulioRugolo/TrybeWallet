import { SAVE_CURRENCIES, SAVE_EXPENSES, UPDATE_TOTAL } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return ({
      ...state,
      currencies: action.payload,
    });

  case UPDATE_TOTAL:
    return ({
      ...state,
      total: action.payload,
    });

  case SAVE_EXPENSES:
    return ({
      ...state,
      expenses: [...state.expenses, { ...action.payload, exchangeRates: action.rates }],
      // expenses: [...state.expenses, {
      //   ...action.payload,
      //   exchangeRates: action.rates,
      // }],
    });
  default:
    return state;
  }
};

export default wallet;
