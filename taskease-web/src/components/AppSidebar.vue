<script setup>
import { LayoutDashboard, Lock, Unlock, RotateCcw } from 'lucide-vue-next';

defineProps({
  isOwner: { type: Boolean, default: false },
});

const emit = defineEmits(['login', 'logout', 'reset-demo']);
</script>

<template>
  <aside class="w-64 bg-white border-r border-slate-200/80 hidden md:flex flex-col justify-between p-6">
    <div>
      <div class="flex items-center gap-3 mb-10">
        <div class="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
          T
        </div>
        <span class="text-xl font-bold tracking-tight text-slate-900">TaskEase</span>
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

    <div class="space-y-3">
      <!-- Status Card -->
      <div
        class="p-4 rounded-2xl border text-xs"
        :class="isOwner ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800' : 'bg-amber-50/60 border-amber-200 text-amber-800'"
      >
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2 h-2 rounded-full" :class="isOwner ? 'bg-emerald-500' : 'bg-amber-500'"></span>
          <p class="font-semibold">{{ isOwner ? 'Owner Mode' : 'Guest Sandbox' }}</p>
        </div>
        <p class="text-[11px] opacity-80 leading-relaxed">
          {{ isOwner ? 'Connected to Supabase PostgreSQL.' : 'Temporary demo mode. Changes are not saved to database.' }}
        </p>

        <button
          v-if="!isOwner"
          @click="emit('login')"
          class="mt-3 w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition cursor-pointer"
        >
          <Lock class="w-3.5 h-3.5" />
          Owner Login
        </button>

        <button
          v-else
          @click="emit('logout')"
          class="mt-3 w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 font-medium hover:bg-emerald-100/50 transition cursor-pointer"
        >
          <Unlock class="w-3.5 h-3.5" />
          Exit Owner Mode
        </button>
      </div>

      <button
        v-if="!isOwner"
        @click="emit('reset-demo')"
        class="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-100 transition cursor-pointer"
      >
        <RotateCcw class="w-3.5 h-3.5" />
        Reset Demo Data
      </button>
    </div>
  </aside>
</template>