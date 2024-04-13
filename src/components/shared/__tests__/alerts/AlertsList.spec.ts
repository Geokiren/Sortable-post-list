import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AlertsList from '../../alerts/AlertsList.vue';
import { usePostsStore } from '@/stores/posts';
import { createPinia } from 'pinia';
import type { AlertsType } from '@/types/alerts';

describe('AlertsList', () => {
  const mockData: AlertsType = [
    { id: 1, type: 'error', message: 'Error 1' },
    { id: 2, type: 'warning', message: 'Warning 1' }
  ];

  it('Renders properly when no store data', () => {
    const store = usePostsStore(createPinia());

    const wrapper = mount(AlertsList, { store });

    expect(wrapper.html()).toBe('<!--v-if-->');
  });

  it('Renders properly with the correct elements and text when having store data', () => {
    const store = usePostsStore(createPinia());

    const alerts = (store.$state.alerts = mockData);

    const wrapper = mount(AlertsList, {
      store: { alerts }
    });

    const alertElements = wrapper.findAll('[data-test="alert-message"]');

    expect(alertElements.length).toBe(2);
    expect(alertElements[0].text()).toBe('Error 1');
    expect(alertElements[1].text()).toBe('Warning 1');
  });

  it('Matches snapshot', () => {
    const store = usePostsStore(createPinia());

    const alerts = (store.$state.alerts = mockData);

    const wrapper = mount(AlertsList, { store: { alerts } });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
