import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ActionItem from '../ActionItem.vue';
import { usePostsStore } from '@/stores/posts';
import { createPinia } from 'pinia';

describe('ActionItem', () => {
  const mockData = {
    id: 1,
    message: 'Action 1',
    posts: [{ id: 1, userId: 1, title: 'Post 1', body: 'Body 1' }]
  };

  it('Renders properly with the correct elements and text', () => {
    const store = usePostsStore(createPinia());
    const wrapper = mount(ActionItem, {
      store,
      props: { historyItem: mockData, index: 0, isLast: false }
    });

    const messageText = wrapper.find('[data-test="action-item-message"]').text();
    const buttonElement = wrapper.find('button');

    expect(messageText).toBe('Action 1');
    expect(buttonElement.exists()).toBe(true);
    expect(buttonElement.text()).toBe('Time travel');
  });

  it('Matches snapshot', () => {
    const store = usePostsStore(createPinia());
    const wrapper = mount(ActionItem, {
      store,
      props: { historyItem: mockData, index: 0, isLast: false }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
