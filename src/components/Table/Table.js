import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import { removeExpense } from '../../redux/actions';

const FIXED_NUMBER = 2;

class Table extends Component {
  getExchange = (currency, index) => {
    const { expenses } = this.props;
    const arrayExchangeRates = Object.entries(expenses[index].exchangeRates);
    let resultObject = {};
    arrayExchangeRates.filter((exchangeCoin) => {
      if (exchangeCoin[0] === currency) {
        resultObject = { ...exchangeCoin[1] };
        return exchangeCoin;
      }
      return exchangeCoin;
    });
    return resultObject;
  };

  removeExpense = (id) => {
    const { dispatch, expenses } = this.props;
    const removedExpense = expenses.filter((item) => item.id !== id);
    dispatch(removeExpense(removedExpense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr className="header">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.map((item, index) => (
            <tr key={ item.id }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{Number(item.value).toFixed(2)}</td>
              <td>{this.getExchange(item.currency, index).name}</td>
              <td>
                {
                  parseFloat(this.getExchange(item.currency, index).ask)
                    .toFixed(FIXED_NUMBER)
                }
              </td>
              <td>
                {
                  (parseFloat(this.getExchange(item.currency, index).ask)
                * parseFloat(item.value)).toFixed(FIXED_NUMBER)
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.removeExpense(item.id) }
                >
                  Excluir

                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    );
  }
}

const mapStateToProps = (state) => (
  {
    expenses: state.wallet.expenses,
  }
);

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      USD: PropTypes.shape({
        code: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Table);
