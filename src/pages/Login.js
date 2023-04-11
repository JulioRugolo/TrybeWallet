import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';

const MIN_PASSWORDLENGHT = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isEmailValid: false,
    disabledButton: true,
  };

  handleEmail = ({ target }) => {
    if (target.type === 'email') {
      const testEmail = /\S+@\S+\.\S+/.test(target.value);
      this.setState({ email: target.value, isEmailValid: testEmail });
    }
  };

  handlePassword = ({ target }) => {
    this.setState({ [target.name]: target.value });
    const { isEmailValid } = this.state;
    if (target.value.length >= MIN_PASSWORDLENGHT && isEmailValid) {
      this.setState({ disabledButton: false });
    }
  };

  handleClick = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    console.log(history);
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, disabledButton } = this.state;
    return (
      <section className="loginPage">
        <form>
          <input
            type="email"
            name="email"
            onChange={ this.handleEmail }
            value={ email }
            data-testid="email-input"
            placeholder="Digite seu email"
          />

          <input
            type="password"
            name="password"
            onChange={ this.handlePassword }
            value={ password }
            data-testid="password-input"
            minLength="6"
            placeholder="Digite sua senha"
          />

          <button
            disabled={ disabledButton }
            onClick={ this.handleClick }
          >
            Entrar

          </button>

        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
