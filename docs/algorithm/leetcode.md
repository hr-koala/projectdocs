## 计算一个数组中每个元素除自身以外的所有元素的乘积。(给定一个整数数组nums，返回一个新的数组result，其中result[i]是nums[i]除自身以外的所有元素的乘积。)
解题思路  
‌两次遍历‌：
- 第一次遍历从左到右，计算每个元素左边所有元素的乘积，并将结果保存在一个新数组left中。
- 第二次遍历从右到左，计算每个元素右边所有元素的乘积，并将结果与第一次遍历的结果相乘，得到最终结果。

‌优化方法‌：
- 使用两个辅助数组left和right，分别存储从左到右和从右到左的乘积。最终结果可以通过这两个数组的对应元素相乘得到。这种方法的时间复杂度为O(n)，空间复杂度也为O(n)。

```ts
function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const s1 = new Array(n + 2).fill(1), s2 = new Array(n + 2).fill(1);
    for (let i = 1; i <= n; i++) s1[i] = s1[i - 1] * nums[i - 1];
    for (let i = n; i >= 1; i--) s2[i] = s2[i + 1] * nums[i - 1];
    const ans = new Array(n);
    for (let i = 1; i <= n; i++) ans[i - 1] = s1[i - 1] * s2[i + 1];
    return ans;
};
```

## 计算数组中每个元素出现的次数

```ts
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice', 'Bob', 'Bob'];
var countedNames = names.reduce((allNames, name) => {
  if (name in allNames) allNames[name]++;
  else allNames[name] = 1;
  return allNames;
}, {});
console.log(countedNames);
```

## 按属性对Object分类

```ts
var person = [
    { name: 'xiaoming', age: 18 },
    { name: 'xiaohong', age: 17 },
    { name: 'xiaogang', age: 17 }
];
function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}
var groupedPerson = groupBy(person, 'age');
console.log(groupedPerson);
```

## 最大的矩形面积

给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
返回容器可以储存的最大水量。

```ts
function getMaxArea(arr: number[]): number {
    let maxArea = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            maxArea = Math.max(maxArea, Math.min(arr[i], arr[j]) * (j - i));
        }
    }
    return maxArea;
}

function getMaxArea2(arr: number[]): number {
    let maxArea = 0; // 最大面积
    let left = 0; // 左指针
    let right = arr.length - 1; // 右指针
    while (left < right) {
        maxArea = Math.max(maxArea, Math.min(arr[left], arr[right]) * (right - left));
        //最低的一段开始移动，直到超过之前的最低的
        if (arr[left] < arr[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxArea;
}
```

## 爬楼梯

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
```ts
//动态规划，大问题分成多个子问题处理，子问题的最优解即大问题的最优解
//每次你可以爬1或2个台阶，故最后一步有两种情况，1、从n-1阶直接迈到n阶。2、从n-2阶直接迈到n阶。
//同理可推断出：F(n) = F(n-1) + F(n-2)
//特殊情况 F(1) = 1，F(2) = 2 可推断出 F(3) = F(1) + F(2) = 3

function climbStairs(n: number): number {
    if (n <= 2) return n;
    let prePre = 1, pre = 2, result = 0;
    for (let i = 3; i <= n; i++) {
        result = prePre + prePre;
        prePre = pre;
        pre = result;
    }
    return result;
}

function climbStairs2(n: number): number {
    if(n <= 2) return n
    return climbStairs2(n-1) + climbStairs2(n-2)
}
```
