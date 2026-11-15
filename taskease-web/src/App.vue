<script setup>
import { ref, onMounted } from 'vue';
import { Plus } from 'lucide-vue-next';
import { useTasks } from './composables/useTasks';

import AppSidebar from './components/AppSidebar.vue';
import StatsGrid from './components/StatsGrid.vue';
import TaskFilterBar from './components/TaskFilterBar.vue';
import TaskTable from './components/TaskTable.vue';
import TaskFormModal from './components/TaskFormModal.vue';

const {
  tasks,
  loading,
  searchQuery,
  filterStatus,
  filterPriority,
  stats,
  fetchTasks,
  saveTask,
  changeTaskStatus,
  removeTask,
} = useTasks();

const isModalOpen = ref(false);
const selectedTask = ref(null);

const openCreateModal = () => {
  selectedTask.value = null;
  isModalOpen.value = true;
};

const openEditModal = (task) => {
  selectedTask.value = task;
  isModalOpen.value = true;
};

const handleFormSubmit = async (formData, editingId) => {
  try {
    await saveTask(formData, editingId);
    isModalOpen.value = false;
  } catch (err) {
    console.error('Failed to save task:', err);
  }
};

const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this task?')) return;
  try {
    await removeTask(id);
  } catch (err) {
    console.error('Failed to delete task:', err);
  }
};

onMounted(fetchTasks);
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex text-slate-800 font-sans">
    <AppSidebar />

    <main class="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Task Management</h1>
          <p class="text-sm text-slate-500 mt-1">Organize tasks, track progress, and manage priorities.</p>
        </div>
        <button
          @click="openCreateModal"
          class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
        >
          <Plus class="w-4 h-4" />
          New Task
        </button>
      </div>

      <!-- Summary Cards -->
      <StatsGrid :stats="stats" />

      <!-- Search & Filter -->
      <TaskFilterBar
        v-model:search="searchQuery"
        v-model:status="filterStatus"
        v-model:priority="filterPriority"
        @change="fetchTasks"
      />

      <!-- Task List Table -->
      <TaskTable
        :tasks="tasks"
        :loading="loading"
        @edit="openEditModal"
        @delete="handleDelete"
        @status-change="changeTaskStatus"
      />
    </main>

    <!-- Create / Edit Modal -->
    <TaskFormModal
      :is-open="isModalOpen"
      :task-to-edit="selectedTask"
      @close="isModalOpen = false"
      @submit="handleFormSubmit"
    />
  </div>
</template>