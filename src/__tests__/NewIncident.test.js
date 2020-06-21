import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter, useHistory } from 'react-router-dom';
import api from '../services/api';
import NewIncident from '../pages/NewIncident';

const apiMock = new MockAdapter(api);

const wait = (amount = 0) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

jest.mock('react-router-dom', () => {
  const historyObj = {
    push: jest.fn(),
  };

  return {
    ...jest.requireActual('react-router-dom'),
    useHistory: () => historyObj,
  };
});

describe('@screen/logon', () => {
  beforeEach(() => {
    jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {})
      .mockClear();
  });

  test('should have two input and one button', () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <NewIncident />
      </MemoryRouter>
    );
    const inputTitulo = getByPlaceholderText(/Título do caso/i);
    const inputDescricao = getByPlaceholderText(/Descrição/i);
    const inputValor = getByPlaceholderText(/Valor em reais/i);
    const buttonCadastrar = getByText('Cadastrar');

    expect(inputTitulo).toBeTruthy();
    expect(inputDescricao).toBeTruthy();
    expect(inputValor).toBeTruthy();
    expect(buttonCadastrar).toBeTruthy();
  });

  test('should not create new incident', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <NewIncident />
      </MemoryRouter>
    );
    apiMock.onPost('incidents').reply(400, {
      statusCode: 400,
      error: 'Bad Request',
      message: '"authorization" is required',
      validation: {
        source: 'headers',
        keys: ['authorization'],
      },
    });
    await actWait();
    const buttonCadastrar = getByText('Cadastrar');

    fireEvent.click(buttonCadastrar);
    await actWait();
    expect(window.alert).toBeCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith(
      'Erro ao cadastrar caso, tente novamente'
    );
  });

  test('should allow register new incident', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <NewIncident />
      </MemoryRouter>
    );
    apiMock.onPost('incidents').reply(200, {
      id: 34,
    });
    const pushSpy = jest
      .spyOn(useHistory(), 'push')
      .mockImplementation()
      .mockClear();
    await actWait();
    const buttonCadastrar = getByText('Cadastrar');

    fireEvent.click(buttonCadastrar);
    await actWait();
    expect(pushSpy).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(pushSpy).toHaveBeenCalledWith('/profile');
  });
});
