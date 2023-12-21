import{_ as s,o as a,c as p,f as t,e as n}from"./app-lzSeYDl-.js";const e={},o=n(`<h1 id="从零搭建-vite-react-开发环境" tabindex="-1"><a class="header-anchor" href="#从零搭建-vite-react-开发环境" aria-hidden="true">#</a> 从零搭建 Vite + React 开发环境</h1><p>初始化 <code>package.json</code></p><p><code>npm init</code></p><p>安装 <code>vite</code></p><p><code>npm install vite vite-plugin-babel-import vite-plugin-imp --save-dev</code></p><p>创建以下目录结构、文件和内容：</p><blockquote><p>project tristana |- package.json |- index.html |- vite.config.js |- /src |- index.js</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>src <span class="token operator">/</span> index<span class="token punctuation">.</span>js<span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;root&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;React&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,8),c=n(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>utf-8<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>tristana<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>root<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>module<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/src/index.jsx<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
      window<span class="token punctuation">.</span>global <span class="token operator">=</span> window<span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>vite<span class="token punctuation">.</span>config<span class="token punctuation">.</span>js
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
<span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token function">reactRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">package</span><span class="token punctuation">.</span>json
<span class="token punctuation">{</span>
<span class="token comment">// ...</span>
<span class="token string-property property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token string-property property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite build&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

然后根目录终端输入：npm run build

在浏览器中打开 dist 目录下的 index<span class="token punctuation">.</span>html，如果一切正常，你应该能看到以下文本：<span class="token string">&#39;React&#39;</span>

index<span class="token punctuation">.</span>html 目前放在 dist 目录下，但它是手动创建的，下面会教你如何生成 index<span class="token punctuation">.</span>html 而非手动编辑它。

Vite 核心功能
热更新
$ npm install @vitejs<span class="token operator">/</span>plugin<span class="token operator">-</span>react<span class="token operator">-</span>refresh <span class="token operator">--</span>save<span class="token operator">-</span>dev
<span class="token number">1</span>
vite<span class="token punctuation">.</span>config<span class="token punctuation">.</span>js
<span class="token keyword">import</span> reactRefresh <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-react-refresh&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
<span class="token comment">// ...</span>
<span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token function">reactRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

alias
vite<span class="token punctuation">.</span>config<span class="token punctuation">.</span>js
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
<span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token string-property property">&#39;@&#39;</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>\\_\\_dirname<span class="token punctuation">,</span> <span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

开发服务
<span class="token keyword">package</span><span class="token punctuation">.</span>json
<span class="token punctuation">{</span>
<span class="token comment">// ...</span>
<span class="token string-property property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token string-property property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token punctuation">.</span>jsx 文件
安装依赖
$ npm install @babel<span class="token operator">/</span>preset<span class="token operator">-</span>react react react<span class="token operator">-</span>dom <span class="token operator">--</span>save<span class="token operator">-</span>dev
<span class="token number">1</span>
<span class="token punctuation">.</span>babelrc
<span class="token punctuation">{</span>
<span class="token string-property property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;@babel/preset-env&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;@babel/preset-react&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

src<span class="token operator">/</span>App<span class="token punctuation">.</span>jsx
在 src 目录下，新增 App<span class="token punctuation">.</span>jsx 文件：

<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> <span class="token punctuation">(</span>
<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>h1<span class="token operator">&gt;</span> Hello<span class="token punctuation">,</span> World<span class="token operator">!</span> <span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>

src<span class="token operator">/</span>index<span class="token punctuation">.</span>js
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">&quot;react-dom&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&quot;./App.jsx&quot;</span><span class="token punctuation">;</span>
ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;root&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

React Router
安装依赖
$ npm install react<span class="token operator">-</span>router history <span class="token operator">--</span>save

src<span class="token operator">/</span>index<span class="token punctuation">.</span>js
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">&quot;react-dom&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Router<span class="token punctuation">,</span> Route<span class="token punctuation">,</span> Link <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;react-router&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createBrowserHistory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;history&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&quot;./App.jsx&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">About</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> <span class="token operator">&lt;</span><span class="token operator">&gt;</span>About<span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
<span class="token operator">&lt;</span>Router history<span class="token operator">=</span><span class="token punctuation">{</span><span class="token function">createBrowserHistory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;/&quot;</span> component<span class="token operator">=</span><span class="token punctuation">{</span>App<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;/about&quot;</span> component<span class="token operator">=</span><span class="token punctuation">{</span>About<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>Router<span class="token operator">&gt;</span><span class="token punctuation">,</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;root&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

MobX
安装依赖
$ npm install mobx mobx<span class="token operator">-</span>react babel<span class="token operator">-</span>preset<span class="token operator">-</span>mobx <span class="token operator">--</span>save

<span class="token punctuation">.</span>babelrc
<span class="token punctuation">{</span>
<span class="token string-property property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;@babel/preset-env&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;@babel/preset-react&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mobx&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

src<span class="token operator">/</span>store<span class="token punctuation">.</span>js
在 src 目录下新建 store<span class="token punctuation">.</span>js

<span class="token keyword">import</span> <span class="token punctuation">{</span> observable<span class="token punctuation">,</span> action<span class="token punctuation">,</span> makeObservable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;mobx&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Store</span> <span class="token punctuation">{</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">makeObservable</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    @observable
    count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    @<span class="token function">action</span><span class="token punctuation">(</span><span class="token string">&quot;add&quot;</span><span class="token punctuation">)</span>
    <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    @<span class="token function">action</span><span class="token punctuation">(</span><span class="token string">&quot;reduce&quot;</span><span class="token punctuation">)</span>
    <span class="token function-variable function">reduce</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">Store</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

index<span class="token punctuation">.</span>js
<span class="token keyword">import</span> <span class="token punctuation">{</span> Provider <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;mobx-react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Store <span class="token keyword">from</span> <span class="token string">&quot;./store&quot;</span><span class="token punctuation">;</span>
<span class="token comment">// ...</span>
ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
<span class="token operator">&lt;</span>Provider store<span class="token operator">=</span><span class="token punctuation">{</span>Store<span class="token punctuation">}</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>Router history<span class="token operator">=</span><span class="token punctuation">{</span><span class="token function">createBrowserHistory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;/&quot;</span> component<span class="token operator">=</span><span class="token punctuation">{</span>App<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;/about&quot;</span> component<span class="token operator">=</span><span class="token punctuation">{</span>About<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>Router<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>Provider<span class="token operator">&gt;</span><span class="token punctuation">,</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;root&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

src<span class="token operator">/</span>App<span class="token punctuation">.</span>jsx
<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> observer<span class="token punctuation">,</span> inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;mobx-react&quot;</span><span class="token punctuation">;</span>

@<span class="token function">inject</span><span class="token punctuation">(</span><span class="token string">&quot;store&quot;</span><span class="token punctuation">)</span>
@observer
<span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> <span class="token punctuation">(</span>
<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>store<span class="token punctuation">.</span>count<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>store<span class="token punctuation">.</span>add<span class="token punctuation">}</span><span class="token operator">&gt;</span>add<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>store<span class="token punctuation">.</span>reduce<span class="token punctuation">}</span><span class="token operator">&gt;</span>reduce<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>

Ant Design
安装依赖
$ npm install antd vite<span class="token operator">-</span>plugin<span class="token operator">-</span>babel<span class="token operator">-</span><span class="token keyword">import</span> vite<span class="token operator">-</span>plugin<span class="token operator">-</span>imp <span class="token operator">--</span>save

vite<span class="token punctuation">.</span>config<span class="token punctuation">.</span>js
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> vitePluginImp <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-imp&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
<span class="token comment">// ...</span>
<span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token function">vitePluginImp</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
<span class="token literal-property property">libList</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token punctuation">{</span>
<span class="token literal-property property">libName</span><span class="token operator">:</span> <span class="token string">&#39;antd&#39;</span><span class="token punctuation">,</span>
<span class="token literal-property property">libDirectory</span><span class="token operator">:</span> <span class="token string">&#39;es&#39;</span><span class="token punctuation">,</span>
<span class="token function-variable function">style</span><span class="token operator">:</span> <span class="token parameter">name</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">antd/es/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/style</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token literal-property property">css</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token literal-property property">preprocessorOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token literal-property property">less</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token literal-property property">javascriptEnabled</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

src<span class="token operator">/</span>App<span class="token punctuation">.</span>jsx
<span class="token comment">// ...</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> DatePicker <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;antd&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&quot;antd/dist/antd.css&quot;</span><span class="token punctuation">;</span>

@<span class="token function">inject</span><span class="token punctuation">(</span><span class="token string">&quot;store&quot;</span><span class="token punctuation">)</span>
@observer
<span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> <span class="token punctuation">(</span>
<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>DatePicker <span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>

TypeScript
安装依赖
$ npm install typescript @babel<span class="token operator">/</span>preset<span class="token operator">-</span>typescript <span class="token operator">--</span>save<span class="token operator">-</span>dev

<span class="token punctuation">.</span>babelrc
<span class="token punctuation">{</span>
<span class="token string-property property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token comment">// ...</span>
<span class="token string">&quot;@babel/preset-typescript&quot;</span>
<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

tsconfig<span class="token punctuation">.</span>json
在根目录下，新增 tsconfig<span class="token punctuation">.</span>json 文件：

<span class="token punctuation">{</span>
<span class="token string-property property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token string-property property">&quot;emitDecoratorMetadata&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;experimentalDecorators&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;target&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ES5&quot;</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;allowSyntheticDefaultImports&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;strict&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;forceConsistentCasingInFileNames&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;allowJs&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;outDir&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./dist/&quot;</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;esModuleInterop&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;noImplicitAny&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;sourceMap&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;module&quot;</span><span class="token operator">:</span> <span class="token string">&quot;esnext&quot;</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;moduleResolution&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node&quot;</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;isolatedModules&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;importHelpers&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;lib&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;esnext&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dom&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dom.iterable&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;skipLibCheck&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;jsx&quot;</span><span class="token operator">:</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;typeRoots&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;node&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;node_modules/@types&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;rootDirs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;./src&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;baseUrl&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./src&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;include&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;./src/**/*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;exclude&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;node_modules&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

src<span class="token operator">/</span>App<span class="token punctuation">.</span>jsx
更换文件后缀 App<span class="token punctuation">.</span>jsx <span class="token operator">-</span><span class="token operator">&gt;</span> App<span class="token punctuation">.</span>tsx

<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> observer<span class="token punctuation">,</span> inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;mobx-react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> DatePicker <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;antd&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&quot;antd/dist/antd.css&quot;</span><span class="token punctuation">;</span>

@<span class="token function">inject</span><span class="token punctuation">(</span><span class="token string">&quot;store&quot;</span><span class="token punctuation">)</span>
@observer
<span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
<span class="token literal-property property">props</span><span class="token operator">:</span> any<span class="token punctuation">;</span>
<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> <span class="token punctuation">(</span>
<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>DatePicker <span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>store<span class="token punctuation">.</span>count<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>store<span class="token punctuation">.</span>add<span class="token punctuation">}</span><span class="token operator">&gt;</span>add<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>store<span class="token punctuation">.</span>reduce<span class="token punctuation">}</span><span class="token operator">&gt;</span>reduce<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>

代码规范
代码校验、代码格式化、Git 提交前校验、Vscode 配置、编译校验

ESLint
安装依赖
$ npm install @typescript<span class="token operator">-</span>eslint<span class="token operator">/</span>parser eslint eslint<span class="token operator">-</span>plugin<span class="token operator">-</span>standard @typescript<span class="token operator">-</span>eslint<span class="token operator">/</span>parser @typescript<span class="token operator">-</span>eslint<span class="token operator">/</span>eslint<span class="token operator">-</span>plugin eslint<span class="token operator">-</span>plugin<span class="token operator">-</span>promise <span class="token operator">--</span>save<span class="token operator">-</span>dev

<span class="token punctuation">.</span>eslintrc<span class="token punctuation">.</span>js
在根目录下，新增 <span class="token punctuation">.</span>eslintrc<span class="token punctuation">.</span>js 文件：

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
<span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;eslint:recommended&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;plugin:react/recommended&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token literal-property property">commonjs</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token literal-property property">es6</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token literal-property property">globals</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token literal-property property">$</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token literal-property property">process</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
\\_\\_dirname<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">&quot;@typescript-eslint/parser&quot;</span><span class="token punctuation">,</span>
<span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token literal-property property">ecmaFeatures</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token literal-property property">jsx</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">&quot;module&quot;</span><span class="token punctuation">,</span>
<span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;react&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;standard&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;promise&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;@typescript-eslint&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token literal-property property">settings</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token string-property property">&quot;import/ignore&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;node_modules&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token literal-property property">react</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token literal-property property">version</span><span class="token operator">:</span> <span class="token string">&quot;latest&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token literal-property property">quotes</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;single&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-console&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-debugger&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-var&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;always&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-irregular-whitespace&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-trailing-spaces&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;eol-last&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-unused-vars&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
<span class="token literal-property property">vars</span><span class="token operator">:</span> <span class="token string">&quot;all&quot;</span><span class="token punctuation">,</span>
<span class="token literal-property property">args</span><span class="token operator">:</span> <span class="token string">&quot;after-used&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-case-declarations&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-underscore-dangle&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-alert&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-lone-blocks&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-class-assign&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-cond-assign&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-const-assign&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-delete-var&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-dupe-keys&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;use-isnan&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-duplicate-case&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-dupe-args&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-empty&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-func-assign&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-invalid-this&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-redeclare&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-spaced-func&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-this-before-super&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-undef&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-return-assign&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-script-url&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-use-before-define&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-extra-boolean-cast&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-unreachable&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;comma-dangle&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;no-mixed-spaces-and-tabs&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;prefer-arrow-callback&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;arrow-parens&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;arrow-spacing&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token literal-property property">camelcase</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;jsx-quotes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;prefer-double&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/display-name&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/forbid-prop-types&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token number">2</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
<span class="token literal-property property">forbid</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;any&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/jsx-boolean-value&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/jsx-closing-bracket-location&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/jsx-curly-spacing&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token number">2</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
<span class="token literal-property property">when</span><span class="token operator">:</span> <span class="token string">&quot;never&quot;</span><span class="token punctuation">,</span>
<span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/jsx-indent&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/jsx-key&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/jsx-no-bind&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/jsx-no-duplicate-props&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/jsx-no-literals&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/jsx-no-undef&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/jsx-pascal-case&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/jsx-sort-props&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/jsx-uses-react&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/jsx-uses-vars&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/no-danger&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/no-did-mount-set-state&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/no-did-update-set-state&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/no-direct-mutation-state&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/no-multi-comp&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/no-set-state&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/no-unknown-property&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/prefer-es6-class&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/prop-types&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/react-in-jsx-scope&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/self-closing-comp&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/sort-comp&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/no-array-index-key&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/no-deprecated&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;react/jsx-equals-spacing&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token punctuation">.</span>eslintignore
在根目录下，新增 <span class="token punctuation">.</span>eslintignore 文件：

src<span class="token operator">/</span>assets

<span class="token punctuation">.</span>vscode
在根目录下新增 <span class="token punctuation">.</span>vscode 文件夹，然后新增 <span class="token punctuation">.</span>vscode<span class="token operator">/</span>settings<span class="token punctuation">.</span>json

<span class="token punctuation">{</span>
<span class="token string-property property">&quot;eslint.validate&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token string">&quot;javascript&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;javascriptreact&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;typescript&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;typescriptreact&quot;</span>
<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

Perttier
安装依赖
$ npm install prettier <span class="token operator">--</span>save<span class="token operator">-</span>dev

prettier<span class="token punctuation">.</span>config<span class="token punctuation">.</span>js
在根目录下，新增 prettier<span class="token punctuation">.</span>config<span class="token punctuation">.</span>js 文件：

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
<span class="token comment">// 一行最多 100 字符</span>
<span class="token literal-property property">printWidth</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
<span class="token comment">// 使用 4 个空格缩进</span>
<span class="token literal-property property">tabWidth</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
<span class="token comment">// 不使用缩进符，而使用空格</span>
<span class="token literal-property property">useTabs</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token comment">// 行尾需要有分号</span>
<span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token comment">// 使用单引号</span>
<span class="token literal-property property">singleQuote</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token comment">// 对象的 key 仅在必要时用引号</span>
<span class="token literal-property property">quoteProps</span><span class="token operator">:</span> <span class="token string">&#39;as-needed&#39;</span><span class="token punctuation">,</span>
<span class="token comment">// jsx 不使用单引号，而使用双引号</span>
<span class="token literal-property property">jsxSingleQuote</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token comment">// 末尾不需要逗号</span>
<span class="token literal-property property">trailingComma</span><span class="token operator">:</span> <span class="token string">&#39;none&#39;</span><span class="token punctuation">,</span>
<span class="token comment">// 大括号内的首尾需要空格</span>
<span class="token literal-property property">bracketSpacing</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token comment">// jsx 标签的反尖括号需要换行</span>
<span class="token literal-property property">jsxBracketSameLine</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token comment">// 箭头函数，只有一个参数的时候，也需要括号</span>
<span class="token literal-property property">arrowParens</span><span class="token operator">:</span> <span class="token string">&#39;avoid&#39;</span><span class="token punctuation">,</span>
<span class="token comment">// 每个文件格式化的范围是文件的全部内容</span>
<span class="token literal-property property">rangeStart</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token literal-property property">rangeEnd</span><span class="token operator">:</span> <span class="token number">Infinity</span><span class="token punctuation">,</span>
<span class="token comment">// 不需要写文件开头的 @prettier</span>
<span class="token literal-property property">requirePragma</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token comment">// 不需要自动在文件开头插入 @prettier</span>
<span class="token literal-property property">insertPragma</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token comment">// 使用默认的折行标准</span>
<span class="token literal-property property">proseWrap</span><span class="token operator">:</span> <span class="token string">&#39;preserve&#39;</span><span class="token punctuation">,</span>
<span class="token comment">// 根据显示样式决定 html 要不要折行</span>
<span class="token literal-property property">htmlWhitespaceSensitivity</span><span class="token operator">:</span> <span class="token string">&#39;css&#39;</span><span class="token punctuation">,</span>
<span class="token comment">// 换行符使用 lf</span>
<span class="token literal-property property">endOfLine</span><span class="token operator">:</span> <span class="token string">&#39;lf&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

stylelint
安装依赖
$ npm install stylelint stylelint<span class="token operator">-</span>config<span class="token operator">-</span>standard stylelint<span class="token operator">-</span>config<span class="token operator">-</span>prettier <span class="token operator">--</span>save<span class="token operator">-</span>dev

stylelint<span class="token punctuation">.</span>config<span class="token punctuation">.</span>js
在根目录下，新增 stylelint<span class="token punctuation">.</span>config<span class="token punctuation">.</span>js 文件：

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
<span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;stylelint-config-standard&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;stylelint-config-prettier&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token literal-property property">ignoreFiles</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token string">&#39;**/*.ts&#39;</span><span class="token punctuation">,</span>
<span class="token string">&#39;**/*.tsx&#39;</span><span class="token punctuation">,</span>
<span class="token string">&#39;**/*.png&#39;</span><span class="token punctuation">,</span>
<span class="token string">&#39;**/*.jpg&#39;</span><span class="token punctuation">,</span>
<span class="token string">&#39;**/*.jpeg&#39;</span><span class="token punctuation">,</span>
<span class="token string">&#39;**/*.gif&#39;</span><span class="token punctuation">,</span>
<span class="token string">&#39;**/*.mp3&#39;</span><span class="token punctuation">,</span>
<span class="token string">&#39;**/*.json&#39;</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token string-property property">&#39;at-rule-no-unknown&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
<span class="token literal-property property">ignoreAtRules</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;extends&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;ignores&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token literal-property property">indentation</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
<span class="token string-property property">&#39;number-leading-zero&#39;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
<span class="token string-property property">&#39;unit-allowed-list&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;em&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rem&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;s&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;px&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;deg&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;all&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;vh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&#39;no-eol-whitespace&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
<span class="token literal-property property">ignore</span><span class="token operator">:</span> <span class="token string">&#39;empty-lines&#39;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&#39;declaration-block-trailing-semicolon&#39;</span><span class="token operator">:</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span>
<span class="token string-property property">&#39;selector-pseudo-class-no-unknown&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
<span class="token literal-property property">ignorePseudoClasses</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;global&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&#39;block-closing-brace-newline-after&#39;</span><span class="token operator">:</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span>
<span class="token string-property property">&#39;declaration-block-semicolon-newline-after&#39;</span><span class="token operator">:</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span>
<span class="token string-property property">&#39;no-descending-specificity&#39;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
<span class="token string-property property">&#39;selector-list-comma-newline-after&#39;</span><span class="token operator">:</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span>
<span class="token string-property property">&#39;selector-pseudo-element-colon-notation&#39;</span><span class="token operator">:</span> <span class="token string">&#39;single&#39;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

lint<span class="token operator">-</span>staged、pre<span class="token operator">-</span>commit
安装依赖
$ npm install lint<span class="token operator">-</span>staged prettier eslint pre<span class="token operator">-</span>commit <span class="token operator">--</span>save<span class="token operator">-</span>dev

<span class="token keyword">package</span><span class="token punctuation">.</span>json
<span class="token punctuation">{</span>
<span class="token comment">// ...</span>
<span class="token string-property property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token string-property property">&quot;lint:tsx&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eslint --ext .tsx src &amp;&amp; eslint --ext .ts src&quot;</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;lint:css&quot;</span><span class="token operator">:</span> <span class="token string">&quot;stylelint --aei .less .css src&quot;</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;precommit&quot;</span><span class="token operator">:</span> <span class="token string">&quot;lint-staged&quot;</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;precommit-msg&quot;</span><span class="token operator">:</span> <span class="token string">&quot;echo &#39;Pre-commit checks...&#39; &amp;&amp; exit 0&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;pre-commit&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token string">&quot;precommit&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;precommit-msg&quot;</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;lint-staged&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token string-property property">&quot;_.{js,jsx,ts,tsx}&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token string">&quot;eslint --fix&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;prettier --write&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;git add&quot;</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;_.{css,less}&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token string">&quot;stylelint --fix&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;prettier --write&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;git add&quot;</span>
<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

eslint<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin
安装依赖
$ npm install eslint<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin <span class="token operator">--</span>save<span class="token operator">-</span>dev

vite<span class="token punctuation">.</span>config<span class="token punctuation">.</span>ts
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> ESLintPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;eslint-webpack-plugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
<span class="token comment">// ...</span>
<span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token keyword">new</span> <span class="token class-name">ESLintPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,3);function l(i,r){return a(),p("div",null,[o,t(" index.html "),c])}const k=s(e,[["render",l],["__file","react_build.html.vue"]]);export{k as default};
