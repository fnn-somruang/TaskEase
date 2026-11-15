<script setup>
import { ref, watch } from 'vue';
import { X } from 'lucide-vue-next';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  taskToEdit: { type: Object, default: null },
});

const emit = defineEmits(['close', 'submit']);

const form = ref({
  title: '',
  description: '',
  status: 'Todo',
  priority: 'Medium',
  dueDate: '',
});

watch(
  () => props.isOpen,
  (open) => {
    if (!open) return;
    if (props.taskToEdit) {
      form.value = {
        title: props.taskToEdit.title,
        description: props.taskToEdit.description || '',
        status: props.taskToEdit.status,
        priority: props.taskToEdit.priority,
        dueDate: props.taskToEdit.dueDate ? props.taskToEdit.dueDate.split('T')[0] : '',
      };
    } else {
      form.value = {
        title: '',
        description: '',
        status: 'Todo',
        priority: 'Medium',
        dueDate: '',
      };
    }
  }
);

const handleSubmit = () => {
  if (!form.value.title.trim()) return;
  emit('submit', { ...form.value }, props.taskToEdit?.id || null);
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-lg font-bold text-slate-900">
          {{ taskToEdit ? 'Edit Task' : 'Create New Task' }}
        </h3>
        <button @click="emit('close')" class="text-slate-400 hover:text-slate-600 cursor-pointer">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Task Title *</label>
          <input
            v-model="form.title"
            required
            type="text"
            placeholder="e.g., Implement authentication flow"
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Description</label>
          <textarea
            v-model="form.description"
            rows="2"
            placeholder="Add extra context or notes..."
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Status</label>
            <select v-model="form.status" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl cursor-pointer">
              <option value="Todo">To Do</option>
              <option value="InProgress">In Progress</option>
              <option value="Review">In Review</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
            <select v-model="form.priority" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl cursor-pointer">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Due Date</label>
          <input
            v-model="form.dueDate"
            type="date"
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div class="flex justify-end gap-2 pt-3">
          <button
            type="button"
            @click="emit('close')"
            class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs cursor-pointer"
          >
            {{ taskToEdit ? 'Save Changes' : 'Create Task' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>