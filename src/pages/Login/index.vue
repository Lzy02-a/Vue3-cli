<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

type LoginMethod = 'password' | 'phone' | 'email'

interface LoginTab {
  key: LoginMethod
  label: string
  hint: string
  enabled: boolean
}

const loginTabs: LoginTab[] = [
  {
    key: 'password',
    label: '密码登录',
    hint: '使用账号与密码登录系统',
    enabled: true,
  },
  {
    key: 'phone',
    label: '手机号登录',
    hint: '手机号验证码登录接入预留',
    enabled: false,
  },
  {
    key: 'email',
    label: '邮箱登录',
    hint: '邮箱验证码登录接入预留',
    enabled: false,
  },
]

const activeMethod = ref<LoginMethod>('password')

const passwordForm = reactive({
  account: '',
  password: '',
  remember: true,
})


const activeTab = computed(() => loginTabs.find((tab) => tab.key === activeMethod.value) ?? loginTabs[0])
const isCurrentMethodEnabled = computed(() => activeTab.value.enabled)

function selectLoginMethod(method: LoginMethod) {
  activeMethod.value = method
}

function handleSubmit() {
  if (!isCurrentMethodEnabled.value) {
    return
  }

  // TODO: 接入真实登录接口后，在这里按 activeMethod 分发登录逻辑。
}
</script>

<template>
  <main class="login-page">
    <section class="login-hero" aria-labelledby="login-title">
      <div class="hero-copy">
        <p class="eyebrow">Vue Admin Starter</p>
        <h1 id="login-title">欢迎回来</h1>
        <p class="hero-desc">简洁、安全、响应式的登录入口，支持按业务节奏逐步接入多种登录方式。</p>
      </div>
    </section>

    <section class="login-panel" aria-label="登录表单">
      <div class="panel-header">
        <p class="panel-kicker">Sign in</p>
        <h2>登录账号</h2>
        <p>{{ activeTab.hint }}</p>
      </div>

      <div class="login-tabs" role="tablist" aria-label="选择登录方式">
        <button
          v-for="tab in loginTabs"
          :key="tab.key"
          class="tab-button"
          :class="{ active: activeMethod === tab.key }"
          type="button"
          role="tab"
          :aria-selected="activeMethod === tab.key"
          @click="selectLoginMethod(tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>

      <form class="login-form" @submit.prevent="handleSubmit">
        <template v-if="activeMethod === 'password'">
          <label class="form-field">
            <span>账号</span>
            <input v-model="passwordForm.account" type="text" autocomplete="username" placeholder="请输入用户名 / 手机号 / 邮箱" />
          </label>

          <label class="form-field">
            <span>密码</span>
            <input v-model="passwordForm.password" type="password" autocomplete="current-password" placeholder="请输入登录密码" />
          </label>

          <div class="form-options">
            <label class="remember-me">
              <input v-model="passwordForm.remember" type="checkbox" />
              <span>记住我</span>
            </label>
            <button class="text-button" type="button">忘记密码？</button>
          </div>
        </template>

        <template v-else-if="activeMethod === 'phone'">
          <!-- TODO: 手机号登录支持后，在这里接入手机号与验证码表单。 -->
        </template>

        <template v-else>
          <!-- TODO: 邮箱登录支持后，在这里接入邮箱与验证码表单。 -->
        </template>

        <button class="submit-button" type="submit" :disabled="!isCurrentMethodEnabled">立即登录</button>
      </form>

      <p class="panel-footer">登录即表示你同意平台服务协议与隐私政策。</p>
    </section>
  </main>
</template>

<style scoped lang="scss">
.login-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 480px);
  gap: 48px;
  align-items: center;
  padding: 48px clamp(20px, 6vw, 88px);
  color: #172033;
  background:
    radial-gradient(circle at 12% 18%, rgba(99, 102, 241, 0.2), transparent 30%),
    radial-gradient(circle at 85% 15%, rgba(14, 165, 233, 0.18), transparent 28%),
    linear-gradient(135deg, #f8fbff 0%, #eef4ff 45%, #f7f7ff 100%);
}

