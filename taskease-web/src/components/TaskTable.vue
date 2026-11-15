<script setup>
import { Pencil, Trash2, Calendar } from 'lucide-vue-next';

defineProps({
  tasks: { type: Array, required: true },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(['edit', 'delete', 'status-change']);

const priorityBadge = (priority) => {
  switch (priority) {
    case 'High': return 'bg-rose-50 text-rose-600 border-rose-200';
    case 'Medium': return 'bg-amber-50 text-amber-600 border-amber-200';
    default: return 'bg-emerald-50 text-emerald-600 border-emerald-200';
  }
};

const statusColor = (status) => {
  switch (status) {
    case 'Done': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'InProgress': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'Review': return 'bg-purple-50 text-purple-700 border-purple-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200/70 shadow-xs overflow-hidden">
    <div v-if="loading" class="p-12 text-center text-sm text-slate-400">
      Loading tasks...
    </div>

    <div v-else-if="tasks.length === 0" class="p-12 text-center">
      <p class="text-slate-600 font-medium">No tasks found</p>
      <p class="text-xs text-slate-400 mt-1">Click "+ New Task" above to create your first task.</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-slate-200/70 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">
            <th class="py-3.5 px-6">Task</th>
            <th class="py-3.5 px-4">Status</th>
            <th class="py-3.5 px-4">Priority</th>
            <th class="py-3.5 px-4">Due Date</th>
            <th class="py-3.5 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-sm">
          <tr v-for="task in tasks" :key="task.id" class="hover:bg-slate-50/80 transition">
            <td class="py-4 px-6">
              <p class="font-semibold text-slate-900" :class="{ 'line-through text-slate-400': task.status === 'Done' }">
                {{ task.title }}
              </p>
              <p v-if="task.description" class="text-xs text-slate-500 mt-0.5 line-clamp-1">
                {{ task.description }}
              </p>
            </td>

            <td class="py-4 px-4">
              <select
                :value="task.status"
                @change="emit('status-change', task, $event.target.value)"
                :class="statusColor(task.status)"
                class="text-xs font-medium px-2.5 py-1 rounded-lg border cursor-pointer focus:outline-none"
              >
                <option value="Todo">To Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Review">In Review</option>
                <option value="Done">Done</option>
              </select>
            </td>

            <td class="py-4 px-4">
              <span :class="priorityBadge(task.priority)" class="text-xs font-medium px-2.5 py-1 rounded-full border">
                {{ task.priority }}
              </span>
            </td>

            <td class="py-4 px-4 text-xs text-slate-500">
              <div v-if="task.dueDate" class="flex items-center gap-1.5">
                <Calendar class="w-3.5 h-3.5 text-slate-400" />
                {{ formatDate(task.dueDate) }}
              </div>
              <span v-else class="text-slate-300">—</span>
            </td>

            <td class="py-4 px-6 text-right">
              <div class="inline-flex items-center gap-1">
                <button
                  @click="emit('edit', task)"
                  class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer"
                  title="Edit Task"
                >
                  <Pencil class="w-4 h-4" />
                </button>
                <button
                  @click="emit('delete', task.id)"
                  class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                  title="Delete Task"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>