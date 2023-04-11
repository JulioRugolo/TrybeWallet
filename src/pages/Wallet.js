import React from 'react';
import Header from '../components/Header/Header';
import WalletForm from '../components/walletForm/WalletForm';
// import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <WalletForm />
      </>
    );
  }
}
export default Wallet;
