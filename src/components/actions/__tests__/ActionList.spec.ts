import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ActionList from '../ActionList.vue';
import { DOMWrapper } from '@vue/test-utils';
import { usePostsStore } from '@/stores/posts';
import { createPinia } from 'pinia';

describe('ActionList', () => {
  const mockData = [
    { id: 1, message: 'Action 1', posts: [] },
    { id: 2, message: 'Action 2', posts: [] },
    { id: 3, message: 'Action 3', posts: [] }
  ];

  it('Renders properly with the correct elements and text when no store data', () => {
    const store = usePostsStore(createPinia());

    const wrapper = mount(ActionList, { store });

    const tag = wrapper.element.tagName.toLowerCase();
    const titleElement: DOMWrapper<Element> = wrapper.find('h2');
    const text = titleElement.text();
    const noActionsElement: DOMWrapper<Element> = wrapper.find('[data-test="no-actions"]');

    expect(tag).toBe('section');
    expect(text).toBe('List of actions commited');
    expect(noActionsElement.exists()).toBe(true);
    expect(noActionsElement.text()).toBe('No actions commited');
  });

  it('Renders properly with the correct elements and text when having store data', () => {
    const store = usePostsStore(createPinia());

    const history = (store.$state.history = mockData);

    const wrapper = mount(ActionList, {
      store: { history },
      computed: { historyReversed: () => history.reverse() }
    });

    const actionItemElements = wrapper.findAll('[data-test="action-item"]');
    const historyReversedComputed = wrapper.vm.$options.computed.historyReversed.call(wrapper.vm);

    expect(actionItemElements.length).toBe(3);
    expect(historyReversedComputed[0].id).toBe(3);
  });

  it('Matches snapshot', () => {
    const store = usePostsStore(createPinia());

    const history = (store.$state.history = mockData);

    const wrapper = mount(ActionList, { store: { history } });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
