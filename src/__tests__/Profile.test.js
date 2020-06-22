import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter, useHistory } from 'react-router-dom';
import api from '../services/api';
import Profile from '../pages/Profile';

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

describe('#screen/Profile', () => {
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });
  test('should load the api data and show it on the screen', async () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    apiMock.onGet('profile').reply(200, [
      {
        id: 2,
        title: 'Caso 1',
        description: 'Detalhes do caso',
        value: 120,
        ong_id: '7f6b2e68',
      },
      {
        id: 3,
        title: 'Caso 1',
        description: 'Detalhes do caso',
        value: 120,
        ong_id: '7f6b2e68',
      },
      {
        id: 4,
        title: 'Caso 1',
        description: 'Detalhes do caso',
        value: 120,
        ong_id: '7f6b2e68',
      },
      {
        id: 5,
        title: 'Caso 1',
        description: 'Detalhes do caso',
        value: 120,
        ong_id: '7f6b2e68',
      },
      {
        id: 6,
        title: 'Caso 2',
        description: 'Detalhes de um caso de teste',
        value: 130,
        ong_id: '7f6b2e68',
      },
    ]);
    await actWait();
    expect(getAllByTestId('incident')).toHaveLength(5);
  });
  test('shound delete incidente', async () => {
    const { getByTestId, getAllByTestId } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    apiMock.onGet('profile').reply(200, [
      {
        id: 2,
        title: 'Caso para ser deletado',
        description: 'Detalhes do caso para ser deletado',
        value: 150,
        ong_id: '7f6b2e68',
      },
      {
        id: 3,
        title: 'Caso para ser deletado',
        description: 'Detalhes do caso para ser deletado',
        value: 150,
        ong_id: '7f6b2e68',
      },
    ]);
    apiMock.onDelete('incidents/2').reply(204);
    await actWait();
    expect(getAllByTestId('incident')).toHaveLength(2);
    fireEvent.click(getByTestId('remove-button-2'));
    await actWait();

    expect(getAllByTestId('incident')).toHaveLength(1);
  });
  test('should show an alert with warning that it was not possible to delete', async () => {
    const { getByTestId, getAllByTestId } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    apiMock.onGet('profile').reply(200, [
      {
        id: 2,
        title: 'Caso para ser deletado',
        description: 'Detalhes do caso para ser deletado',
        value: 150,
        ong_id: '7f6b2e68',
      },
      {
        id: 3,
        title: 'Caso para ser deletado',
        description: 'Detalhes do caso para ser deletado',
        value: 150,
        ong_id: '7f6b2e68',
      },
    ]);
    apiMock.onDelete('incidents/2').reply(400);
    await actWait();
    expect(getAllByTestId('incident')).toHaveLength(2);
    fireEvent.click(getByTestId('remove-button-2'));
    await actWait();
    expect(window.alert).toBeCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith(
      'Erro ao deletar caso, tente novamente'
    );
  });
  test('should log out of the application', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    apiMock.onGet('profile').reply(200, []);
    await actWait();
    const pushSpy = jest
      .spyOn(useHistory(), 'push')
      .mockImplementation()
      .mockClear();
    const buttonLogout = getByTestId('logout-button');

    expect(buttonLogout).toBeTruthy();

    fireEvent.click(buttonLogout);

    expect(localStorage.clear).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(pushSpy).toHaveBeenCalledWith('/');
  });
});
