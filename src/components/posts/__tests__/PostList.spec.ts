import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PostList from '../PostList.vue';
import { DOMWrapper } from '@vue/test-utils';
import { usePostsStore } from '@/stores/posts';
import { createPinia } from 'pinia';

describe('PostList', () => {
  const mockData = [
    { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
    { id: 2, userId: 2, title: 'Post 2', body: 'Body 2' },
    { id: 3, userId: 3, title: 'Post 3', body: 'Body 3' },
    { id: 4, userId: 4, title: 'Post 4', body: 'Body 4' },
    { id: 5, userId: 5, title: 'Post 5', body: 'Body 5' }
  ];

  it('Renders properly with the correct elements and text', () => {
    const store = usePostsStore(createPinia());
    const wrapper = mount(PostList, { store });

    const tag = wrapper.element.tagName.toLowerCase();
    const listElement: DOMWrapper<Element> = wrapper.find('[data-test="transition-group-posts"]');
    const listChildren = listElement.findAll('div');
    const element = wrapper.find('h2');
    const text = element.text();

    expect(tag).toBe('section');
    expect(listElement.exists()).toBe(true);
    expect(listChildren.length).toBe(0);
    expect(text).toBe('Sortable Post List');
  });

  it('Renders properly with the correct post elements', () => {
    const store = usePostsStore(createPinia());
    const posts = (store.$state.posts = mockData);
    const wrapper = mount(PostList, { store: { posts } });

    const postElements = wrapper.findAll('[data-test="post-item"]');

    expect(postElements.length).toBe(5);
  });

  it('Matches snapshot', () => {
    const store = usePostsStore(createPinia());
    const posts = (store.$state.posts = mockData);
    const wrapper = mount(PostList, { store: { posts } });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
