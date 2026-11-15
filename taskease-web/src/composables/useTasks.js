import { ref, computed } from 'vue';
import { taskApi } from '../services/taskApi';

const DEFAULT_GUEST_TASKS = [
  {
    id: 101,
    title: 'Explore TaskEase Sandbox',
    description: 'Try creating, editing, filtering, or deleting tasks. Changes here stay in your browser.',
    status: 'InProgress',
    priority: 'High',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
  },
  {
    id: 102,
    title: 'Review System Architecture',
    description: 'Built with ASP.NET Core 11, Vue 3, Tailwind CSS, and Supabase PostgreSQL.',
    status: 'Done',
    priority: 'Medium',
    dueDate: new Date().toISOString(),
  },
  {
    id: 103,
    title: 'Test Priority & Status Filters',
    description: 'Use the search bar or dropdowns above to filter task items.',
    status: 'Todo',
    priority: 'Low',
    dueDate: null,
  },
];

export function useTasks() {
  const isOwner = ref(!!sessionStorage.getItem('owner_pin'));
  const guestStore = ref(structuredClone(DEFAULT_GUEST_TASKS));
  const tasks = ref([]);
  const loading = ref(false);
  const searchQuery = ref('');
  const filterStatus = ref('');
  const filterPriority = ref('');

  const loginAsOwner = async (pin) => {
    await taskApi.verifyPin(pin);
    sessionStorage.setItem('owner_pin', pin);
    isOwner.value = true;
    await fetchTasks();
  };

  const logoutOwner = async () => {
    sessionStorage.removeItem('owner_pin');
    isOwner.value = false;
    await fetchTasks();
  };

  const resetGuestDemo = async () => {
    guestStore.value = structuredClone(DEFAULT_GUEST_TASKS);
    await fetchTasks();
  };

  const fetchTasks = async () => {
    loading.value = true;
    try {
      if (!isOwner.value) {
        // Guest Sandbox Mode: กรองข้อมูลจำลองในเครื่องเท่านั้น
        let result = [...guestStore.value];
        if (filterStatus.value) result = result.filter(t => t.status === filterStatus.value);
        if (filterPriority.value) result = result.filter(t => t.priority === filterPriority.value);
        if (searchQuery.value.trim()) {
          const q = searchQuery.value.trim().toLowerCase();
          result = result.filter(t => t.title.toLowerCase().includes(q));
        }
        tasks.value = result;
        return;
      }

      // Owner Mode: ดึงข้อมูลจริงจาก Supabase
      const params = {};
      if (filterStatus.value) params.status = filterStatus.value;
      if (filterPriority.value) params.priority = filterPriority.value;
      if (searchQuery.value.trim()) params.search = searchQuery.value.trim();

      const res = await taskApi.getAll(params);
      tasks.value = res.data;
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      if (err.response?.status === 401) {
        await logoutOwner();
      }
    } finally {
      loading.value = false;
    }
  };

  const stats = computed(() => ({
    total: tasks.value.length,
    inProgress: tasks.value.filter(t => t.status === 'InProgress').length,
    done: tasks.value.filter(t => t.status === 'Done').length,
    highPriority: tasks.value.filter(t => t.priority === 'High').length,
  }));

  const saveTask = async (formData, editingId = null) => {
    const payload = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
    };

    if (!isOwner.value) {
      if (editingId) {
        const idx = guestStore.value.findIndex(t => t.id === editingId);
        if (idx !== -1) guestStore.value[idx] = { ...guestStore.value[idx], ...payload };
      } else {
        guestStore.value.unshift({ id: Date.now(), ...payload });
      }
      await fetchTasks();
      return;
    }

    if (editingId) {
      await taskApi.update(editingId, payload);
    } else {
      await taskApi.create(payload);
    }
    await fetchTasks();
  };

  const changeTaskStatus = async (task, newStatus) => {
    if (!isOwner.value) {
      const target = guestStore.value.find(t => t.id === task.id);
      if (target) target.status = newStatus;
      task.status = newStatus;
      return;
    }

    await taskApi.updateStatus(task.id, newStatus);
    task.status = newStatus;
  };

  const removeTask = async (id) => {
    if (!isOwner.value) {
      guestStore.value = guestStore.value.filter(t => t.id !== id);
      await fetchTasks();
      return;
    }

    await taskApi.delete(id);
    await fetchTasks();
  };

  return {
    isOwner,
    tasks,
    loading,
    searchQuery,
    filterStatus,
    filterPriority,
    stats,
    loginAsOwner,
    logoutOwner,
    resetGuestDemo,
    fetchTasks,
    saveTask,
    changeTaskStatus,
    removeTask,
  };
}