/**
 * skenario pengujian untuk komponen CommentItem
 *
 * - komponen CommentItem
 * - harus menampilkan informasi komentar dengan benar (owner, avatar, date, content)
 * - harus memperbarui konten lokal jika properti comment berubah (rerender)
 * - harus memanggil onUpVote saat tombol upvote diklik pertama kali
 * - harus memanggil onNeutralVote saat upvote diklik kembali (pembatalan)
 * - harus memanggil onDownVote saat tombol downvote diklik pertama kali
 * - harus memanggil onNeutralVote saat downvote diklik kembali (pembatalan)
 * - harus memanggil onDownVote saat berpindah pilihan dari upvote ke downvote
 * - harus menampilkan alert dan tidak memicu callback jika user belum login
 *
 */

import { render, screen, fireEvent } from '@testing-library/react';
import CommentItem from './CommentItem';

// Mock dependencies
jest.mock('../utils/date', () => () => '2 days ago');
jest.mock('../utils/textUtils', () => ({
  safeHtml: (content) => ({ __html: content }),
}));

// Mock VoteButton agar kita fokus test logic CommentItem
jest.mock('./VoteButton', () => function VoteButtonMock({ type, count, onClick }) {
  return (
    <button
      type="button"
      data-testid={`vote-${type}`}
      onClick={onClick}
    >
      {type}
      -
      {count}
    </button>
  );
});

describe('komponen CommentItem', () => {
  const baseComment = {
    id: 'c1',
    owner: {
      name: 'John Doe',
      avatar: 'https://avatar.url/john.jpg',
    },
    createdAt: '2025-01-01T00:00:00Z',
    content: '<p>Hello</p>',
    upVotesBy: [],
    downVotesBy: [],
  };

  it('harus menampilkan informasi komentar dengan benar', () => {
    render(
      <CommentItem
        comment={baseComment}
        userId="user1"
        onUpVote={jest.fn()}
        onDownVote={jest.fn()}
        onNeutralVote={jest.fn()}
      />,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toHaveAttribute('src', 'https://avatar.url/john.jpg');
    expect(screen.getByText('2 days ago')).toBeInTheDocument();
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
  });

  it('harus memperbarui konten lokal jika properti comment berubah', () => {
    const { rerender } = render(
      <CommentItem
        comment={baseComment}
        userId="user1"
        onUpVote={jest.fn()}
        onDownVote={jest.fn()}
        onNeutralVote={jest.fn()}
      />,
    );

    const newComment = {
      ...baseComment,
      content: '<p>Updated</p>',
    };

    rerender(
      <CommentItem
        comment={newComment}
        userId="user1"
        onUpVote={jest.fn()}
        onDownVote={jest.fn()}
        onNeutralVote={jest.fn()}
      />,
    );

    expect(screen.getByText(/Updated/i)).toBeInTheDocument();
  });

  it('harus memanggil onUpVote saat tombol upvote diklik pertama kali', () => {
    const onUpVote = jest.fn();
    render(
      <CommentItem
        comment={baseComment}
        userId="user1"
        onUpVote={onUpVote}
        onDownVote={jest.fn()}
        onNeutralVote={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByTestId('vote-up'));
    expect(onUpVote).toHaveBeenCalledTimes(1);
  });

  it('harus memanggil onNeutralVote saat upvote diklik kembali (pembatalan)', () => {
    const onNeutralVote = jest.fn();
    const commentWithUpvote = {
      ...baseComment,
      upVotesBy: ['user1'],
    };

    render(
      <CommentItem
        comment={commentWithUpvote}
        userId="user1"
        onUpVote={jest.fn()}
        onDownVote={jest.fn()}
        onNeutralVote={onNeutralVote}
      />,
    );

    fireEvent.click(screen.getByTestId('vote-up'));
    expect(onNeutralVote).toHaveBeenCalledTimes(1);
  });

  it('harus memanggil onDownVote saat tombol downvote diklik pertama kali', () => {
    const onDownVote = jest.fn();
    render(
      <CommentItem
        comment={baseComment}
        userId="user1"
        onUpVote={jest.fn()}
        onDownVote={onDownVote}
        onNeutralVote={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByTestId('vote-down'));
    expect(onDownVote).toHaveBeenCalledTimes(1);
  });

  it('harus memanggil onNeutralVote saat downvote diklik kembali (pembatalan)', () => {
    const onNeutralVote = jest.fn();
    const commentWithDownvote = {
      ...baseComment,
      downVotesBy: ['user1'],
    };

    render(
      <CommentItem
        comment={commentWithDownvote}
        userId="user1"
        onUpVote={jest.fn()}
        onDownVote={jest.fn()}
        onNeutralVote={onNeutralVote}
      />,
    );

    fireEvent.click(screen.getByTestId('vote-down'));
    expect(onNeutralVote).toHaveBeenCalledTimes(1);
  });

  it('harus memanggil onDownVote saat berpindah pilihan dari upvote ke downvote', () => {
    const onDownVote = jest.fn();
    const commentWithUpvote = {
      ...baseComment,
      upVotesBy: ['user1'],
    };

    render(
      <CommentItem
        comment={commentWithUpvote}
        userId="user1"
        onUpVote={jest.fn()}
        onDownVote={onDownVote}
        onNeutralVote={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByTestId('vote-down'));
    expect(onDownVote).toHaveBeenCalledTimes(1);
  });

  it('harus menampilkan alert dan tidak memicu callback jika user belum login', () => {
    const onUpVote = jest.fn();
    const onDownVote = jest.fn();
    const onNeutralVote = jest.fn();
    global.alert = jest.fn();

    render(
      <CommentItem
        comment={baseComment}
        userId={null}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        onNeutralVote={onNeutralVote}
      />,
    );

    fireEvent.click(screen.getByTestId('vote-up'));
    fireEvent.click(screen.getByTestId('vote-down'));

    expect(global.alert).toHaveBeenCalledTimes(2);
    expect(onUpVote).not.toHaveBeenCalled();
    expect(onDownVote).not.toHaveBeenCalled();
    expect(onNeutralVote).not.toHaveBeenCalled();
  });
});