.login-hero {
  position: relative;
  overflow: hidden;
  padding: clamp(28px, 5vw, 56px);
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.42);
  box-shadow: 0 24px 70px rgba(37, 56, 108, 0.14);
  backdrop-filter: blur(20px);
}

.login-hero::after {
  content: '';
  position: absolute;
  right: -120px;
  bottom: -140px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.18), rgba(14, 165, 233, 0.12));
}

.hero-copy {
  position: relative;
  z-index: 1;
  max-width: 640px;
}

.eyebrow,
.panel-kicker {
  margin: 0 0 12px;
  color: #4f46e5;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-copy h1,
.panel-header h2 {
  margin: 0;
  color: #111827;
  line-height: 1.08;
}

.hero-copy h1 {
  font-size: clamp(42px, 7vw, 72px);
  letter-spacing: -0.06em;
}

.hero-desc {
  margin: 22px 0 0;
  max-width: 520px;
  color: #5f6b85;
  font-size: clamp(16px, 2vw, 19px);
  line-height: 1.8;
}

.login-panel {
  width: 100%;
  padding: clamp(24px, 4vw, 36px);
  border: 1px solid rgba(255, 255, 255, 0.86);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 28px 80px rgba(37, 56, 108, 0.18);
  backdrop-filter: blur(18px);
}

.panel-header h2 {
  font-size: 30px;
  letter-spacing: -0.04em;
}

.panel-header p:last-child {
  margin: 10px 0 0;
  color: #667085;
  line-height: 1.6;
}

.login-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 28px 0;
  padding: 6px;
  border-radius: 18px;
  background: #eef2ff;
}

.tab-button {
  min-height: 46px;
  border: 0;
  border-radius: 14px;
  color: #596171;
  background: transparent;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.tab-button:hover,
.tab-button:focus-visible {
  color: #3730a3;
}

.tab-button:focus-visible,
.submit-button:focus-visible,
.text-button:focus-visible {
  outline: 3px solid rgba(79, 70, 229, 0.28);
  outline-offset: 2px;
}

.tab-button.active {
  color: #312e81;
  background: #ffffff;
  box-shadow: 0 10px 22px rgba(79, 70, 229, 0.12);
}

.login-form {
  display: grid;
  gap: 18px;
}

.form-field {
  display: grid;
  gap: 8px;
  color: #344054;
  font-size: 14px;
  font-weight: 700;
}

.form-field input {
  width: 100%;
  min-height: 50px;
  box-sizing: border-box;
  border: 1px solid #d7deea;
  border-radius: 15px;
  padding: 0 16px;
  color: #111827;
  background: #ffffff;
  font-size: 15px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.form-field input::placeholder {
  color: #9aa4b5;
}

.form-field input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.14);
  outline: none;
}

.form-field input:disabled {
  color: #98a2b3;
  background: #f3f6fb;
  cursor: not-allowed;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.remember-me {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #4b5563;
  font-size: 14px;
  cursor: pointer;
}

.remember-me input {
  width: 16px;
  height: 16px;
  accent-color: #4f46e5;
}

.text-button {
  min-height: 40px;
  border: 0;
  color: #4f46e5;
  background: transparent;
  font-weight: 700;
  cursor: pointer;
}

.submit-button {
  min-height: 52px;
  margin-top: 4px;
  border: 0;
  border-radius: 16px;
  color: #ffffff;
  background: linear-gradient(135deg, #4f46e5, #0ea5e9);
  box-shadow: 0 18px 30px rgba(79, 70, 229, 0.24);
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 22px 36px rgba(79, 70, 229, 0.3);
}

.submit-button:disabled {
  opacity: 0.58;
  cursor: not-allowed;
  box-shadow: none;
}

.panel-footer {
  margin: 22px 0 0;
  color: #8a94a8;
  font-size: 13px;
  line-height: 1.6;
  text-align: center;
}

@media (max-width: 980px) {
  .login-page {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .login-hero {
    padding-bottom: 36px;
  }

}

@media (max-width: 640px) {
  .login-page {
    padding: 20px;
  }

  .login-hero {
    display: none;
  }

  .login-panel {
    border-radius: 24px;
  }

  .login-tabs {
    grid-template-columns: 1fr;
  }

  .form-options {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
