<script setup>
import { Search } from 'lucide-vue-next';

const search = defineModel('search', { type: String });
const status = defineModel('status', { type: String });
const priority = defineModel('priority', { type: String });

const emit = defineEmits(['change']);
</script>

<template>
  <div class="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs mb-6 flex flex-col sm:flex-row gap-3">
    <div class="relative flex-1">
      <Search class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      <input
        v-model="search"
        @input="emit('change')"
        type="text"
        placeholder="Search tasks by title..."
        class="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
      />
    </div>

    <select
      v-model="status"
      @change="emit('change')"
      class="px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 cursor-pointer"
    >
      <option value="">All Statuses</option>
      <option value="Todo">To Do</option>
      <option value="InProgress">In Progress</option>
      <option value="Review">In Review</option>
      <option value="Done">Done</option>
    </select>

    <select
      v-model="priority"
      @change="emit('change')"
      class="px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 cursor-pointer"
    >
      <option value="">All Priorities</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
  </div>
</template>