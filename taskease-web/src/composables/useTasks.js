import { ref, computed } from "vue";
import { taskApi } from "../services/taskApi";

export function useTasks() {
    const tasks = ref([]);
    const loading = ref(false);
    const searchQuery = ref("");
    const filterStatus = ref("");
    const filterPriority = ref("");

    const fetchTasks = async () => {
        loading.value = true;
        try {
            const params = {};
            if (filterStatus.value) params.status = filterStatus.value;
            if (filterPriority.value) params.priority = filterPriority.value;
            if (searchQuery.value.trim()) params.search = searchQuery.value.trim();

            const res = await taskApi.getAll(params);
            tasks.value = res.data;
        } catch (err) {
            console.error("Failed to fetch tasks:", err);
        } finally {
            loading.value = false;
        }
    };

    const stats = computed(() => ({
        total: tasks.value.length,
        inProgress: tasks.value.filter((t) => t.status === "InProgress").length,
        done: tasks.value.filter((t) => t.status === "Done").length,
        highPriority: tasks.value.filter((t) => t.priority === "High").length,
    }));

    const saveTask = async (formData, editingId = null) => {
        const payload = {
            ...formData,
            dueDate: formData.dueDate
                ? new Date(formData.dueDate).toISOString()
                : null,
        };

        if (editingId) {
            await taskApi.update(editingId, payload);
        } else {
            await taskApi.create(payload);
        }
        await fetchTasks();
    };

    const changeTaskStatus = async (task, newStatus) => {
        await taskApi.updateStatus(task.id, newStatus);
        task.status = newStatus;
    };

    const removeTask = async (id) => {
        await taskApi.delete(id);
        await fetchTasks();
    };

    return {
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
    };
}
