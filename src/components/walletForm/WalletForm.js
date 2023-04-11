import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getCurrencies from '../../services/getCurrencys';
import { saveCurrencies } from '../../redux/actions';

class WalletForm extends Component {
  state = {
    currenciesAbr: [],
    valueInput: '',
    // currency: '',
    // paymentMethod: '',
    // category: '',
    description: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const arrayCurrencies = await getCurrencies();
    const removeUSDT = Object.keys(arrayCurrencies).filter((coin) => coin !== 'USDT');
    dispatch(saveCurrencies(removeUSDT));
    this.setState({ currenciesAbr: removeUSDT });
  }

  render() {
    const {
      currenciesAbr,
      valueInput,
      // currency,
      // paymentMethod,
      // category,
      description,
    } = this.state;

    return (
      <form>
        <input
          data-testid="value-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
          placeholder="Valor"
        />

        <input
          data-testid="description-input"
          name="valueInput"
          value={ valueInput }
          onChange={ this.handleChange }
          placeholder="Descrição"
        />

        <select
          name="currenciesSelect"
          data-testid="currency-input"
        >
          {currenciesAbr.map((currencie, index) => (
            <option value={ currencie } key={ index }>{currencie}</option>
          ))}
        </select>

        <select name="paymentMethod" data-testid="method-input">
          <option value="money">Dinheiro</option>
          <option value="creditCard">Cartão de crédito</option>
          <option value="debitCard">Cartão de débito</option>
        </select>

        <select name="tag" data-testid="tag-input">
          <option value="food">Alimentação</option>
          <option value="leisure">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>

      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(WalletForm);
