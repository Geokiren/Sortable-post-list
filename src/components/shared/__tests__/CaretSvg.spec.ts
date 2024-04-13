import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CaretSvg from '../CaretSvg.vue';

describe('CaretSvg', () => {
  const wrapper = mount(CaretSvg, { props: { classes: 'fill-red' } });

  it('Renders properly with classes through props', () => {
    expect(wrapper.classes()).toContain('fill-red');
  });

  it('Renders properly with the correct element tag', () => {
    const tag = wrapper.element.tagName.toLowerCase();

    expect(tag).toBe('svg');
  });

  it('Matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
