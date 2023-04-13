import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';

describe('Testa o componente login', () => {
  test('testa se o campo de email e senha e botão é renderizado', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  test('Testa se o botão só é habilitado após o preenchimento dos campos', () => {
    renderWithRouterAndRedux(<App />);

    const user = 'teste@teste.com';
    const password = '1234566';
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', {
      name: /Entrar/i,
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, user);

    expect(loginButton).toBeDisabled();
    userEvent.type(passwordInput, password);
    expect(loginButton).not.toBeDisabled();
    userEvent.click(loginButton);
  });
});

describe('Testa á página Wallet', () => {
  test('testa o componente header', () => {
    renderWithRouterAndRedux(<Wallet />);
    const filledEmail = screen.getByText(/email:/i);
    expect(filledEmail).toBeInTheDocument();

    const totalExpenses = screen.getByTestId('total-field');
    expect(totalExpenses).toBeInTheDocument();

    const currency = screen.getByTestId('header-currency-field');
    expect(currency).toBeInTheDocument();
  });
  test('testa o componente header', async () => {
    const initialState = {
      user: {
        email: 'teste@teste.com',
      },
    };
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const valueInput = screen.getByTestId('value-input');
    const emailHeader = screen.getByText(/email: teste@teste.com/i);

    expect(emailHeader).toBeInTheDocument();
    userEvent.type(valueInput, '10');
    await waitFor(() => {
      const selectCurrencie = screen.getByTestId('currency-input');
      expect(selectCurrencie).toBeInTheDocument();

      const selectOptionOne = selectCurrencie.querySelector('option:first-of-type');
      expect(selectOptionOne.value).toBe('USD');
    });
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();
    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();
    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'fralda');
    const addButton = screen.getByRole('button', { name: 'Adicionar despesa' });
    userEvent.click(addButton);

    await waitFor(() => {
      const decritpion = screen.getByRole('cell', {
        name: /fralda/i,
      });

      const value = screen.getByRole('cell', {
        name: /10.00/i,
      });

      expect(decritpion).toBeInTheDocument();
      expect(value).toBeInTheDocument();
      const deleteButton = screen.getByTestId('delete-btn');

      userEvent.click(deleteButton);
    });
  });
});
