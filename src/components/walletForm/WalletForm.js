import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getCurrencies from '../../services/getCurrencies';
import { saveCurrencies, fetchRates, totalSum } from '../../redux/actions';

const timeOut = 8;

class WalletForm extends Component {
  state = {
    currenciesAbr: [],
    expense: {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    },
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const arrayCurrencies = await getCurrencies();
    const removeUSDT = Object.keys(arrayCurrencies).filter((coin) => coin !== 'USDT');
    dispatch(saveCurrencies(removeUSDT));
    this.setState({ currenciesAbr: removeUSDT });
  }

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (prevProps.expenses !== expenses) {
      this.updateTotal();
    }
  }

  handleSelect = ({ target }) => {
    this.setState((prevState) => (
      {
        expense: {
          ...prevState.expense,
          [target.name]: target.value,
        },
      }));
  };

  handleChange = ({ target }) => {
    this.setState((prevState) => (
      {
        expense: {
          ...prevState.expense,
          [target.name]: target.value,
        },
      }));
  };

  updateTotal = () => {
    const { expenses, dispatch } = this.props;
    const resultSum = expenses.reduce((acc, curr, index) => acc + (expenses[index].value
      * Object.values(expenses[index].exchangeRates)
        .find((info) => expenses[index].currency === info.code).ask), 0)
      .toFixed(2);

    dispatch(totalSum(resultSum));
  };

  handleClick = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { expense } = this.state;
    this.setState((prevState) => ({
      currenciesAbr: [...prevState.currenciesAbr],
      expense: {
        id: prevState.expense.id + 1,
        value: prevState.expense.value,
        description: prevState.expense.description,
        currency: prevState.expense.currency,
        method: prevState.expense.method,
        tag: prevState.expense.tag,
      },
    }), () => dispatch(fetchRates(expense)));
    this.setState({
      expense: {
        id: expense.id + 1,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    }, () => {
      setTimeout(() => {
        this.updateTotal();
      }, timeOut);
    });
  };

  render() {
    const {
      currenciesAbr,
      expense: {
        value,
        currency,
        method,
        tag,
        description,
      },
    } = this.state;

    return (
      <form>
        <input
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
          placeholder="Valor"
        />

        <select
          name="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.handleSelect }
        >
          {currenciesAbr.map((currencie, index) => (
            <option value={ currencie } key={ index }>{currencie}</option>
          ))}
        </select>

        <select
          name="method"
          value={ method }
          data-testid="method-input"
          onChange={ this.handleSelect }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChange={ this.handleSelect }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <input
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
          placeholder="Descrição"
        />

        <button
          onClick={ this.handleClick }
          type="button"
        >
          Adicionar despesa
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => (
  {
    total: state.wallet.total,
    expenses: state.wallet.expenses,
  }
);

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.string.isRequired,
  exchangeRates: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
