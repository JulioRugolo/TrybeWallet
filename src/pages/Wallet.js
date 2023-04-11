import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email, total = 0, currency = 'BRL' } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          Email:
          { ' ' }
          {email}
        </p>
        <p data-testid="total-field">
          Despesa Total:
          { ' ' }
          {total}
        </p>
        <p data-testid="header-currency-field">
          {currency}
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => (
  {
    email: state.user.email,
  }
);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
