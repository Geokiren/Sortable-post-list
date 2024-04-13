<template>
  <div class="post-item card p-2 md:p-4 h-24 lg:h-32 mb-4 md:mb-6 flex justify-between items-center text-text-primary text-xl font-semibold" data-test="post-item">
    <div>Post {{ id }}</div>

    <div class="flex flex-col h-full" :class="buttonsContainerClass">
      <button v-if="showUp" class="caret" @click="getUp">
        <CaretSvg classes="w-5 h-5 fill-secondary" />
      </button>

      <button v-if="showDown" class="caret rotate-180" @click="getDown">
        <CaretSvg classes="w-5 h-5 fill-secondary" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import CaretSvg from '../shared/CaretSvg.vue';
  import { usePostsStore } from '@/stores/posts';

  const props = defineProps<{
    id: number,
    index: number,
    size: number,
  }>();

  const { swapIndexes }: { swapIndexes: (from: number, to: number) => void } = usePostsStore();

  const getDown = () => {
    if (typeof props.index === 'number') {
      swapIndexes(props.index, props.index + 1);
    }
  }

  const getUp = () => {
    if (typeof props.index === 'number') {
      swapIndexes(props.index, props.index - 1);
    }
  }

  const showUp = computed(() => typeof props.index === 'number' && props.index > 0);
  const showDown = computed(() => typeof props.index === 'number' && props.index < props.size - 1);
  const buttonsContainerClass = computed(() => (showUp.value && showDown.value) ? 'justify-between' : 'justify-center');
</script>