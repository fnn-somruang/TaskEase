<script setup>
import { LayoutDashboard } from "lucide-vue-next";
</script>

<template>
  <aside
    class="w-64 bg-white border-r border-slate-200/80 hidden md:flex flex-col justify-between p-6"
  >
    <div>
      <div class="flex items-center gap-3 mb-10">
        <div
          class="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm"
        >
          T
        </div>
        <span class="text-xl font-bold tracking-tight text-slate-900"
          >TaskEase</span
        >
      </div>

      <nav class="space-y-1.5">
        <a
          href="#"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-indigo-50/80 text-indigo-600 font-medium text-sm"
        >
          <LayoutDashboard class="w-4 h-4" />
          Dashboard Overview
        </a>
      </nav>
    </div>

    <div
      class="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs text-slate-500"
    >
      <div class="flex items-center gap-2 mb-1">
        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        <p class="font-semibold text-slate-700">API Connected</p>
      </div>
      <p class="truncate">localhost:5067 • Supabase</p>
    </div>
  </aside>
</template>
