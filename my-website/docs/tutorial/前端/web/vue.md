---
sidebar_label: "Vue"
sidebar_position: 2
---

# Vue.js 教程

Vue.js 是一个渐进式 JavaScript 框架，用于构建用户界面。它被设计为可以自底向上逐层应用，核心库只关注视图层，易于上手，便于与第三方库或既有项目整合。

## 什么是 Vue.js？

Vue.js 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。

### Vue.js 的特点

- **渐进式框架**：可以逐步采用，不需要重写整个项目
- **响应式数据绑定**：数据变化时视图自动更新
- **组件化开发**：可复用的组件系统
- **虚拟 DOM**：高效的渲染性能
- **单文件组件**：.vue 文件包含模板、脚本和样式

## 快速开始

### 环境要求

- Node.js 12.0 或更高版本
- npm 或 yarn 包管理器

### 创建 Vue 应用

使用 Vue CLI 创建新项目：

```bash
npm install -g @vue/cli
vue create my-project
cd my-project
npm run serve
```

### 使用 Vite 创建项目（推荐）

```bash
npm create vue@latest my-project
cd my-project
npm install
npm run dev
```

### CDN 引入

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

## 基础语法

### 第一个 Vue 应用

```html
<!DOCTYPE html>
<html>
<head>
    <title>Vue 3 App</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
    <div id="app">
        <h1>{{ message }}</h1>
    </div>

    <script>
        const { createApp } = Vue;
        
        createApp({
            data() {
                return {
                    message: 'Hello Vue!'
                }
            }
        }).mount('#app');
    </script>
</body>
</html>
```

### 模板语法

```html
<template>
  <div>
    <!-- 文本插值 -->
    <p>{{ message }}</p>
    
    <!-- 原始 HTML -->
    <div v-html="rawHtml"></div>
    
    <!-- 属性绑定 -->
    <div v-bind:id="dynamicId"></div>
    <div :id="dynamicId"></div>
    
    <!-- 条件渲染 -->
    <p v-if="seen">现在你看到我了</p>
    
    <!-- 列表渲染 -->
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.text }}
      </li>
    </ul>
    
    <!-- 事件监听 -->
    <button v-on:click="doThis">点击我</button>
    <button @click="doThis">点击我</button>
  </div>
</template>
```

## 组件系统

### 单文件组件

```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<style scoped>
.hello {
  color: #42b983;
}
</style>
```

### 组件注册

```javascript
// 全局注册
import { createApp } from 'vue'
import MyComponent from './MyComponent.vue'

const app = createApp({})
app.component('my-component', MyComponent)

// 局部注册
export default {
  components: {
    MyComponent
  }
}
```

### 组件通信

#### 父子组件通信

```vue
<!-- 父组件 -->
<template>
  <div>
    <child-component 
      :message="parentMessage" 
      @update="handleUpdate"
    />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue'

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
      parentMessage: 'Hello from parent'
    }
  },
  methods: {
    handleUpdate(newMessage) {
      this.parentMessage = newMessage
    }
  }
}
</script>
```

```vue
<!-- 子组件 -->
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="updateParent">Update Parent</button>
  </div>
</template>

<script>
export default {
  props: {
    message: String
  },
  methods: {
    updateParent() {
      this.$emit('update', 'Updated from child')
    }
  }
}
</script>
```

#### 跨组件通信

```javascript
// 使用 provide/inject
// 祖先组件
export default {
  provide() {
    return {
      theme: 'dark'
    }
  }
}

// 后代组件
export default {
  inject: ['theme'],
  created() {
    console.log(this.theme) // 'dark'
  }
}
```

## 响应式数据

### 响应式基础

```javascript
import { ref, reactive, computed, watch } from 'vue'

export default {
  setup() {
    // ref 用于基本类型
    const count = ref(0)
    
    // reactive 用于对象
    const state = reactive({
      name: 'Vue',
      version: '3.0'
    })
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 监听器
    watch(count, (newVal, oldVal) => {
      console.log(`count changed from ${oldVal} to ${newVal}`)
    })
    
    return {
      count,
      state,
      doubleCount
    }
  }
}
```

### 生命周期钩子

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    onUpdated(() => {
      console.log('组件已更新')
    })
    
    onUnmounted(() => {
      console.log('组件已卸载')
    })
  }
}
```

## 路由

### Vue Router 基础

```bash
npm install vue-router@4
```

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>
```

### 路由守卫

```javascript
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 检查用户是否已登录
    if (isAuthenticated()) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
```

## 状态管理

### Vuex 基础

```bash
npm install vuex@next
```

```javascript
// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment')
    }
  },
  getters: {
    doubleCount: state => state.count * 2
  }
})
```

### Pinia（推荐）

```bash
npm install pinia
```

```javascript
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2
  }
})
```

## 表单处理

### 双向绑定

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.name" placeholder="姓名" />
    <input v-model="form.email" placeholder="邮箱" />
    <button type="submit">提交</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      console.log('Form submitted:', this.form)
    }
  }
}
</script>
```

### 表单验证

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input 
        v-model="form.email" 
        :class="{ error: errors.email }"
        placeholder="邮箱"
      />
      <span v-if="errors.email" class="error-message">
        {{ errors.email }}
      </span>
    </div>
    <button type="submit" :disabled="!isValid">提交</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: ''
      },
      errors: {}
    }
  },
  computed: {
    isValid() {
      return Object.keys(this.errors).length === 0
    }
  },
  watch: {
    'form.email'(value) {
      this.validateEmail(value)
    }
  },
  methods: {
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        this.errors.email = '请输入有效的邮箱地址'
      } else {
        delete this.errors.email
      }
    },
    handleSubmit() {
      if (this.isValid) {
        console.log('Form submitted:', this.form)
      }
    }
  }
}
</script>
```

## HTTP 请求

### Axios 集成

```bash
npm install axios
```

```javascript
// api/index.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000
})

export default api
```

```vue
<template>
  <div>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
    <p v-else>加载中...</p>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data() {
    return {
      users: []
    }
  },
  async mounted() {
    try {
      const response = await api.get('/users')
      this.users = response.data
    } catch (error) {
      console.error('获取用户列表失败:', error)
    }
  }
}
</script>
```

## 测试

### Vue Test Utils

```bash
npm install --save-dev @vue/test-utils jest
```

```javascript
import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  test('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = mount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
```

## 部署

### 构建生产版本

```bash
npm run build
```

### 部署到 Vercel

```bash
npm install -g vercel
vercel
```

### 部署到 Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 最佳实践

1. **组件设计**：保持组件单一职责
2. **状态管理**：合理使用 Vuex 或 Pinia
3. **性能优化**：使用 v-memo、keep-alive
4. **代码组织**：按功能模块组织代码
5. **类型安全**：使用 TypeScript

## 学习资源

- [Vue.js 官方文档](https://vuejs.org/)
- [Vue.js 中文文档](https://cn.vuejs.org/)
- [Vue.js 教程 - 菜鸟教程](https://www.runoob.com/vue2/vue-tutorial.html)
- [Vue Mastery](https://www.vuemastery.com/)

## 常见问题

### Q: Vue 2 和 Vue 3 有什么区别？
A: Vue 3 引入了 Composition API、更好的 TypeScript 支持、更小的包体积和更好的性能。

### Q: 什么时候使用 Vuex 还是 Pinia？
A: 新项目推荐使用 Pinia，它更简单、类型安全，并且与 Vue 3 的 Composition API 配合更好。

### Q: 如何优化 Vue 应用性能？
A: 使用 v-memo、keep-alive、懒加载、代码分割等技术来优化性能。