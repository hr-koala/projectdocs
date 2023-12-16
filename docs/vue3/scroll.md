## vueuse 实现无限滚动

安装 `npm i @vueuse/core`

```vue
<template>
  <div ref="listEl" class="container">
    <div v-for="item in dataList" :key="item.id" class="item">
      <div>{{ item.id }} {{ item.title }}</div>
    </div>
    <div v-if="fetchingData" class="fetchingData">请求更多数据。。。</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import { getDatalist } from "./api";

const listEl = ref<HTMLElement | null>(null);
const limit = ref(10);
const page = ref(1);
interface ListData {
  id: number;
  title: string;
}
const dataList = ref<ListData[]>([]);
const fetchingData = ref(false);
const canLoadMore = ref(true);

const getDatalist = async () => {
  if (!canLoadMore.value || fetchingData.value) return;
  fetchingData.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // const newDataList = [{id:1,title:'123'}]
  // let length=dataList.value.length
  // newDataList.push(...Array.from({ length: 10 }, (_, i) => {return {'id':length + i,'title':'title'}}))
  const newDataList = await getDatalist(page.value, limit.value);
  if (newDataList.length < limit.value) {
    canLoadMore.value = false;
  }
  dataList.value = [...dataList.value, ...newDataList];
  page.value++;
  fetchingData.value = false;
};
useInfiniteScroll(
  listEl,
  async () => {
    await getDatalist();
  },
  { distance: 15 }
);
</script>
<style scoped>
.container {
  overflow-y: scroll;
  height: 300px;
}
.item {
  height: 200px;
  display: flex;
  flex-direction: column;
}
</style>
```

## 虚拟列表

```vue
<template>
  <div>111</div>
  <div v-bind="containerProps" class="container">
    <div v-bind="wrapperProps">
      <div v-for="item in dataList" :key="item.id" class="item">
        <div>{{ item.id }} {{ item.title }}</div>
      </div>
      <div v-if="fetchingData" class="fetchingData">请求更多数据。。。</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useInfiniteScroll, useVirtualList } from "@vueuse/core";
import { getDatalist } from "./api";

const listEl = ref<HTMLElement | null>(null);
const limit = ref(10);
const page = ref(1);
interface ListData {
  id: number;
  title: string;
}
const dataList = ref<ListData[]>([]);
const fetchingData = ref(false);
const canLoadMore = ref(true);

useVirtualList(dataList, { itemHeight: 200 });

const getDatalist = async () => {
  if (!canLoadMore.value || fetchingData.value) return;
  fetchingData.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(1);
  // const newDataList=await getDatalist(page.value,limit.value)
  const newDataList = [{ id: 1, title: "123" }];
  let length = dataList.value.length;
  newDataList.push(
    ...Array.from({ length: 10 }, (_, i) => {
      return { id: length + i, title: "title" };
    })
  );
  if (newDataList.length < limit.value) {
    canLoadMore.value = false;
  }
  dataList.value = [...dataList.value, ...newDataList];
  page.value++;
  fetchingData.value = false;
};
useInfiniteScroll(
  containerProps.ref,
  async () => {
    await getDatalist();
  },
  { distance: 15 }
);
</script>
<style scoped>
.container {
  overflow-y: scroll;
  height: 300px;
}
.item {
  height: 200px;
  display: flex;
  flex-direction: column;
}
</style>
```
