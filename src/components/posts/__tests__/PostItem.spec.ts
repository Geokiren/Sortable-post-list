import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import PostItem from '../PostItem.vue';
import CaretSvg from '@/components/shared/CaretSvg.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('PostItem', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Renders properly with the correct content', () => {
    const wrapper = mount(PostItem, { props: { id: 1, index: 1, size: 5 } });

    const tag = wrapper.element.tagName.toLowerCase();
    const caret = wrapper.findComponent(CaretSvg);

    expect(tag).toBe('div');
    expect(wrapper.text()).toBe('Post 1');
    expect(caret.exists()).toBe(true);
  });

  it('Renders properly with one carret element', () => {
    const wrapper = mount(PostItem, { props: { id: 1, index: 0, size: 5 } });

    const carets = wrapper.findAll('[data-test="caret-svg"]');

    expect(carets.length).toBe(1);
  });

  it('Renders properly with two carret elements', () => {
    const wrapper = mount(PostItem, { props: { id: 1, index: 1, size: 5 } });

    const carets = wrapper.findAll('[data-test="caret-svg"]');

    expect(carets.length).toBe(2);
  });

  it('Matches snapshot', () => {
    const wrapper = mount(PostItem, { props: { id: 1, index: 0, size: 5 } });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
