import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LayoutContainer from '../LayoutContainer.vue';
import { DOMWrapper } from '@vue/test-utils';

describe('LayoutContainer', () => {
  it('Renders properly with classes through props', () => {
    const wrapper = mount(LayoutContainer, { props: { classes: 'bg-red' } });

    expect(wrapper.classes()).toContain('bg-red');
  });

  it('Renders properly with the correct element tag through slots', () => {
    const wrapper = mount(LayoutContainer, {
      slots: {
        default: '<div class="test">Test</div>'
      }
    });

    const slotElement: DOMWrapper<Element> = wrapper.find('.test');
    const tag = slotElement.element.tagName.toLowerCase();

    expect(tag).toBe('div');
  });

  it('Renders properly with the correct element text through slots', () => {
    const wrapper = mount(LayoutContainer, {
      slots: {
        default: '<div class="test">Test</div>'
      }
    });

    const slotElement: DOMWrapper<Element> = wrapper.find('.test');
    const text = slotElement.element.textContent;

    expect(text).toBe('Test');
  });

  it('Matches snapshot', () => {
    const wrapper = mount(LayoutContainer);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
