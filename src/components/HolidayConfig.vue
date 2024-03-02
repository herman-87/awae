<template>
  <section>
    <div></div>
    {{ config.maximumOfDays }}
    {{ config.minimumOfDays }}
    {{ config.numberOfTime }}
    {{ config.status }}
    {{ config.description }}
    {{ config.holidayTypeId }}
    {{ config.id }}
    {{ config.isApplied }}
    {{ config.isDraft }}
    {{ config.isClose }}
  </section>

  <div>
    <!--  je cree le conge ensuite je cree une ou
plsr configuration(s) mais je ne peux activer qu'1e seule


  --></div>
</template>

<script setup lang="ts">
import type { HolidayConfig } from "@/domain/config";

defineProps<{
  config: HolidayConfig;
}>();
</script>
