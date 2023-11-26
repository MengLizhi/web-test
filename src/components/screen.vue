<script setup lang="ts">
  import { NInputNumber, NForm, NFormItem, NButton } from 'naive-ui';
  import { reactive } from 'vue';
  import { watch } from 'vue';
  const maxWidth = 1920;
  const maxHeight = 1080;
  const minVal = 1;
  const form = reactive({
    x: 0,
    y: 0,
    w: 1,
    h: 1,
  });

  watch(
    () => form.x,
    (v) => {
      form.w = v + form.w > maxWidth ? maxWidth - v : form.w;
    }
  );
  watch(
    () => form.w,
    (v) => {
      form.x = v + form.x > maxWidth ? maxWidth - v : form.x;
    }
  );

  watch(
    () => form.y,
    (v) => {
      form.h = v + form.h > maxHeight ? maxHeight - v : form.h;
    }
  );

  watch(
    () => form.h,
    (v) => {
      form.y = v + form.y > maxHeight ? maxHeight - v : form.y;
    }
  );

  function submit() {}
</script>
<template>
  <div class="w-full flex flex-col items-center justify-center">
    <div class="w-full xl:max-w-2xl lg:max-w-xl sm:max-w-sm">
      <h3 class="text-xl">{{ $t('register.title') }}</h3>
      <NForm :model="form" ref="formRef">
        <NFormItem path="username" :label="'x'">
          <NInputNumber
            v-model:value="form.x"
            :min="0"
            :max="maxWidth - minVal"
          />
        </NFormItem>
        <NFormItem path="username" :label="'y'">
          <NInputNumber
            v-model:value="form.y"
            :min="0"
            :max="maxHeight - minVal"
          />
        </NFormItem>
        <NFormItem path="username" :label="'w'">
          <NInputNumber v-model:value="form.w" :min="minVal" :max="maxWidth" />
        </NFormItem>
        <NFormItem path="username" :label="'h'">
          <NInputNumber v-model:value="form.h" :min="minVal" :max="maxHeight" />
        </NFormItem>
        <NButton id="submit-btn" @click="submit">{{
          $t('register.submit')
        }}</NButton>
      </NForm>
    </div>
  </div>
</template>
