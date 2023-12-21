import{_ as n,o as s,c as a,e as t}from"./app-lzSeYDl-.js";const p={},e=t(`<h2 id="实现一个-new-操作符" tabindex="-1"><a class="header-anchor" href="#实现一个-new-操作符" aria-hidden="true">#</a> 实现一个 new 操作符</h2><p>new 操作符做了这些事：</p><ul><li>它创建了一个全新的对象。</li><li>它会被执行[[Prototype]]（也就是<strong>proto</strong>）链接。</li><li>它使 this 指向新创建的对象。。</li><li>通过 new 创建的每个对象将最终被[[Prototype]]链接到这个函数的 prototype 对象上。</li><li>如果函数没有返回对象类型 Object(包含 Functoin, Array, Date, RegExg, Error)，那么 new 表达式中的函数调用将返回该对象引用。</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">New</span><span class="token punctuation">(</span><span class="token parameter">func</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> res<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>func<span class="token punctuation">.</span>prototype<span class="token operator">!==</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        res<span class="token punctuation">.</span>prototype<span class="token operator">=</span>func<span class="token punctuation">.</span>__proto__
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> ret<span class="token operator">=</span><span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span><span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> ret<span class="token operator">===</span><span class="token string">&#39;object&#39;</span><span class="token operator">||</span><span class="token keyword">typeof</span> ret<span class="token operator">===</span><span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span><span class="token operator">&amp;&amp;</span>ret<span class="token operator">!==</span><span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> ret
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token function">New</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// equals to</span>
<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","new.html.vue"]]);export{r as default};