import React from 'react';
import { render, fireEvent, act, getAllByText } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
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

describe('#screen/Profile', () => {
  test('should load the api data and show it on the screen', async () => {
    const { getAllByText } = render(
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
    expect(getAllByText('Caso 1')).toHaveLength(4);
    expect(getAllByText('R$ 120.00')).toHaveLength(4);
    expect(getAllByText('Caso 2')).toHaveLength(1);
    expect(getAllByText('R$ 130.00')).toHaveLength(1);
  });
});
