<script setup>
import { ListTodo, Clock, CheckCircle2, AlertCircle } from "lucide-vue-next";

defineProps({
    stats: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between">
            <div>
                <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Total Tasks
                </p>
                <p class="text-2xl font-bold text-slate-900 mt-1">{{ stats.total }}</p>
            </div>
            <div class="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                <ListTodo class="w-5 h-5" />
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between">
            <div>
                <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    In Progress
                </p>
                <p class="text-2xl font-bold text-indigo-600 mt-1">
                    {{ stats.inProgress }}
                </p>
            </div>
            <div class="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Clock class="w-5 h-5" />
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between">
            <div>
                <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Completed
                </p>
                <p class="text-2xl font-bold text-emerald-600 mt-1">{{ stats.done }}</p>
            </div>
            <div class="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 class="w-5 h-5" />
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between">
            <div>
                <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    High Priority
                </p>
                <p class="text-2xl font-bold text-rose-600 mt-1">
                    {{ stats.highPriority }}
                </p>
            </div>
            <div class="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertCircle class="w-5 h-5" />
            </div>
        </div>
    </div>
</template>
