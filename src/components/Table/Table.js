import React, { Component } from 'react';
import { connect } from 'react-redux';

const FIXED_NUMBER = 3;

class Table extends Component {
  getExchange = (currency, index) => {
    const { expenses } = this.props;
    const arrayExchangeRates = Object.values(expenses[index].exchangeRates);
    const exchange = arrayExchangeRates.find((exchangeCoin) => {
      if (exchangeCoin.code === currency) {
        return exchangeCoin;
      }
      return exchangeCoin;
    });
    return exchange;
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
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

        {expenses.map((item, index) => (
          <tr key={ index }>
            <td>{item.description}</td>
            <td>{item.tag}</td>
            <td>{item.method}</td>
            <td>{item.value}</td>
            <td>{item.currency}</td>
            <td>
              {Number(this.getExchange(item.currency, index).ask).toFixed(FIXED_NUMBER) }
            </td>
            <td>
              {Number(this.getExchange(item.currency, index).ask).toFixed(FIXED_NUMBER)
              * item.value}
            </td>
            <td>
              {Number(this.getExchange(item.currency, index).ask).toFixed(FIXED_NUMBER)
              * item.value}
            </td>
            <td>
              {this.getExchange(item.currency, index).codein }
            </td>

          </tr>
        ))}

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
