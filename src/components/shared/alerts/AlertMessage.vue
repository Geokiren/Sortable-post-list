<template>
  <div class="alert flex items-center px-4 py-2 rounded-xl relative z-10" :class="classesCombined" data-test="alert-message">
    <div class="flex justify-center w-11/12">
        <div v-if="showMessage">{{ message }}</div>
    </div>

    <div class="flex justify-end" :class="isExpanded ? 'w-1/12' : 'w-full'" @click.stop="toggleExpansion">
      <CaretSvg :classes="variantCaret" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue';
  import CaretSvg from '../CaretSvg.vue';
  import type { IAlert } from '@/types/alerts';

  const props = defineProps<{
    classes?: string;
    variant: IAlert['type'];
    message: string;
  }>();

  const variantBackground = computed(() => {
    let variantBackground = '';
    if(props.variant === 'error') variantBackground = 'bg-red-500';
    if(props.variant === 'warning') variantBackground = 'bg-yellow-500';
    if(props.variant === 'success') variantBackground = 'bg-green-500'; 

    return variantBackground;
  });

  const varianText = computed(() => {
    let variantText = '';
    if(props.variant === 'error') variantText = 'text-red-100';
    if(props.variant === 'warning') variantText = 'text-yellow-100';
    if(props.variant === 'success') variantText = 'text-green-100';

    return variantText;
  });

  const variantCaret = computed(() => {
    let variantCaret = '';
    if(props.variant === 'error') variantCaret = 'fill-red-100';
    if(props.variant === 'warning') variantCaret = 'fill-yellow-100';
    if(props.variant === 'success') variantCaret = 'fill-green-100';

    return `${variantCaret} w-5 h-5 ${isExpanded.value ? 'rotate-90' : '-rotate-90'} cursor-pointer transition-all duration-500`;
  });

  const expansionClasses = computed(() => {
    return isExpanded.value ? 'w-full' : 'w-12';
  });

  const classesCombined = computed(() => {
    return `${props.classes} ${variantBackground.value} ${varianText.value} ${expansionClasses.value}`;
  });

  const isExpanded = ref(true);
  const showMessage = ref(true);

  watchEffect(() => {
    if(isExpanded.value) {
      setTimeout(() => {
        showMessage.value = true;
      }, 400);
    } else {
      showMessage.value = false;
    }
  });

  const toggleExpansion = () => {
    isExpanded.value = !isExpanded.value;
  }
</script>

<style scoped>
  .alert {
    transition: all 0.5s;
  }

  .alert.closed {
    width: 100%;
    transform: translateX(-100%);
  }

  .fade-enter-active {
    transition: height 0.5s;
  }

  .fade-enter, .fade-leave-to {
    height: 0;
  }
</style>