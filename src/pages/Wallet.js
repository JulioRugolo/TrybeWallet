import React from 'react';
import Header from '../components/Header/Header';
import WalletForm from '../components/walletForm/WalletForm';
import Table from '../components/Table/Table';
import './Wallet.css';
// import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <WalletForm />
        <Table />
      </main>
    );
  }
}
export default Wallet;
