import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Style.css';

class Header extends Component {
  render() {
    const { email, total = 0, globalCurrency = 'BRL' } = this.props;
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
            { total }
          </span>
        </p>
        <p data-testid="header-currency-field">
          {globalCurrency}
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.string,
  globalCurrency: PropTypes.string,
};

Header.defaultProps = {
  globalCurrency: 'BRL',
  total: 0,
};

const mapStateToProps = (state) => (
  {
    email: state.user.email,
    total: state.wallet.total,
  }
);

export default connect(mapStateToProps)(Header);
