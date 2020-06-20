import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import api from '../services/api';
import Register from '../pages/Register';

const apiMock = new MockAdapter(api);

const wait = (amount = 0) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

describe('@screen/Register', () => {
  beforeEach(() => {
    window.alert = jest.fn();
  });
  test('#there must be 5 inputs and a button', () => {
    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const inputNomeOng = getByPlaceholderText(/nome da ong/i);
    const inputEmail = getByPlaceholderText(/email/i);
    const inputWhatsapp = getByPlaceholderText(/whatsapp/i);
    const inputCidade = getByPlaceholderText(/cidade/i);
    const inputUf = getByPlaceholderText(/uf/i);
    const buttonCadastrar = getByText(/cadastrar/i);

    expect(inputNomeOng).toBeTruthy();
    expect(inputEmail).toBeTruthy();
    expect(inputWhatsapp).toBeTruthy();
    expect(inputCidade).toBeTruthy();
    expect(inputUf).toBeTruthy();
    expect(buttonCadastrar).toBeTruthy();
  });

  test('#should register a new ONG', async () => {
    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    apiMock.onPost('/ongs').reply(200, {
      id: '58fd4cab',
    });
    await actWait();
    const inputNomeOng = getByPlaceholderText(/nome da ong/i);
    const inputEmail = getByPlaceholderText(/email/i);
    const inputWhatsapp = getByPlaceholderText(/whatsapp/i);
    const inputCidade = getByPlaceholderText(/cidade/i);
    const inputUf = getByPlaceholderText(/uf/i);
    const buttonCadastrar = getByText(/cadastrar/i);

    fireEvent.change(inputNomeOng, { target: { value: 'APAD' } });
    fireEvent.change(inputEmail, { target: { value: 'contato@apad.com.br' } });
    fireEvent.change(inputWhatsapp, { target: { value: '4700000000' } });
    fireEvent.change(inputCidade, { target: { value: 'Rio do Sul' } });
    fireEvent.change(inputUf, { target: { value: 'SC' } });

    fireEvent.click(buttonCadastrar);

    await actWait();
    expect(window.alert).toBeCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('Seu ID de acess: 58fd4cab');
  });
});
