import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Style.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          Email:
          { ' ' }
          {email}
        </p>
        <p>
          Despesa Total:
          { ' ' }
          <span data-testid="total-field">
            {
              expenses.reduce((acc, curr, index) => acc + (expenses[index].value
                * Object.values(expenses[index].exchangeRates)
                  .find((info) => expenses[index].currency === info.code).ask), 0)
                .toFixed(2)
            }
          </span>
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
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

const mapStateToProps = (state) => (
  {
    email: state.user.email,
    total: state.wallet.total,
    expenses: state.wallet.expenses,
  }
);

export default connect(mapStateToProps)(Header);
