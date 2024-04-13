import { describe, it, expect, beforeEach } from 'vitest';
import { usePostsStore } from '@/stores/posts';
import { createPinia, setActivePinia } from 'pinia';

describe('Posts Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const mockPosts = [
    { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
    { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
    { id: 3, title: 'Post 3', body: 'Body 3', userId: 1 },
    { id: 4, title: 'Post 4', body: 'Body 4', userId: 1 },
    { id: 5, title: 'Post 5', body: 'Body 5', userId: 1 }
  ];

  it('Has correct initial state', () => {
    const { posts, history, alerts, pagination } = usePostsStore();

    expect(posts).toEqual([]);
    expect(history).toEqual([]);
    expect(alerts).toEqual([]);
    expect(pagination).toEqual({ page: 1, limit: 5 });
  });

  it('Has data on state posts after fetching', async () => {
    const { posts, alerts, fetchPosts } = usePostsStore();

    const fetchMock = async () => ({
      json: async () => mockPosts
    });

    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await fetchPosts();

    expect(posts.length).toEqual(5);
    expect(alerts.length).toEqual(0);
  });

  it('Has error alert', async () => {
    const { posts, alerts, fetchPosts } = usePostsStore();

    const fetchMock = async () => {
      throw new Error();
    };

    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await fetchPosts();

    expect(posts.length).toEqual(0);
    expect(alerts.length).toEqual(1);
    expect(alerts[0].message).toEqual('Could not fetch posts. Please, try again later.');
  });

  it('Can add alert', async () => {
    const { alerts, addAlert } = usePostsStore();

    addAlert('Could not fetch posts. Please, try again later.', 'error');

    expect(alerts.length).toEqual(1);
    expect(alerts[0].message).toEqual('Could not fetch posts. Please, try again later.');
  });

  it('Has swapped correctly the index in posts', async () => {
    const { posts, history, fetchPosts, swapIndexes } = usePostsStore();

    const fetchMock = async () => ({
      json: async () => mockPosts
    });

    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await fetchPosts();

    expect(posts[0].id).toEqual(1);
    expect(posts[2].id).toEqual(3);
    expect(history.length).toEqual(0);

    swapIndexes(0, 2);

    expect(posts[0].id).toEqual(3);
    expect(posts[2].id).toEqual(1);
    expect(history.length).toEqual(1);
    expect(history[0].message).toEqual('Moved Post 1 from index 0 to index 2');
    expect(JSON.stringify(history[0].posts)).toEqual(JSON.stringify(mockPosts));
  });

  it('Has time traveled correctly', async () => {
    const { posts, history, historyReversed, fetchPosts, swapIndexes, timeTravel } =
      usePostsStore();

    const fetchMock = async () => ({
      json: async () => mockPosts
    });

    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await fetchPosts();
    swapIndexes(0, 2);
    swapIndexes(4, 3);

    expect(history.length).toEqual(2);

    const reversedPosts = historyReversed[1].posts.slice();
    timeTravel(0);

    expect(history.length).toEqual(1);
    expect(JSON.stringify(posts)).toEqual(JSON.stringify(reversedPosts));
  });
});
