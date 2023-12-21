import{_ as e,r as o,o as l,c,a as n,d as s,b as t,e as p}from"./app-lzSeYDl-.js";const i="/images/vue/long-list1.png",u="/images/vue/long-list2.png",r="/images/vue/long-list3.png",k={},d=p(`<h2 id="_1-vue-循环-1000-个列表-每个添加点击事件-怎么优化" tabindex="-1"><a class="header-anchor" href="#_1-vue-循环-1000-个列表-每个添加点击事件-怎么优化" aria-hidden="true">#</a> 1. vue 循环 1000 个列表，每个添加点击事件，怎么优化</h2><p>在 Vue 中，渲染大量数据时，如果每个列表项都添加点击事件，可能会导致性能问题。为了优化性能，可以采用以下几种方案：<br> (1) 利用 Vue 的事件委托机制，将点击事件绑定到父元素上，通过事件对象的 target 属性判断点击的是哪个子元素，从而执行相应的操作。<br> 这样可以避免为每个子元素都添加点击事件，减少事件绑定的数量。</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleClick<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in list<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item.id<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ item.id }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> list <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token comment">//数据列表</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token operator">...</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> target <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span>tagName <span class="token operator">===</span> <span class="token string">&quot;DIV&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 处理点击事件</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(2) 使用 Vue 的虚拟滚动组件，如 <code>vue-virtual-scroll-list</code> 或 <code>vue-virtual-scroll-view</code>，<br> 可以实现只渲染可见区域的列表项，从而减少 DOM 操作和事件绑定的数量，提高性能。这种方案需要引入相应的第三方库。<br> (3) 新的 css 属性 <code>content-visibility</code>，利用这个属性（大概率还得配合 contain-intrinsic-size）就可以实现只渲染当前可视窗口区域内的内容，跳过不在屏幕上的内容渲染。但目前兼容性极差，只能说未来可期~</p>`,4),v={id:"长列表的问题",tabindex:"-1"},m=n("a",{class:"header-anchor",href:"#长列表的问题","aria-hidden":"true"},"#",-1),g={href:"https://zhuanlan.zhihu.com/p/444778554",target:"_blank",rel:"noopener noreferrer"},b=p('<p>目前看来无限滚动的长列表(微博列表)对用户来说体验是很好的，但是这里会有个问题，当用户滚动的屏数过多时，就会出现页面滑动卡顿、数据渲染较慢、白屏的问题，究其原因是列表项过多，渲染了<strong>大量 dom 节点</strong>。</p><p>为了解决上述问题，就引入了一种叫<strong>虚拟列表</strong>的解决方案。</p><h3 id="虚拟列表的优势" tabindex="-1"><a class="header-anchor" href="#虚拟列表的优势" aria-hidden="true">#</a> 虚拟列表的优势</h3><p>下面就通过两组图示数据来对比下，当滚动大约 10+页时引入了虚拟列表前后的区别：</p><p>使用前</p><ul><li>FPS：10</li><li>JS 内存：121MB</li><li>DOM 节点数：46592 <img src="'+i+'" alt="虚拟列表"></li></ul><p>使用后</p><ul><li>FPS：40</li><li>JS 内存：102MB</li><li>DOM 节点数：24268 <img src="'+u+'" alt="虚拟列表"></li></ul><p>可以看到在引入虚拟列表后，在 <strong>FPS、JS 内存、DOM 节点数</strong>各方面上都有较大程度的提升，而且随着滚动页数的持续增加，其效果会更加显著。</p><h3 id="虚拟列表的原理" tabindex="-1"><a class="header-anchor" href="#虚拟列表的原理" aria-hidden="true">#</a> 虚拟列表的原理</h3><p>只对可见区域进行渲染，对非可见区域中的数据不渲染或部分渲染的技术，从而达到极高的渲染性能，虚拟列表其实是按需显示的一种实现。</p><p>如图示例，其组成一般包含 3 部分： <img src="'+r+`" alt="虚拟列表的实现"></p><ol><li>可视区：滚动容器元素的视觉可见区域。</li><li>列表渲染区：真实渲染列表元素的区域，列表渲染区大于等于可视区。</li><li>真实列表区：又叫可滚动区，滚动容器元素的内部内容区域。 当用户操作滚动列表后：</li><li>显示可视区中的元素（item3~item12）</li><li>隐藏可视区外中的元素（item3 和 item12 之外的）</li></ol><p>视图结构 按照图示，我们先构造如下的视图结构</p><ol><li>viewport：可视区域的容器</li><li>list-phantom：容器内的占位，高度为真实列表区域的高度，用于形成滚动条</li><li>list-area：列表项的渲染区域</li></ol><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>list-phantom<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>list-area<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- item-1 --&gt;</span>
    <span class="token comment">&lt;!-- item-2 --&gt;</span>
    <span class="token comment">&lt;!-- item-n --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其核心思路是处理用户滚动时可视区元素的显示和可视区外元素的隐藏</p><ol><li>startIndex：可视区第一个元素标号（图示中为 3）</li><li>endIndex：可视区最后一个元素标号（图示中为 12）</li><li>startOffset：可视区第一个元素的向上偏移量</li></ol><p>当用户滚动列表时：</p><ol><li>计算可视区的 startIndex 和 endIndex</li><li>根据 startIndex 和 endIndex 渲染数据</li><li>计算 startOffset 偏移量并设置到列表渲染区</li><li>列表项高度 itemSize = 100</li><li>可视区可显示数量 viewcount = viewport / itemSize</li><li>可视区最后一个元素标号 endIndex = startIndex + viewcount</li></ol><p>当用户滚动时，逻辑处理如下：</p><ol><li>获取可视区滚动距离 scrollTop;</li><li>根据 scrollTop 和 itemSize 计算出 startIndex 和 endIndex;</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 获取startIndex</span>
<span class="token keyword">const</span> <span class="token function-variable function">getStartIndex</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">scrollTop</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>scrollTop <span class="token operator">/</span> itemSize<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 这里可以思考下，为什么要用Math.floor</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>根据 startIndex 和 itemSize 计算出 startOffset;</li><li>只显示 startIndex 和 endIndex 之间的元素;</li><li>设置 list-area 的偏移量为 startOffset;</li></ol><p>动态高度的类型(可以在内容渲染完成后，获得其高度)</p><p>具体实现: 构造记录列表项位置信息 position 的数组 positions：</p><ol><li>top: 当前项顶部到列表顶部的距离</li><li>height: 当前项的高度</li><li>bottom: 当前项底部到列表顶部的距离</li><li>index: 当前项的标识</li></ol><p>那么计算 startIndex 的逻辑则变为：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 获取startIndex</span>
<span class="token keyword">const</span> <span class="token function-variable function">getStartIndex</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">scrollTop</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> item <span class="token operator">=</span> positions<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> i <span class="token operator">&amp;&amp;</span> i<span class="token punctuation">.</span>bottom <span class="token operator">&gt;</span> scrollTop<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> item<span class="token punctuation">.</span>index<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当有 item 项高度变化后，我们只需要维护这一份 positions 数据即可，从而大大减少了处理起来的复杂度。</p><p>以 item-3 项为例，来具体看下当其高度变化后的具体影响</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 高度变化前position信息</span>
<span class="token punctuation">{</span>
    <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token comment">// 当前列表项的标识</span>
    <span class="token literal-property property">height</span><span class="token operator">:</span> defaultItemSize<span class="token punctuation">,</span> <span class="token comment">// 当前列表项高度（默认初始高度）</span>
    <span class="token literal-property property">top</span><span class="token operator">:</span> index <span class="token operator">*</span> defaultItemSize<span class="token punctuation">,</span> <span class="token comment">// 当前项顶部到列表顶部的距离</span>
    <span class="token literal-property property">bottom</span><span class="token operator">:</span> <span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> defaultItemSize<span class="token punctuation">,</span> <span class="token comment">//当前项底部到列表顶部的距离</span>
<span class="token punctuation">}</span>
<span class="token comment">// 高度变化后，设变化的高度dHeight = newHeight - oldHeight</span>
<span class="token punctuation">{</span>
    <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token comment">// 当前列表项的标识</span>
    <span class="token literal-property property">height</span><span class="token operator">:</span> defaultItemSize <span class="token operator">+</span> dHeight<span class="token punctuation">,</span> <span class="token comment">// 当前列表项高度</span>
    <span class="token literal-property property">top</span><span class="token operator">:</span> index <span class="token operator">*</span> defaultItemSize<span class="token punctuation">,</span> <span class="token comment">//当前项顶部到列表顶部的距离</span>
    <span class="token literal-property property">bottom</span><span class="token operator">:</span> <span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> defaultItemSize <span class="token operator">+</span> dHeight<span class="token punctuation">,</span> <span class="token comment">//当前项底部到列表顶部的距离</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主动监听 (ResizeObserver API)</p><p>ResizeObserver 可以监听到指定元素的高度的变化，而且是原生浏览器层面的支持，性能方面也是可靠的。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 监听高度变化</span>
<span class="token keyword">const</span> <span class="token function-variable function">observe</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> resizeObserver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ResizeObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取当前列表项的高度</span>
    <span class="token keyword">const</span> el <span class="token operator">=</span> element<span class="token punctuation">.</span>current<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>el <span class="token operator">&amp;&amp;</span> el<span class="token punctuation">.</span>offsetHeight<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 触发高度更新</span>
      <span class="token function">measure</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> el<span class="token punctuation">.</span>offsetHeight<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  resizeObserver<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>element<span class="token punctuation">.</span>current<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> resizeObserver<span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="白屏优化" tabindex="-1"><a class="header-anchor" href="#白屏优化" aria-hidden="true">#</a> 白屏优化</h4><ul><li>方案一：增加缓存区(列表渲染区域要大于可视区)</li><li>方案二：部分渲染 (对非可见区域中的数据不渲染或部分渲染的技术) 措施：采用 skeleton 加载骨架屏来代替原有的不渲染部分，这样当滚动过快时，白屏也就替换为了加载屏。</li></ul><h4 id="计算优化" tabindex="-1"><a class="header-anchor" href="#计算优化" aria-hidden="true">#</a> 计算优化</h4><p>首页我们来看下，上一节提到的 positions 数组其实是个标准的按照各项位置升序的有序数组。</p><p>而最重要的和调用次数最多的逻辑是计算 startIndex：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 获取startIndex</span>
<span class="token keyword">const</span> <span class="token function-variable function">getStartIndex</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">scrollTop</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> item <span class="token operator">=</span> positions<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> i <span class="token operator">&amp;&amp;</span> i<span class="token punctuation">.</span>bottom <span class="token operator">&gt;</span> scrollTop<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> item<span class="token punctuation">.</span>index<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 所有，我们可以采用二分查找法来进行优化，具体二分查找法的实现就不在这里展开了，可查看在线示例。</span>
<span class="token keyword">const</span> <span class="token function-variable function">getStartIndex</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">scrollTop</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// let item = positions.find((i) =&gt; i &amp;&amp; i.bottom &gt; scrollTop);</span>
  <span class="token keyword">let</span> item <span class="token operator">=</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span>positions<span class="token punctuation">,</span> scrollTop<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> item<span class="token punctuation">.</span>index<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,41),h={href:"https://codesandbox.io/p/sandbox/virtuallis4-tyoo9",target:"_blank",rel:"noopener noreferrer"};function f(x,y){const a=o("ExternalLinkIcon");return l(),c("div",null,[d,n("h2",v,[m,s(),n("a",g,[s("长列表的问题"),t(a)])]),b,n("p",null,[s("其时间复杂度也从 O(n) 降为 O(logn)； "),n("a",h,[s("实现效果"),t(a)])])])}const I=e(k,[["render",f],["__file","long-list.html.vue"]]);export{I as default};