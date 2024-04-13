<template>
  <div class="action-item card flex justify-between items-center p-2 md:p-3 lg:p-4" :class="{ 'border-b-2': !isLast }" data-test="action-item">

    <div class="action-item-message text-text-primary text-xs :md:text-lg lg:text-xl font-semibold mr-2" data-test="action-item-message">{{ historyItem.message }}</div>

    <button class="button bg-primary-button text-primary-button-text" @click="onTimeTravel">Time travel</button>
    
  </div>
</template>

<script setup lang="ts">
  import type { IHistoryItem } from '@/types/history';
  import { usePostsStore } from '@/stores/posts';

  const props = defineProps<{
    historyItem: IHistoryItem,
    isLast: boolean,
    index: number,
  }>();

  const { timeTravel }: { timeTravel: (index: number) => void } = usePostsStore();

  const onTimeTravel = () => {
    timeTravel(props.index);
  }
</script>