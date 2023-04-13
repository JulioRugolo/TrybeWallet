import React from 'react';
import Header from '../components/Header/Header';
import WalletForm from '../components/walletForm/WalletForm';
import Table from '../components/Table/Table';
// import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <WalletForm />
        <Table />
      </>
    );
  }
}
export default Wallet;
