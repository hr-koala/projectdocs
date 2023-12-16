---
title: 妙用computed拦截v-model，面试管都夸我细
url: https://juejin.cn/post/7277089907974422588#heading-0
---

## 妙用 computed 拦截 v-model

### 保持单向数据流

大家都知道 vue 是单项数据流的，子组件不能直接修改父组件传过来的 props，但是在我们封装组件使用 `v-model` 时，不小心就会打破单行数据流的规则，例如下面这样：

```vue
<!-- 父组件 -->
<my-component v-model="msg"></my-component>

<!-- 子组件 -->
<template>
  <div>
    <el-input v-model="msg"></el-input>
  </div>
</template>

<script setup>
defineOptions({
  name: "MyComponent",
});
const props = defineProps({
  msg: {
    type: String,
    default: "",
  },
});
</script>
```

`v-model` 实现原理
直接在子组件上修改 props 的值，就打破了单向数据流，那我们该怎么做呢，先看下 v-model 的实现原理：

```vue{6-7}
<!-- 父组件 -->
<template>
  <my-component v-model="msg"></my-component>
  <!-- 等同于 -->
  <my-component
    :modelValue="msg"
    @update:modelValue="msg = $event"
  ></my-component>
</template>
```

`emit`通知父组件修改 prop 值
所以，我们可以通过 emit，子组件的值变化了，不是直接修改 props,而是通知父组件去修改该值!

子组件值修改，触发父组件的 `update:modelValue` 事件，并将新的值传过去，父组件将 msg 更新为新的值，代码如下：

```vue
<!-- 父组件 -->
<template>
  <my-component v-model="msg"></my-component>
  <!-- 等同于 -->
  <my-component
    :modelValue="msg"
    @update:modelValue="msg = $event"
  ></my-component>
</template>
<script setup>
import { ref } from "vue";
const msg = ref("hello");
</script>

<!-- 子组件 -->
<template>
  <el-input
    :modelValue="modelValue"
    @update:modelValue="handleValueChange"
  ></el-input>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleValueChange = (value) => {
  // 子组件值修改，触发父组件的 update:modelValue 事件，并将新的值传过去，父组件将 msg 更新为新的值
  emit("update:modelValue", value);
};
</script>
```

这也是大多数开发者封装组件修改值的方法，其实还有另一种方案，就是利用计算数据的 `get、set`

**computed 拦截 prop**
大多数同学使用计算属性，都是用 get，或许有部分同学甚至不知道计算属性还有 set，下面我们看下实现方式吧：

```vue
<!-- 父组件 -->
<script setup>
import myComponent from "./components/MyComponent.vue";
import { ref } from "vue";
const msg = ref("hello");
</script>

<template>
  <div>
    <my-component v-model="msg"></my-component>
  </div>
</template>

<!-- 子组件 -->
<template>
  <el-input v-model="msg"></el-input>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const msg = computed({
  // getter
  get() {
    return props.modelValue;
  },
  // setter
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>
```

`v-model` 绑定对象
那么当 v-model 绑定的是对象呢？

可以像下面这样，computed 拦截多个值

```vue
<!-- 父组件 -->
<script setup>
import myComponent from "./components/MyComponent.vue";
import { ref } from "vue";

const form = ref({
  name: "张三",
  age: 18,
  sex: "man",
});
</script>

<template>
  <div>
    <my-component v-model="form"></my-component>
  </div>
</template>

<!-- 子组件 -->
<template>
  <div>
    <el-input v-model="name"></el-input>
    <el-input v-model="age"></el-input>
    <el-input v-model="sex"></el-input>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["update:modelValue"]);

const name = computed({
  // getter
  get() {
    return props.modelValue.name;
  },
  // setter
  set(newValue) {
    emit("update:modelValue", {
      ...props.modelValue,
      name: newValue,
    });
  },
});

const age = computed({
  get() {
    return props.modelValue.age;
  },
  set(newValue) {
    emit("update:modelValue", {
      ...props.modelValue,
      age: newValue,
    });
  },
});

const sex = computed({
  get() {
    return props.modelValue.sex;
  },
  set(newValue) {
    emit("update:modelValue", {
      ...props.modelValue,
      sex: newValue,
    });
  },
});
</script>
```

这样是可以实现我们的需求，但是一个个手动拦截 `v-model` 对象的属性值，太过于麻烦，假如有 10 个输入，我们就需要拦截 10 次，所以我们需要将拦截整合起来！

监听整个对象

```vue
<!-- 父组件 -->
<script setup>
import myComponent from "./components/MyComponent.vue";
import { ref } from "vue";

const form = ref({
  name: "张三",
  age: 18,
  sex: "man",
});
</script>

<template>
  <div>
    <my-component v-model="form"></my-component>
  </div>
</template>

<!-- 子组件 -->
<template>
  <div>
    <el-input v-model="form.name"></el-input>
    <el-input v-model="form.age"></el-input>
    <el-input v-model="form.sex"></el-input>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["update:modelValue"]);

const form = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    alert(123);
    emit("update:modelValue", newValue);
  },
});
</script>
```

这样看起来很完美，但是，我们在 set 中 alert(123),它却并未执行！！

原因是：**form.xxx = xxx 时，并不会触发 computed 的 set，只有 form = xxx 时，才会触发 set**

Proxy 代理对象
那么，我们需要想一个办法，在 form 的属性修改时，也能 emit("update:modelValue", newValue);，为了解决这个问题，我们可以通过 Proxy 代理

```vue
<!-- 父组件 -->
<script setup>
import myComponent from "./components/MyComponent.vue";
import { ref, watch } from "vue";

const form = ref({
  name: "张三",
  age: 18,
  sex: "man",
});

watch(form, (newValue) => {
  console.log(newValue);
});
</script>

<template>
  <div>
    <my-component v-model="form"></my-component>
  </div>
</template>

<!-- 子组件 -->
<template>
  <div>
    <el-input v-model="form.name"></el-input>
    <el-input v-model="form.age"></el-input>
    <el-input v-model="form.sex"></el-input>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["update:modelValue"]);

const form = computed({
  get() {
    return new Proxy(props.modelValue, {
      get(target, key) {
        return Reflect.get(target, key);
      },
      set(target, key, value, receiver) {
        emit("update:modelValue", {
          ...target,
          [key]: value,
        });
        return true;
      },
    });
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>
```

这样，我们就通过了 `Proxy + computed` 完美拦截了 v-model 的对象!

然后，为了后面使用方便，我们直接将其封装成 hook

```ts
// useVModel.js
import { computed } from "vue";

export default function useVModle(props, propName, emit) {
  return computed({
    get() {
      return new Proxy(props[propName], {
        get(target, key) {
          return Reflect.get(target, key);
        },
        set(target, key, newValue) {
          emit("update:" + propName, {
            ...target,
            [key]: newValue,
          });
          return true;
        },
      });
    },
    set(value) {
      emit("update:" + propName, value);
    },
  });
}
```

```vue
<!-- 子组件使用 -->
<template>
  <div>
    <el-input v-model="form.name"></el-input>
    <el-input v-model="form.age"></el-input>
    <el-input v-model="form.sex"></el-input>
  </div>
</template>
<script setup>
import useVModel from "../hooks/useVModel";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["update:modelValue"]);

const form = useVModel(props, "modelValue", emit);
</script>
```
