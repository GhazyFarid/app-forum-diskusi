import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import ThreadItem from '../components/ThreadItem';

// Dummy reducer untuk kebutuhan storybook
// eslint-disable-next-line no-unused-vars
const dummyReducer = (state, _action) => state ?? {};

const store = configureStore({
  reducer: {
    voteThread: dummyReducer,
  },
});

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
};

const Template = (args) => <ThreadItem {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  userId: 'user-1',
  thread: {
    id: 'thread-1',
    title: 'Ini judul thread contoh',
    body: 'Ini isi thread contoh, panjangnya bisa beberapa baris untuk testing preview html.',
    category: 'General',
    createdAt: new Date().toISOString(),
    ownerName: 'Golden',
    upVotesBy: ['user-1'],
    downVotesBy: [],
    totalComments: 5,
  },
};

export const Guest = Template.bind({});
Guest.args = {
  userId: '',
  thread: {
    id: 'thread-2',
    title: 'Thread untuk guest (belum login)',
    body: 'Guest tidak bisa vote, harus login dulu.',
    category: 'Help',
    createdAt: new Date().toISOString(),
    ownerName: 'Anonymous',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
};
