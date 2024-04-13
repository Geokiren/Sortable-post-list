import { defineStore } from 'pinia';
import type { IPosts } from '@/types/posts';
import type { IHistory } from '@/types/history';
import { getPosts } from '@/services/postsService';
import type { AlertsType, IAlert } from '@/types/alerts';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as IPosts,
    history: [] as IHistory,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
    pagination: {
      page: 1,
      limit: 5
    } as { page: number; limit: number },
    alerts: [] as AlertsType
  }),

  getters: {
    historyReversed(state): IHistory {
      return state.history.reverse();
    }
  },

  actions: {
    async fetchPosts() {
      if (!this.apiBaseUrl) {
        this.alerts.push({
          id: crypto?.randomUUID ? crypto.randomUUID() : Date.now(),
          type: 'error',
          message: 'API URL not set'
        });

        return;
      }

      try {
        const data = await getPosts(this.pagination);

        this.posts.push(...data);
      } catch (error) {
        this.addAlert('Could not fetch posts. Please, try again later.', 'error');
      }
    },

    addAlert(message: string, type: IAlert['type']) {
      this.alerts.push({
        id: crypto?.randomUUID ? crypto.randomUUID() : Date.now(),
        type,
        message
      });
    },

    swapIndexes(from: number, to: number) {
      const fromItem = this.posts[from];

      this.history.push({
        id: crypto?.randomUUID ? crypto.randomUUID() : Date.now(),
        message: `Moved Post ${fromItem.id} from index ${from} to index ${to}`,
        posts: this.posts.slice()
      });

      this.posts[from] = this.posts[to];
      this.posts[to] = fromItem;
    },

    timeTravel(index: number) {
      this.posts.splice(0, this.posts.length, ...this.historyReversed[index].posts);
      this.history.length = this.historyReversed.length - 1 - index;
    }
  }
});
