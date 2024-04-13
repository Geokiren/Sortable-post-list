<template>
  <section id="action-list" class="flex flex-col w-full md:w-1/2 rounded-md shadow-lg h-fit bg-primary">
    <div class="flex items-center bg-white p-2 md:p-4 rounded-t-md">
      <h2 class="text-xl lg:text-3xl font-bold text-action-title p-3 tracking-wide">List of actions commited</h2>
    </div>

    <div class="flex flex-col p-3 md:p-5 lg:p-8">
      <TransitionGroup name="action-list" tag="div" v-if="!!historyReversed.length" class="transition-group-actions">
        <ActionItem v-for="(item, index) in historyReversed" :key="item.id" :historyItem="item" :isLast="isLast(index)" :index="index" />
      </TransitionGroup>

      <div v-else class="text-text-primary text-xl font-semibold text-center" data-test="no-actions">No actions commited</div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { usePostsStore } from '@/stores/posts';
  import type { IHistory } from '@/types/history';
  import ActionItem from './ActionItem.vue';
  import { computed } from 'vue';

  const { history }: { history: IHistory } = usePostsStore();

  const historyReversed = computed(() => [...history].reverse());

  const isLast = (index: number) => index === historyReversed.value.length - 1;

</script>

<style scoped>
  .action-list-enter-active,
  .action-list-leave-active {
    transition: all 0.5s;
  }

  .action-list-enter-from,
  .action-list-leave-to {
    opacity: 0;
    transform: translateX(60px);
  }
</style>