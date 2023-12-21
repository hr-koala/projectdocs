import{_ as s,o as n,c as a,e as t}from"./app-lzSeYDl-.js";const e={},p=t(`<h2 id="fuse-js" tabindex="-1"><a class="header-anchor" href="#fuse-js" aria-hidden="true">#</a> fuse.js</h2><p>Fuse.js 是一个功能强大、轻量级的模糊搜索库，通过提供简单的 api 调用，达到强大的模糊搜索效果，无需搞懂复杂的模糊搜索算法。</p><h4 id="fuse-js-的技术特点" tabindex="-1"><a class="header-anchor" href="#fuse-js-的技术特点" aria-hidden="true">#</a> Fuse.js 的技术特点</h4><ul><li>简单代码，实现模糊搜索、处理搜索，甚至不需要后端开发技术</li><li>数据量大的情况下表现优秀，性能很好</li><li>无 DOM 依赖，既可以在前端使用，也支持在 node.js 后端使用</li><li>强大的搜索支持：不仅支持搜索字符串数组、对象数组，支持嵌套搜索、加权搜索等</li></ul><p>安装 Fuse.js<br> npm install --save fuse.js</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 搜索数据</span>
<span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Old Man&#39;s War&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;author&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;firstName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;lastName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Scalzi&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;The Lock Artist&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;author&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;firstName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Steve&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;lastName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Hamilton&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token operator">...</span><span class="token punctuation">.</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 搜索配置，可查看官网文档了解参数</span>
<span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">keys</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;title&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;author.firstName&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 实例化 Fuse</span>
<span class="token keyword">const</span> fuse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Fuse</span><span class="token punctuation">(</span>list<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 传入搜索关键词，返回搜索结果</span>
<span class="token keyword">const</span> pattern <span class="token operator">=</span> <span class="token string">&quot;clolny&quot;</span>
<span class="token keyword">return</span> fuse<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了基本的搜索支持，Fuse.js 支持更高级的嵌套搜索、加权搜索和扩展搜索，对搜索算法有更高要求的开发者可以去阅读文档研究。</p>`,7),o=[p];function i(l,c){return n(),a("div",null,o)}const u=s(e,[["render",i],["__file","fusejs.html.vue"]]);export{u as default};
