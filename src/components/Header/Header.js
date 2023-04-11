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
        <p data-testid="total-field">
          Despesa Total:
          { ' ' }
          {total}
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
  total: PropTypes.string.isRequired,
  globalCurrency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => (
  {
    email: state.user.email,
  }
);

export default connect(mapStateToProps)(Header);
