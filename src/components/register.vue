<script setup lang="ts">
  import {
    NForm,
    NFormItem,
    NInput,
    FormRules,
    NButton,
    FormInst,
  } from 'naive-ui';
  import { ref } from 'vue';
  import { i18n } from '../i18n';
  import { useApi } from '../api/api';

  import { watch } from 'vue';
import { computed } from 'vue';

  const { t: $t } = i18n.global;
  const emit = defineEmits<{
    (e: 'submit', v: boolean): void;
  }>();

  const form = ref({
    username: '',
    pwd: '',
    phone: '',
    code: '',
  });
  const formRef = ref<FormInst>();
  const rules: FormRules = {
    username: [
      {
        trigger: 'blur',
        required: true,
        message: $t('register.username_empty'),
      },
      {
        trigger: ['input','blur'],
        validator: (_, v: string) => {
          const reg = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9_]{1,25}/);
          return reg.test(v);
        },
        message: $t('register.username_format'),
      },
    ],
    pwd: [
      {
        trigger: 'blur',
        required: true,
        message: $t('register.password_empty'),
      },
      {
        trigger: ['input','blur'],
        validator: (_, v: string) => {
          const reg = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9_&@ ]{5,29}/);
          return reg.test(v);
        },
        message: $t('register.password_format'),
      },
    ],
    phone: [
      {
        trigger: 'blur',
        required: true,
        message: $t('register.phone_empty'),
      },
      {
        trigger: ['input','blur'],
        asyncValidator: async (_, v: string, cb) => {
          try {
            const flag = await useApi().checkPhone({
              phone: v,
            });
            if (!flag) {
              cb($t('register.phone_error'));
            } else {
              cb();
            }
          } catch (error) {
            cb($t('register.phone_error'));
          }
        },
      },
      {
        trigger: 'input',
        validator: (_, v: string) => {
          const reg = new RegExp(/^1[3-9]\d{9}$/);
          return reg.test(v);
        },
        message: $t('register.phone_format'),
      },
    ],
    code: [
      {
        trigger: 'input',
        required: true,
        validator: (_, v: string) => {
          const reg = new RegExp(/^\d{6}$/);
          return reg.test(v);
        },
        message: $t('register.code_format'),
      },
      {
        trigger: ['input','blur'],
        validator: (_, v: string) => {
          const reg = new RegExp(/^\d{6}$/);
          return reg.test(v);
        },
        asyncValidator: async (_, v: string, cb) => {
          try {
            const flag = await useApi().checkPhoneCode({
              code: v,
            });
            if (!flag) {
              cb($t('register.code_error'));
            } else {
              cb();
            }
          } catch (error) {
            cb($t('register.code_error'));
          }
        },
      },
    ],
  };

  async function submit() {
    formRef.value
      ?.validate((err) => {
        emit('submit', err == undefined);
      })
      .catch(() => {});
  }

  const isSendCode = ref(false);
  const timeNum = ref(60);
  const timeStr = computed(() => {
    return $t('register.send_code', [timeNum.value])
  })
  watch(isSendCode, (v) => {
    if (v) {
      timeNum.value = 60;
      setTimeNum();
    }
  });
  function setTimeNum() {
    setTimeout(() => {
      timeNum.value = timeNum.value - 1;
      if (timeNum.value > 0) {
        setTimeNum();
      }
    }, 1000);
  }
  function sendCode() {
    isSendCode.value = true;
  }
</script>
<template>
  <div class="w-full flex flex-col items-center justify-center">
    <div class="w-full xl:max-w-2xl lg:max-w-xl sm:max-w-sm">
      <h3 class="text-xl">{{ $t('register.title') }}</h3>
      <NForm :model="form" :rules="rules" ref="formRef">
        <NFormItem path="username" :label="$t('register.username')">
          <NInput
            id="username-input"
            v-model:value="form.username"
            :maxlength="26"
            :placeholder="$t('register.username_format')"
          />
        </NFormItem>
        <NFormItem path="username" :label="$t('register.password')">
          <NInput
            id="username-input"
            v-model:value="form.pwd"
            :maxlength="26"
            :placeholder="$t('register.password_format')"
          />
        </NFormItem>
        <NFormItem path="phone" :label="$t('register.phone')">
          <NInput
            id="username-input"
            v-model:value="form.phone"
            :maxlength="26"
            :placeholder="$t('register.phone_empty')"
          />
        </NFormItem>
        <NFormItem path="code" :label="$t('register.code')">
          <div class="flex items-center gap-4">
            <NInput
              :disabled="!isSendCode"
              id="username-input"
              v-model:value="form.code"
              :maxlength="26"
              :placeholder="$t('register.code_format')"
            />
            <NButton @click="sendCode" :disabled="isSendCode">
              <span v-if="!isSendCode">{{ $t('register.unsend_code') }}</span>
              <span v-else>{{ timeStr }}</span>
            </NButton>
          </div>
        </NFormItem>
        <NButton id="submit-btn" @click="submit">{{
          $t('register.submit')
        }}</NButton>
      </NForm>
    </div>
  </div>
</template>
