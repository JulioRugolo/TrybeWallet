import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';

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
    console.log(resultObject);
    return resultObject;
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
          {expenses.map((item, index) => (
            <tr key={ index }>
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
                <button>Editar</button>
                <button>Excluir</button>
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
  expenses: PropTypes.string.isRequired,
  exchangeRates: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Table);
