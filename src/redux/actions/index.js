// Coloque aqui suas actions

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const saveEmail = (email) => ({ type: SAVE_EMAIL, payload: email });

export const saveCurrencies = (currencies) => (
  {
    type: SAVE_CURRENCIES,
    payload: currencies,
  });

const saveRates = (state, data) => (
  { type: SAVE_EXPENSES,
    payload: state,
    rates: data,
  }
);

export function fetchRates(state) {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(saveRates(state, data)));
  };
}

export const totalSum = (value) => (
  { type: UPDATE_TOTAL,
    payload: value,
  }
);

export const removeExpense = (id) => ({
  type: REMOVE_ITEM,
  payload: id,
});
