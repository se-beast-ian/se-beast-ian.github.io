(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class En{constructor(e,t,n,i,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),En.nextNameID=En.nextNameID||0,this.$name.id=`lil-gui-name-${++En.nextNameID}`,this.$widget=document.createElement(s),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Oc extends En{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function ro(d){let e,t;return(e=d.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=d.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=d.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const Vc={isPrimitive:!0,match:d=>typeof d=="string",fromHexString:ro,toHexString:ro},Ms={isPrimitive:!0,match:d=>typeof d=="number",fromHexString:d=>parseInt(d.substring(1),16),toHexString:d=>"#"+d.toString(16).padStart(6,0)},Uc={isPrimitive:!1,match:Array.isArray,fromHexString(d,e,t=1){const n=Ms.fromHexString(d);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([d,e,t],n=1){n=255/n;const i=d*n<<16^e*n<<8^t*n<<0;return Ms.toHexString(i)}},kc={isPrimitive:!1,match:d=>Object(d)===d,fromHexString(d,e,t=1){const n=Ms.fromHexString(d);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:d,g:e,b:t},n=1){n=255/n;const i=d*n<<16^e*n<<8^t*n<<0;return Ms.toHexString(i)}},Hc=[Vc,Ms,Uc,kc];function Wc(d){return Hc.find(e=>e.match(d))}class Gc extends En{constructor(e,t,n,i){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Wc(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=ro(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class _r extends En{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class qc extends En{constructor(e,t,n,i,s,r){super(e,t,n,"number"),this._initInput(),this.min(i),this.max(s);const o=r!==void 0;this.step(o?r:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let v=parseFloat(this.$input.value);isNaN(v)||(this._stepExplicit&&(v=this._snap(v)),this.setValue(this._clamp(v)))},t=v=>{const x=parseFloat(this.$input.value);isNaN(x)||(this._snapClampSetValue(x+v),this.$input.value=this.getValue())},n=v=>{v.code==="Enter"&&this.$input.blur(),v.code==="ArrowUp"&&(v.preventDefault(),t(this._step*this._arrowKeyMultiplier(v))),v.code==="ArrowDown"&&(v.preventDefault(),t(this._step*this._arrowKeyMultiplier(v)*-1))},i=v=>{this._inputFocused&&(v.preventDefault(),t(this._step*this._normalizeMouseWheel(v)))};let s=!1,r,o,a,c,h;const l=5,u=v=>{r=v.clientX,o=a=v.clientY,s=!0,c=this.getValue(),h=0,window.addEventListener("mousemove",f),window.addEventListener("mouseup",g)},f=v=>{if(s){const x=v.clientX-r,w=v.clientY-o;Math.abs(w)>l?(v.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(x)>l&&g()}if(!s){const x=v.clientY-a;h-=x*this._step*this._arrowKeyMultiplier(v),c+h>this._max?h=this._max-c:c+h<this._min&&(h=this._min-c),this._snapClampSetValue(c+h)}a=v.clientY},g=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",f),window.removeEventListener("mouseup",g)},m=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",i,{passive:!1}),this.$input.addEventListener("mousedown",u),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(v,x,w,y,b)=>(v-x)/(w-x)*(b-y)+y,t=v=>{const x=this.$slider.getBoundingClientRect();let w=e(v,x.left,x.right,this._min,this._max);this._snapClampSetValue(w)},n=v=>{this._setDraggingStyle(!0),t(v.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)},i=v=>{t(v.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)};let r=!1,o,a;const c=v=>{v.preventDefault(),this._setDraggingStyle(!0),t(v.touches[0].clientX),r=!1},h=v=>{v.touches.length>1||(this._hasScrollBar?(o=v.touches[0].clientX,a=v.touches[0].clientY,r=!0):c(v),window.addEventListener("touchmove",l,{passive:!1}),window.addEventListener("touchend",u))},l=v=>{if(r){const x=v.touches[0].clientX-o,w=v.touches[0].clientY-a;Math.abs(x)>Math.abs(w)?c(v):(window.removeEventListener("touchmove",l),window.removeEventListener("touchend",u))}else v.preventDefault(),t(v.touches[0].clientX)},u=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",l),window.removeEventListener("touchend",u)},f=this._callOnFinishChange.bind(this),g=400;let m;const p=v=>{if(Math.abs(v.deltaX)<Math.abs(v.deltaY)&&this._hasScrollBar)return;v.preventDefault();const w=this._normalizeMouseWheel(v)*this._step;this._snapClampSetValue(this.getValue()+w),this.$input.value=this.getValue(),clearTimeout(m),m=setTimeout(f,g)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",p,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Xc extends En{constructor(e,t,n,i){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(i)?i:Object.values(i),this._names=Array.isArray(i)?i:Object.keys(i),this._names.forEach(s=>{const r=document.createElement("option");r.innerHTML=s,this.$select.appendChild(r)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.innerHTML=t===-1?e:this._names[t],this}}class Yc extends En{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const jc=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  background-color: var(--background-color);
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean .widget {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background-color: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background-color: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background-color: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui input {
  -webkit-tap-highlight-color: transparent;
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input::-webkit-outer-spin-button,
.lil-gui input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.lil-gui input[type=number] {
  -moz-appearance: textfield;
}
.lil-gui input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: 1px solid var(--widget-color);
  text-align: center;
  line-height: calc(var(--widget-height) - 4px);
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
    border-color: var(--hover-color);
  }
  .lil-gui button:focus {
    border-color: var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function $c(d){const e=document.createElement("style");e.innerHTML=d;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Go=!1;class _o{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:i,title:s="Controls",injectStyles:r=!0,touchStyles:o=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",a=>{(a.code==="Enter"||a.code==="Space")&&(a.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),o&&this.domElement.classList.add("allow-touch-styles"),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),!Go&&r&&($c(jc),Go=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation())}add(e,t,n,i,s){if(Object(n)===n)return new Xc(this,e,t,n);const r=e[t];switch(typeof r){case"number":return new qc(this,e,t,n,i,s);case"boolean":return new Oc(this,e,t);case"string":return new Yc(this,e,t);case"function":return new _r(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,r)}addColor(e,t,n=1){return new Gc(this,e,t,n)}addFolder(e){return new _o({parent:this,title:e})}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof _r||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof _r)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wo="148",bi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Mi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Kc=0,qo=1,Zc=2,Ul=1,Jc=2,ys=3,Kn=0,fn=1,pr=2,Fs=3,$n=0,Ui=1,Xo=2,Yo=3,jo=4,Qc=5,Oi=100,eh=101,th=102,$o=103,Ko=104,nh=200,ih=201,sh=202,rh=203,kl=204,Hl=205,oh=206,ah=207,lh=208,ch=209,hh=210,uh=0,dh=1,fh=2,oo=3,ph=4,mh=5,gh=6,vh=7,Wl=0,xh=1,yh=2,On=0,_h=1,wh=2,bh=3,Mh=4,Sh=5,Gl=300,Xi=301,Yi=302,ao=303,lo=304,mr=306,ji=1e3,un=1001,dr=1002,Ft=1003,co=1004,cr=1005,en=1006,ql=1007,fi=1008,pi=1009,Eh=1010,Th=1011,Xl=1012,Ah=1013,li=1014,Xn=1015,Ss=1016,Ch=1017,Lh=1018,ki=1020,Rh=1021,Ph=1022,dn=1023,Ih=1024,Dh=1025,hi=1026,$i=1027,Nh=1028,Bh=1029,Fh=1030,zh=1031,Oh=1033,wr=33776,br=33777,Mr=33778,Sr=33779,Zo=35840,Jo=35841,Qo=35842,ea=35843,Vh=36196,ta=37492,na=37496,ia=37808,sa=37809,ra=37810,oa=37811,aa=37812,la=37813,ca=37814,ha=37815,ua=37816,da=37817,fa=37818,pa=37819,ma=37820,ga=37821,va=36492,Es=2300,Ki=2301,Er=2302,xa=2400,ya=2401,_a=2402,Uh=2500,kh=1,Yl=2,mi=3e3,at=3001,Hh=3200,Wh=3201,jl=0,Gh=1,Mn="srgb",Ts="srgb-linear",Tr=7680,qh=519,ho=35044,wa="300 es",uo=1035;class _i{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,e);e.target=null}}}const Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ba=1234567;const ws=Math.PI/180,As=180/Math.PI;function yn(){const d=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Vt[d&255]+Vt[d>>8&255]+Vt[d>>16&255]+Vt[d>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]).toLowerCase()}function kt(d,e,t){return Math.max(e,Math.min(t,d))}function bo(d,e){return(d%e+e)%e}function Xh(d,e,t,n,i){return n+(d-e)*(i-n)/(t-e)}function Yh(d,e,t){return d!==e?(t-d)/(e-d):0}function bs(d,e,t){return(1-t)*d+t*e}function jh(d,e,t,n){return bs(d,e,1-Math.exp(-t*n))}function $h(d,e=1){return e-Math.abs(bo(d,e*2)-e)}function Kh(d,e,t){return d<=e?0:d>=t?1:(d=(d-e)/(t-e),d*d*(3-2*d))}function Zh(d,e,t){return d<=e?0:d>=t?1:(d=(d-e)/(t-e),d*d*d*(d*(d*6-15)+10))}function Jh(d,e){return d+Math.floor(Math.random()*(e-d+1))}function Qh(d,e){return d+Math.random()*(e-d)}function eu(d){return d*(.5-Math.random())}function tu(d){d!==void 0&&(ba=d);let e=ba+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function nu(d){return d*ws}function iu(d){return d*As}function fo(d){return(d&d-1)===0&&d!==0}function $l(d){return Math.pow(2,Math.ceil(Math.log(d)/Math.LN2))}function fr(d){return Math.pow(2,Math.floor(Math.log(d)/Math.LN2))}function su(d,e,t,n,i){const s=Math.cos,r=Math.sin,o=s(t/2),a=r(t/2),c=s((e+n)/2),h=r((e+n)/2),l=s((e-n)/2),u=r((e-n)/2),f=s((n-e)/2),g=r((n-e)/2);switch(i){case"XYX":d.set(o*h,a*l,a*u,o*c);break;case"YZY":d.set(a*u,o*h,a*l,o*c);break;case"ZXZ":d.set(a*l,a*u,o*h,o*c);break;case"XZX":d.set(o*h,a*g,a*f,o*c);break;case"YXY":d.set(a*f,o*h,a*g,o*c);break;case"ZYZ":d.set(a*g,a*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Fn(d,e){switch(e.constructor){case Float32Array:return d;case Uint16Array:return d/65535;case Uint8Array:return d/255;case Int16Array:return Math.max(d/32767,-1);case Int8Array:return Math.max(d/127,-1);default:throw new Error("Invalid component type.")}}function mt(d,e){switch(e.constructor){case Float32Array:return d;case Uint16Array:return Math.round(d*65535);case Uint8Array:return Math.round(d*255);case Int16Array:return Math.round(d*32767);case Int8Array:return Math.round(d*127);default:throw new Error("Invalid component type.")}}var ru=Object.freeze({__proto__:null,DEG2RAD:ws,RAD2DEG:As,generateUUID:yn,clamp:kt,euclideanModulo:bo,mapLinear:Xh,inverseLerp:Yh,lerp:bs,damp:jh,pingpong:$h,smoothstep:Kh,smootherstep:Zh,randInt:Jh,randFloat:Qh,randFloatSpread:eu,seededRandom:tu,degToRad:nu,radToDeg:iu,isPowerOfTwo:fo,ceilPowerOfTwo:$l,floorPowerOfTwo:fr,setQuaternionFromProperEuler:su,normalize:mt,denormalize:Fn});class et{constructor(e=0,t=0){et.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*n-r*i+e.x,this.y=s*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class on{constructor(){on.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,n,i,s,r,o,a,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=a,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,r=n[0],o=n[3],a=n[6],c=n[1],h=n[4],l=n[7],u=n[2],f=n[5],g=n[8],m=i[0],p=i[3],v=i[6],x=i[1],w=i[4],y=i[7],b=i[2],L=i[5],k=i[8];return s[0]=r*m+o*x+a*b,s[3]=r*p+o*w+a*L,s[6]=r*v+o*y+a*k,s[1]=c*m+h*x+l*b,s[4]=c*p+h*w+l*L,s[7]=c*v+h*y+l*k,s[2]=u*m+f*x+g*b,s[5]=u*p+f*w+g*L,s[8]=u*v+f*y+g*k,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],a=e[6],c=e[7],h=e[8];return t*r*h-t*o*c-n*s*h+n*o*a+i*s*c-i*r*a}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],a=e[6],c=e[7],h=e[8],l=h*r-o*c,u=o*a-h*s,f=c*s-r*a,g=t*l+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/g;return e[0]=l*m,e[1]=(i*c-h*n)*m,e[2]=(o*n-i*r)*m,e[3]=u*m,e[4]=(h*t-i*a)*m,e[5]=(i*s-o*t)*m,e[6]=f*m,e[7]=(n*a-c*t)*m,e[8]=(r*t-n*s)*m,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,r,o){const a=Math.cos(s),c=Math.sin(s);return this.set(n*a,n*c,-n*(a*r+c*o)+r+e,-i*c,i*a,-i*(-c*r+a*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ar.makeScale(e,t)),this}rotate(e){return this.premultiply(Ar.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ar.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ar=new on;function Kl(d){for(let e=d.length-1;e>=0;--e)if(d[e]>=65535)return!0;return!1}function Cs(d){return document.createElementNS("http://www.w3.org/1999/xhtml",d)}function ui(d){return d<.04045?d*.0773993808:Math.pow(d*.9478672986+.0521327014,2.4)}function hr(d){return d<.0031308?d*12.92:1.055*Math.pow(d,.41666)-.055}const Cr={[Mn]:{[Ts]:ui},[Ts]:{[Mn]:hr}},qt={legacyMode:!0,get workingColorSpace(){return Ts},set workingColorSpace(d){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(d,e,t){if(this.legacyMode||e===t||!e||!t)return d;if(Cr[e]&&Cr[e][t]!==void 0){const n=Cr[e][t];return d.r=n(d.r),d.g=n(d.g),d.b=n(d.b),d}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(d,e){return this.convert(d,this.workingColorSpace,e)},toWorkingColorSpace:function(d,e){return this.convert(d,e,this.workingColorSpace)}},Zl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rt={r:0,g:0,b:0},mn={h:0,s:0,l:0},zs={h:0,s:0,l:0};function Lr(d,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?d+(e-d)*6*t:t<1/2?e:t<2/3?d+(e-d)*6*(2/3-t):d}function Os(d,e){return e.r=d.r,e.g=d.g,e.b=d.b,e}class st{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=qt.workingColorSpace){return this.r=e,this.g=t,this.b=n,qt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=qt.workingColorSpace){if(e=bo(e,1),t=kt(t,0,1),n=kt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,r=2*n-s;this.r=Lr(r,s,e+1/3),this.g=Lr(r,s,e),this.b=Lr(r,s,e-1/3)}return qt.toWorkingColorSpace(this,i),this}setStyle(e,t=Mn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let s;const r=i[1],o=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,qt.toWorkingColorSpace(this,t),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,qt.toWorkingColorSpace(this,t),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const a=parseFloat(s[1])/360,c=parseFloat(s[2])/100,h=parseFloat(s[3])/100;return n(s[4]),this.setHSL(a,c,h,t)}break}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],r=s.length;if(r===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,qt.toWorkingColorSpace(this,t),this;if(r===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,qt.toWorkingColorSpace(this,t),this}return e&&e.length>0?this.setColorName(e,t):this}setColorName(e,t=Mn){const n=Zl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ui(e.r),this.g=ui(e.g),this.b=ui(e.b),this}copyLinearToSRGB(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mn){return qt.fromWorkingColorSpace(Os(this,Rt),e),kt(Rt.r*255,0,255)<<16^kt(Rt.g*255,0,255)<<8^kt(Rt.b*255,0,255)<<0}getHexString(e=Mn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qt.workingColorSpace){qt.fromWorkingColorSpace(Os(this,Rt),t);const n=Rt.r,i=Rt.g,s=Rt.b,r=Math.max(n,i,s),o=Math.min(n,i,s);let a,c;const h=(o+r)/2;if(o===r)a=0,c=0;else{const l=r-o;switch(c=h<=.5?l/(r+o):l/(2-r-o),r){case n:a=(i-s)/l+(i<s?6:0);break;case i:a=(s-n)/l+2;break;case s:a=(n-i)/l+4;break}a/=6}return e.h=a,e.s=c,e.l=h,e}getRGB(e,t=qt.workingColorSpace){return qt.fromWorkingColorSpace(Os(this,Rt),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=Mn){return qt.fromWorkingColorSpace(Os(this,Rt),e),e!==Mn?`color(${e} ${Rt.r} ${Rt.g} ${Rt.b})`:`rgb(${Rt.r*255|0},${Rt.g*255|0},${Rt.b*255|0})`}offsetHSL(e,t,n){return this.getHSL(mn),mn.h+=e,mn.s+=t,mn.l+=n,this.setHSL(mn.h,mn.s,mn.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(mn),e.getHSL(zs);const n=bs(mn.h,zs.h,t),i=bs(mn.s,zs.s,t),s=bs(mn.l,zs.l,t);return this.setHSL(n,i,s),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}st.NAMES=Zl;let Si;class Jl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Si===void 0&&(Si=Cs("canvas")),Si.width=e.width,Si.height=e.height;const n=Si.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Si}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Cs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=ui(s[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ui(t[n]/255)*255):t[n]=ui(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class Ql{constructor(e=null){this.isSource=!0,this.uuid=yn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,o=i.length;r<o;r++)i[r].isDataTexture?s.push(Rr(i[r].image)):s.push(Rr(i[r]))}else s=Rr(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Rr(d){return typeof HTMLImageElement<"u"&&d instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&d instanceof ImageBitmap?Jl.getDataURL(d):d.data?{data:Array.from(d.data),width:d.width,height:d.height,type:d.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ou=0;class zt extends _i{constructor(e=zt.DEFAULT_IMAGE,t=zt.DEFAULT_MAPPING,n=un,i=un,s=en,r=fi,o=dn,a=pi,c=zt.DEFAULT_ANISOTROPY,h=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=yn(),this.name="",this.source=new Ql(e),this.mipmaps=[],this.mapping=t,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=a,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new on,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ji:e.x=e.x-Math.floor(e.x);break;case un:e.x=e.x<0?0:1;break;case dr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ji:e.y=e.y-Math.floor(e.y);break;case un:e.y=e.y<0?0:1;break;case dr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=Gl;zt.DEFAULT_ANISOTROPY=1;class gt{constructor(e=0,t=0,n=0,i=1){gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const a=e.elements,c=a[0],h=a[4],l=a[8],u=a[1],f=a[5],g=a[9],m=a[2],p=a[6],v=a[10];if(Math.abs(h-u)<.01&&Math.abs(l-m)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(l+m)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,y=(f+1)/2,b=(v+1)/2,L=(h+u)/4,k=(l+m)/4,_=(g+p)/4;return w>y&&w>b?w<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(w),i=L/n,s=k/n):y>b?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=L/i,s=_/i):b<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(b),n=k/s,i=_/s),this.set(n,i,s,t),this}let x=Math.sqrt((p-g)*(p-g)+(l-m)*(l-m)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(l-m)/x,this.z=(u-h)/x,this.w=Math.acos((c+f+v-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gi extends _i{constructor(e=1,t=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);const i={width:e,height:t,depth:1};this.texture=new zt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:en,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ql(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ec extends zt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class au extends zt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let _n=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,r,o){let a=n[i+0],c=n[i+1],h=n[i+2],l=n[i+3];const u=s[r+0],f=s[r+1],g=s[r+2],m=s[r+3];if(o===0){e[t+0]=a,e[t+1]=c,e[t+2]=h,e[t+3]=l;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=g,e[t+3]=m;return}if(l!==m||a!==u||c!==f||h!==g){let p=1-o;const v=a*u+c*f+h*g+l*m,x=v>=0?1:-1,w=1-v*v;if(w>Number.EPSILON){const b=Math.sqrt(w),L=Math.atan2(b,v*x);p=Math.sin(p*L)/b,o=Math.sin(o*L)/b}const y=o*x;if(a=a*p+u*y,c=c*p+f*y,h=h*p+g*y,l=l*p+m*y,p===1-o){const b=1/Math.sqrt(a*a+c*c+h*h+l*l);a*=b,c*=b,h*=b,l*=b}}e[t]=a,e[t+1]=c,e[t+2]=h,e[t+3]=l}static multiplyQuaternionsFlat(e,t,n,i,s,r){const o=n[i],a=n[i+1],c=n[i+2],h=n[i+3],l=s[r],u=s[r+1],f=s[r+2],g=s[r+3];return e[t]=o*g+h*l+a*f-c*u,e[t+1]=a*g+h*u+c*l-o*f,e[t+2]=c*g+h*f+o*u-a*l,e[t+3]=h*g-o*l-a*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,i=e._y,s=e._z,r=e._order,o=Math.cos,a=Math.sin,c=o(n/2),h=o(i/2),l=o(s/2),u=a(n/2),f=a(i/2),g=a(s/2);switch(r){case"XYZ":this._x=u*h*l+c*f*g,this._y=c*f*l-u*h*g,this._z=c*h*g+u*f*l,this._w=c*h*l-u*f*g;break;case"YXZ":this._x=u*h*l+c*f*g,this._y=c*f*l-u*h*g,this._z=c*h*g-u*f*l,this._w=c*h*l+u*f*g;break;case"ZXY":this._x=u*h*l-c*f*g,this._y=c*f*l+u*h*g,this._z=c*h*g+u*f*l,this._w=c*h*l-u*f*g;break;case"ZYX":this._x=u*h*l-c*f*g,this._y=c*f*l+u*h*g,this._z=c*h*g-u*f*l,this._w=c*h*l+u*f*g;break;case"YZX":this._x=u*h*l+c*f*g,this._y=c*f*l+u*h*g,this._z=c*h*g-u*f*l,this._w=c*h*l-u*f*g;break;case"XZY":this._x=u*h*l-c*f*g,this._y=c*f*l-u*h*g,this._z=c*h*g+u*f*l,this._w=c*h*l+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],h=t[6],l=t[10],u=n+o+l;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-a)*f,this._y=(s-c)*f,this._z=(r-i)*f}else if(n>o&&n>l){const f=2*Math.sqrt(1+n-o-l);this._w=(h-a)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(s+c)/f}else if(o>l){const f=2*Math.sqrt(1+o-n-l);this._w=(s-c)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(a+h)/f}else{const f=2*Math.sqrt(1+l-n-o);this._w=(r-i)/f,this._x=(s+c)/f,this._y=(a+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(kt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,r=e._w,o=t._x,a=t._y,c=t._z,h=t._w;return this._x=n*h+r*o+i*c-s*a,this._y=i*h+r*a+s*o-n*c,this._z=s*h+r*c+n*a-i*o,this._w=r*h-n*o-i*a-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,r=this._w;let o=r*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=n,this._y=i,this._z=s,this;const a=1-o*o;if(a<=Number.EPSILON){const f=1-t;return this._w=f*r+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(a),h=Math.atan2(c,o),l=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=r*l+this._w*u,this._x=n*l+this._x*u,this._y=i*l+this._y*u,this._z=s*l+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class X{constructor(e=0,t=0,n=0){X.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ma.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ma.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,r=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,o=e.z,a=e.w,c=a*t+r*i-o*n,h=a*n+o*t-s*i,l=a*i+s*n-r*t,u=-s*t-r*n-o*i;return this.x=c*a+u*-s+h*-o-l*-r,this.y=h*a+u*-r+l*-s-c*-o,this.z=l*a+u*-o+c*-r-h*-s,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,r=t.x,o=t.y,a=t.z;return this.x=i*a-s*o,this.y=s*r-n*a,this.z=n*o-i*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Pr.copy(this).projectOnVector(e),this.sub(Pr)}reflect(e){return this.sub(Pr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Pr=new X,Ma=new _n;class ts{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,n=1/0,i=1/0,s=-1/0,r=-1/0,o=-1/0;for(let a=0,c=e.length;a<c;a+=3){const h=e[a],l=e[a+1],u=e[a+2];h<t&&(t=h),l<n&&(n=l),u<i&&(i=u),h>s&&(s=h),l>r&&(r=l),u>o&&(o=u)}return this.min.set(t,n,i),this.max.set(s,r,o),this}setFromBufferAttribute(e){let t=1/0,n=1/0,i=1/0,s=-1/0,r=-1/0,o=-1/0;for(let a=0,c=e.count;a<c;a++){const h=e.getX(a),l=e.getY(a),u=e.getZ(a);h<t&&(t=h),l<n&&(n=l),u<i&&(i=u),h>s&&(s=h),l>r&&(r=l),u>o&&(o=u)}return this.min.set(t,n,i),this.max.set(s,r,o),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ti.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0)if(t&&n.attributes!=null&&n.attributes.position!==void 0){const s=n.attributes.position;for(let r=0,o=s.count;r<o;r++)ti.fromBufferAttribute(s,r).applyMatrix4(e.matrixWorld),this.expandByPoint(ti)}else n.boundingBox===null&&n.computeBoundingBox(),Ir.copy(n.boundingBox),Ir.applyMatrix4(e.matrixWorld),this.union(Ir);const i=e.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ti),ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(os),Vs.subVectors(this.max,os),Ei.subVectors(e.a,os),Ti.subVectors(e.b,os),Ai.subVectors(e.c,os),Vn.subVectors(Ti,Ei),Un.subVectors(Ai,Ti),ni.subVectors(Ei,Ai);let t=[0,-Vn.z,Vn.y,0,-Un.z,Un.y,0,-ni.z,ni.y,Vn.z,0,-Vn.x,Un.z,0,-Un.x,ni.z,0,-ni.x,-Vn.y,Vn.x,0,-Un.y,Un.x,0,-ni.y,ni.x,0];return!Dr(t,Ei,Ti,Ai,Vs)||(t=[1,0,0,0,1,0,0,0,1],!Dr(t,Ei,Ti,Ai,Vs))?!1:(Us.crossVectors(Vn,Un),t=[Us.x,Us.y,Us.z],Dr(t,Ei,Ti,Ai,Vs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return ti.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return this.getCenter(e.center),e.radius=this.getSize(ti).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ln=[new X,new X,new X,new X,new X,new X,new X,new X],ti=new X,Ir=new ts,Ei=new X,Ti=new X,Ai=new X,Vn=new X,Un=new X,ni=new X,os=new X,Vs=new X,Us=new X,ii=new X;function Dr(d,e,t,n,i){for(let s=0,r=d.length-3;s<=r;s+=3){ii.fromArray(d,s);const o=i.x*Math.abs(ii.x)+i.y*Math.abs(ii.y)+i.z*Math.abs(ii.z),a=e.dot(ii),c=t.dot(ii),h=n.dot(ii);if(Math.max(-Math.max(a,c,h),Math.min(a,c,h))>o)return!1}return!0}const lu=new ts,as=new X,Nr=new X;class ns{constructor(e=new X,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):lu.setFromPoints(e).getCenter(n);let i=0;for(let s=0,r=e.length;s<r;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;as.subVectors(e,this.center);const t=as.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(as,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Nr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(as.copy(e.center).add(Nr)),this.expandByPoint(as.copy(e.center).sub(Nr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Rn=new X,Br=new X,ks=new X,kn=new X,Fr=new X,Hs=new X,zr=new X;let Mo=class{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Rn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Rn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Rn.copy(this.direction).multiplyScalar(t).add(this.origin),Rn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Br.copy(e).add(t).multiplyScalar(.5),ks.copy(t).sub(e).normalize(),kn.copy(this.origin).sub(Br);const s=e.distanceTo(t)*.5,r=-this.direction.dot(ks),o=kn.dot(this.direction),a=-kn.dot(ks),c=kn.lengthSq(),h=Math.abs(1-r*r);let l,u,f,g;if(h>0)if(l=r*a-o,u=r*o-a,g=s*h,l>=0)if(u>=-g)if(u<=g){const m=1/h;l*=m,u*=m,f=l*(l+r*u+2*o)+u*(r*l+u+2*a)+c}else u=s,l=Math.max(0,-(r*u+o)),f=-l*l+u*(u+2*a)+c;else u=-s,l=Math.max(0,-(r*u+o)),f=-l*l+u*(u+2*a)+c;else u<=-g?(l=Math.max(0,-(-r*s+o)),u=l>0?-s:Math.min(Math.max(-s,-a),s),f=-l*l+u*(u+2*a)+c):u<=g?(l=0,u=Math.min(Math.max(-s,-a),s),f=u*(u+2*a)+c):(l=Math.max(0,-(r*s+o)),u=l>0?s:Math.min(Math.max(-s,-a),s),f=-l*l+u*(u+2*a)+c);else u=r>0?-s:s,l=Math.max(0,-(r*u+o)),f=-l*l+u*(u+2*a)+c;return n&&n.copy(this.direction).multiplyScalar(l).add(this.origin),i&&i.copy(ks).multiplyScalar(u).add(Br),f}intersectSphere(e,t){Rn.subVectors(e.center,this.origin);const n=Rn.dot(this.direction),i=Rn.dot(Rn)-n*n,s=e.radius*e.radius;if(i>s)return null;const r=Math.sqrt(s-i),o=n-r,a=n+r;return o<0&&a<0?null:o<0?this.at(a,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,r,o,a;const c=1/this.direction.x,h=1/this.direction.y,l=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,r=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,r=(e.min.y-u.y)*h),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),l>=0?(o=(e.min.z-u.z)*l,a=(e.max.z-u.z)*l):(o=(e.max.z-u.z)*l,a=(e.min.z-u.z)*l),n>a||o>i)||((o>n||n!==n)&&(n=o),(a<i||i!==i)&&(i=a),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Rn)!==null}intersectTriangle(e,t,n,i,s){Fr.subVectors(t,e),Hs.subVectors(n,e),zr.crossVectors(Fr,Hs);let r=this.direction.dot(zr),o;if(r>0){if(i)return null;o=1}else if(r<0)o=-1,r=-r;else return null;kn.subVectors(this.origin,e);const a=o*this.direction.dot(Hs.crossVectors(kn,Hs));if(a<0)return null;const c=o*this.direction.dot(Fr.cross(kn));if(c<0||a+c>r)return null;const h=-o*kn.dot(zr);return h<0?null:this.at(h/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class ot{constructor(){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,n,i,s,r,o,a,c,h,l,u,f,g,m,p){const v=this.elements;return v[0]=e,v[4]=t,v[8]=n,v[12]=i,v[1]=s,v[5]=r,v[9]=o,v[13]=a,v[2]=c,v[6]=h,v[10]=l,v[14]=u,v[3]=f,v[7]=g,v[11]=m,v[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ci.setFromMatrixColumn(e,0).length(),s=1/Ci.setFromMatrixColumn(e,1).length(),r=1/Ci.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,r=Math.cos(n),o=Math.sin(n),a=Math.cos(i),c=Math.sin(i),h=Math.cos(s),l=Math.sin(s);if(e.order==="XYZ"){const u=r*h,f=r*l,g=o*h,m=o*l;t[0]=a*h,t[4]=-a*l,t[8]=c,t[1]=f+g*c,t[5]=u-m*c,t[9]=-o*a,t[2]=m-u*c,t[6]=g+f*c,t[10]=r*a}else if(e.order==="YXZ"){const u=a*h,f=a*l,g=c*h,m=c*l;t[0]=u+m*o,t[4]=g*o-f,t[8]=r*c,t[1]=r*l,t[5]=r*h,t[9]=-o,t[2]=f*o-g,t[6]=m+u*o,t[10]=r*a}else if(e.order==="ZXY"){const u=a*h,f=a*l,g=c*h,m=c*l;t[0]=u-m*o,t[4]=-r*l,t[8]=g+f*o,t[1]=f+g*o,t[5]=r*h,t[9]=m-u*o,t[2]=-r*c,t[6]=o,t[10]=r*a}else if(e.order==="ZYX"){const u=r*h,f=r*l,g=o*h,m=o*l;t[0]=a*h,t[4]=g*c-f,t[8]=u*c+m,t[1]=a*l,t[5]=m*c+u,t[9]=f*c-g,t[2]=-c,t[6]=o*a,t[10]=r*a}else if(e.order==="YZX"){const u=r*a,f=r*c,g=o*a,m=o*c;t[0]=a*h,t[4]=m-u*l,t[8]=g*l+f,t[1]=l,t[5]=r*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*l+g,t[10]=u-m*l}else if(e.order==="XZY"){const u=r*a,f=r*c,g=o*a,m=o*c;t[0]=a*h,t[4]=-l,t[8]=c*h,t[1]=u*l+m,t[5]=r*h,t[9]=f*l-g,t[2]=g*l-f,t[6]=o*h,t[10]=m*l+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cu,e,hu)}lookAt(e,t,n){const i=this.elements;return sn.subVectors(e,t),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),Hn.crossVectors(n,sn),Hn.lengthSq()===0&&(Math.abs(n.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),Hn.crossVectors(n,sn)),Hn.normalize(),Ws.crossVectors(sn,Hn),i[0]=Hn.x,i[4]=Ws.x,i[8]=sn.x,i[1]=Hn.y,i[5]=Ws.y,i[9]=sn.y,i[2]=Hn.z,i[6]=Ws.z,i[10]=sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,r=n[0],o=n[4],a=n[8],c=n[12],h=n[1],l=n[5],u=n[9],f=n[13],g=n[2],m=n[6],p=n[10],v=n[14],x=n[3],w=n[7],y=n[11],b=n[15],L=i[0],k=i[4],_=i[8],M=i[12],E=i[1],C=i[5],U=i[9],T=i[13],N=i[2],Y=i[6],te=i[10],W=i[14],O=i[3],ee=i[7],K=i[11],P=i[15];return s[0]=r*L+o*E+a*N+c*O,s[4]=r*k+o*C+a*Y+c*ee,s[8]=r*_+o*U+a*te+c*K,s[12]=r*M+o*T+a*W+c*P,s[1]=h*L+l*E+u*N+f*O,s[5]=h*k+l*C+u*Y+f*ee,s[9]=h*_+l*U+u*te+f*K,s[13]=h*M+l*T+u*W+f*P,s[2]=g*L+m*E+p*N+v*O,s[6]=g*k+m*C+p*Y+v*ee,s[10]=g*_+m*U+p*te+v*K,s[14]=g*M+m*T+p*W+v*P,s[3]=x*L+w*E+y*N+b*O,s[7]=x*k+w*C+y*Y+b*ee,s[11]=x*_+w*U+y*te+b*K,s[15]=x*M+w*T+y*W+b*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],r=e[1],o=e[5],a=e[9],c=e[13],h=e[2],l=e[6],u=e[10],f=e[14],g=e[3],m=e[7],p=e[11],v=e[15];return g*(+s*a*l-i*c*l-s*o*u+n*c*u+i*o*f-n*a*f)+m*(+t*a*f-t*c*u+s*r*u-i*r*f+i*c*h-s*a*h)+p*(+t*c*l-t*o*f-s*r*l+n*r*f+s*o*h-n*c*h)+v*(-i*o*h-t*a*l+t*o*u+i*r*l-n*r*u+n*a*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],a=e[6],c=e[7],h=e[8],l=e[9],u=e[10],f=e[11],g=e[12],m=e[13],p=e[14],v=e[15],x=l*p*c-m*u*c+m*a*f-o*p*f-l*a*v+o*u*v,w=g*u*c-h*p*c-g*a*f+r*p*f+h*a*v-r*u*v,y=h*m*c-g*l*c+g*o*f-r*m*f-h*o*v+r*l*v,b=g*l*a-h*m*a-g*o*u+r*m*u+h*o*p-r*l*p,L=t*x+n*w+i*y+s*b;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/L;return e[0]=x*k,e[1]=(m*u*s-l*p*s-m*i*f+n*p*f+l*i*v-n*u*v)*k,e[2]=(o*p*s-m*a*s+m*i*c-n*p*c-o*i*v+n*a*v)*k,e[3]=(l*a*s-o*u*s-l*i*c+n*u*c+o*i*f-n*a*f)*k,e[4]=w*k,e[5]=(h*p*s-g*u*s+g*i*f-t*p*f-h*i*v+t*u*v)*k,e[6]=(g*a*s-r*p*s-g*i*c+t*p*c+r*i*v-t*a*v)*k,e[7]=(r*u*s-h*a*s+h*i*c-t*u*c-r*i*f+t*a*f)*k,e[8]=y*k,e[9]=(g*l*s-h*m*s-g*n*f+t*m*f+h*n*v-t*l*v)*k,e[10]=(r*m*s-g*o*s+g*n*c-t*m*c-r*n*v+t*o*v)*k,e[11]=(h*o*s-r*l*s-h*n*c+t*l*c+r*n*f-t*o*f)*k,e[12]=b*k,e[13]=(h*m*i-g*l*i+g*n*u-t*m*u-h*n*p+t*l*p)*k,e[14]=(g*o*i-r*m*i-g*n*a+t*m*a+r*n*p-t*o*p)*k,e[15]=(r*l*i-h*o*i+h*n*a-t*l*a-r*n*u+t*o*u)*k,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,r=e.x,o=e.y,a=e.z,c=s*r,h=s*o;return this.set(c*r+n,c*o-i*a,c*a+i*o,0,c*o+i*a,h*o+n,h*a-i*r,0,c*a-i*o,h*a+i*r,s*a*a+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,r){return this.set(1,n,s,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,r=t._y,o=t._z,a=t._w,c=s+s,h=r+r,l=o+o,u=s*c,f=s*h,g=s*l,m=r*h,p=r*l,v=o*l,x=a*c,w=a*h,y=a*l,b=n.x,L=n.y,k=n.z;return i[0]=(1-(m+v))*b,i[1]=(f+y)*b,i[2]=(g-w)*b,i[3]=0,i[4]=(f-y)*L,i[5]=(1-(u+v))*L,i[6]=(p+x)*L,i[7]=0,i[8]=(g+w)*k,i[9]=(p-x)*k,i[10]=(1-(u+m))*k,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Ci.set(i[0],i[1],i[2]).length();const r=Ci.set(i[4],i[5],i[6]).length(),o=Ci.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],gn.copy(this);const c=1/s,h=1/r,l=1/o;return gn.elements[0]*=c,gn.elements[1]*=c,gn.elements[2]*=c,gn.elements[4]*=h,gn.elements[5]*=h,gn.elements[6]*=h,gn.elements[8]*=l,gn.elements[9]*=l,gn.elements[10]*=l,t.setFromRotationMatrix(gn),n.x=s,n.y=r,n.z=o,this}makePerspective(e,t,n,i,s,r){const o=this.elements,a=2*s/(t-e),c=2*s/(n-i),h=(t+e)/(t-e),l=(n+i)/(n-i),u=-(r+s)/(r-s),f=-2*r*s/(r-s);return o[0]=a,o[4]=0,o[8]=h,o[12]=0,o[1]=0,o[5]=c,o[9]=l,o[13]=0,o[2]=0,o[6]=0,o[10]=u,o[14]=f,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,n,i,s,r){const o=this.elements,a=1/(t-e),c=1/(n-i),h=1/(r-s),l=(t+e)*a,u=(n+i)*c,f=(r+s)*h;return o[0]=2*a,o[4]=0,o[8]=0,o[12]=-l,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-u,o[2]=0,o[6]=0,o[10]=-2*h,o[14]=-f,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ci=new X,gn=new ot,cu=new X(0,0,0),hu=new X(1,1,1),Hn=new X,Ws=new X,sn=new X,Sa=new ot,Ea=new _n;class Is{constructor(e=0,t=0,n=0,i=Is.DefaultOrder){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],r=i[4],o=i[8],a=i[1],c=i[5],h=i[9],l=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(a,c)):(this._y=Math.atan2(-l,s),this._z=0);break;case"ZXY":this._x=Math.asin(kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-l,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(a,s));break;case"ZYX":this._y=Math.asin(-kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(a,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-l,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-kt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ea.setFromEuler(this),this.setFromQuaternion(Ea,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}}Is.DefaultOrder="XYZ";Is.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class tc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let uu=0;const Ta=new X,Li=new _n,Pn=new ot,Gs=new X,ls=new X,du=new X,fu=new _n,Aa=new X(1,0,0),Ca=new X(0,1,0),La=new X(0,0,1),pu={type:"added"},Ra={type:"removed"};class bt extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=yn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bt.DefaultUp.clone();const e=new X,t=new Is,n=new _n,i=new X(1,1,1);function s(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ot},normalMatrix:{value:new on}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=bt.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=bt.DefaultMatrixWorldAutoUpdate,this.layers=new tc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Li.setFromAxisAngle(e,t),this.quaternion.multiply(Li),this}rotateOnWorldAxis(e,t){return Li.setFromAxisAngle(e,t),this.quaternion.premultiply(Li),this}rotateX(e){return this.rotateOnAxis(Aa,e)}rotateY(e){return this.rotateOnAxis(Ca,e)}rotateZ(e){return this.rotateOnAxis(La,e)}translateOnAxis(e,t){return Ta.copy(e).applyQuaternion(this.quaternion),this.position.add(Ta.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Aa,e)}translateY(e){return this.translateOnAxis(Ca,e)}translateZ(e){return this.translateOnAxis(La,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Gs.copy(e):Gs.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(ls,Gs,this.up):Pn.lookAt(Gs,ls,this.up),this.quaternion.setFromRotationMatrix(Pn),i&&(Pn.extractRotation(i.matrixWorld),Li.setFromRotationMatrix(Pn),this.quaternion.premultiply(Li.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(pu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ra)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Ra)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectsByProperty(e,t);r.length>0&&(n=n.concat(r))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,e,du),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,fu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,r=i.length;s<r;s++){const o=i[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(o,a){return o[a.uuid]===void 0&&(o[a.uuid]=a.toJSON(e)),a.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const a=o.shapes;if(Array.isArray(a))for(let c=0,h=a.length;c<h;c++){const l=a[c];s(e.shapes,l)}else s(e.shapes,a)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let a=0,c=this.material.length;a<c;a++)o.push(s(e.materials,this.material[a]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const a=this.animations[o];i.animations.push(s(e.animations,a))}}if(t){const o=r(e.geometries),a=r(e.materials),c=r(e.textures),h=r(e.images),l=r(e.shapes),u=r(e.skeletons),f=r(e.animations),g=r(e.nodes);o.length>0&&(n.geometries=o),a.length>0&&(n.materials=a),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),l.length>0&&(n.shapes=l),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function r(o){const a=[];for(const c in o){const h=o[c];delete h.metadata,a.push(h)}return a}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}bt.DefaultUp=new X(0,1,0);bt.DefaultMatrixAutoUpdate=!0;bt.DefaultMatrixWorldAutoUpdate=!0;const vn=new X,In=new X,Or=new X,Dn=new X,Ri=new X,Pi=new X,Pa=new X,Vr=new X,Ur=new X,kr=new X;class Bn{constructor(e=new X,t=new X,n=new X){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),vn.subVectors(e,t),i.cross(vn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){vn.subVectors(i,t),In.subVectors(n,t),Or.subVectors(e,t);const r=vn.dot(vn),o=vn.dot(In),a=vn.dot(Or),c=In.dot(In),h=In.dot(Or),l=r*c-o*o;if(l===0)return s.set(-2,-1,-1);const u=1/l,f=(c*a-o*h)*u,g=(r*h-o*a)*u;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Dn),Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getUV(e,t,n,i,s,r,o,a){return this.getBarycoord(e,t,n,i,Dn),a.set(0,0),a.addScaledVector(s,Dn.x),a.addScaledVector(r,Dn.y),a.addScaledVector(o,Dn.z),a}static isFrontFacing(e,t,n,i){return vn.subVectors(n,t),In.subVectors(e,t),vn.cross(In).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),In.subVectors(this.a,this.b),vn.cross(In).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Bn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return Bn.getUV(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let r,o;Ri.subVectors(i,n),Pi.subVectors(s,n),Vr.subVectors(e,n);const a=Ri.dot(Vr),c=Pi.dot(Vr);if(a<=0&&c<=0)return t.copy(n);Ur.subVectors(e,i);const h=Ri.dot(Ur),l=Pi.dot(Ur);if(h>=0&&l<=h)return t.copy(i);const u=a*l-h*c;if(u<=0&&a>=0&&h<=0)return r=a/(a-h),t.copy(n).addScaledVector(Ri,r);kr.subVectors(e,s);const f=Ri.dot(kr),g=Pi.dot(kr);if(g>=0&&f<=g)return t.copy(s);const m=f*c-a*g;if(m<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Pi,o);const p=h*g-f*l;if(p<=0&&l-h>=0&&f-g>=0)return Pa.subVectors(s,i),o=(l-h)/(l-h+(f-g)),t.copy(i).addScaledVector(Pa,o);const v=1/(p+m+u);return r=m*v,o=u*v,t.copy(n).addScaledVector(Ri,r).addScaledVector(Pi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let mu=0;class Tn extends _i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mu++}),this.uuid=yn(),this.name="",this.type="Material",this.blending=Ui,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=kl,this.blendDst=Hl,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=oo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Tr,this.stencilZFail=Tr,this.stencilZPass=Tr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}const i=this[t];if(i===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ui&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const r=[];for(const o in s){const a=s[o];delete a.metadata,r.push(a)}return r}if(t){const s=i(e.textures),r=i(e.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class $t extends Tn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new X,qs=new et;class Kt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ho,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)qs.fromBufferAttribute(this,t),qs.applyMatrix3(e),this.setXY(t,qs.x,qs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Fn(t,this.array)),t}setX(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Fn(t,this.array)),t}setY(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Fn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Fn(t,this.array)),t}setW(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array),s=mt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ho&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class nc extends Kt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ic extends Kt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ct extends Kt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let gu=0;const ln=new ot,Hr=new bt,Ii=new X,rn=new ts,cs=new ts,Nt=new X;class Wt extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gu++}),this.uuid=yn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Kl(e)?ic:nc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new on().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,n){return ln.makeTranslation(e,t,n),this.applyMatrix4(ln),this}scale(e,t,n){return ln.makeScale(e,t,n),this.applyMatrix4(ln),this}lookAt(e){return Hr.lookAt(e),Hr.updateMatrix(),this.applyMatrix4(Hr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ct(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ts);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];rn.setFromBufferAttribute(s),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ns);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new X,1/0);return}if(e){const n=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){const o=t[s];cs.setFromBufferAttribute(o),this.morphTargetsRelative?(Nt.addVectors(rn.min,cs.min),rn.expandByPoint(Nt),Nt.addVectors(rn.max,cs.max),rn.expandByPoint(Nt)):(rn.expandByPoint(cs.min),rn.expandByPoint(cs.max))}rn.getCenter(n);let i=0;for(let s=0,r=e.count;s<r;s++)Nt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Nt));if(t)for(let s=0,r=t.length;s<r;s++){const o=t[s],a=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Nt.fromBufferAttribute(o,c),a&&(Ii.fromBufferAttribute(e,c),Nt.add(Ii)),i=Math.max(i,n.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,r=t.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Kt(new Float32Array(4*o),4));const a=this.getAttribute("tangent").array,c=[],h=[];for(let E=0;E<o;E++)c[E]=new X,h[E]=new X;const l=new X,u=new X,f=new X,g=new et,m=new et,p=new et,v=new X,x=new X;function w(E,C,U){l.fromArray(i,E*3),u.fromArray(i,C*3),f.fromArray(i,U*3),g.fromArray(r,E*2),m.fromArray(r,C*2),p.fromArray(r,U*2),u.sub(l),f.sub(l),m.sub(g),p.sub(g);const T=1/(m.x*p.y-p.x*m.y);isFinite(T)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(f,-m.y).multiplyScalar(T),x.copy(f).multiplyScalar(m.x).addScaledVector(u,-p.x).multiplyScalar(T),c[E].add(v),c[C].add(v),c[U].add(v),h[E].add(x),h[C].add(x),h[U].add(x))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let E=0,C=y.length;E<C;++E){const U=y[E],T=U.start,N=U.count;for(let Y=T,te=T+N;Y<te;Y+=3)w(n[Y+0],n[Y+1],n[Y+2])}const b=new X,L=new X,k=new X,_=new X;function M(E){k.fromArray(s,E*3),_.copy(k);const C=c[E];b.copy(C),b.sub(k.multiplyScalar(k.dot(C))).normalize(),L.crossVectors(_,C);const T=L.dot(h[E])<0?-1:1;a[E*4]=b.x,a[E*4+1]=b.y,a[E*4+2]=b.z,a[E*4+3]=T}for(let E=0,C=y.length;E<C;++E){const U=y[E],T=U.start,N=U.count;for(let Y=T,te=T+N;Y<te;Y+=3)M(n[Y+0]),M(n[Y+1]),M(n[Y+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Kt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new X,s=new X,r=new X,o=new X,a=new X,c=new X,h=new X,l=new X;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),m=e.getX(u+1),p=e.getX(u+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,p),h.subVectors(r,s),l.subVectors(i,s),h.cross(l),o.fromBufferAttribute(n,g),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,p),o.add(h),a.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),r.fromBufferAttribute(t,u+2),h.subVectors(r,s),l.subVectors(i,s),h.cross(l),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(o,a){const c=o.array,h=o.itemSize,l=o.normalized,u=new c.constructor(a.length*h);let f=0,g=0;for(let m=0,p=a.length;m<p;m++){o.isInterleavedBufferAttribute?f=a[m]*o.data.stride+o.offset:f=a[m]*h;for(let v=0;v<h;v++)u[g++]=c[f++]}return new Kt(u,h,l)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Wt,n=this.index.array,i=this.attributes;for(const o in i){const a=i[o],c=e(a,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const a=[],c=s[o];for(let h=0,l=c.length;h<l;h++){const u=c[h],f=e(u,n);a.push(f)}t.morphAttributes[o]=a}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,a=r.length;o<a;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const a=this.parameters;for(const c in a)a[c]!==void 0&&(e[c]=a[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const a in n){const c=n[a];e.data.attributes[a]=c.toJSON(e.data)}const i={};let s=!1;for(const a in this.morphAttributes){const c=this.morphAttributes[a],h=[];for(let l=0,u=c.length;l<u;l++){const f=c[l];h.push(f.toJSON(e.data))}h.length>0&&(i[a]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],l=s[c];for(let u=0,f=l.length;u<f;u++)h.push(l[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,h=r.length;c<h;c++){const l=r[c];this.addGroup(l.start,l.count,l.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const a=e.boundingSphere;return a!==null&&(this.boundingSphere=a.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,e.parameters!==void 0&&(this.parameters=Object.assign({},e.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ia=new ot,Di=new Mo,Wr=new ns,hs=new X,us=new X,ds=new X,Gr=new X,Xs=new X,Ys=new et,js=new et,$s=new et,qr=new X,Ks=new X;class St extends bt{constructor(e=new Wt,t=new $t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){Xs.set(0,0,0);for(let a=0,c=s.length;a<c;a++){const h=o[a],l=s[a];h!==0&&(Gr.fromBufferAttribute(l,e),r?Xs.addScaledVector(Gr,h):Xs.addScaledVector(Gr.sub(t),h))}t.add(Xs)}return this.isSkinnedMesh&&this.boneTransform(e,t),t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Wr.copy(n.boundingSphere),Wr.applyMatrix4(s),e.ray.intersectsSphere(Wr)===!1)||(Ia.copy(s).invert(),Di.copy(e.ray).applyMatrix4(Ia),n.boundingBox!==null&&Di.intersectsBox(n.boundingBox)===!1))return;let r;const o=n.index,a=n.attributes.position,c=n.attributes.uv,h=n.attributes.uv2,l=n.groups,u=n.drawRange;if(o!==null)if(Array.isArray(i))for(let f=0,g=l.length;f<g;f++){const m=l[f],p=i[m.materialIndex],v=Math.max(m.start,u.start),x=Math.min(o.count,Math.min(m.start+m.count,u.start+u.count));for(let w=v,y=x;w<y;w+=3){const b=o.getX(w),L=o.getX(w+1),k=o.getX(w+2);r=Zs(this,p,e,Di,c,h,b,L,k),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const f=Math.max(0,u.start),g=Math.min(o.count,u.start+u.count);for(let m=f,p=g;m<p;m+=3){const v=o.getX(m),x=o.getX(m+1),w=o.getX(m+2);r=Zs(this,i,e,Di,c,h,v,x,w),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(a!==void 0)if(Array.isArray(i))for(let f=0,g=l.length;f<g;f++){const m=l[f],p=i[m.materialIndex],v=Math.max(m.start,u.start),x=Math.min(a.count,Math.min(m.start+m.count,u.start+u.count));for(let w=v,y=x;w<y;w+=3){const b=w,L=w+1,k=w+2;r=Zs(this,p,e,Di,c,h,b,L,k),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const f=Math.max(0,u.start),g=Math.min(a.count,u.start+u.count);for(let m=f,p=g;m<p;m+=3){const v=m,x=m+1,w=m+2;r=Zs(this,i,e,Di,c,h,v,x,w),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function vu(d,e,t,n,i,s,r,o){let a;if(e.side===fn?a=n.intersectTriangle(r,s,i,!0,o):a=n.intersectTriangle(i,s,r,e.side===Kn,o),a===null)return null;Ks.copy(o),Ks.applyMatrix4(d.matrixWorld);const c=t.ray.origin.distanceTo(Ks);return c<t.near||c>t.far?null:{distance:c,point:Ks.clone(),object:d}}function Zs(d,e,t,n,i,s,r,o,a){d.getVertexPosition(r,hs),d.getVertexPosition(o,us),d.getVertexPosition(a,ds);const c=vu(d,e,t,n,hs,us,ds,qr);if(c){i&&(Ys.fromBufferAttribute(i,r),js.fromBufferAttribute(i,o),$s.fromBufferAttribute(i,a),c.uv=Bn.getUV(qr,hs,us,ds,Ys,js,$s,new et)),s&&(Ys.fromBufferAttribute(s,r),js.fromBufferAttribute(s,o),$s.fromBufferAttribute(s,a),c.uv2=Bn.getUV(qr,hs,us,ds,Ys,js,$s,new et));const h={a:r,b:o,c:a,normal:new X,materialIndex:0};Bn.getNormal(hs,us,ds,h.normal),c.face=h}return c}class vi extends Wt{constructor(e=1,t=1,n=1,i=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};const o=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);const a=[],c=[],h=[],l=[];let u=0,f=0;g("z","y","x",-1,-1,n,t,e,r,s,0),g("z","y","x",1,-1,n,t,-e,r,s,1),g("x","z","y",1,1,e,n,t,i,r,2),g("x","z","y",1,-1,e,n,-t,i,r,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(a),this.setAttribute("position",new Ct(c,3)),this.setAttribute("normal",new Ct(h,3)),this.setAttribute("uv",new Ct(l,2));function g(m,p,v,x,w,y,b,L,k,_,M){const E=y/k,C=b/_,U=y/2,T=b/2,N=L/2,Y=k+1,te=_+1;let W=0,O=0;const ee=new X;for(let K=0;K<te;K++){const P=K*C-T;for(let H=0;H<Y;H++){const D=H*E-U;ee[m]=D*x,ee[p]=P*w,ee[v]=N,c.push(ee.x,ee.y,ee.z),ee[m]=0,ee[p]=0,ee[v]=L>0?1:-1,h.push(ee.x,ee.y,ee.z),l.push(H/k),l.push(1-K/_),W+=1}}for(let K=0;K<_;K++)for(let P=0;P<k;P++){const H=u+P+Y*K,D=u+P+Y*(K+1),I=u+(P+1)+Y*(K+1),R=u+(P+1)+Y*K;a.push(H,D,R),a.push(D,I,R),O+=6}o.addGroup(f,O,M),f+=O,u+=W}}static fromJSON(e){return new vi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Zi(d){const e={};for(const t in d){e[t]={};for(const n in d[t]){const i=d[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Yt(d){const e={};for(let t=0;t<d.length;t++){const n=Zi(d[t]);for(const i in n)e[i]=n[i]}return e}function xu(d){const e=[];for(let t=0;t<d.length;t++)e.push(d[t].clone());return e}function sc(d){return d.getRenderTarget()===null&&d.outputEncoding===at?Mn:Ts}const yu={clone:Zi,merge:Yt};var _u=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xi extends Tn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_u,this.fragmentShader=wu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Zi(e.uniforms),this.uniformsGroups=xu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?t.uniforms[i]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[i]={type:"m4",value:r.toArray()}:t.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class rc extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class jt extends rc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=As*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ws*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return As*2*Math.atan(Math.tan(ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ws*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const a=r.fullWidth,c=r.fullHeight;s+=r.offsetX*i/a,t-=r.offsetY*n/c,i*=r.width/a,n*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ni=-90,Bi=1;class bu extends bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n;const i=new jt(Ni,Bi,e,t);i.layers=this.layers,i.up.set(0,1,0),i.lookAt(1,0,0),this.add(i);const s=new jt(Ni,Bi,e,t);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(-1,0,0),this.add(s);const r=new jt(Ni,Bi,e,t);r.layers=this.layers,r.up.set(0,0,-1),r.lookAt(0,1,0),this.add(r);const o=new jt(Ni,Bi,e,t);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(0,-1,0),this.add(o);const a=new jt(Ni,Bi,e,t);a.layers=this.layers,a.up.set(0,1,0),a.lookAt(0,0,1),this.add(a);const c=new jt(Ni,Bi,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,s,r,o,a,c]=this.children,h=e.getRenderTarget(),l=e.toneMapping,u=e.xr.enabled;e.toneMapping=On,e.xr.enabled=!1;const f=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,i),e.setRenderTarget(n,1),e.render(t,s),e.setRenderTarget(n,2),e.render(t,r),e.setRenderTarget(n,3),e.render(t,o),e.setRenderTarget(n,4),e.render(t,a),n.texture.generateMipmaps=f,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(h),e.toneMapping=l,e.xr.enabled=u,n.texture.needsPMREMUpdate=!0}}class oc extends zt{constructor(e,t,n,i,s,r,o,a,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Xi,super(e,t,n,i,s,r,o,a,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Mu extends gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new oc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:en}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new vi(5,5,5),s=new xi({name:"CubemapFromEquirect",uniforms:Zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:fn,blending:$n});s.uniforms.tEquirect.value=t;const r=new St(i,s),o=t.minFilter;return t.minFilter===fi&&(t.minFilter=en),new bu(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,i);e.setRenderTarget(s)}}const Xr=new X,Su=new X,Eu=new on;class si{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Xr.subVectors(n,t).cross(Su.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){const n=e.delta(Xr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(n).multiplyScalar(s).add(e.start)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Eu.getNormalMatrix(e),i=this.coplanarPoint(Xr).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fi=new ns,Js=new X;class So{constructor(e=new si,t=new si,n=new si,i=new si,s=new si,r=new si){this.planes=[e,t,n,i,s,r]}set(e,t,n,i,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,i=n[0],s=n[1],r=n[2],o=n[3],a=n[4],c=n[5],h=n[6],l=n[7],u=n[8],f=n[9],g=n[10],m=n[11],p=n[12],v=n[13],x=n[14],w=n[15];return t[0].setComponents(o-i,l-a,m-u,w-p).normalize(),t[1].setComponents(o+i,l+a,m+u,w+p).normalize(),t[2].setComponents(o+s,l+c,m+f,w+v).normalize(),t[3].setComponents(o-s,l-c,m-f,w-v).normalize(),t[4].setComponents(o-r,l-h,m-g,w-x).normalize(),t[5].setComponents(o+r,l+h,m+g,w+x).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Fi)}intersectsSprite(e){return Fi.center.set(0,0,0),Fi.radius=.7071067811865476,Fi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Js.x=i.normal.x>0?e.max.x:e.min.x,Js.y=i.normal.y>0?e.max.y:e.min.y,Js.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Js)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ac(){let d=null,e=!1,t=null,n=null;function i(s,r){t(s,r),n=d.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=d.requestAnimationFrame(i),e=!0)},stop:function(){d.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){d=s}}}function Tu(d,e){const t=e.isWebGL2,n=new WeakMap;function i(c,h){const l=c.array,u=c.usage,f=d.createBuffer();d.bindBuffer(h,f),d.bufferData(h,l,u),c.onUploadCallback();let g;if(l instanceof Float32Array)g=5126;else if(l instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(l instanceof Int16Array)g=5122;else if(l instanceof Uint32Array)g=5125;else if(l instanceof Int32Array)g=5124;else if(l instanceof Int8Array)g=5120;else if(l instanceof Uint8Array)g=5121;else if(l instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version}}function s(c,h,l){const u=h.array,f=h.updateRange;d.bindBuffer(l,c),f.count===-1?d.bufferSubData(l,0,u):(t?d.bufferSubData(l,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):d.bufferSubData(l,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(d.deleteBuffer(h.buffer),n.delete(c))}function a(c,h){if(c.isGLBufferAttribute){const u=n.get(c);(!u||u.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const l=n.get(c);l===void 0?n.set(c,i(c,h)):l.version<c.version&&(s(l.buffer,c,h),l.version=c.version)}return{get:r,remove:o,update:a}}class Ji extends Wt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,r=t/2,o=Math.floor(n),a=Math.floor(i),c=o+1,h=a+1,l=e/o,u=t/a,f=[],g=[],m=[],p=[];for(let v=0;v<h;v++){const x=v*u-r;for(let w=0;w<c;w++){const y=w*l-s;g.push(y,-x,0),m.push(0,0,1),p.push(w/o),p.push(1-v/a)}}for(let v=0;v<a;v++)for(let x=0;x<o;x++){const w=x+c*v,y=x+c*(v+1),b=x+1+c*(v+1),L=x+1+c*v;f.push(w,y,L),f.push(y,b,L)}this.setIndex(f),this.setAttribute("position",new Ct(g,3)),this.setAttribute("normal",new Ct(m,3)),this.setAttribute("uv",new Ct(p,2))}static fromJSON(e){return new Ji(e.width,e.height,e.widthSegments,e.heightSegments)}}var Au=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,Cu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ru=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Pu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Iu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Du="vec3 transformed = vec3( position );",Nu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bu=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,Fu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ou=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Vu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Uu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ku=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Wu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,qu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Xu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,Yu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ju=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,$u=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ku=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,Zu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ju=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qu="gl_FragColor = linearToOutputTexel( gl_FragColor );",ed=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,td=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,nd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,id=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,od=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ad=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ld=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ud=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,dd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,md=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gd=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,vd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_d=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,bd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Md=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Sd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ed=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Td=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ad=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Ld=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Rd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Id=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Dd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Od=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Vd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Ud=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,kd=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Hd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,Xd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Yd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,jd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,$d=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,Jd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ef=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rf=`#if NUM_SPOT_LIGHT_COORDS > 0
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,of=`#if NUM_SPOT_LIGHT_COORDS > 0
  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,af=`#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_COORDS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,lf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,uf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,df=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ff=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,xf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,yf=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,_f=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,wf=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,bf=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,Mf=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,Sf=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,Ef=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Tf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Af=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Rf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,If=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Df=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Nf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Bf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ff=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Of=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Uf=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,kf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,qf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Yf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$f=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,tp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,np=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ip=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,sp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,it={alphamap_fragment:Au,alphamap_pars_fragment:Cu,alphatest_fragment:Lu,alphatest_pars_fragment:Ru,aomap_fragment:Pu,aomap_pars_fragment:Iu,begin_vertex:Du,beginnormal_vertex:Nu,bsdfs:Bu,iridescence_fragment:Fu,bumpmap_pars_fragment:zu,clipping_planes_fragment:Ou,clipping_planes_pars_fragment:Vu,clipping_planes_pars_vertex:Uu,clipping_planes_vertex:ku,color_fragment:Hu,color_pars_fragment:Wu,color_pars_vertex:Gu,color_vertex:qu,common:Xu,cube_uv_reflection_fragment:Yu,defaultnormal_vertex:ju,displacementmap_pars_vertex:$u,displacementmap_vertex:Ku,emissivemap_fragment:Zu,emissivemap_pars_fragment:Ju,encodings_fragment:Qu,encodings_pars_fragment:ed,envmap_fragment:td,envmap_common_pars_fragment:nd,envmap_pars_fragment:id,envmap_pars_vertex:sd,envmap_physical_pars_fragment:gd,envmap_vertex:rd,fog_vertex:od,fog_pars_vertex:ad,fog_fragment:ld,fog_pars_fragment:cd,gradientmap_pars_fragment:hd,lightmap_fragment:ud,lightmap_pars_fragment:dd,lights_lambert_fragment:fd,lights_lambert_pars_fragment:pd,lights_pars_begin:md,lights_toon_fragment:vd,lights_toon_pars_fragment:xd,lights_phong_fragment:yd,lights_phong_pars_fragment:_d,lights_physical_fragment:wd,lights_physical_pars_fragment:bd,lights_fragment_begin:Md,lights_fragment_maps:Sd,lights_fragment_end:Ed,logdepthbuf_fragment:Td,logdepthbuf_pars_fragment:Ad,logdepthbuf_pars_vertex:Cd,logdepthbuf_vertex:Ld,map_fragment:Rd,map_pars_fragment:Pd,map_particle_fragment:Id,map_particle_pars_fragment:Dd,metalnessmap_fragment:Nd,metalnessmap_pars_fragment:Bd,morphcolor_vertex:Fd,morphnormal_vertex:zd,morphtarget_pars_vertex:Od,morphtarget_vertex:Vd,normal_fragment_begin:Ud,normal_fragment_maps:kd,normal_pars_fragment:Hd,normal_pars_vertex:Wd,normal_vertex:Gd,normalmap_pars_fragment:qd,clearcoat_normal_fragment_begin:Xd,clearcoat_normal_fragment_maps:Yd,clearcoat_pars_fragment:jd,iridescence_pars_fragment:$d,output_fragment:Kd,packing:Zd,premultiplied_alpha_fragment:Jd,project_vertex:Qd,dithering_fragment:ef,dithering_pars_fragment:tf,roughnessmap_fragment:nf,roughnessmap_pars_fragment:sf,shadowmap_pars_fragment:rf,shadowmap_pars_vertex:of,shadowmap_vertex:af,shadowmask_pars_fragment:lf,skinbase_vertex:cf,skinning_pars_vertex:hf,skinning_vertex:uf,skinnormal_vertex:df,specularmap_fragment:ff,specularmap_pars_fragment:pf,tonemapping_fragment:mf,tonemapping_pars_fragment:gf,transmission_fragment:vf,transmission_pars_fragment:xf,uv_pars_fragment:yf,uv_pars_vertex:_f,uv_vertex:wf,uv2_pars_fragment:bf,uv2_pars_vertex:Mf,uv2_vertex:Sf,worldpos_vertex:Ef,background_vert:Tf,background_frag:Af,backgroundCube_vert:Cf,backgroundCube_frag:Lf,cube_vert:Rf,cube_frag:Pf,depth_vert:If,depth_frag:Df,distanceRGBA_vert:Nf,distanceRGBA_frag:Bf,equirect_vert:Ff,equirect_frag:zf,linedashed_vert:Of,linedashed_frag:Vf,meshbasic_vert:Uf,meshbasic_frag:kf,meshlambert_vert:Hf,meshlambert_frag:Wf,meshmatcap_vert:Gf,meshmatcap_frag:qf,meshnormal_vert:Xf,meshnormal_frag:Yf,meshphong_vert:jf,meshphong_frag:$f,meshphysical_vert:Kf,meshphysical_frag:Zf,meshtoon_vert:Jf,meshtoon_frag:Qf,points_vert:ep,points_frag:tp,shadow_vert:np,shadow_frag:ip,sprite_vert:sp,sprite_frag:rp},Be={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new on},uv2Transform:{value:new on},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new on}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new on}}},Sn={basic:{uniforms:Yt([Be.common,Be.specularmap,Be.envmap,Be.aomap,Be.lightmap,Be.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:Yt([Be.common,Be.specularmap,Be.envmap,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.fog,Be.lights,{emissive:{value:new st(0)}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:Yt([Be.common,Be.specularmap,Be.envmap,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.fog,Be.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:Yt([Be.common,Be.envmap,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.roughnessmap,Be.metalnessmap,Be.fog,Be.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:Yt([Be.common,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.gradientmap,Be.fog,Be.lights,{emissive:{value:new st(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:Yt([Be.common,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:Yt([Be.points,Be.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:Yt([Be.common,Be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:Yt([Be.common,Be.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:Yt([Be.common,Be.bumpmap,Be.normalmap,Be.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:Yt([Be.sprite,Be.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new on},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distanceRGBA:{uniforms:Yt([Be.common,Be.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distanceRGBA_vert,fragmentShader:it.distanceRGBA_frag},shadow:{uniforms:Yt([Be.lights,Be.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};Sn.physical={uniforms:Yt([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new et(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};const Qs={r:0,b:0,g:0};function op(d,e,t,n,i,s,r){const o=new st(0);let a=s===!0?0:1,c,h,l=null,u=0,f=null;function g(p,v){let x=!1,w=v.isScene===!0?v.background:null;w&&w.isTexture&&(w=(v.backgroundBlurriness>0?t:e).get(w));const y=d.xr,b=y.getSession&&y.getSession();b&&b.environmentBlendMode==="additive"&&(w=null),w===null?m(o,a):w&&w.isColor&&(m(w,1),x=!0),(d.autoClear||x)&&d.clear(d.autoClearColor,d.autoClearDepth,d.autoClearStencil),w&&(w.isCubeTexture||w.mapping===mr)?(h===void 0&&(h=new St(new vi(1,1,1),new xi({name:"BackgroundCubeMaterial",uniforms:Zi(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,k,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.toneMapped=w.encoding!==at,(l!==w||u!==w.version||f!==d.toneMapping)&&(h.material.needsUpdate=!0,l=w,u=w.version,f=d.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new St(new Ji(2,2),new xi({name:"BackgroundMaterial",uniforms:Zi(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=w.encoding!==at,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(l!==w||u!==w.version||f!==d.toneMapping)&&(c.material.needsUpdate=!0,l=w,u=w.version,f=d.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function m(p,v){p.getRGB(Qs,sc(d)),n.buffers.color.setClear(Qs.r,Qs.g,Qs.b,v,r)}return{getClearColor:function(){return o},setClearColor:function(p,v=1){o.set(p),a=v,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(p){a=p,m(o,a)},render:g}}function ap(d,e,t,n){const i=d.getParameter(34921),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),r=n.isWebGL2||s!==null,o={},a=p(null);let c=a,h=!1;function l(N,Y,te,W,O){let ee=!1;if(r){const K=m(W,te,Y);c!==K&&(c=K,f(c.object)),ee=v(N,W,te,O),ee&&x(N,W,te,O)}else{const K=Y.wireframe===!0;(c.geometry!==W.id||c.program!==te.id||c.wireframe!==K)&&(c.geometry=W.id,c.program=te.id,c.wireframe=K,ee=!0)}O!==null&&t.update(O,34963),(ee||h)&&(h=!1,_(N,Y,te,W),O!==null&&d.bindBuffer(34963,t.get(O).buffer))}function u(){return n.isWebGL2?d.createVertexArray():s.createVertexArrayOES()}function f(N){return n.isWebGL2?d.bindVertexArray(N):s.bindVertexArrayOES(N)}function g(N){return n.isWebGL2?d.deleteVertexArray(N):s.deleteVertexArrayOES(N)}function m(N,Y,te){const W=te.wireframe===!0;let O=o[N.id];O===void 0&&(O={},o[N.id]=O);let ee=O[Y.id];ee===void 0&&(ee={},O[Y.id]=ee);let K=ee[W];return K===void 0&&(K=p(u()),ee[W]=K),K}function p(N){const Y=[],te=[],W=[];for(let O=0;O<i;O++)Y[O]=0,te[O]=0,W[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:te,attributeDivisors:W,object:N,attributes:{},index:null}}function v(N,Y,te,W){const O=c.attributes,ee=Y.attributes;let K=0;const P=te.getAttributes();for(const H in P)if(P[H].location>=0){const I=O[H];let R=ee[H];if(R===void 0&&(H==="instanceMatrix"&&N.instanceMatrix&&(R=N.instanceMatrix),H==="instanceColor"&&N.instanceColor&&(R=N.instanceColor)),I===void 0||I.attribute!==R||R&&I.data!==R.data)return!0;K++}return c.attributesNum!==K||c.index!==W}function x(N,Y,te,W){const O={},ee=Y.attributes;let K=0;const P=te.getAttributes();for(const H in P)if(P[H].location>=0){let I=ee[H];I===void 0&&(H==="instanceMatrix"&&N.instanceMatrix&&(I=N.instanceMatrix),H==="instanceColor"&&N.instanceColor&&(I=N.instanceColor));const R={};R.attribute=I,I&&I.data&&(R.data=I.data),O[H]=R,K++}c.attributes=O,c.attributesNum=K,c.index=W}function w(){const N=c.newAttributes;for(let Y=0,te=N.length;Y<te;Y++)N[Y]=0}function y(N){b(N,0)}function b(N,Y){const te=c.newAttributes,W=c.enabledAttributes,O=c.attributeDivisors;te[N]=1,W[N]===0&&(d.enableVertexAttribArray(N),W[N]=1),O[N]!==Y&&((n.isWebGL2?d:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](N,Y),O[N]=Y)}function L(){const N=c.newAttributes,Y=c.enabledAttributes;for(let te=0,W=Y.length;te<W;te++)Y[te]!==N[te]&&(d.disableVertexAttribArray(te),Y[te]=0)}function k(N,Y,te,W,O,ee){n.isWebGL2===!0&&(te===5124||te===5125)?d.vertexAttribIPointer(N,Y,te,O,ee):d.vertexAttribPointer(N,Y,te,W,O,ee)}function _(N,Y,te,W){if(n.isWebGL2===!1&&(N.isInstancedMesh||W.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;w();const O=W.attributes,ee=te.getAttributes(),K=Y.defaultAttributeValues;for(const P in ee){const H=ee[P];if(H.location>=0){let D=O[P];if(D===void 0&&(P==="instanceMatrix"&&N.instanceMatrix&&(D=N.instanceMatrix),P==="instanceColor"&&N.instanceColor&&(D=N.instanceColor)),D!==void 0){const I=D.normalized,R=D.itemSize,V=t.get(D);if(V===void 0)continue;const re=V.buffer,ne=V.type,$=V.bytesPerElement;if(D.isInterleavedBufferAttribute){const Q=D.data,he=Q.stride,Se=D.offset;if(Q.isInstancedInterleavedBuffer){for(let ge=0;ge<H.locationSize;ge++)b(H.location+ge,Q.meshPerAttribute);N.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ge=0;ge<H.locationSize;ge++)y(H.location+ge);d.bindBuffer(34962,re);for(let ge=0;ge<H.locationSize;ge++)k(H.location+ge,R/H.locationSize,ne,I,he*$,(Se+R/H.locationSize*ge)*$)}else{if(D.isInstancedBufferAttribute){for(let Q=0;Q<H.locationSize;Q++)b(H.location+Q,D.meshPerAttribute);N.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=D.meshPerAttribute*D.count)}else for(let Q=0;Q<H.locationSize;Q++)y(H.location+Q);d.bindBuffer(34962,re);for(let Q=0;Q<H.locationSize;Q++)k(H.location+Q,R/H.locationSize,ne,I,R*$,R/H.locationSize*Q*$)}}else if(K!==void 0){const I=K[P];if(I!==void 0)switch(I.length){case 2:d.vertexAttrib2fv(H.location,I);break;case 3:d.vertexAttrib3fv(H.location,I);break;case 4:d.vertexAttrib4fv(H.location,I);break;default:d.vertexAttrib1fv(H.location,I)}}}}L()}function M(){U();for(const N in o){const Y=o[N];for(const te in Y){const W=Y[te];for(const O in W)g(W[O].object),delete W[O];delete Y[te]}delete o[N]}}function E(N){if(o[N.id]===void 0)return;const Y=o[N.id];for(const te in Y){const W=Y[te];for(const O in W)g(W[O].object),delete W[O];delete Y[te]}delete o[N.id]}function C(N){for(const Y in o){const te=o[Y];if(te[N.id]===void 0)continue;const W=te[N.id];for(const O in W)g(W[O].object),delete W[O];delete te[N.id]}}function U(){T(),h=!0,c!==a&&(c=a,f(c.object))}function T(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:l,reset:U,resetDefaultState:T,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:w,enableAttribute:y,disableUnusedAttributes:L}}function lp(d,e,t,n){const i=n.isWebGL2;let s;function r(c){s=c}function o(c,h){d.drawArrays(s,c,h),t.update(h,s,1)}function a(c,h,l){if(l===0)return;let u,f;if(i)u=d,f="drawArraysInstanced";else if(u=e.get("ANGLE_instanced_arrays"),f="drawArraysInstancedANGLE",u===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}u[f](s,c,h,l),t.update(h,s,l)}this.setMode=r,this.render=o,this.renderInstances=a}function cp(d,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const k=e.get("EXT_texture_filter_anisotropic");n=d.getParameter(k.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(k){if(k==="highp"){if(d.getShaderPrecisionFormat(35633,36338).precision>0&&d.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";k="mediump"}return k==="mediump"&&d.getShaderPrecisionFormat(35633,36337).precision>0&&d.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const r=typeof WebGL2RenderingContext<"u"&&d instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&d instanceof WebGL2ComputeRenderingContext;let o=t.precision!==void 0?t.precision:"highp";const a=s(o);a!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",a,"instead."),o=a);const c=r||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,l=d.getParameter(34930),u=d.getParameter(35660),f=d.getParameter(3379),g=d.getParameter(34076),m=d.getParameter(34921),p=d.getParameter(36347),v=d.getParameter(36348),x=d.getParameter(36349),w=u>0,y=r||e.has("OES_texture_float"),b=w&&y,L=r?d.getParameter(36183):0;return{isWebGL2:r,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:l,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:p,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:w,floatFragmentTextures:y,floatVertexTextures:b,maxSamples:L}}function hp(d){const e=this;let t=null,n=0,i=!1,s=!1;const r=new si,o=new on,a={value:null,needsUpdate:!1};this.uniform=a,this.numPlanes=0,this.numIntersection=0,this.init=function(l,u,f){const g=l.length!==0||u||n!==0||i;return i=u,t=h(l,f,0),n=l.length,g},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1,c()},this.setState=function(l,u,f){const g=l.clippingPlanes,m=l.clipIntersection,p=l.clipShadows,v=d.get(l);if(!i||g===null||g.length===0||s&&!p)s?h(null):c();else{const x=s?0:n,w=x*4;let y=v.clippingState||null;a.value=y,y=h(g,u,w,f);for(let b=0;b!==w;++b)y[b]=t[b];v.clippingState=y,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=x}};function c(){a.value!==t&&(a.value=t,a.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(l,u,f,g){const m=l!==null?l.length:0;let p=null;if(m!==0){if(p=a.value,g!==!0||p===null){const v=f+m*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<v)&&(p=new Float32Array(v));for(let w=0,y=f;w!==m;++w,y+=4)r.copy(l[w]).applyMatrix4(x,o),r.normal.toArray(p,y),p[y+3]=r.constant}a.value=p,a.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,p}}function up(d){let e=new WeakMap;function t(r,o){return o===ao?r.mapping=Xi:o===lo&&(r.mapping=Yi),r}function n(r){if(r&&r.isTexture&&r.isRenderTargetTexture===!1){const o=r.mapping;if(o===ao||o===lo)if(e.has(r)){const a=e.get(r).texture;return t(a,r.mapping)}else{const a=r.image;if(a&&a.height>0){const c=new Mu(a.height/2);return c.fromEquirectangularTexture(d,r),e.set(r,c),r.addEventListener("dispose",i),t(c.texture,r.mapping)}else return null}}return r}function i(r){const o=r.target;o.removeEventListener("dispose",i);const a=e.get(o);a!==void 0&&(e.delete(o),a.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Eo extends rc{constructor(e=-1,t=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,r=n+e,o=i+t,a=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=h*this.view.offsetY,a=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,a,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Vi=4,Da=[.125,.215,.35,.446,.526,.582],oi=20,Yr=new Eo,Na=new st;let jr=null;const ri=(1+Math.sqrt(5))/2,zi=1/ri,Ba=[new X(1,1,1),new X(-1,1,1),new X(1,1,-1),new X(-1,1,-1),new X(0,ri,zi),new X(0,ri,-zi),new X(zi,0,ri),new X(-zi,0,ri),new X(ri,zi,0),new X(-ri,zi,0)];class Fa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){jr=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Va(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(jr),e.scissorTest=!1,er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xi||e.mapping===Yi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jr=this._renderer.getRenderTarget();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:Ss,format:dn,encoding:mi,depthBuffer:!1},i=za(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=za(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=dp(s)),this._blurMaterial=fp(s,e,t)}return i}_compileMaterial(e){const t=new St(this._lodPlanes[0],e);this._renderer.compile(t,Yr)}_sceneToCubeUV(e,t,n,i){const o=new jt(90,1,t,n),a=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,l=h.autoClear,u=h.toneMapping;h.getClearColor(Na),h.toneMapping=On,h.autoClear=!1;const f=new $t({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1}),g=new St(new vi,f);let m=!1;const p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,m=!0):(f.color.copy(Na),m=!0);for(let v=0;v<6;v++){const x=v%3;x===0?(o.up.set(0,a[v],0),o.lookAt(c[v],0,0)):x===1?(o.up.set(0,0,a[v]),o.lookAt(0,c[v],0)):(o.up.set(0,a[v],0),o.lookAt(0,0,c[v]));const w=this._cubeSize;er(i,x*w,v>2?w:0,w,w),h.setRenderTarget(i),m&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=l,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Xi||e.mapping===Yi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Va()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oa());const s=i?this._cubemapMaterial:this._equirectMaterial,r=new St(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const a=this._cubeSize;er(t,0,0,3*a,2*a),n.setRenderTarget(t),n.render(r,Yr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),r=Ba[(i-1)%Ba.length];this._blur(e,i-1,i,s,r)}t.autoClear=n}_blur(e,t,n,i,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,i,"latitudinal",s),this._halfBlur(r,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,r,o){const a=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,l=new St(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*oi-1),m=s/g,p=isFinite(s)?1+Math.floor(h*m):oi;p>oi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${oi}`);const v=[];let x=0;for(let k=0;k<oi;++k){const _=k/m,M=Math.exp(-_*_/2);v.push(M),k===0?x+=M:k<p&&(x+=2*M)}for(let k=0;k<v.length;k++)v[k]=v[k]/x;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=v,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:w}=this;u.dTheta.value=g,u.mipInt.value=w-n;const y=this._sizeLods[i],b=3*y*(i>w-Vi?i-w+Vi:0),L=4*(this._cubeSize-y);er(t,b,L,3*y,2*y),a.setRenderTarget(t),a.render(l,Yr)}}function dp(d){const e=[],t=[],n=[];let i=d;const s=d-Vi+1+Da.length;for(let r=0;r<s;r++){const o=Math.pow(2,i);t.push(o);let a=1/o;r>d-Vi?a=Da[r-d+Vi-1]:r===0&&(a=0),n.push(a);const c=1/(o-2),h=-c,l=1+c,u=[h,h,l,h,l,l,h,h,l,l,h,l],f=6,g=6,m=3,p=2,v=1,x=new Float32Array(m*g*f),w=new Float32Array(p*g*f),y=new Float32Array(v*g*f);for(let L=0;L<f;L++){const k=L%3*2/3-1,_=L>2?0:-1,M=[k,_,0,k+2/3,_,0,k+2/3,_+1,0,k,_,0,k+2/3,_+1,0,k,_+1,0];x.set(M,m*g*L),w.set(u,p*g*L);const E=[L,L,L,L,L,L];y.set(E,v*g*L)}const b=new Wt;b.setAttribute("position",new Kt(x,m)),b.setAttribute("uv",new Kt(w,p)),b.setAttribute("faceIndex",new Kt(y,v)),e.push(b),i>Vi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function za(d,e,t){const n=new gi(d,e,t);return n.texture.mapping=mr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function er(d,e,t,n,i){d.viewport.set(e,t,n,i),d.scissor.set(e,t,n,i)}function fp(d,e,t){const n=new Float32Array(oi),i=new X(0,1,0);return new xi({name:"SphericalGaussianBlur",defines:{n:oi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${d}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:To(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Oa(){return new xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:To(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Va(){return new xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:To(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function To(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function pp(d){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const a=o.mapping,c=a===ao||a===lo,h=a===Xi||a===Yi;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let l=e.get(o);return t===null&&(t=new Fa(d)),l=c?t.fromEquirectangular(o,l):t.fromCubemap(o,l),e.set(o,l),l.texture}else{if(e.has(o))return e.get(o).texture;{const l=o.image;if(c&&l&&l.height>0||h&&l&&i(l)){t===null&&(t=new Fa(d));const u=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,u),o.addEventListener("dispose",s),u.texture}else return null}}}return o}function i(o){let a=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&a++;return a===c}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:r}}function mp(d){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=d.getExtension("WEBGL_depth_texture")||d.getExtension("MOZ_WEBGL_depth_texture")||d.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=d.getExtension("EXT_texture_filter_anisotropic")||d.getExtension("MOZ_EXT_texture_filter_anisotropic")||d.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=d.getExtension("WEBGL_compressed_texture_s3tc")||d.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||d.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=d.getExtension("WEBGL_compressed_texture_pvrtc")||d.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=d.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function gp(d,e,t,n){const i={},s=new WeakMap;function r(l){const u=l.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete i[u.id];const f=s.get(u);f&&(e.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(l,u){return i[u.id]===!0||(u.addEventListener("dispose",r),i[u.id]=!0,t.memory.geometries++),u}function a(l){const u=l.attributes;for(const g in u)e.update(u[g],34962);const f=l.morphAttributes;for(const g in f){const m=f[g];for(let p=0,v=m.length;p<v;p++)e.update(m[p],34962)}}function c(l){const u=[],f=l.index,g=l.attributes.position;let m=0;if(f!==null){const x=f.array;m=f.version;for(let w=0,y=x.length;w<y;w+=3){const b=x[w+0],L=x[w+1],k=x[w+2];u.push(b,L,L,k,k,b)}}else{const x=g.array;m=g.version;for(let w=0,y=x.length/3-1;w<y;w+=3){const b=w+0,L=w+1,k=w+2;u.push(b,L,L,k,k,b)}}const p=new(Kl(u)?ic:nc)(u,1);p.version=m;const v=s.get(l);v&&e.remove(v),s.set(l,p)}function h(l){const u=s.get(l);if(u){const f=l.index;f!==null&&u.version<f.version&&c(l)}else c(l);return s.get(l)}return{get:o,update:a,getWireframeAttribute:h}}function vp(d,e,t,n){const i=n.isWebGL2;let s;function r(u){s=u}let o,a;function c(u){o=u.type,a=u.bytesPerElement}function h(u,f){d.drawElements(s,f,o,u*a),t.update(f,s,1)}function l(u,f,g){if(g===0)return;let m,p;if(i)m=d,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,f,o,u*a,g),t.update(f,s,g)}this.setMode=r,this.setIndex=c,this.render=h,this.renderInstances=l}function xp(d){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,r,o){switch(t.calls++,r){case 4:t.triangles+=o*(s/3);break;case 1:t.lines+=o*(s/2);break;case 3:t.lines+=o*(s-1);break;case 2:t.lines+=o*s;break;case 0:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function yp(d,e){return d[0]-e[0]}function _p(d,e){return Math.abs(e[1])-Math.abs(d[1])}function wp(d,e,t){const n={},i=new Float32Array(8),s=new WeakMap,r=new gt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function a(c,h,l,u){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const m=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,p=m!==void 0?m.length:0;let v=s.get(h);if(v===void 0||v.count!==p){let te=function(){N.dispose(),s.delete(h),h.removeEventListener("dispose",te)};var g=te;v!==void 0&&v.texture.dispose();const y=h.morphAttributes.position!==void 0,b=h.morphAttributes.normal!==void 0,L=h.morphAttributes.color!==void 0,k=h.morphAttributes.position||[],_=h.morphAttributes.normal||[],M=h.morphAttributes.color||[];let E=0;y===!0&&(E=1),b===!0&&(E=2),L===!0&&(E=3);let C=h.attributes.position.count*E,U=1;C>e.maxTextureSize&&(U=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const T=new Float32Array(C*U*4*p),N=new ec(T,C,U,p);N.type=Xn,N.needsUpdate=!0;const Y=E*4;for(let W=0;W<p;W++){const O=k[W],ee=_[W],K=M[W],P=C*U*4*W;for(let H=0;H<O.count;H++){const D=H*Y;y===!0&&(r.fromBufferAttribute(O,H),T[P+D+0]=r.x,T[P+D+1]=r.y,T[P+D+2]=r.z,T[P+D+3]=0),b===!0&&(r.fromBufferAttribute(ee,H),T[P+D+4]=r.x,T[P+D+5]=r.y,T[P+D+6]=r.z,T[P+D+7]=0),L===!0&&(r.fromBufferAttribute(K,H),T[P+D+8]=r.x,T[P+D+9]=r.y,T[P+D+10]=r.z,T[P+D+11]=K.itemSize===4?r.w:1)}}v={count:p,texture:N,size:new et(C,U)},s.set(h,v),h.addEventListener("dispose",te)}let x=0;for(let y=0;y<f.length;y++)x+=f[y];const w=h.morphTargetsRelative?1:1-x;u.getUniforms().setValue(d,"morphTargetBaseInfluence",w),u.getUniforms().setValue(d,"morphTargetInfluences",f),u.getUniforms().setValue(d,"morphTargetsTexture",v.texture,t),u.getUniforms().setValue(d,"morphTargetsTextureSize",v.size)}else{const m=f===void 0?0:f.length;let p=n[h.id];if(p===void 0||p.length!==m){p=[];for(let b=0;b<m;b++)p[b]=[b,0];n[h.id]=p}for(let b=0;b<m;b++){const L=p[b];L[0]=b,L[1]=f[b]}p.sort(_p);for(let b=0;b<8;b++)b<m&&p[b][1]?(o[b][0]=p[b][0],o[b][1]=p[b][1]):(o[b][0]=Number.MAX_SAFE_INTEGER,o[b][1]=0);o.sort(yp);const v=h.morphAttributes.position,x=h.morphAttributes.normal;let w=0;for(let b=0;b<8;b++){const L=o[b],k=L[0],_=L[1];k!==Number.MAX_SAFE_INTEGER&&_?(v&&h.getAttribute("morphTarget"+b)!==v[k]&&h.setAttribute("morphTarget"+b,v[k]),x&&h.getAttribute("morphNormal"+b)!==x[k]&&h.setAttribute("morphNormal"+b,x[k]),i[b]=_,w+=_):(v&&h.hasAttribute("morphTarget"+b)===!0&&h.deleteAttribute("morphTarget"+b),x&&h.hasAttribute("morphNormal"+b)===!0&&h.deleteAttribute("morphNormal"+b),i[b]=0)}const y=h.morphTargetsRelative?1:1-w;u.getUniforms().setValue(d,"morphTargetBaseInfluence",y),u.getUniforms().setValue(d,"morphTargetInfluences",i)}}return{update:a}}function bp(d,e,t,n){let i=new WeakMap;function s(a){const c=n.render.frame,h=a.geometry,l=e.get(a,h);return i.get(l)!==c&&(e.update(l),i.set(l,c)),a.isInstancedMesh&&(a.hasEventListener("dispose",o)===!1&&a.addEventListener("dispose",o),t.update(a.instanceMatrix,34962),a.instanceColor!==null&&t.update(a.instanceColor,34962)),l}function r(){i=new WeakMap}function o(a){const c=a.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:r}}const lc=new zt,cc=new ec,hc=new au,uc=new oc,Ua=[],ka=[],Ha=new Float32Array(16),Wa=new Float32Array(9),Ga=new Float32Array(4);function is(d,e,t){const n=d[0];if(n<=0||n>0)return d;const i=e*t;let s=Ua[i];if(s===void 0&&(s=new Float32Array(i),Ua[i]=s),e!==0){n.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=t,d[r].toArray(s,o)}return s}function Pt(d,e){if(d.length!==e.length)return!1;for(let t=0,n=d.length;t<n;t++)if(d[t]!==e[t])return!1;return!0}function It(d,e){for(let t=0,n=e.length;t<n;t++)d[t]=e[t]}function gr(d,e){let t=ka[e];t===void 0&&(t=new Int32Array(e),ka[e]=t);for(let n=0;n!==e;++n)t[n]=d.allocateTextureUnit();return t}function Mp(d,e){const t=this.cache;t[0]!==e&&(d.uniform1f(this.addr,e),t[0]=e)}function Sp(d,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(d.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;d.uniform2fv(this.addr,e),It(t,e)}}function Ep(d,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(d.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(d.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;d.uniform3fv(this.addr,e),It(t,e)}}function Tp(d,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(d.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;d.uniform4fv(this.addr,e),It(t,e)}}function Ap(d,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;d.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;Ga.set(n),d.uniformMatrix2fv(this.addr,!1,Ga),It(t,n)}}function Cp(d,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;d.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;Wa.set(n),d.uniformMatrix3fv(this.addr,!1,Wa),It(t,n)}}function Lp(d,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;d.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;Ha.set(n),d.uniformMatrix4fv(this.addr,!1,Ha),It(t,n)}}function Rp(d,e){const t=this.cache;t[0]!==e&&(d.uniform1i(this.addr,e),t[0]=e)}function Pp(d,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(d.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;d.uniform2iv(this.addr,e),It(t,e)}}function Ip(d,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(d.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;d.uniform3iv(this.addr,e),It(t,e)}}function Dp(d,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(d.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;d.uniform4iv(this.addr,e),It(t,e)}}function Np(d,e){const t=this.cache;t[0]!==e&&(d.uniform1ui(this.addr,e),t[0]=e)}function Bp(d,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(d.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;d.uniform2uiv(this.addr,e),It(t,e)}}function Fp(d,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(d.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;d.uniform3uiv(this.addr,e),It(t,e)}}function zp(d,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(d.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;d.uniform4uiv(this.addr,e),It(t,e)}}function Op(d,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(d.uniform1i(this.addr,i),n[0]=i),t.setTexture2D(e||lc,i)}function Vp(d,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(d.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||hc,i)}function Up(d,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(d.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||uc,i)}function kp(d,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(d.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||cc,i)}function Hp(d){switch(d){case 5126:return Mp;case 35664:return Sp;case 35665:return Ep;case 35666:return Tp;case 35674:return Ap;case 35675:return Cp;case 35676:return Lp;case 5124:case 35670:return Rp;case 35667:case 35671:return Pp;case 35668:case 35672:return Ip;case 35669:case 35673:return Dp;case 5125:return Np;case 36294:return Bp;case 36295:return Fp;case 36296:return zp;case 35678:case 36198:case 36298:case 36306:case 35682:return Op;case 35679:case 36299:case 36307:return Vp;case 35680:case 36300:case 36308:case 36293:return Up;case 36289:case 36303:case 36311:case 36292:return kp}}function Wp(d,e){d.uniform1fv(this.addr,e)}function Gp(d,e){const t=is(e,this.size,2);d.uniform2fv(this.addr,t)}function qp(d,e){const t=is(e,this.size,3);d.uniform3fv(this.addr,t)}function Xp(d,e){const t=is(e,this.size,4);d.uniform4fv(this.addr,t)}function Yp(d,e){const t=is(e,this.size,4);d.uniformMatrix2fv(this.addr,!1,t)}function jp(d,e){const t=is(e,this.size,9);d.uniformMatrix3fv(this.addr,!1,t)}function $p(d,e){const t=is(e,this.size,16);d.uniformMatrix4fv(this.addr,!1,t)}function Kp(d,e){d.uniform1iv(this.addr,e)}function Zp(d,e){d.uniform2iv(this.addr,e)}function Jp(d,e){d.uniform3iv(this.addr,e)}function Qp(d,e){d.uniform4iv(this.addr,e)}function em(d,e){d.uniform1uiv(this.addr,e)}function tm(d,e){d.uniform2uiv(this.addr,e)}function nm(d,e){d.uniform3uiv(this.addr,e)}function im(d,e){d.uniform4uiv(this.addr,e)}function sm(d,e,t){const n=this.cache,i=e.length,s=gr(t,i);Pt(n,s)||(d.uniform1iv(this.addr,s),It(n,s));for(let r=0;r!==i;++r)t.setTexture2D(e[r]||lc,s[r])}function rm(d,e,t){const n=this.cache,i=e.length,s=gr(t,i);Pt(n,s)||(d.uniform1iv(this.addr,s),It(n,s));for(let r=0;r!==i;++r)t.setTexture3D(e[r]||hc,s[r])}function om(d,e,t){const n=this.cache,i=e.length,s=gr(t,i);Pt(n,s)||(d.uniform1iv(this.addr,s),It(n,s));for(let r=0;r!==i;++r)t.setTextureCube(e[r]||uc,s[r])}function am(d,e,t){const n=this.cache,i=e.length,s=gr(t,i);Pt(n,s)||(d.uniform1iv(this.addr,s),It(n,s));for(let r=0;r!==i;++r)t.setTexture2DArray(e[r]||cc,s[r])}function lm(d){switch(d){case 5126:return Wp;case 35664:return Gp;case 35665:return qp;case 35666:return Xp;case 35674:return Yp;case 35675:return jp;case 35676:return $p;case 5124:case 35670:return Kp;case 35667:case 35671:return Zp;case 35668:case 35672:return Jp;case 35669:case 35673:return Qp;case 5125:return em;case 36294:return tm;case 36295:return nm;case 36296:return im;case 35678:case 36198:case 36298:case 36306:case 35682:return sm;case 35679:case 36299:case 36307:return rm;case 35680:case 36300:case 36308:case 36293:return om;case 36289:case 36303:case 36311:case 36292:return am}}class cm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=Hp(t.type)}}class hm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=lm(t.type)}}class um{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,r=i.length;s!==r;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const $r=/(\w+)(\])?(\[|\.)?/g;function qa(d,e){d.seq.push(e),d.map[e.id]=e}function dm(d,e,t){const n=d.name,i=n.length;for($r.lastIndex=0;;){const s=$r.exec(n),r=$r.lastIndex;let o=s[1];const a=s[2]==="]",c=s[3];if(a&&(o=o|0),c===void 0||c==="["&&r+2===i){qa(t,c===void 0?new cm(o,d,e):new hm(o,d,e));break}else{let l=t.map[o];l===void 0&&(l=new um(o),qa(t,l)),t=l}}}class ur{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,35718);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),r=e.getUniformLocation(t,s.name);dm(s,r,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,r=t.length;s!==r;++s){const o=t[s],a=n[o.id];a.needsUpdate!==!1&&o.setValue(e,a.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const r=e[i];r.id in t&&n.push(r)}return n}}function Xa(d,e,t){const n=d.createShader(e);return d.shaderSource(n,t),d.compileShader(n),n}let fm=0;function pm(d,e){const t=d.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=i;r<s;r++){const o=r+1;n.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return n.join(`
`)}function mm(d){switch(d){case mi:return["Linear","( value )"];case at:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",d),["Linear","( value )"]}}function Ya(d,e,t){const n=d.getShaderParameter(e,35713),i=d.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const r=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+pm(d.getShaderSource(e),r)}else return i}function gm(d,e){const t=mm(e);return"vec4 "+d+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function vm(d,e){let t;switch(e){case _h:t="Linear";break;case wh:t="Reinhard";break;case bh:t="OptimizedCineon";break;case Mh:t="ACESFilmic";break;case Sh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+d+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function xm(d){return[d.extensionDerivatives||d.envMapCubeUVHeight||d.bumpMap||d.tangentSpaceNormalMap||d.clearcoatNormalMap||d.flatShading||d.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(d.extensionFragDepth||d.logarithmicDepthBuffer)&&d.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",d.extensionDrawBuffers&&d.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(d.extensionShaderTextureLOD||d.envMap||d.transmission)&&d.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(_s).join(`
`)}function ym(d){const e=[];for(const t in d){const n=d[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function _m(d,e){const t={},n=d.getProgramParameter(e,35721);for(let i=0;i<n;i++){const s=d.getActiveAttrib(e,i),r=s.name;let o=1;s.type===35674&&(o=2),s.type===35675&&(o=3),s.type===35676&&(o=4),t[r]={type:s.type,location:d.getAttribLocation(e,r),locationSize:o}}return t}function _s(d){return d!==""}function ja(d,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return d.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $a(d,e){return d.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const wm=/^[ \t]*#include +<([\w\d./]+)>/gm;function po(d){return d.replace(wm,bm)}function bm(d,e){const t=it[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return po(t)}const Mm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ka(d){return d.replace(Mm,Sm)}function Sm(d,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Za(d){let e="precision "+d.precision+` float;
precision `+d.precision+" int;";return d.precision==="highp"?e+=`
#define HIGH_PRECISION`:d.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:d.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Em(d){let e="SHADOWMAP_TYPE_BASIC";return d.shadowMapType===Ul?e="SHADOWMAP_TYPE_PCF":d.shadowMapType===Jc?e="SHADOWMAP_TYPE_PCF_SOFT":d.shadowMapType===ys&&(e="SHADOWMAP_TYPE_VSM"),e}function Tm(d){let e="ENVMAP_TYPE_CUBE";if(d.envMap)switch(d.envMapMode){case Xi:case Yi:e="ENVMAP_TYPE_CUBE";break;case mr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Am(d){let e="ENVMAP_MODE_REFLECTION";if(d.envMap)switch(d.envMapMode){case Yi:e="ENVMAP_MODE_REFRACTION";break}return e}function Cm(d){let e="ENVMAP_BLENDING_NONE";if(d.envMap)switch(d.combine){case Wl:e="ENVMAP_BLENDING_MULTIPLY";break;case xh:e="ENVMAP_BLENDING_MIX";break;case yh:e="ENVMAP_BLENDING_ADD";break}return e}function Lm(d){const e=d.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Rm(d,e,t,n){const i=d.getContext(),s=t.defines;let r=t.vertexShader,o=t.fragmentShader;const a=Em(t),c=Tm(t),h=Am(t),l=Cm(t),u=Lm(t),f=t.isWebGL2?"":xm(t),g=ym(s),m=i.createProgram();let p,v,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=[g].filter(_s).join(`
`),p.length>0&&(p+=`
`),v=[f,g].filter(_s).join(`
`),v.length>0&&(v+=`
`)):(p=[Za(t),"#define SHADER_NAME "+t.shaderName,g,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+a:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_s).join(`
`),v=[f,Za(t),"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+l:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+a:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==On?"#define TONE_MAPPING":"",t.toneMapping!==On?it.tonemapping_pars_fragment:"",t.toneMapping!==On?vm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.encodings_pars_fragment,gm("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(_s).join(`
`)),r=po(r),r=ja(r,t),r=$a(r,t),o=po(o),o=ja(o,t),o=$a(o,t),r=Ka(r),o=Ka(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["#define varying in",t.glslVersion===wa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const w=x+p+r,y=x+v+o,b=Xa(i,35633,w),L=Xa(i,35632,y);if(i.attachShader(m,b),i.attachShader(m,L),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m),d.debug.checkShaderErrors){const M=i.getProgramInfoLog(m).trim(),E=i.getShaderInfoLog(b).trim(),C=i.getShaderInfoLog(L).trim();let U=!0,T=!0;if(i.getProgramParameter(m,35714)===!1){U=!1;const N=Ya(i,b,"vertex"),Y=Ya(i,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,35715)+`

Program Info Log: `+M+`
`+N+`
`+Y)}else M!==""?console.warn("THREE.WebGLProgram: Program Info Log:",M):(E===""||C==="")&&(T=!1);T&&(this.diagnostics={runnable:U,programLog:M,vertexShader:{log:E,prefix:p},fragmentShader:{log:C,prefix:v}})}i.deleteShader(b),i.deleteShader(L);let k;this.getUniforms=function(){return k===void 0&&(k=new ur(i,m)),k};let _;return this.getAttributes=function(){return _===void 0&&(_=_m(i,m)),_},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.name=t.shaderName,this.id=fm++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=L,this}let Pm=0;class Im{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Dm(e),t.set(e,n)),n}}class Dm{constructor(e){this.id=Pm++,this.code=e,this.usedTimes=0}}function Nm(d,e,t,n,i,s,r){const o=new tc,a=new Im,c=[],h=i.isWebGL2,l=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_,M,E,C,U){const T=C.fog,N=U.geometry,Y=_.isMeshStandardMaterial?C.environment:null,te=(_.isMeshStandardMaterial?t:e).get(_.envMap||Y),W=te&&te.mapping===mr?te.image.height:null,O=g[_.type];_.precision!==null&&(f=i.getMaxPrecision(_.precision),f!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",f,"instead."));const ee=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,K=ee!==void 0?ee.length:0;let P=0;N.morphAttributes.position!==void 0&&(P=1),N.morphAttributes.normal!==void 0&&(P=2),N.morphAttributes.color!==void 0&&(P=3);let H,D,I,R;if(O){const he=Sn[O];H=he.vertexShader,D=he.fragmentShader}else H=_.vertexShader,D=_.fragmentShader,a.update(_),I=a.getVertexShaderID(_),R=a.getFragmentShaderID(_);const V=d.getRenderTarget(),re=_.alphaTest>0,ne=_.clearcoat>0,$=_.iridescence>0;return{isWebGL2:h,shaderID:O,shaderName:_.type,vertexShader:H,fragmentShader:D,defines:_.defines,customVertexShaderID:I,customFragmentShaderID:R,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:f,instancing:U.isInstancedMesh===!0,instancingColor:U.isInstancedMesh===!0&&U.instanceColor!==null,supportsVertexTextures:u,outputEncoding:V===null?d.outputEncoding:V.isXRRenderTarget===!0?V.texture.encoding:mi,map:!!_.map,matcap:!!_.matcap,envMap:!!te,envMapMode:te&&te.mapping,envMapCubeUVHeight:W,lightMap:!!_.lightMap,aoMap:!!_.aoMap,emissiveMap:!!_.emissiveMap,bumpMap:!!_.bumpMap,normalMap:!!_.normalMap,objectSpaceNormalMap:_.normalMapType===Gh,tangentSpaceNormalMap:_.normalMapType===jl,decodeVideoTexture:!!_.map&&_.map.isVideoTexture===!0&&_.map.encoding===at,clearcoat:ne,clearcoatMap:ne&&!!_.clearcoatMap,clearcoatRoughnessMap:ne&&!!_.clearcoatRoughnessMap,clearcoatNormalMap:ne&&!!_.clearcoatNormalMap,iridescence:$,iridescenceMap:$&&!!_.iridescenceMap,iridescenceThicknessMap:$&&!!_.iridescenceThicknessMap,displacementMap:!!_.displacementMap,roughnessMap:!!_.roughnessMap,metalnessMap:!!_.metalnessMap,specularMap:!!_.specularMap,specularIntensityMap:!!_.specularIntensityMap,specularColorMap:!!_.specularColorMap,opaque:_.transparent===!1&&_.blending===Ui,alphaMap:!!_.alphaMap,alphaTest:re,gradientMap:!!_.gradientMap,sheen:_.sheen>0,sheenColorMap:!!_.sheenColorMap,sheenRoughnessMap:!!_.sheenRoughnessMap,transmission:_.transmission>0,transmissionMap:!!_.transmissionMap,thicknessMap:!!_.thicknessMap,combine:_.combine,vertexTangents:!!_.normalMap&&!!N.attributes.tangent,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUvs:!!_.map||!!_.bumpMap||!!_.normalMap||!!_.specularMap||!!_.alphaMap||!!_.emissiveMap||!!_.roughnessMap||!!_.metalnessMap||!!_.clearcoatMap||!!_.clearcoatRoughnessMap||!!_.clearcoatNormalMap||!!_.iridescenceMap||!!_.iridescenceThicknessMap||!!_.displacementMap||!!_.transmissionMap||!!_.thicknessMap||!!_.specularIntensityMap||!!_.specularColorMap||!!_.sheenColorMap||!!_.sheenRoughnessMap,uvsVertexOnly:!(_.map||_.bumpMap||_.normalMap||_.specularMap||_.alphaMap||_.emissiveMap||_.roughnessMap||_.metalnessMap||_.clearcoatNormalMap||_.iridescenceMap||_.iridescenceThicknessMap||_.transmission>0||_.transmissionMap||_.thicknessMap||_.specularIntensityMap||_.specularColorMap||_.sheen>0||_.sheenColorMap||_.sheenRoughnessMap)&&!!_.displacementMap,fog:!!T,useFog:_.fog===!0,fogExp2:T&&T.isFogExp2,flatShading:!!_.flatShading,sizeAttenuation:_.sizeAttenuation,logarithmicDepthBuffer:l,skinning:U.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:P,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:d.shadowMap.enabled&&E.length>0,shadowMapType:d.shadowMap.type,toneMapping:_.toneMapped?d.toneMapping:On,physicallyCorrectLights:d.physicallyCorrectLights,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===pr,flipSided:_.side===fn,useDepthPacking:!!_.depthPacking,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionDerivatives:_.extensions&&_.extensions.derivatives,extensionFragDepth:_.extensions&&_.extensions.fragDepth,extensionDrawBuffers:_.extensions&&_.extensions.drawBuffers,extensionShaderTextureLOD:_.extensions&&_.extensions.shaderTextureLOD,rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),customProgramCacheKey:_.customProgramCacheKey()}}function p(_){const M=[];if(_.shaderID?M.push(_.shaderID):(M.push(_.customVertexShaderID),M.push(_.customFragmentShaderID)),_.defines!==void 0)for(const E in _.defines)M.push(E),M.push(_.defines[E]);return _.isRawShaderMaterial===!1&&(v(M,_),x(M,_),M.push(d.outputEncoding)),M.push(_.customProgramCacheKey),M.join()}function v(_,M){_.push(M.precision),_.push(M.outputEncoding),_.push(M.envMapMode),_.push(M.envMapCubeUVHeight),_.push(M.combine),_.push(M.vertexUvs),_.push(M.fogExp2),_.push(M.sizeAttenuation),_.push(M.morphTargetsCount),_.push(M.morphAttributeCount),_.push(M.numDirLights),_.push(M.numPointLights),_.push(M.numSpotLights),_.push(M.numSpotLightMaps),_.push(M.numHemiLights),_.push(M.numRectAreaLights),_.push(M.numDirLightShadows),_.push(M.numPointLightShadows),_.push(M.numSpotLightShadows),_.push(M.numSpotLightShadowsWithMaps),_.push(M.shadowMapType),_.push(M.toneMapping),_.push(M.numClippingPlanes),_.push(M.numClipIntersection),_.push(M.depthPacking)}function x(_,M){o.disableAll(),M.isWebGL2&&o.enable(0),M.supportsVertexTextures&&o.enable(1),M.instancing&&o.enable(2),M.instancingColor&&o.enable(3),M.map&&o.enable(4),M.matcap&&o.enable(5),M.envMap&&o.enable(6),M.lightMap&&o.enable(7),M.aoMap&&o.enable(8),M.emissiveMap&&o.enable(9),M.bumpMap&&o.enable(10),M.normalMap&&o.enable(11),M.objectSpaceNormalMap&&o.enable(12),M.tangentSpaceNormalMap&&o.enable(13),M.clearcoat&&o.enable(14),M.clearcoatMap&&o.enable(15),M.clearcoatRoughnessMap&&o.enable(16),M.clearcoatNormalMap&&o.enable(17),M.iridescence&&o.enable(18),M.iridescenceMap&&o.enable(19),M.iridescenceThicknessMap&&o.enable(20),M.displacementMap&&o.enable(21),M.specularMap&&o.enable(22),M.roughnessMap&&o.enable(23),M.metalnessMap&&o.enable(24),M.gradientMap&&o.enable(25),M.alphaMap&&o.enable(26),M.alphaTest&&o.enable(27),M.vertexColors&&o.enable(28),M.vertexAlphas&&o.enable(29),M.vertexUvs&&o.enable(30),M.vertexTangents&&o.enable(31),M.uvsVertexOnly&&o.enable(32),_.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.skinning&&o.enable(4),M.morphTargets&&o.enable(5),M.morphNormals&&o.enable(6),M.morphColors&&o.enable(7),M.premultipliedAlpha&&o.enable(8),M.shadowMapEnabled&&o.enable(9),M.physicallyCorrectLights&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.specularIntensityMap&&o.enable(15),M.specularColorMap&&o.enable(16),M.transmission&&o.enable(17),M.transmissionMap&&o.enable(18),M.thicknessMap&&o.enable(19),M.sheen&&o.enable(20),M.sheenColorMap&&o.enable(21),M.sheenRoughnessMap&&o.enable(22),M.decodeVideoTexture&&o.enable(23),M.opaque&&o.enable(24),_.push(o.mask)}function w(_){const M=g[_.type];let E;if(M){const C=Sn[M];E=yu.clone(C.uniforms)}else E=_.uniforms;return E}function y(_,M){let E;for(let C=0,U=c.length;C<U;C++){const T=c[C];if(T.cacheKey===M){E=T,++E.usedTimes;break}}return E===void 0&&(E=new Rm(d,M,_,s),c.push(E)),E}function b(_){if(--_.usedTimes===0){const M=c.indexOf(_);c[M]=c[c.length-1],c.pop(),_.destroy()}}function L(_){a.remove(_)}function k(){a.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:w,acquireProgram:y,releaseProgram:b,releaseShaderCache:L,programs:c,dispose:k}}function Bm(){let d=new WeakMap;function e(s){let r=d.get(s);return r===void 0&&(r={},d.set(s,r)),r}function t(s){d.delete(s)}function n(s,r,o){d.get(s)[r]=o}function i(){d=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Fm(d,e){return d.groupOrder!==e.groupOrder?d.groupOrder-e.groupOrder:d.renderOrder!==e.renderOrder?d.renderOrder-e.renderOrder:d.material.id!==e.material.id?d.material.id-e.material.id:d.z!==e.z?d.z-e.z:d.id-e.id}function Ja(d,e){return d.groupOrder!==e.groupOrder?d.groupOrder-e.groupOrder:d.renderOrder!==e.renderOrder?d.renderOrder-e.renderOrder:d.z!==e.z?e.z-d.z:d.id-e.id}function Qa(){const d=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function r(l,u,f,g,m,p){let v=d[e];return v===void 0?(v={id:l.id,object:l,geometry:u,material:f,groupOrder:g,renderOrder:l.renderOrder,z:m,group:p},d[e]=v):(v.id=l.id,v.object=l,v.geometry=u,v.material=f,v.groupOrder=g,v.renderOrder=l.renderOrder,v.z=m,v.group=p),e++,v}function o(l,u,f,g,m,p){const v=r(l,u,f,g,m,p);f.transmission>0?n.push(v):f.transparent===!0?i.push(v):t.push(v)}function a(l,u,f,g,m,p){const v=r(l,u,f,g,m,p);f.transmission>0?n.unshift(v):f.transparent===!0?i.unshift(v):t.unshift(v)}function c(l,u){t.length>1&&t.sort(l||Fm),n.length>1&&n.sort(u||Ja),i.length>1&&i.sort(u||Ja)}function h(){for(let l=e,u=d.length;l<u;l++){const f=d[l];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:a,finish:h,sort:c}}function zm(){let d=new WeakMap;function e(n,i){const s=d.get(n);let r;return s===void 0?(r=new Qa,d.set(n,[r])):i>=s.length?(r=new Qa,s.push(r)):r=s[i],r}function t(){d=new WeakMap}return{get:e,dispose:t}}function Om(){const d={};return{get:function(e){if(d[e.id]!==void 0)return d[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new X,color:new st};break;case"SpotLight":t={position:new X,direction:new X,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new X,color:new st,distance:0,decay:0};break;case"HemisphereLight":t={direction:new X,skyColor:new st,groundColor:new st};break;case"RectAreaLight":t={color:new st,position:new X,halfWidth:new X,halfHeight:new X};break}return d[e.id]=t,t}}}function Vm(){const d={};return{get:function(e){if(d[e.id]!==void 0)return d[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return d[e.id]=t,t}}}let Um=0;function km(d,e){return(e.castShadow?2:0)-(d.castShadow?2:0)+(e.map?1:0)-(d.map?1:0)}function Hm(d,e){const t=new Om,n=Vm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let h=0;h<9;h++)i.probe.push(new X);const s=new X,r=new ot,o=new ot;function a(h,l){let u=0,f=0,g=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let m=0,p=0,v=0,x=0,w=0,y=0,b=0,L=0,k=0,_=0;h.sort(km);const M=l!==!0?Math.PI:1;for(let C=0,U=h.length;C<U;C++){const T=h[C],N=T.color,Y=T.intensity,te=T.distance,W=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)u+=N.r*Y*M,f+=N.g*Y*M,g+=N.b*Y*M;else if(T.isLightProbe)for(let O=0;O<9;O++)i.probe[O].addScaledVector(T.sh.coefficients[O],Y);else if(T.isDirectionalLight){const O=t.get(T);if(O.color.copy(T.color).multiplyScalar(T.intensity*M),T.castShadow){const ee=T.shadow,K=n.get(T);K.shadowBias=ee.bias,K.shadowNormalBias=ee.normalBias,K.shadowRadius=ee.radius,K.shadowMapSize=ee.mapSize,i.directionalShadow[m]=K,i.directionalShadowMap[m]=W,i.directionalShadowMatrix[m]=T.shadow.matrix,y++}i.directional[m]=O,m++}else if(T.isSpotLight){const O=t.get(T);O.position.setFromMatrixPosition(T.matrixWorld),O.color.copy(N).multiplyScalar(Y*M),O.distance=te,O.coneCos=Math.cos(T.angle),O.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),O.decay=T.decay,i.spot[v]=O;const ee=T.shadow;if(T.map&&(i.spotLightMap[k]=T.map,k++,ee.updateMatrices(T),T.castShadow&&_++),i.spotLightMatrix[v]=ee.matrix,T.castShadow){const K=n.get(T);K.shadowBias=ee.bias,K.shadowNormalBias=ee.normalBias,K.shadowRadius=ee.radius,K.shadowMapSize=ee.mapSize,i.spotShadow[v]=K,i.spotShadowMap[v]=W,L++}v++}else if(T.isRectAreaLight){const O=t.get(T);O.color.copy(N).multiplyScalar(Y),O.halfWidth.set(T.width*.5,0,0),O.halfHeight.set(0,T.height*.5,0),i.rectArea[x]=O,x++}else if(T.isPointLight){const O=t.get(T);if(O.color.copy(T.color).multiplyScalar(T.intensity*M),O.distance=T.distance,O.decay=T.decay,T.castShadow){const ee=T.shadow,K=n.get(T);K.shadowBias=ee.bias,K.shadowNormalBias=ee.normalBias,K.shadowRadius=ee.radius,K.shadowMapSize=ee.mapSize,K.shadowCameraNear=ee.camera.near,K.shadowCameraFar=ee.camera.far,i.pointShadow[p]=K,i.pointShadowMap[p]=W,i.pointShadowMatrix[p]=T.shadow.matrix,b++}i.point[p]=O,p++}else if(T.isHemisphereLight){const O=t.get(T);O.skyColor.copy(T.color).multiplyScalar(Y*M),O.groundColor.copy(T.groundColor).multiplyScalar(Y*M),i.hemi[w]=O,w++}}x>0&&(e.isWebGL2||d.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Be.LTC_FLOAT_1,i.rectAreaLTC2=Be.LTC_FLOAT_2):d.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=Be.LTC_HALF_1,i.rectAreaLTC2=Be.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=g;const E=i.hash;(E.directionalLength!==m||E.pointLength!==p||E.spotLength!==v||E.rectAreaLength!==x||E.hemiLength!==w||E.numDirectionalShadows!==y||E.numPointShadows!==b||E.numSpotShadows!==L||E.numSpotMaps!==k)&&(i.directional.length=m,i.spot.length=v,i.rectArea.length=x,i.point.length=p,i.hemi.length=w,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=L,i.spotShadowMap.length=L,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=L+k-_,i.spotLightMap.length=k,i.numSpotLightShadowsWithMaps=_,E.directionalLength=m,E.pointLength=p,E.spotLength=v,E.rectAreaLength=x,E.hemiLength=w,E.numDirectionalShadows=y,E.numPointShadows=b,E.numSpotShadows=L,E.numSpotMaps=k,i.version=Um++)}function c(h,l){let u=0,f=0,g=0,m=0,p=0;const v=l.matrixWorldInverse;for(let x=0,w=h.length;x<w;x++){const y=h[x];if(y.isDirectionalLight){const b=i.directional[u];b.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(v),u++}else if(y.isSpotLight){const b=i.spot[g];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(v),b.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(v),g++}else if(y.isRectAreaLight){const b=i.rectArea[m];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(v),o.identity(),r.copy(y.matrixWorld),r.premultiply(v),o.extractRotation(r),b.halfWidth.set(y.width*.5,0,0),b.halfHeight.set(0,y.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),m++}else if(y.isPointLight){const b=i.point[f];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(v),f++}else if(y.isHemisphereLight){const b=i.hemi[p];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(v),p++}}}return{setup:a,setupView:c,state:i}}function el(d,e){const t=new Hm(d,e),n=[],i=[];function s(){n.length=0,i.length=0}function r(l){n.push(l)}function o(l){i.push(l)}function a(l){t.setup(n,l)}function c(l){t.setupView(n,l)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Wm(d,e){let t=new WeakMap;function n(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new el(d,e),t.set(s,[a])):r>=o.length?(a=new el(d,e),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:n,dispose:i}}class Gm extends Tn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class qm extends Tn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new X,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Xm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ym=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function jm(d,e,t){let n=new So;const i=new et,s=new et,r=new gt,o=new Gm({depthPacking:Wh}),a=new qm,c={},h=t.maxTextureSize,l={0:fn,1:Kn,2:pr},u=new xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:Xm,fragmentShader:Ym}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Wt;g.setAttribute("position",new Kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new St(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ul,this.render=function(y,b,L){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||y.length===0)return;const k=d.getRenderTarget(),_=d.getActiveCubeFace(),M=d.getActiveMipmapLevel(),E=d.state;E.setBlending($n),E.buffers.color.setClear(1,1,1,1),E.buffers.depth.setTest(!0),E.setScissorTest(!1);for(let C=0,U=y.length;C<U;C++){const T=y[C],N=T.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",T,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;i.copy(N.mapSize);const Y=N.getFrameExtents();if(i.multiply(Y),s.copy(N.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Y.x),i.x=s.x*Y.x,N.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Y.y),i.y=s.y*Y.y,N.mapSize.y=s.y)),N.map===null){const W=this.type!==ys?{minFilter:Ft,magFilter:Ft}:{};N.map=new gi(i.x,i.y,W),N.map.texture.name=T.name+".shadowMap",N.camera.updateProjectionMatrix()}d.setRenderTarget(N.map),d.clear();const te=N.getViewportCount();for(let W=0;W<te;W++){const O=N.getViewport(W);r.set(s.x*O.x,s.y*O.y,s.x*O.z,s.y*O.w),E.viewport(r),N.updateMatrices(T,W),n=N.getFrustum(),w(b,L,N.camera,T,this.type)}N.isPointLightShadow!==!0&&this.type===ys&&v(N,L),N.needsUpdate=!1}p.needsUpdate=!1,d.setRenderTarget(k,_,M)};function v(y,b){const L=e.update(m);u.defines.VSM_SAMPLES!==y.blurSamples&&(u.defines.VSM_SAMPLES=y.blurSamples,f.defines.VSM_SAMPLES=y.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new gi(i.x,i.y)),u.uniforms.shadow_pass.value=y.map.texture,u.uniforms.resolution.value=y.mapSize,u.uniforms.radius.value=y.radius,d.setRenderTarget(y.mapPass),d.clear(),d.renderBufferDirect(b,null,L,u,m,null),f.uniforms.shadow_pass.value=y.mapPass.texture,f.uniforms.resolution.value=y.mapSize,f.uniforms.radius.value=y.radius,d.setRenderTarget(y.map),d.clear(),d.renderBufferDirect(b,null,L,f,m,null)}function x(y,b,L,k,_,M){let E=null;const C=L.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(C!==void 0)E=C;else if(E=L.isPointLight===!0?a:o,d.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const U=E.uuid,T=b.uuid;let N=c[U];N===void 0&&(N={},c[U]=N);let Y=N[T];Y===void 0&&(Y=E.clone(),N[T]=Y),E=Y}return E.visible=b.visible,E.wireframe=b.wireframe,M===ys?E.side=b.shadowSide!==null?b.shadowSide:b.side:E.side=b.shadowSide!==null?b.shadowSide:l[b.side],E.alphaMap=b.alphaMap,E.alphaTest=b.alphaTest,E.map=b.map,E.clipShadows=b.clipShadows,E.clippingPlanes=b.clippingPlanes,E.clipIntersection=b.clipIntersection,E.displacementMap=b.displacementMap,E.displacementScale=b.displacementScale,E.displacementBias=b.displacementBias,E.wireframeLinewidth=b.wireframeLinewidth,E.linewidth=b.linewidth,L.isPointLight===!0&&E.isMeshDistanceMaterial===!0&&(E.referencePosition.setFromMatrixPosition(L.matrixWorld),E.nearDistance=k,E.farDistance=_),E}function w(y,b,L,k,_){if(y.visible===!1)return;if(y.layers.test(b.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&_===ys)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,y.matrixWorld);const C=e.update(y),U=y.material;if(Array.isArray(U)){const T=C.groups;for(let N=0,Y=T.length;N<Y;N++){const te=T[N],W=U[te.materialIndex];if(W&&W.visible){const O=x(y,W,k,L.near,L.far,_);d.renderBufferDirect(L,null,C,O,y,te)}}}else if(U.visible){const T=x(y,U,k,L.near,L.far,_);d.renderBufferDirect(L,null,C,T,y,null)}}const E=y.children;for(let C=0,U=E.length;C<U;C++)w(E[C],b,L,k,_)}}function $m(d,e,t){const n=t.isWebGL2;function i(){let Z=!1;const ae=new gt;let Me=null;const Re=new gt(0,0,0,0);return{setMask:function(He){Me!==He&&!Z&&(d.colorMask(He,He,He,He),Me=He)},setLocked:function(He){Z=He},setClear:function(He,rt,xt,wt,Zt){Zt===!0&&(He*=wt,rt*=wt,xt*=wt),ae.set(He,rt,xt,wt),Re.equals(ae)===!1&&(d.clearColor(He,rt,xt,wt),Re.copy(ae))},reset:function(){Z=!1,Me=null,Re.set(-1,0,0,0)}}}function s(){let Z=!1,ae=null,Me=null,Re=null;return{setTest:function(He){He?re(2929):ne(2929)},setMask:function(He){ae!==He&&!Z&&(d.depthMask(He),ae=He)},setFunc:function(He){if(Me!==He){switch(He){case uh:d.depthFunc(512);break;case dh:d.depthFunc(519);break;case fh:d.depthFunc(513);break;case oo:d.depthFunc(515);break;case ph:d.depthFunc(514);break;case mh:d.depthFunc(518);break;case gh:d.depthFunc(516);break;case vh:d.depthFunc(517);break;default:d.depthFunc(515)}Me=He}},setLocked:function(He){Z=He},setClear:function(He){Re!==He&&(d.clearDepth(He),Re=He)},reset:function(){Z=!1,ae=null,Me=null,Re=null}}}function r(){let Z=!1,ae=null,Me=null,Re=null,He=null,rt=null,xt=null,wt=null,Zt=null;return{setTest:function(tt){Z||(tt?re(2960):ne(2960))},setMask:function(tt){ae!==tt&&!Z&&(d.stencilMask(tt),ae=tt)},setFunc:function(tt,oe,le){(Me!==tt||Re!==oe||He!==le)&&(d.stencilFunc(tt,oe,le),Me=tt,Re=oe,He=le)},setOp:function(tt,oe,le){(rt!==tt||xt!==oe||wt!==le)&&(d.stencilOp(tt,oe,le),rt=tt,xt=oe,wt=le)},setLocked:function(tt){Z=tt},setClear:function(tt){Zt!==tt&&(d.clearStencil(tt),Zt=tt)},reset:function(){Z=!1,ae=null,Me=null,Re=null,He=null,rt=null,xt=null,wt=null,Zt=null}}}const o=new i,a=new s,c=new r,h=new WeakMap,l=new WeakMap;let u={},f={},g=new WeakMap,m=[],p=null,v=!1,x=null,w=null,y=null,b=null,L=null,k=null,_=null,M=!1,E=null,C=null,U=null,T=null,N=null;const Y=d.getParameter(35661);let te=!1,W=0;const O=d.getParameter(7938);O.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(O)[1]),te=W>=1):O.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),te=W>=2);let ee=null,K={};const P=d.getParameter(3088),H=d.getParameter(2978),D=new gt().fromArray(P),I=new gt().fromArray(H);function R(Z,ae,Me){const Re=new Uint8Array(4),He=d.createTexture();d.bindTexture(Z,He),d.texParameteri(Z,10241,9728),d.texParameteri(Z,10240,9728);for(let rt=0;rt<Me;rt++)d.texImage2D(ae+rt,0,6408,1,1,0,6408,5121,Re);return He}const V={};V[3553]=R(3553,3553,1),V[34067]=R(34067,34069,6),o.setClear(0,0,0,1),a.setClear(1),c.setClear(0),re(2929),a.setFunc(oo),xe(!1),Ye(qo),re(2884),Ee($n);function re(Z){u[Z]!==!0&&(d.enable(Z),u[Z]=!0)}function ne(Z){u[Z]!==!1&&(d.disable(Z),u[Z]=!1)}function $(Z,ae){return f[Z]!==ae?(d.bindFramebuffer(Z,ae),f[Z]=ae,n&&(Z===36009&&(f[36160]=ae),Z===36160&&(f[36009]=ae)),!0):!1}function Q(Z,ae){let Me=m,Re=!1;if(Z)if(Me=g.get(ae),Me===void 0&&(Me=[],g.set(ae,Me)),Z.isWebGLMultipleRenderTargets){const He=Z.texture;if(Me.length!==He.length||Me[0]!==36064){for(let rt=0,xt=He.length;rt<xt;rt++)Me[rt]=36064+rt;Me.length=He.length,Re=!0}}else Me[0]!==36064&&(Me[0]=36064,Re=!0);else Me[0]!==1029&&(Me[0]=1029,Re=!0);Re&&(t.isWebGL2?d.drawBuffers(Me):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Me))}function he(Z){return p!==Z?(d.useProgram(Z),p=Z,!0):!1}const Se={[Oi]:32774,[eh]:32778,[th]:32779};if(n)Se[$o]=32775,Se[Ko]=32776;else{const Z=e.get("EXT_blend_minmax");Z!==null&&(Se[$o]=Z.MIN_EXT,Se[Ko]=Z.MAX_EXT)}const ge={[nh]:0,[ih]:1,[sh]:768,[kl]:770,[hh]:776,[lh]:774,[oh]:772,[rh]:769,[Hl]:771,[ch]:775,[ah]:773};function Ee(Z,ae,Me,Re,He,rt,xt,wt){if(Z===$n){v===!0&&(ne(3042),v=!1);return}if(v===!1&&(re(3042),v=!0),Z!==Qc){if(Z!==x||wt!==M){if((w!==Oi||L!==Oi)&&(d.blendEquation(32774),w=Oi,L=Oi),wt)switch(Z){case Ui:d.blendFuncSeparate(1,771,1,771);break;case Xo:d.blendFunc(1,1);break;case Yo:d.blendFuncSeparate(0,769,0,1);break;case jo:d.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",Z);break}else switch(Z){case Ui:d.blendFuncSeparate(770,771,1,771);break;case Xo:d.blendFunc(770,1);break;case Yo:d.blendFuncSeparate(0,769,0,1);break;case jo:d.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",Z);break}y=null,b=null,k=null,_=null,x=Z,M=wt}return}He=He||ae,rt=rt||Me,xt=xt||Re,(ae!==w||He!==L)&&(d.blendEquationSeparate(Se[ae],Se[He]),w=ae,L=He),(Me!==y||Re!==b||rt!==k||xt!==_)&&(d.blendFuncSeparate(ge[Me],ge[Re],ge[rt],ge[xt]),y=Me,b=Re,k=rt,_=xt),x=Z,M=!1}function ue(Z,ae){Z.side===pr?ne(2884):re(2884);let Me=Z.side===fn;ae&&(Me=!Me),xe(Me),Z.blending===Ui&&Z.transparent===!1?Ee($n):Ee(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.premultipliedAlpha),a.setFunc(Z.depthFunc),a.setTest(Z.depthTest),a.setMask(Z.depthWrite),o.setMask(Z.colorWrite);const Re=Z.stencilWrite;c.setTest(Re),Re&&(c.setMask(Z.stencilWriteMask),c.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),c.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),Ge(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?re(32926):ne(32926)}function xe(Z){E!==Z&&(Z?d.frontFace(2304):d.frontFace(2305),E=Z)}function Ye(Z){Z!==Kc?(re(2884),Z!==C&&(Z===qo?d.cullFace(1029):Z===Zc?d.cullFace(1028):d.cullFace(1032))):ne(2884),C=Z}function ze(Z){Z!==U&&(te&&d.lineWidth(Z),U=Z)}function Ge(Z,ae,Me){Z?(re(32823),(T!==ae||N!==Me)&&(d.polygonOffset(ae,Me),T=ae,N=Me)):ne(32823)}function Pe(Z){Z?re(3089):ne(3089)}function $e(Z){Z===void 0&&(Z=33984+Y-1),ee!==Z&&(d.activeTexture(Z),ee=Z)}function B(Z,ae,Me){Me===void 0&&(ee===null?Me=33984+Y-1:Me=ee);let Re=K[Me];Re===void 0&&(Re={type:void 0,texture:void 0},K[Me]=Re),(Re.type!==Z||Re.texture!==ae)&&(ee!==Me&&(d.activeTexture(Me),ee=Me),d.bindTexture(Z,ae||V[Z]),Re.type=Z,Re.texture=ae)}function A(){const Z=K[ee];Z!==void 0&&Z.type!==void 0&&(d.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function se(){try{d.compressedTexImage2D.apply(d,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function pe(){try{d.compressedTexImage3D.apply(d,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function ye(){try{d.texSubImage2D.apply(d,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function _e(){try{d.texSubImage3D.apply(d,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Ve(){try{d.compressedTexSubImage2D.apply(d,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function q(){try{d.compressedTexSubImage3D.apply(d,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function ie(){try{d.texStorage2D.apply(d,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function De(){try{d.texStorage3D.apply(d,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Fe(){try{d.texImage2D.apply(d,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Le(){try{d.texImage3D.apply(d,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Oe(Z){D.equals(Z)===!1&&(d.scissor(Z.x,Z.y,Z.z,Z.w),D.copy(Z))}function ke(Z){I.equals(Z)===!1&&(d.viewport(Z.x,Z.y,Z.z,Z.w),I.copy(Z))}function Qe(Z,ae){let Me=l.get(ae);Me===void 0&&(Me=new WeakMap,l.set(ae,Me));let Re=Me.get(Z);Re===void 0&&(Re=d.getUniformBlockIndex(ae,Z.name),Me.set(Z,Re))}function Ze(Z,ae){const Re=l.get(ae).get(Z);h.get(ae)!==Re&&(d.uniformBlockBinding(ae,Re,Z.__bindingPointIndex),h.set(ae,Re))}function nt(){d.disable(3042),d.disable(2884),d.disable(2929),d.disable(32823),d.disable(3089),d.disable(2960),d.disable(32926),d.blendEquation(32774),d.blendFunc(1,0),d.blendFuncSeparate(1,0,1,0),d.colorMask(!0,!0,!0,!0),d.clearColor(0,0,0,0),d.depthMask(!0),d.depthFunc(513),d.clearDepth(1),d.stencilMask(4294967295),d.stencilFunc(519,0,4294967295),d.stencilOp(7680,7680,7680),d.clearStencil(0),d.cullFace(1029),d.frontFace(2305),d.polygonOffset(0,0),d.activeTexture(33984),d.bindFramebuffer(36160,null),n===!0&&(d.bindFramebuffer(36009,null),d.bindFramebuffer(36008,null)),d.useProgram(null),d.lineWidth(1),d.scissor(0,0,d.canvas.width,d.canvas.height),d.viewport(0,0,d.canvas.width,d.canvas.height),u={},ee=null,K={},f={},g=new WeakMap,m=[],p=null,v=!1,x=null,w=null,y=null,b=null,L=null,k=null,_=null,M=!1,E=null,C=null,U=null,T=null,N=null,D.set(0,0,d.canvas.width,d.canvas.height),I.set(0,0,d.canvas.width,d.canvas.height),o.reset(),a.reset(),c.reset()}return{buffers:{color:o,depth:a,stencil:c},enable:re,disable:ne,bindFramebuffer:$,drawBuffers:Q,useProgram:he,setBlending:Ee,setMaterial:ue,setFlipSided:xe,setCullFace:Ye,setLineWidth:ze,setPolygonOffset:Ge,setScissorTest:Pe,activeTexture:$e,bindTexture:B,unbindTexture:A,compressedTexImage2D:se,compressedTexImage3D:pe,texImage2D:Fe,texImage3D:Le,updateUBOMapping:Qe,uniformBlockBinding:Ze,texStorage2D:ie,texStorage3D:De,texSubImage2D:ye,texSubImage3D:_e,compressedTexSubImage2D:Ve,compressedTexSubImage3D:q,scissor:Oe,viewport:ke,reset:nt}}function Km(d,e,t,n,i,s,r){const o=i.isWebGL2,a=i.maxTextures,c=i.maxCubemapSize,h=i.maxTextureSize,l=i.maxSamples,u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let m;const p=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(B,A){return v?new OffscreenCanvas(B,A):Cs("canvas")}function w(B,A,se,pe){let ye=1;if((B.width>pe||B.height>pe)&&(ye=pe/Math.max(B.width,B.height)),ye<1||A===!0)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap){const _e=A?fr:Math.floor,Ve=_e(ye*B.width),q=_e(ye*B.height);m===void 0&&(m=x(Ve,q));const ie=se?x(Ve,q):m;return ie.width=Ve,ie.height=q,ie.getContext("2d").drawImage(B,0,0,Ve,q),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+B.width+"x"+B.height+") to ("+Ve+"x"+q+")."),ie}else return"data"in B&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+B.width+"x"+B.height+")."),B;return B}function y(B){return fo(B.width)&&fo(B.height)}function b(B){return o?!1:B.wrapS!==un||B.wrapT!==un||B.minFilter!==Ft&&B.minFilter!==en}function L(B,A){return B.generateMipmaps&&A&&B.minFilter!==Ft&&B.minFilter!==en}function k(B){d.generateMipmap(B)}function _(B,A,se,pe,ye=!1){if(o===!1)return A;if(B!==null){if(d[B]!==void 0)return d[B];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let _e=A;return A===6403&&(se===5126&&(_e=33326),se===5131&&(_e=33325),se===5121&&(_e=33321)),A===33319&&(se===5126&&(_e=33328),se===5131&&(_e=33327),se===5121&&(_e=33323)),A===6408&&(se===5126&&(_e=34836),se===5131&&(_e=34842),se===5121&&(_e=pe===at&&ye===!1?35907:32856),se===32819&&(_e=32854),se===32820&&(_e=32855)),(_e===33325||_e===33326||_e===33327||_e===33328||_e===34842||_e===34836)&&e.get("EXT_color_buffer_float"),_e}function M(B,A,se){return L(B,se)===!0||B.isFramebufferTexture&&B.minFilter!==Ft&&B.minFilter!==en?Math.log2(Math.max(A.width,A.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?A.mipmaps.length:1}function E(B){return B===Ft||B===co||B===cr?9728:9729}function C(B){const A=B.target;A.removeEventListener("dispose",C),T(A),A.isVideoTexture&&g.delete(A)}function U(B){const A=B.target;A.removeEventListener("dispose",U),Y(A)}function T(B){const A=n.get(B);if(A.__webglInit===void 0)return;const se=B.source,pe=p.get(se);if(pe){const ye=pe[A.__cacheKey];ye.usedTimes--,ye.usedTimes===0&&N(B),Object.keys(pe).length===0&&p.delete(se)}n.remove(B)}function N(B){const A=n.get(B);d.deleteTexture(A.__webglTexture);const se=B.source,pe=p.get(se);delete pe[A.__cacheKey],r.memory.textures--}function Y(B){const A=B.texture,se=n.get(B),pe=n.get(A);if(pe.__webglTexture!==void 0&&(d.deleteTexture(pe.__webglTexture),r.memory.textures--),B.depthTexture&&B.depthTexture.dispose(),B.isWebGLCubeRenderTarget)for(let ye=0;ye<6;ye++)d.deleteFramebuffer(se.__webglFramebuffer[ye]),se.__webglDepthbuffer&&d.deleteRenderbuffer(se.__webglDepthbuffer[ye]);else{if(d.deleteFramebuffer(se.__webglFramebuffer),se.__webglDepthbuffer&&d.deleteRenderbuffer(se.__webglDepthbuffer),se.__webglMultisampledFramebuffer&&d.deleteFramebuffer(se.__webglMultisampledFramebuffer),se.__webglColorRenderbuffer)for(let ye=0;ye<se.__webglColorRenderbuffer.length;ye++)se.__webglColorRenderbuffer[ye]&&d.deleteRenderbuffer(se.__webglColorRenderbuffer[ye]);se.__webglDepthRenderbuffer&&d.deleteRenderbuffer(se.__webglDepthRenderbuffer)}if(B.isWebGLMultipleRenderTargets)for(let ye=0,_e=A.length;ye<_e;ye++){const Ve=n.get(A[ye]);Ve.__webglTexture&&(d.deleteTexture(Ve.__webglTexture),r.memory.textures--),n.remove(A[ye])}n.remove(A),n.remove(B)}let te=0;function W(){te=0}function O(){const B=te;return B>=a&&console.warn("THREE.WebGLTextures: Trying to use "+B+" texture units while this GPU supports only "+a),te+=1,B}function ee(B){const A=[];return A.push(B.wrapS),A.push(B.wrapT),A.push(B.wrapR||0),A.push(B.magFilter),A.push(B.minFilter),A.push(B.anisotropy),A.push(B.internalFormat),A.push(B.format),A.push(B.type),A.push(B.generateMipmaps),A.push(B.premultiplyAlpha),A.push(B.flipY),A.push(B.unpackAlignment),A.push(B.encoding),A.join()}function K(B,A){const se=n.get(B);if(B.isVideoTexture&&Pe(B),B.isRenderTargetTexture===!1&&B.version>0&&se.__version!==B.version){const pe=B.image;if(pe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(pe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ne(se,B,A);return}}t.bindTexture(3553,se.__webglTexture,33984+A)}function P(B,A){const se=n.get(B);if(B.version>0&&se.__version!==B.version){ne(se,B,A);return}t.bindTexture(35866,se.__webglTexture,33984+A)}function H(B,A){const se=n.get(B);if(B.version>0&&se.__version!==B.version){ne(se,B,A);return}t.bindTexture(32879,se.__webglTexture,33984+A)}function D(B,A){const se=n.get(B);if(B.version>0&&se.__version!==B.version){$(se,B,A);return}t.bindTexture(34067,se.__webglTexture,33984+A)}const I={[ji]:10497,[un]:33071,[dr]:33648},R={[Ft]:9728,[co]:9984,[cr]:9986,[en]:9729,[ql]:9985,[fi]:9987};function V(B,A,se){if(se?(d.texParameteri(B,10242,I[A.wrapS]),d.texParameteri(B,10243,I[A.wrapT]),(B===32879||B===35866)&&d.texParameteri(B,32882,I[A.wrapR]),d.texParameteri(B,10240,R[A.magFilter]),d.texParameteri(B,10241,R[A.minFilter])):(d.texParameteri(B,10242,33071),d.texParameteri(B,10243,33071),(B===32879||B===35866)&&d.texParameteri(B,32882,33071),(A.wrapS!==un||A.wrapT!==un)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),d.texParameteri(B,10240,E(A.magFilter)),d.texParameteri(B,10241,E(A.minFilter)),A.minFilter!==Ft&&A.minFilter!==en&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const pe=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===Ft||A.minFilter!==cr&&A.minFilter!==fi||A.type===Xn&&e.has("OES_texture_float_linear")===!1||o===!1&&A.type===Ss&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||n.get(A).__currentAnisotropy)&&(d.texParameterf(B,pe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy)}}function re(B,A){let se=!1;B.__webglInit===void 0&&(B.__webglInit=!0,A.addEventListener("dispose",C));const pe=A.source;let ye=p.get(pe);ye===void 0&&(ye={},p.set(pe,ye));const _e=ee(A);if(_e!==B.__cacheKey){ye[_e]===void 0&&(ye[_e]={texture:d.createTexture(),usedTimes:0},r.memory.textures++,se=!0),ye[_e].usedTimes++;const Ve=ye[B.__cacheKey];Ve!==void 0&&(ye[B.__cacheKey].usedTimes--,Ve.usedTimes===0&&N(A)),B.__cacheKey=_e,B.__webglTexture=ye[_e].texture}return se}function ne(B,A,se){let pe=3553;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(pe=35866),A.isData3DTexture&&(pe=32879);const ye=re(B,A),_e=A.source;t.bindTexture(pe,B.__webglTexture,33984+se);const Ve=n.get(_e);if(_e.version!==Ve.__version||ye===!0){t.activeTexture(33984+se),d.pixelStorei(37440,A.flipY),d.pixelStorei(37441,A.premultiplyAlpha),d.pixelStorei(3317,A.unpackAlignment),d.pixelStorei(37443,0);const q=b(A)&&y(A.image)===!1;let ie=w(A.image,q,!1,h);ie=$e(A,ie);const De=y(ie)||o,Fe=s.convert(A.format,A.encoding);let Le=s.convert(A.type),Oe=_(A.internalFormat,Fe,Le,A.encoding,A.isVideoTexture);V(pe,A,De);let ke;const Qe=A.mipmaps,Ze=o&&A.isVideoTexture!==!0,nt=Ve.__version===void 0||ye===!0,Z=M(A,ie,De);if(A.isDepthTexture)Oe=6402,o?A.type===Xn?Oe=36012:A.type===li?Oe=33190:A.type===ki?Oe=35056:Oe=33189:A.type===Xn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===hi&&Oe===6402&&A.type!==Xl&&A.type!==li&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=li,Le=s.convert(A.type)),A.format===$i&&Oe===6402&&(Oe=34041,A.type!==ki&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=ki,Le=s.convert(A.type))),nt&&(Ze?t.texStorage2D(3553,1,Oe,ie.width,ie.height):t.texImage2D(3553,0,Oe,ie.width,ie.height,0,Fe,Le,null));else if(A.isDataTexture)if(Qe.length>0&&De){Ze&&nt&&t.texStorage2D(3553,Z,Oe,Qe[0].width,Qe[0].height);for(let ae=0,Me=Qe.length;ae<Me;ae++)ke=Qe[ae],Ze?t.texSubImage2D(3553,ae,0,0,ke.width,ke.height,Fe,Le,ke.data):t.texImage2D(3553,ae,Oe,ke.width,ke.height,0,Fe,Le,ke.data);A.generateMipmaps=!1}else Ze?(nt&&t.texStorage2D(3553,Z,Oe,ie.width,ie.height),t.texSubImage2D(3553,0,0,0,ie.width,ie.height,Fe,Le,ie.data)):t.texImage2D(3553,0,Oe,ie.width,ie.height,0,Fe,Le,ie.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Ze&&nt&&t.texStorage3D(35866,Z,Oe,Qe[0].width,Qe[0].height,ie.depth);for(let ae=0,Me=Qe.length;ae<Me;ae++)ke=Qe[ae],A.format!==dn?Fe!==null?Ze?t.compressedTexSubImage3D(35866,ae,0,0,0,ke.width,ke.height,ie.depth,Fe,ke.data,0,0):t.compressedTexImage3D(35866,ae,Oe,ke.width,ke.height,ie.depth,0,ke.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage3D(35866,ae,0,0,0,ke.width,ke.height,ie.depth,Fe,Le,ke.data):t.texImage3D(35866,ae,Oe,ke.width,ke.height,ie.depth,0,Fe,Le,ke.data)}else{Ze&&nt&&t.texStorage2D(3553,Z,Oe,Qe[0].width,Qe[0].height);for(let ae=0,Me=Qe.length;ae<Me;ae++)ke=Qe[ae],A.format!==dn?Fe!==null?Ze?t.compressedTexSubImage2D(3553,ae,0,0,ke.width,ke.height,Fe,ke.data):t.compressedTexImage2D(3553,ae,Oe,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage2D(3553,ae,0,0,ke.width,ke.height,Fe,Le,ke.data):t.texImage2D(3553,ae,Oe,ke.width,ke.height,0,Fe,Le,ke.data)}else if(A.isDataArrayTexture)Ze?(nt&&t.texStorage3D(35866,Z,Oe,ie.width,ie.height,ie.depth),t.texSubImage3D(35866,0,0,0,0,ie.width,ie.height,ie.depth,Fe,Le,ie.data)):t.texImage3D(35866,0,Oe,ie.width,ie.height,ie.depth,0,Fe,Le,ie.data);else if(A.isData3DTexture)Ze?(nt&&t.texStorage3D(32879,Z,Oe,ie.width,ie.height,ie.depth),t.texSubImage3D(32879,0,0,0,0,ie.width,ie.height,ie.depth,Fe,Le,ie.data)):t.texImage3D(32879,0,Oe,ie.width,ie.height,ie.depth,0,Fe,Le,ie.data);else if(A.isFramebufferTexture){if(nt)if(Ze)t.texStorage2D(3553,Z,Oe,ie.width,ie.height);else{let ae=ie.width,Me=ie.height;for(let Re=0;Re<Z;Re++)t.texImage2D(3553,Re,Oe,ae,Me,0,Fe,Le,null),ae>>=1,Me>>=1}}else if(Qe.length>0&&De){Ze&&nt&&t.texStorage2D(3553,Z,Oe,Qe[0].width,Qe[0].height);for(let ae=0,Me=Qe.length;ae<Me;ae++)ke=Qe[ae],Ze?t.texSubImage2D(3553,ae,0,0,Fe,Le,ke):t.texImage2D(3553,ae,Oe,Fe,Le,ke);A.generateMipmaps=!1}else Ze?(nt&&t.texStorage2D(3553,Z,Oe,ie.width,ie.height),t.texSubImage2D(3553,0,0,0,Fe,Le,ie)):t.texImage2D(3553,0,Oe,Fe,Le,ie);L(A,De)&&k(pe),Ve.__version=_e.version,A.onUpdate&&A.onUpdate(A)}B.__version=A.version}function $(B,A,se){if(A.image.length!==6)return;const pe=re(B,A),ye=A.source;t.bindTexture(34067,B.__webglTexture,33984+se);const _e=n.get(ye);if(ye.version!==_e.__version||pe===!0){t.activeTexture(33984+se),d.pixelStorei(37440,A.flipY),d.pixelStorei(37441,A.premultiplyAlpha),d.pixelStorei(3317,A.unpackAlignment),d.pixelStorei(37443,0);const Ve=A.isCompressedTexture||A.image[0].isCompressedTexture,q=A.image[0]&&A.image[0].isDataTexture,ie=[];for(let ae=0;ae<6;ae++)!Ve&&!q?ie[ae]=w(A.image[ae],!1,!0,c):ie[ae]=q?A.image[ae].image:A.image[ae],ie[ae]=$e(A,ie[ae]);const De=ie[0],Fe=y(De)||o,Le=s.convert(A.format,A.encoding),Oe=s.convert(A.type),ke=_(A.internalFormat,Le,Oe,A.encoding),Qe=o&&A.isVideoTexture!==!0,Ze=_e.__version===void 0||pe===!0;let nt=M(A,De,Fe);V(34067,A,Fe);let Z;if(Ve){Qe&&Ze&&t.texStorage2D(34067,nt,ke,De.width,De.height);for(let ae=0;ae<6;ae++){Z=ie[ae].mipmaps;for(let Me=0;Me<Z.length;Me++){const Re=Z[Me];A.format!==dn?Le!==null?Qe?t.compressedTexSubImage2D(34069+ae,Me,0,0,Re.width,Re.height,Le,Re.data):t.compressedTexImage2D(34069+ae,Me,ke,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Qe?t.texSubImage2D(34069+ae,Me,0,0,Re.width,Re.height,Le,Oe,Re.data):t.texImage2D(34069+ae,Me,ke,Re.width,Re.height,0,Le,Oe,Re.data)}}}else{Z=A.mipmaps,Qe&&Ze&&(Z.length>0&&nt++,t.texStorage2D(34067,nt,ke,ie[0].width,ie[0].height));for(let ae=0;ae<6;ae++)if(q){Qe?t.texSubImage2D(34069+ae,0,0,0,ie[ae].width,ie[ae].height,Le,Oe,ie[ae].data):t.texImage2D(34069+ae,0,ke,ie[ae].width,ie[ae].height,0,Le,Oe,ie[ae].data);for(let Me=0;Me<Z.length;Me++){const He=Z[Me].image[ae].image;Qe?t.texSubImage2D(34069+ae,Me+1,0,0,He.width,He.height,Le,Oe,He.data):t.texImage2D(34069+ae,Me+1,ke,He.width,He.height,0,Le,Oe,He.data)}}else{Qe?t.texSubImage2D(34069+ae,0,0,0,Le,Oe,ie[ae]):t.texImage2D(34069+ae,0,ke,Le,Oe,ie[ae]);for(let Me=0;Me<Z.length;Me++){const Re=Z[Me];Qe?t.texSubImage2D(34069+ae,Me+1,0,0,Le,Oe,Re.image[ae]):t.texImage2D(34069+ae,Me+1,ke,Le,Oe,Re.image[ae])}}}L(A,Fe)&&k(34067),_e.__version=ye.version,A.onUpdate&&A.onUpdate(A)}B.__version=A.version}function Q(B,A,se,pe,ye){const _e=s.convert(se.format,se.encoding),Ve=s.convert(se.type),q=_(se.internalFormat,_e,Ve,se.encoding);n.get(A).__hasExternalTextures||(ye===32879||ye===35866?t.texImage3D(ye,0,q,A.width,A.height,A.depth,0,_e,Ve,null):t.texImage2D(ye,0,q,A.width,A.height,0,_e,Ve,null)),t.bindFramebuffer(36160,B),Ge(A)?u.framebufferTexture2DMultisampleEXT(36160,pe,ye,n.get(se).__webglTexture,0,ze(A)):(ye===3553||ye>=34069&&ye<=34074)&&d.framebufferTexture2D(36160,pe,ye,n.get(se).__webglTexture,0),t.bindFramebuffer(36160,null)}function he(B,A,se){if(d.bindRenderbuffer(36161,B),A.depthBuffer&&!A.stencilBuffer){let pe=33189;if(se||Ge(A)){const ye=A.depthTexture;ye&&ye.isDepthTexture&&(ye.type===Xn?pe=36012:ye.type===li&&(pe=33190));const _e=ze(A);Ge(A)?u.renderbufferStorageMultisampleEXT(36161,_e,pe,A.width,A.height):d.renderbufferStorageMultisample(36161,_e,pe,A.width,A.height)}else d.renderbufferStorage(36161,pe,A.width,A.height);d.framebufferRenderbuffer(36160,36096,36161,B)}else if(A.depthBuffer&&A.stencilBuffer){const pe=ze(A);se&&Ge(A)===!1?d.renderbufferStorageMultisample(36161,pe,35056,A.width,A.height):Ge(A)?u.renderbufferStorageMultisampleEXT(36161,pe,35056,A.width,A.height):d.renderbufferStorage(36161,34041,A.width,A.height),d.framebufferRenderbuffer(36160,33306,36161,B)}else{const pe=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let ye=0;ye<pe.length;ye++){const _e=pe[ye],Ve=s.convert(_e.format,_e.encoding),q=s.convert(_e.type),ie=_(_e.internalFormat,Ve,q,_e.encoding),De=ze(A);se&&Ge(A)===!1?d.renderbufferStorageMultisample(36161,De,ie,A.width,A.height):Ge(A)?u.renderbufferStorageMultisampleEXT(36161,De,ie,A.width,A.height):d.renderbufferStorage(36161,ie,A.width,A.height)}}d.bindRenderbuffer(36161,null)}function Se(B,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,B),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),K(A.depthTexture,0);const pe=n.get(A.depthTexture).__webglTexture,ye=ze(A);if(A.depthTexture.format===hi)Ge(A)?u.framebufferTexture2DMultisampleEXT(36160,36096,3553,pe,0,ye):d.framebufferTexture2D(36160,36096,3553,pe,0);else if(A.depthTexture.format===$i)Ge(A)?u.framebufferTexture2DMultisampleEXT(36160,33306,3553,pe,0,ye):d.framebufferTexture2D(36160,33306,3553,pe,0);else throw new Error("Unknown depthTexture format")}function ge(B){const A=n.get(B),se=B.isWebGLCubeRenderTarget===!0;if(B.depthTexture&&!A.__autoAllocateDepthBuffer){if(se)throw new Error("target.depthTexture not supported in Cube render targets");Se(A.__webglFramebuffer,B)}else if(se){A.__webglDepthbuffer=[];for(let pe=0;pe<6;pe++)t.bindFramebuffer(36160,A.__webglFramebuffer[pe]),A.__webglDepthbuffer[pe]=d.createRenderbuffer(),he(A.__webglDepthbuffer[pe],B,!1)}else t.bindFramebuffer(36160,A.__webglFramebuffer),A.__webglDepthbuffer=d.createRenderbuffer(),he(A.__webglDepthbuffer,B,!1);t.bindFramebuffer(36160,null)}function Ee(B,A,se){const pe=n.get(B);A!==void 0&&Q(pe.__webglFramebuffer,B,B.texture,36064,3553),se!==void 0&&ge(B)}function ue(B){const A=B.texture,se=n.get(B),pe=n.get(A);B.addEventListener("dispose",U),B.isWebGLMultipleRenderTargets!==!0&&(pe.__webglTexture===void 0&&(pe.__webglTexture=d.createTexture()),pe.__version=A.version,r.memory.textures++);const ye=B.isWebGLCubeRenderTarget===!0,_e=B.isWebGLMultipleRenderTargets===!0,Ve=y(B)||o;if(ye){se.__webglFramebuffer=[];for(let q=0;q<6;q++)se.__webglFramebuffer[q]=d.createFramebuffer()}else{if(se.__webglFramebuffer=d.createFramebuffer(),_e)if(i.drawBuffers){const q=B.texture;for(let ie=0,De=q.length;ie<De;ie++){const Fe=n.get(q[ie]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=d.createTexture(),r.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&B.samples>0&&Ge(B)===!1){const q=_e?A:[A];se.__webglMultisampledFramebuffer=d.createFramebuffer(),se.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,se.__webglMultisampledFramebuffer);for(let ie=0;ie<q.length;ie++){const De=q[ie];se.__webglColorRenderbuffer[ie]=d.createRenderbuffer(),d.bindRenderbuffer(36161,se.__webglColorRenderbuffer[ie]);const Fe=s.convert(De.format,De.encoding),Le=s.convert(De.type),Oe=_(De.internalFormat,Fe,Le,De.encoding,B.isXRRenderTarget===!0),ke=ze(B);d.renderbufferStorageMultisample(36161,ke,Oe,B.width,B.height),d.framebufferRenderbuffer(36160,36064+ie,36161,se.__webglColorRenderbuffer[ie])}d.bindRenderbuffer(36161,null),B.depthBuffer&&(se.__webglDepthRenderbuffer=d.createRenderbuffer(),he(se.__webglDepthRenderbuffer,B,!0)),t.bindFramebuffer(36160,null)}}if(ye){t.bindTexture(34067,pe.__webglTexture),V(34067,A,Ve);for(let q=0;q<6;q++)Q(se.__webglFramebuffer[q],B,A,36064,34069+q);L(A,Ve)&&k(34067),t.unbindTexture()}else if(_e){const q=B.texture;for(let ie=0,De=q.length;ie<De;ie++){const Fe=q[ie],Le=n.get(Fe);t.bindTexture(3553,Le.__webglTexture),V(3553,Fe,Ve),Q(se.__webglFramebuffer,B,Fe,36064+ie,3553),L(Fe,Ve)&&k(3553)}t.unbindTexture()}else{let q=3553;(B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(o?q=B.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(q,pe.__webglTexture),V(q,A,Ve),Q(se.__webglFramebuffer,B,A,36064,q),L(A,Ve)&&k(q),t.unbindTexture()}B.depthBuffer&&ge(B)}function xe(B){const A=y(B)||o,se=B.isWebGLMultipleRenderTargets===!0?B.texture:[B.texture];for(let pe=0,ye=se.length;pe<ye;pe++){const _e=se[pe];if(L(_e,A)){const Ve=B.isWebGLCubeRenderTarget?34067:3553,q=n.get(_e).__webglTexture;t.bindTexture(Ve,q),k(Ve),t.unbindTexture()}}}function Ye(B){if(o&&B.samples>0&&Ge(B)===!1){const A=B.isWebGLMultipleRenderTargets?B.texture:[B.texture],se=B.width,pe=B.height;let ye=16384;const _e=[],Ve=B.stencilBuffer?33306:36096,q=n.get(B),ie=B.isWebGLMultipleRenderTargets===!0;if(ie)for(let De=0;De<A.length;De++)t.bindFramebuffer(36160,q.__webglMultisampledFramebuffer),d.framebufferRenderbuffer(36160,36064+De,36161,null),t.bindFramebuffer(36160,q.__webglFramebuffer),d.framebufferTexture2D(36009,36064+De,3553,null,0);t.bindFramebuffer(36008,q.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,q.__webglFramebuffer);for(let De=0;De<A.length;De++){_e.push(36064+De),B.depthBuffer&&_e.push(Ve);const Fe=q.__ignoreDepthValues!==void 0?q.__ignoreDepthValues:!1;if(Fe===!1&&(B.depthBuffer&&(ye|=256),B.stencilBuffer&&(ye|=1024)),ie&&d.framebufferRenderbuffer(36008,36064,36161,q.__webglColorRenderbuffer[De]),Fe===!0&&(d.invalidateFramebuffer(36008,[Ve]),d.invalidateFramebuffer(36009,[Ve])),ie){const Le=n.get(A[De]).__webglTexture;d.framebufferTexture2D(36009,36064,3553,Le,0)}d.blitFramebuffer(0,0,se,pe,0,0,se,pe,ye,9728),f&&d.invalidateFramebuffer(36008,_e)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),ie)for(let De=0;De<A.length;De++){t.bindFramebuffer(36160,q.__webglMultisampledFramebuffer),d.framebufferRenderbuffer(36160,36064+De,36161,q.__webglColorRenderbuffer[De]);const Fe=n.get(A[De]).__webglTexture;t.bindFramebuffer(36160,q.__webglFramebuffer),d.framebufferTexture2D(36009,36064+De,3553,Fe,0)}t.bindFramebuffer(36009,q.__webglMultisampledFramebuffer)}}function ze(B){return Math.min(l,B.samples)}function Ge(B){const A=n.get(B);return o&&B.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Pe(B){const A=r.render.frame;g.get(B)!==A&&(g.set(B,A),B.update())}function $e(B,A){const se=B.encoding,pe=B.format,ye=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||B.format===uo||se!==mi&&(se===at?o===!1?e.has("EXT_sRGB")===!0&&pe===dn?(B.format=uo,B.minFilter=en,B.generateMipmaps=!1):A=Jl.sRGBToLinear(A):(pe!==dn||ye!==pi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",se)),A}this.allocateTextureUnit=O,this.resetTextureUnits=W,this.setTexture2D=K,this.setTexture2DArray=P,this.setTexture3D=H,this.setTextureCube=D,this.rebindTextures=Ee,this.setupRenderTarget=ue,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=Ye,this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=Ge}function Zm(d,e,t){const n=t.isWebGL2;function i(s,r=null){let o;if(s===pi)return 5121;if(s===Ch)return 32819;if(s===Lh)return 32820;if(s===Eh)return 5120;if(s===Th)return 5122;if(s===Xl)return 5123;if(s===Ah)return 5124;if(s===li)return 5125;if(s===Xn)return 5126;if(s===Ss)return n?5131:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Rh)return 6406;if(s===dn)return 6408;if(s===Ih)return 6409;if(s===Dh)return 6410;if(s===hi)return 6402;if(s===$i)return 34041;if(s===Ph)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(s===uo)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Nh)return 6403;if(s===Bh)return 36244;if(s===Fh)return 33319;if(s===zh)return 33320;if(s===Oh)return 36249;if(s===wr||s===br||s===Mr||s===Sr)if(r===at)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===wr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===br)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Mr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Sr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===wr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===br)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Mr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Sr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Zo||s===Jo||s===Qo||s===ea)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Zo)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Jo)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Qo)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===ea)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Vh)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===ta||s===na)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===ta)return r===at?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===na)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===ia||s===sa||s===ra||s===oa||s===aa||s===la||s===ca||s===ha||s===ua||s===da||s===fa||s===pa||s===ma||s===ga)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===ia)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===sa)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ra)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===oa)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===aa)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===la)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===ca)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===ha)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ua)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===da)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===fa)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===pa)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===ma)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ga)return r===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===va)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===va)return r===at?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return s===ki?n?34042:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):d[s]!==void 0?d[s]:null}return{convert:i}}class Jm extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Yn extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qm={type:"move"};class Kr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,r=null;const o=this._targetRay,a=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const m of e.hand.values()){const p=t.getJointPose(m,n),v=this._getHandJoint(c,m);p!==null&&(v.matrix.fromArray(p.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.jointRadius=p.radius),v.visible=p!==null}const h=c.joints["index-finger-tip"],l=c.joints["thumb-tip"],u=h.position.distanceTo(l.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else a!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Qm)))}return o!==null&&(o.visible=i!==null),a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Yn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class eg extends zt{constructor(e,t,n,i,s,r,o,a,c,h){if(h=h!==void 0?h:hi,h!==hi&&h!==$i)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===hi&&(n=li),n===void 0&&h===$i&&(n=ki),super(null,i,s,r,o,a,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Ft,this.minFilter=a!==void 0?a:Ft,this.flipY=!1,this.generateMipmaps=!1}}class tg extends _i{constructor(e,t){super();const n=this;let i=null,s=1,r=null,o="local-floor",a=null,c=null,h=null,l=null,u=null,f=null;const g=t.getContextAttributes();let m=null,p=null;const v=[],x=[],w=new Set,y=new Map,b=new jt;b.layers.enable(1),b.viewport=new gt;const L=new jt;L.layers.enable(2),L.viewport=new gt;const k=[b,L],_=new Jm;_.layers.enable(1),_.layers.enable(2);let M=null,E=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(P){let H=v[P];return H===void 0&&(H=new Kr,v[P]=H),H.getTargetRaySpace()},this.getControllerGrip=function(P){let H=v[P];return H===void 0&&(H=new Kr,v[P]=H),H.getGripSpace()},this.getHand=function(P){let H=v[P];return H===void 0&&(H=new Kr,v[P]=H),H.getHandSpace()};function C(P){const H=x.indexOf(P.inputSource);if(H===-1)return;const D=v[H];D!==void 0&&D.dispatchEvent({type:P.type,data:P.inputSource})}function U(){i.removeEventListener("select",C),i.removeEventListener("selectstart",C),i.removeEventListener("selectend",C),i.removeEventListener("squeeze",C),i.removeEventListener("squeezestart",C),i.removeEventListener("squeezeend",C),i.removeEventListener("end",U),i.removeEventListener("inputsourceschange",T);for(let P=0;P<v.length;P++){const H=x[P];H!==null&&(x[P]=null,v[P].disconnect(H))}M=null,E=null,e.setRenderTarget(m),u=null,l=null,h=null,i=null,p=null,K.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(P){s=P,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(P){o=P,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return a||r},this.setReferenceSpace=function(P){a=P},this.getBaseLayer=function(){return l!==null?l:u},this.getBinding=function(){return h},this.getFrame=function(){return f},this.getSession=function(){return i},this.setSession=async function(P){if(i=P,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",C),i.addEventListener("selectstart",C),i.addEventListener("selectend",C),i.addEventListener("squeeze",C),i.addEventListener("squeezestart",C),i.addEventListener("squeezeend",C),i.addEventListener("end",U),i.addEventListener("inputsourceschange",T),g.xrCompatible!==!0&&await t.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const H={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:g.alpha,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(i,t,H),i.updateRenderState({baseLayer:u}),p=new gi(u.framebufferWidth,u.framebufferHeight,{format:dn,type:pi,encoding:e.outputEncoding,stencilBuffer:g.stencil})}else{let H=null,D=null,I=null;g.depth&&(I=g.stencil?35056:33190,H=g.stencil?$i:hi,D=g.stencil?ki:li);const R={colorFormat:32856,depthFormat:I,scaleFactor:s};h=new XRWebGLBinding(i,t),l=h.createProjectionLayer(R),i.updateRenderState({layers:[l]}),p=new gi(l.textureWidth,l.textureHeight,{format:dn,type:pi,depthTexture:new eg(l.textureWidth,l.textureHeight,D,void 0,void 0,void 0,void 0,void 0,void 0,H),stencilBuffer:g.stencil,encoding:e.outputEncoding,samples:g.antialias?4:0});const V=e.properties.get(p);V.__ignoreDepthValues=l.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(1),a=null,r=await i.requestReferenceSpace(o),K.setContext(i),K.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function T(P){for(let H=0;H<P.removed.length;H++){const D=P.removed[H],I=x.indexOf(D);I>=0&&(x[I]=null,v[I].disconnect(D))}for(let H=0;H<P.added.length;H++){const D=P.added[H];let I=x.indexOf(D);if(I===-1){for(let V=0;V<v.length;V++)if(V>=x.length){x.push(D),I=V;break}else if(x[V]===null){x[V]=D,I=V;break}if(I===-1)break}const R=v[I];R&&R.connect(D)}}const N=new X,Y=new X;function te(P,H,D){N.setFromMatrixPosition(H.matrixWorld),Y.setFromMatrixPosition(D.matrixWorld);const I=N.distanceTo(Y),R=H.projectionMatrix.elements,V=D.projectionMatrix.elements,re=R[14]/(R[10]-1),ne=R[14]/(R[10]+1),$=(R[9]+1)/R[5],Q=(R[9]-1)/R[5],he=(R[8]-1)/R[0],Se=(V[8]+1)/V[0],ge=re*he,Ee=re*Se,ue=I/(-he+Se),xe=ue*-he;H.matrixWorld.decompose(P.position,P.quaternion,P.scale),P.translateX(xe),P.translateZ(ue),P.matrixWorld.compose(P.position,P.quaternion,P.scale),P.matrixWorldInverse.copy(P.matrixWorld).invert();const Ye=re+ue,ze=ne+ue,Ge=ge-xe,Pe=Ee+(I-xe),$e=$*ne/ze*Ye,B=Q*ne/ze*Ye;P.projectionMatrix.makePerspective(Ge,Pe,$e,B,Ye,ze)}function W(P,H){H===null?P.matrixWorld.copy(P.matrix):P.matrixWorld.multiplyMatrices(H.matrixWorld,P.matrix),P.matrixWorldInverse.copy(P.matrixWorld).invert()}this.updateCamera=function(P){if(i===null)return;_.near=L.near=b.near=P.near,_.far=L.far=b.far=P.far,(M!==_.near||E!==_.far)&&(i.updateRenderState({depthNear:_.near,depthFar:_.far}),M=_.near,E=_.far);const H=P.parent,D=_.cameras;W(_,H);for(let R=0;R<D.length;R++)W(D[R],H);_.matrixWorld.decompose(_.position,_.quaternion,_.scale),P.matrix.copy(_.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale);const I=P.children;for(let R=0,V=I.length;R<V;R++)I[R].updateMatrixWorld(!0);D.length===2?te(_,b,L):_.projectionMatrix.copy(b.projectionMatrix)},this.getCamera=function(){return _},this.getFoveation=function(){if(l!==null)return l.fixedFoveation;if(u!==null)return u.fixedFoveation},this.setFoveation=function(P){l!==null&&(l.fixedFoveation=P),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=P)},this.getPlanes=function(){return w};let O=null;function ee(P,H){if(c=H.getViewerPose(a||r),f=H,c!==null){const D=c.views;u!==null&&(e.setRenderTargetFramebuffer(p,u.framebuffer),e.setRenderTarget(p));let I=!1;D.length!==_.cameras.length&&(_.cameras.length=0,I=!0);for(let R=0;R<D.length;R++){const V=D[R];let re=null;if(u!==null)re=u.getViewport(V);else{const $=h.getViewSubImage(l,V);re=$.viewport,R===0&&(e.setRenderTargetTextures(p,$.colorTexture,l.ignoreDepthValues?void 0:$.depthStencilTexture),e.setRenderTarget(p))}let ne=k[R];ne===void 0&&(ne=new jt,ne.layers.enable(R),ne.viewport=new gt,k[R]=ne),ne.matrix.fromArray(V.transform.matrix),ne.projectionMatrix.fromArray(V.projectionMatrix),ne.viewport.set(re.x,re.y,re.width,re.height),R===0&&_.matrix.copy(ne.matrix),I===!0&&_.cameras.push(ne)}}for(let D=0;D<v.length;D++){const I=x[D],R=v[D];I!==null&&R!==void 0&&R.update(I,H,a||r)}if(O&&O(P,H),H.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:H.detectedPlanes});let D=null;for(const I of w)H.detectedPlanes.has(I)||(D===null&&(D=[]),D.push(I));if(D!==null)for(const I of D)w.delete(I),y.delete(I),n.dispatchEvent({type:"planeremoved",data:I});for(const I of H.detectedPlanes)if(!w.has(I))w.add(I),y.set(I,H.lastChangedTime),n.dispatchEvent({type:"planeadded",data:I});else{const R=y.get(I);I.lastChangedTime>R&&(y.set(I,I.lastChangedTime),n.dispatchEvent({type:"planechanged",data:I}))}}f=null}const K=new ac;K.setAnimationLoop(ee),this.setAnimationLoop=function(P){O=P},this.dispose=function(){}}}function ng(d,e){function t(m,p){p.color.getRGB(m.fogColor.value,sc(d)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,v,x,w){p.isMeshBasicMaterial||p.isMeshLambertMaterial?i(m,p):p.isMeshToonMaterial?(i(m,p),h(m,p)):p.isMeshPhongMaterial?(i(m,p),c(m,p)):p.isMeshStandardMaterial?(i(m,p),l(m,p),p.isMeshPhysicalMaterial&&u(m,p,w)):p.isMeshMatcapMaterial?(i(m,p),f(m,p)):p.isMeshDepthMaterial?i(m,p):p.isMeshDistanceMaterial?(i(m,p),g(m,p)):p.isMeshNormalMaterial?i(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&r(m,p)):p.isPointsMaterial?o(m,p,v,x):p.isSpriteMaterial?a(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function i(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap),p.bumpMap&&(m.bumpMap.value=p.bumpMap,m.bumpScale.value=p.bumpScale,p.side===fn&&(m.bumpScale.value*=-1)),p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap),p.normalMap&&(m.normalMap.value=p.normalMap,m.normalScale.value.copy(p.normalScale),p.side===fn&&m.normalScale.value.negate()),p.specularMap&&(m.specularMap.value=p.specularMap),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const y=d.physicallyCorrectLights!==!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*y}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity);let x;p.map?x=p.map:p.specularMap?x=p.specularMap:p.displacementMap?x=p.displacementMap:p.normalMap?x=p.normalMap:p.bumpMap?x=p.bumpMap:p.roughnessMap?x=p.roughnessMap:p.metalnessMap?x=p.metalnessMap:p.alphaMap?x=p.alphaMap:p.emissiveMap?x=p.emissiveMap:p.clearcoatMap?x=p.clearcoatMap:p.clearcoatNormalMap?x=p.clearcoatNormalMap:p.clearcoatRoughnessMap?x=p.clearcoatRoughnessMap:p.iridescenceMap?x=p.iridescenceMap:p.iridescenceThicknessMap?x=p.iridescenceThicknessMap:p.specularIntensityMap?x=p.specularIntensityMap:p.specularColorMap?x=p.specularColorMap:p.transmissionMap?x=p.transmissionMap:p.thicknessMap?x=p.thicknessMap:p.sheenColorMap?x=p.sheenColorMap:p.sheenRoughnessMap&&(x=p.sheenRoughnessMap),x!==void 0&&(x.isWebGLRenderTarget&&(x=x.texture),x.matrixAutoUpdate===!0&&x.updateMatrix(),m.uvTransform.value.copy(x.matrix));let w;p.aoMap?w=p.aoMap:p.lightMap&&(w=p.lightMap),w!==void 0&&(w.isWebGLRenderTarget&&(w=w.texture),w.matrixAutoUpdate===!0&&w.updateMatrix(),m.uv2Transform.value.copy(w.matrix))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity}function r(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function o(m,p,v,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=x*.5,p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let w;p.map?w=p.map:p.alphaMap&&(w=p.alphaMap),w!==void 0&&(w.matrixAutoUpdate===!0&&w.updateMatrix(),m.uvTransform.value.copy(w.matrix))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v;p.map?v=p.map:p.alphaMap&&(v=p.alphaMap),v!==void 0&&(v.matrixAutoUpdate===!0&&v.updateMatrix(),m.uvTransform.value.copy(v.matrix))}function c(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function l(m,p){m.roughness.value=p.roughness,m.metalness.value=p.metalness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap),p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function u(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap)),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap),p.clearcoatNormalMap&&(m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),m.clearcoatNormalMap.value=p.clearcoatNormalMap,p.side===fn&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap)),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap)}function f(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){m.referencePosition.value.copy(p.referencePosition),m.nearDistance.value=p.nearDistance,m.farDistance.value=p.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:n}}function ig(d,e,t,n){let i={},s={},r=[];const o=t.isWebGL2?d.getParameter(35375):0;function a(x,w){const y=w.program;n.uniformBlockBinding(x,y)}function c(x,w){let y=i[x.id];y===void 0&&(g(x),y=h(x),i[x.id]=y,x.addEventListener("dispose",p));const b=w.program;n.updateUBOMapping(x,b);const L=e.render.frame;s[x.id]!==L&&(u(x),s[x.id]=L)}function h(x){const w=l();x.__bindingPointIndex=w;const y=d.createBuffer(),b=x.__size,L=x.usage;return d.bindBuffer(35345,y),d.bufferData(35345,b,L),d.bindBuffer(35345,null),d.bindBufferBase(35345,w,y),y}function l(){for(let x=0;x<o;x++)if(r.indexOf(x)===-1)return r.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const w=i[x.id],y=x.uniforms,b=x.__cache;d.bindBuffer(35345,w);for(let L=0,k=y.length;L<k;L++){const _=y[L];if(f(_,L,b)===!0){const M=_.__offset,E=Array.isArray(_.value)?_.value:[_.value];let C=0;for(let U=0;U<E.length;U++){const T=E[U],N=m(T);typeof T=="number"?(_.__data[0]=T,d.bufferSubData(35345,M+C,_.__data)):T.isMatrix3?(_.__data[0]=T.elements[0],_.__data[1]=T.elements[1],_.__data[2]=T.elements[2],_.__data[3]=T.elements[0],_.__data[4]=T.elements[3],_.__data[5]=T.elements[4],_.__data[6]=T.elements[5],_.__data[7]=T.elements[0],_.__data[8]=T.elements[6],_.__data[9]=T.elements[7],_.__data[10]=T.elements[8],_.__data[11]=T.elements[0]):(T.toArray(_.__data,C),C+=N.storage/Float32Array.BYTES_PER_ELEMENT)}d.bufferSubData(35345,M,_.__data)}}d.bindBuffer(35345,null)}function f(x,w,y){const b=x.value;if(y[w]===void 0){if(typeof b=="number")y[w]=b;else{const L=Array.isArray(b)?b:[b],k=[];for(let _=0;_<L.length;_++)k.push(L[_].clone());y[w]=k}return!0}else if(typeof b=="number"){if(y[w]!==b)return y[w]=b,!0}else{const L=Array.isArray(y[w])?y[w]:[y[w]],k=Array.isArray(b)?b:[b];for(let _=0;_<L.length;_++){const M=L[_];if(M.equals(k[_])===!1)return M.copy(k[_]),!0}}return!1}function g(x){const w=x.uniforms;let y=0;const b=16;let L=0;for(let k=0,_=w.length;k<_;k++){const M=w[k],E={boundary:0,storage:0},C=Array.isArray(M.value)?M.value:[M.value];for(let U=0,T=C.length;U<T;U++){const N=C[U],Y=m(N);E.boundary+=Y.boundary,E.storage+=Y.storage}if(M.__data=new Float32Array(E.storage/Float32Array.BYTES_PER_ELEMENT),M.__offset=y,k>0){L=y%b;const U=b-L;L!==0&&U-E.boundary<0&&(y+=b-L,M.__offset=y)}y+=E.storage}return L=y%b,L>0&&(y+=b-L),x.__size=y,x.__cache={},this}function m(x){const w={boundary:0,storage:0};return typeof x=="number"?(w.boundary=4,w.storage=4):x.isVector2?(w.boundary=8,w.storage=8):x.isVector3||x.isColor?(w.boundary=16,w.storage=12):x.isVector4?(w.boundary=16,w.storage=16):x.isMatrix3?(w.boundary=48,w.storage=48):x.isMatrix4?(w.boundary=64,w.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),w}function p(x){const w=x.target;w.removeEventListener("dispose",p);const y=r.indexOf(w.__bindingPointIndex);r.splice(y,1),d.deleteBuffer(i[w.id]),delete i[w.id],delete s[w.id]}function v(){for(const x in i)d.deleteBuffer(i[x]);r=[],i={},s={}}return{bind:a,update:c,dispose:v}}function sg(){const d=Cs("canvas");return d.style.display="block",d}function dc(d={}){this.isWebGLRenderer=!0;const e=d.canvas!==void 0?d.canvas:sg(),t=d.context!==void 0?d.context:null,n=d.depth!==void 0?d.depth:!0,i=d.stencil!==void 0?d.stencil:!0,s=d.antialias!==void 0?d.antialias:!1,r=d.premultipliedAlpha!==void 0?d.premultipliedAlpha:!0,o=d.preserveDrawingBuffer!==void 0?d.preserveDrawingBuffer:!1,a=d.powerPreference!==void 0?d.powerPreference:"default",c=d.failIfMajorPerformanceCaveat!==void 0?d.failIfMajorPerformanceCaveat:!1;let h;t!==null?h=t.getContextAttributes().alpha:h=d.alpha!==void 0?d.alpha:!1;let l=null,u=null;const f=[],g=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=mi,this.physicallyCorrectLights=!1,this.toneMapping=On,this.toneMappingExposure=1;const m=this;let p=!1,v=0,x=0,w=null,y=-1,b=null;const L=new gt,k=new gt;let _=null,M=e.width,E=e.height,C=1,U=null,T=null;const N=new gt(0,0,M,E),Y=new gt(0,0,M,E);let te=!1;const W=new So;let O=!1,ee=!1,K=null;const P=new ot,H=new et,D=new X,I={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function R(){return w===null?C:1}let V=t;function re(S,j){for(let z=0;z<S.length;z++){const G=S[z],J=e.getContext(G,j);if(J!==null)return J}return null}try{const S={alpha:!0,depth:n,stencil:i,antialias:s,premultipliedAlpha:r,preserveDrawingBuffer:o,powerPreference:a,failIfMajorPerformanceCaveat:c};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${wo}`),e.addEventListener("webglcontextlost",Oe,!1),e.addEventListener("webglcontextrestored",ke,!1),e.addEventListener("webglcontextcreationerror",Qe,!1),V===null){const j=["webgl2","webgl","experimental-webgl"];if(m.isWebGL1Renderer===!0&&j.shift(),V=re(j,S),V===null)throw re(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}V.getShaderPrecisionFormat===void 0&&(V.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let ne,$,Q,he,Se,ge,Ee,ue,xe,Ye,ze,Ge,Pe,$e,B,A,se,pe,ye,_e,Ve,q,ie,De;function Fe(){ne=new mp(V),$=new cp(V,ne,d),ne.init($),q=new Zm(V,ne,$),Q=new $m(V,ne,$),he=new xp,Se=new Bm,ge=new Km(V,ne,Q,Se,$,q,he),Ee=new up(m),ue=new pp(m),xe=new Tu(V,$),ie=new ap(V,ne,xe,$),Ye=new gp(V,xe,he,ie),ze=new bp(V,Ye,xe,he),ye=new wp(V,$,ge),A=new hp(Se),Ge=new Nm(m,Ee,ue,ne,$,ie,A),Pe=new ng(m,Se),$e=new zm,B=new Wm(ne,$),pe=new op(m,Ee,ue,Q,ze,h,r),se=new jm(m,ze,$),De=new ig(V,he,$,Q),_e=new lp(V,ne,he,$),Ve=new vp(V,ne,he,$),he.programs=Ge.programs,m.capabilities=$,m.extensions=ne,m.properties=Se,m.renderLists=$e,m.shadowMap=se,m.state=Q,m.info=he}Fe();const Le=new tg(m,V);this.xr=Le,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const S=ne.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ne.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return C},this.setPixelRatio=function(S){S!==void 0&&(C=S,this.setSize(M,E,!1))},this.getSize=function(S){return S.set(M,E)},this.setSize=function(S,j,z){if(Le.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}M=S,E=j,e.width=Math.floor(S*C),e.height=Math.floor(j*C),z!==!1&&(e.style.width=S+"px",e.style.height=j+"px"),this.setViewport(0,0,S,j)},this.getDrawingBufferSize=function(S){return S.set(M*C,E*C).floor()},this.setDrawingBufferSize=function(S,j,z){M=S,E=j,C=z,e.width=Math.floor(S*z),e.height=Math.floor(j*z),this.setViewport(0,0,S,j)},this.getCurrentViewport=function(S){return S.copy(L)},this.getViewport=function(S){return S.copy(N)},this.setViewport=function(S,j,z,G){S.isVector4?N.set(S.x,S.y,S.z,S.w):N.set(S,j,z,G),Q.viewport(L.copy(N).multiplyScalar(C).floor())},this.getScissor=function(S){return S.copy(Y)},this.setScissor=function(S,j,z,G){S.isVector4?Y.set(S.x,S.y,S.z,S.w):Y.set(S,j,z,G),Q.scissor(k.copy(Y).multiplyScalar(C).floor())},this.getScissorTest=function(){return te},this.setScissorTest=function(S){Q.setScissorTest(te=S)},this.setOpaqueSort=function(S){U=S},this.setTransparentSort=function(S){T=S},this.getClearColor=function(S){return S.copy(pe.getClearColor())},this.setClearColor=function(){pe.setClearColor.apply(pe,arguments)},this.getClearAlpha=function(){return pe.getClearAlpha()},this.setClearAlpha=function(){pe.setClearAlpha.apply(pe,arguments)},this.clear=function(S=!0,j=!0,z=!0){let G=0;S&&(G|=16384),j&&(G|=256),z&&(G|=1024),V.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Oe,!1),e.removeEventListener("webglcontextrestored",ke,!1),e.removeEventListener("webglcontextcreationerror",Qe,!1),$e.dispose(),B.dispose(),Se.dispose(),Ee.dispose(),ue.dispose(),ze.dispose(),ie.dispose(),De.dispose(),Ge.dispose(),Le.dispose(),Le.removeEventListener("sessionstart",Re),Le.removeEventListener("sessionend",He),K&&(K.dispose(),K=null),rt.stop()};function Oe(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),p=!0}function ke(){console.log("THREE.WebGLRenderer: Context Restored."),p=!1;const S=he.autoReset,j=se.enabled,z=se.autoUpdate,G=se.needsUpdate,J=se.type;Fe(),he.autoReset=S,se.enabled=j,se.autoUpdate=z,se.needsUpdate=G,se.type=J}function Qe(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ze(S){const j=S.target;j.removeEventListener("dispose",Ze),nt(j)}function nt(S){Z(S),Se.remove(S)}function Z(S){const j=Se.get(S).programs;j!==void 0&&(j.forEach(function(z){Ge.releaseProgram(z)}),S.isShaderMaterial&&Ge.releaseShaderCache(S))}this.renderBufferDirect=function(S,j,z,G,J,me){j===null&&(j=I);const fe=J.isMesh&&J.matrixWorld.determinant()<0,de=be(S,j,z,G,J);Q.setMaterial(G,fe);let ve=z.index,Ae=1;G.wireframe===!0&&(ve=Ye.getWireframeAttribute(z),Ae=2);const Ie=z.drawRange,ce=z.attributes.position;let We=Ie.start*Ae,Xe=(Ie.start+Ie.count)*Ae;me!==null&&(We=Math.max(We,me.start*Ae),Xe=Math.min(Xe,(me.start+me.count)*Ae)),ve!==null?(We=Math.max(We,0),Xe=Math.min(Xe,ve.count)):ce!=null&&(We=Math.max(We,0),Xe=Math.min(Xe,ce.count));const ct=Xe-We;if(ct<0||ct===1/0)return;ie.setup(J,G,de,z,ve);let Ke,qe=_e;if(ve!==null&&(Ke=xe.get(ve),qe=Ve,qe.setIndex(Ke)),J.isMesh)G.wireframe===!0?(Q.setLineWidth(G.wireframeLinewidth*R()),qe.setMode(1)):qe.setMode(4);else if(J.isLine){let Ce=G.linewidth;Ce===void 0&&(Ce=1),Q.setLineWidth(Ce*R()),J.isLineSegments?qe.setMode(1):J.isLineLoop?qe.setMode(2):qe.setMode(3)}else J.isPoints?qe.setMode(0):J.isSprite&&qe.setMode(4);if(J.isInstancedMesh)qe.renderInstances(We,ct,J.count);else if(z.isInstancedBufferGeometry){const Ce=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Ot=Math.min(z.instanceCount,Ce);qe.renderInstances(We,ct,Ot)}else qe.render(We,ct)},this.compile=function(S,j){function z(G,J,me){G.transparent===!0&&G.side===Fs?(G.side=fn,G.needsUpdate=!0,le(G,J,me),G.side=Kn,G.needsUpdate=!0,le(G,J,me),G.side=Fs):le(G,J,me)}u=B.get(S),u.init(),g.push(u),S.traverseVisible(function(G){G.isLight&&G.layers.test(j.layers)&&(u.pushLight(G),G.castShadow&&u.pushShadow(G))}),u.setupLights(m.physicallyCorrectLights),S.traverse(function(G){const J=G.material;if(J)if(Array.isArray(J))for(let me=0;me<J.length;me++){const fe=J[me];z(fe,S,G)}else z(J,S,G)}),g.pop(),u=null};let ae=null;function Me(S){ae&&ae(S)}function Re(){rt.stop()}function He(){rt.start()}const rt=new ac;rt.setAnimationLoop(Me),typeof self<"u"&&rt.setContext(self),this.setAnimationLoop=function(S){ae=S,Le.setAnimationLoop(S),S===null?rt.stop():rt.start()},Le.addEventListener("sessionstart",Re),Le.addEventListener("sessionend",He),this.render=function(S,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(p===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(j),j=Le.getCamera()),S.isScene===!0&&S.onBeforeRender(m,S,j,w),u=B.get(S,g.length),u.init(),g.push(u),P.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),W.setFromProjectionMatrix(P),ee=this.localClippingEnabled,O=A.init(this.clippingPlanes,ee,j),l=$e.get(S,f.length),l.init(),f.push(l),xt(S,j,0,m.sortObjects),l.finish(),m.sortObjects===!0&&l.sort(U,T),O===!0&&A.beginShadows();const z=u.state.shadowsArray;if(se.render(z,S,j),O===!0&&A.endShadows(),this.info.autoReset===!0&&this.info.reset(),pe.render(l,S),u.setupLights(m.physicallyCorrectLights),j.isArrayCamera){const G=j.cameras;for(let J=0,me=G.length;J<me;J++){const fe=G[J];wt(l,S,fe,fe.viewport)}}else wt(l,S,j);w!==null&&(ge.updateMultisampleRenderTarget(w),ge.updateRenderTargetMipmap(w)),S.isScene===!0&&S.onAfterRender(m,S,j),ie.resetDefaultState(),y=-1,b=null,g.pop(),g.length>0?u=g[g.length-1]:u=null,f.pop(),f.length>0?l=f[f.length-1]:l=null};function xt(S,j,z,G){if(S.visible===!1)return;if(S.layers.test(j.layers)){if(S.isGroup)z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(j);else if(S.isLight)u.pushLight(S),S.castShadow&&u.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||W.intersectsSprite(S)){G&&D.setFromMatrixPosition(S.matrixWorld).applyMatrix4(P);const fe=ze.update(S),de=S.material;de.visible&&l.push(S,fe,de,z,D.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(S.isSkinnedMesh&&S.skeleton.frame!==he.render.frame&&(S.skeleton.update(),S.skeleton.frame=he.render.frame),!S.frustumCulled||W.intersectsObject(S))){G&&D.setFromMatrixPosition(S.matrixWorld).applyMatrix4(P);const fe=ze.update(S),de=S.material;if(Array.isArray(de)){const ve=fe.groups;for(let Ae=0,Ie=ve.length;Ae<Ie;Ae++){const ce=ve[Ae],We=de[ce.materialIndex];We&&We.visible&&l.push(S,fe,We,z,D.z,ce)}}else de.visible&&l.push(S,fe,de,z,D.z,null)}}const me=S.children;for(let fe=0,de=me.length;fe<de;fe++)xt(me[fe],j,z,G)}function wt(S,j,z,G){const J=S.opaque,me=S.transmissive,fe=S.transparent;u.setupLightsView(z),me.length>0&&Zt(J,j,z),G&&Q.viewport(L.copy(G)),J.length>0&&tt(J,j,z),me.length>0&&tt(me,j,z),fe.length>0&&tt(fe,j,z),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function Zt(S,j,z){const G=$.isWebGL2;K===null&&(K=new gi(1,1,{generateMipmaps:!0,type:ne.has("EXT_color_buffer_half_float")?Ss:pi,minFilter:fi,samples:G&&s===!0?4:0})),m.getDrawingBufferSize(H),G?K.setSize(H.x,H.y):K.setSize(fr(H.x),fr(H.y));const J=m.getRenderTarget();m.setRenderTarget(K),m.clear();const me=m.toneMapping;m.toneMapping=On,tt(S,j,z),m.toneMapping=me,ge.updateMultisampleRenderTarget(K),ge.updateRenderTargetMipmap(K),m.setRenderTarget(J)}function tt(S,j,z){const G=j.isScene===!0?j.overrideMaterial:null;for(let J=0,me=S.length;J<me;J++){const fe=S[J],de=fe.object,ve=fe.geometry,Ae=G===null?fe.material:G,Ie=fe.group;de.layers.test(z.layers)&&oe(de,j,z,ve,Ae,Ie)}}function oe(S,j,z,G,J,me){S.onBeforeRender(m,j,z,G,J,me),S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),J.onBeforeRender(m,j,z,G,S,me),J.transparent===!0&&J.side===Fs?(J.side=fn,J.needsUpdate=!0,m.renderBufferDirect(z,j,G,J,S,me),J.side=Kn,J.needsUpdate=!0,m.renderBufferDirect(z,j,G,J,S,me),J.side=Fs):m.renderBufferDirect(z,j,G,J,S,me),S.onAfterRender(m,j,z,G,J,me)}function le(S,j,z){j.isScene!==!0&&(j=I);const G=Se.get(S),J=u.state.lights,me=u.state.shadowsArray,fe=J.state.version,de=Ge.getParameters(S,J.state,me,j,z),ve=Ge.getProgramCacheKey(de);let Ae=G.programs;G.environment=S.isMeshStandardMaterial?j.environment:null,G.fog=j.fog,G.envMap=(S.isMeshStandardMaterial?ue:Ee).get(S.envMap||G.environment),Ae===void 0&&(S.addEventListener("dispose",Ze),Ae=new Map,G.programs=Ae);let Ie=Ae.get(ve);if(Ie!==void 0){if(G.currentProgram===Ie&&G.lightsStateVersion===fe)return we(S,de),Ie}else de.uniforms=Ge.getUniforms(S),S.onBuild(z,de,m),S.onBeforeCompile(de,m),Ie=Ge.acquireProgram(de,ve),Ae.set(ve,Ie),G.uniforms=de.uniforms;const ce=G.uniforms;(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(ce.clippingPlanes=A.uniform),we(S,de),G.needsLights=Ne(S),G.lightsStateVersion=fe,G.needsLights&&(ce.ambientLightColor.value=J.state.ambient,ce.lightProbe.value=J.state.probe,ce.directionalLights.value=J.state.directional,ce.directionalLightShadows.value=J.state.directionalShadow,ce.spotLights.value=J.state.spot,ce.spotLightShadows.value=J.state.spotShadow,ce.rectAreaLights.value=J.state.rectArea,ce.ltc_1.value=J.state.rectAreaLTC1,ce.ltc_2.value=J.state.rectAreaLTC2,ce.pointLights.value=J.state.point,ce.pointLightShadows.value=J.state.pointShadow,ce.hemisphereLights.value=J.state.hemi,ce.directionalShadowMap.value=J.state.directionalShadowMap,ce.directionalShadowMatrix.value=J.state.directionalShadowMatrix,ce.spotShadowMap.value=J.state.spotShadowMap,ce.spotLightMatrix.value=J.state.spotLightMatrix,ce.spotLightMap.value=J.state.spotLightMap,ce.pointShadowMap.value=J.state.pointShadowMap,ce.pointShadowMatrix.value=J.state.pointShadowMatrix);const We=Ie.getUniforms(),Xe=ur.seqWithValue(We.seq,ce);return G.currentProgram=Ie,G.uniformsList=Xe,Ie}function we(S,j){const z=Se.get(S);z.outputEncoding=j.outputEncoding,z.instancing=j.instancing,z.skinning=j.skinning,z.morphTargets=j.morphTargets,z.morphNormals=j.morphNormals,z.morphColors=j.morphColors,z.morphTargetsCount=j.morphTargetsCount,z.numClippingPlanes=j.numClippingPlanes,z.numIntersection=j.numClipIntersection,z.vertexAlphas=j.vertexAlphas,z.vertexTangents=j.vertexTangents,z.toneMapping=j.toneMapping}function be(S,j,z,G,J){j.isScene!==!0&&(j=I),ge.resetTextureUnits();const me=j.fog,fe=G.isMeshStandardMaterial?j.environment:null,de=w===null?m.outputEncoding:w.isXRRenderTarget===!0?w.texture.encoding:mi,ve=(G.isMeshStandardMaterial?ue:Ee).get(G.envMap||fe),Ae=G.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ie=!!G.normalMap&&!!z.attributes.tangent,ce=!!z.morphAttributes.position,We=!!z.morphAttributes.normal,Xe=!!z.morphAttributes.color,ct=G.toneMapped?m.toneMapping:On,Ke=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,qe=Ke!==void 0?Ke.length:0,Ce=Se.get(G),Ot=u.state.lights;if(O===!0&&(ee===!0||S!==b)){const pt=S===b&&G.id===y;A.setState(G,S,pt)}let ut=!1;G.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==Ot.state.version||Ce.outputEncoding!==de||J.isInstancedMesh&&Ce.instancing===!1||!J.isInstancedMesh&&Ce.instancing===!0||J.isSkinnedMesh&&Ce.skinning===!1||!J.isSkinnedMesh&&Ce.skinning===!0||Ce.envMap!==ve||G.fog===!0&&Ce.fog!==me||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==A.numPlanes||Ce.numIntersection!==A.numIntersection)||Ce.vertexAlphas!==Ae||Ce.vertexTangents!==Ie||Ce.morphTargets!==ce||Ce.morphNormals!==We||Ce.morphColors!==Xe||Ce.toneMapping!==ct||$.isWebGL2===!0&&Ce.morphTargetsCount!==qe)&&(ut=!0):(ut=!0,Ce.__version=G.version);let Mt=Ce.currentProgram;ut===!0&&(Mt=le(G,j,J));let an=!1,Et=!1,dt=!1;const yt=Mt.getUniforms(),ht=Ce.uniforms;if(Q.useProgram(Mt.program)&&(an=!0,Et=!0,dt=!0),G.id!==y&&(y=G.id,Et=!0),an||b!==S){if(yt.setValue(V,"projectionMatrix",S.projectionMatrix),$.logarithmicDepthBuffer&&yt.setValue(V,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),b!==S&&(b=S,Et=!0,dt=!0),G.isShaderMaterial||G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshStandardMaterial||G.envMap){const pt=yt.map.cameraPosition;pt!==void 0&&pt.setValue(V,D.setFromMatrixPosition(S.matrixWorld))}(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&yt.setValue(V,"isOrthographic",S.isOrthographicCamera===!0),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial||G.isShadowMaterial||J.isSkinnedMesh)&&yt.setValue(V,"viewMatrix",S.matrixWorldInverse)}if(J.isSkinnedMesh){yt.setOptional(V,J,"bindMatrix"),yt.setOptional(V,J,"bindMatrixInverse");const pt=J.skeleton;pt&&($.floatVertexTextures?(pt.boneTexture===null&&pt.computeBoneTexture(),yt.setValue(V,"boneTexture",pt.boneTexture,ge),yt.setValue(V,"boneTextureSize",pt.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const tn=z.morphAttributes;if((tn.position!==void 0||tn.normal!==void 0||tn.color!==void 0&&$.isWebGL2===!0)&&ye.update(J,z,G,Mt),(Et||Ce.receiveShadow!==J.receiveShadow)&&(Ce.receiveShadow=J.receiveShadow,yt.setValue(V,"receiveShadow",J.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(ht.envMap.value=ve,ht.flipEnvMap.value=ve.isCubeTexture&&ve.isRenderTargetTexture===!1?-1:1),Et&&(yt.setValue(V,"toneMappingExposure",m.toneMappingExposure),Ce.needsLights&&je(ht,dt),me&&G.fog===!0&&Pe.refreshFogUniforms(ht,me),Pe.refreshMaterialUniforms(ht,G,C,E,K),ur.upload(V,Ce.uniformsList,ht,ge)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ur.upload(V,Ce.uniformsList,ht,ge),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&yt.setValue(V,"center",J.center),yt.setValue(V,"modelViewMatrix",J.modelViewMatrix),yt.setValue(V,"normalMatrix",J.normalMatrix),yt.setValue(V,"modelMatrix",J.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const pt=G.uniformsGroups;for(let Tt=0,Lt=pt.length;Tt<Lt;Tt++)if($.isWebGL2){const Gt=pt[Tt];De.update(Gt,Mt),De.bind(Gt,Mt)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Mt}function je(S,j){S.ambientLightColor.needsUpdate=j,S.lightProbe.needsUpdate=j,S.directionalLights.needsUpdate=j,S.directionalLightShadows.needsUpdate=j,S.pointLights.needsUpdate=j,S.pointLightShadows.needsUpdate=j,S.spotLights.needsUpdate=j,S.spotLightShadows.needsUpdate=j,S.rectAreaLights.needsUpdate=j,S.hemisphereLights.needsUpdate=j}function Ne(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return v},this.getActiveMipmapLevel=function(){return x},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(S,j,z){Se.get(S.texture).__webglTexture=j,Se.get(S.depthTexture).__webglTexture=z;const G=Se.get(S);G.__hasExternalTextures=!0,G.__hasExternalTextures&&(G.__autoAllocateDepthBuffer=z===void 0,G.__autoAllocateDepthBuffer||ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,j){const z=Se.get(S);z.__webglFramebuffer=j,z.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(S,j=0,z=0){w=S,v=j,x=z;let G=!0,J=null,me=!1,fe=!1;if(S){const ve=Se.get(S);ve.__useDefaultFramebuffer!==void 0?(Q.bindFramebuffer(36160,null),G=!1):ve.__webglFramebuffer===void 0?ge.setupRenderTarget(S):ve.__hasExternalTextures&&ge.rebindTextures(S,Se.get(S.texture).__webglTexture,Se.get(S.depthTexture).__webglTexture);const Ae=S.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(fe=!0);const Ie=Se.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(J=Ie[j],me=!0):$.isWebGL2&&S.samples>0&&ge.useMultisampledRTT(S)===!1?J=Se.get(S).__webglMultisampledFramebuffer:J=Ie,L.copy(S.viewport),k.copy(S.scissor),_=S.scissorTest}else L.copy(N).multiplyScalar(C).floor(),k.copy(Y).multiplyScalar(C).floor(),_=te;if(Q.bindFramebuffer(36160,J)&&$.drawBuffers&&G&&Q.drawBuffers(S,J),Q.viewport(L),Q.scissor(k),Q.setScissorTest(_),me){const ve=Se.get(S.texture);V.framebufferTexture2D(36160,36064,34069+j,ve.__webglTexture,z)}else if(fe){const ve=Se.get(S.texture),Ae=j||0;V.framebufferTextureLayer(36160,36064,ve.__webglTexture,z||0,Ae)}y=-1},this.readRenderTargetPixels=function(S,j,z,G,J,me,fe){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let de=Se.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&fe!==void 0&&(de=de[fe]),de){Q.bindFramebuffer(36160,de);try{const ve=S.texture,Ae=ve.format,Ie=ve.type;if(Ae!==dn&&q.convert(Ae)!==V.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ce=Ie===Ss&&(ne.has("EXT_color_buffer_half_float")||$.isWebGL2&&ne.has("EXT_color_buffer_float"));if(Ie!==pi&&q.convert(Ie)!==V.getParameter(35738)&&!(Ie===Xn&&($.isWebGL2||ne.has("OES_texture_float")||ne.has("WEBGL_color_buffer_float")))&&!ce){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=S.width-G&&z>=0&&z<=S.height-J&&V.readPixels(j,z,G,J,q.convert(Ae),q.convert(Ie),me)}finally{const ve=w!==null?Se.get(w).__webglFramebuffer:null;Q.bindFramebuffer(36160,ve)}}},this.copyFramebufferToTexture=function(S,j,z=0){const G=Math.pow(2,-z),J=Math.floor(j.image.width*G),me=Math.floor(j.image.height*G);ge.setTexture2D(j,0),V.copyTexSubImage2D(3553,z,0,0,S.x,S.y,J,me),Q.unbindTexture()},this.copyTextureToTexture=function(S,j,z,G=0){const J=j.image.width,me=j.image.height,fe=q.convert(z.format),de=q.convert(z.type);ge.setTexture2D(z,0),V.pixelStorei(37440,z.flipY),V.pixelStorei(37441,z.premultiplyAlpha),V.pixelStorei(3317,z.unpackAlignment),j.isDataTexture?V.texSubImage2D(3553,G,S.x,S.y,J,me,fe,de,j.image.data):j.isCompressedTexture?V.compressedTexSubImage2D(3553,G,S.x,S.y,j.mipmaps[0].width,j.mipmaps[0].height,fe,j.mipmaps[0].data):V.texSubImage2D(3553,G,S.x,S.y,fe,de,j.image),G===0&&z.generateMipmaps&&V.generateMipmap(3553),Q.unbindTexture()},this.copyTextureToTexture3D=function(S,j,z,G,J=0){if(m.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const me=S.max.x-S.min.x+1,fe=S.max.y-S.min.y+1,de=S.max.z-S.min.z+1,ve=q.convert(G.format),Ae=q.convert(G.type);let Ie;if(G.isData3DTexture)ge.setTexture3D(G,0),Ie=32879;else if(G.isDataArrayTexture)ge.setTexture2DArray(G,0),Ie=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}V.pixelStorei(37440,G.flipY),V.pixelStorei(37441,G.premultiplyAlpha),V.pixelStorei(3317,G.unpackAlignment);const ce=V.getParameter(3314),We=V.getParameter(32878),Xe=V.getParameter(3316),ct=V.getParameter(3315),Ke=V.getParameter(32877),qe=z.isCompressedTexture?z.mipmaps[0]:z.image;V.pixelStorei(3314,qe.width),V.pixelStorei(32878,qe.height),V.pixelStorei(3316,S.min.x),V.pixelStorei(3315,S.min.y),V.pixelStorei(32877,S.min.z),z.isDataTexture||z.isData3DTexture?V.texSubImage3D(Ie,J,j.x,j.y,j.z,me,fe,de,ve,Ae,qe.data):z.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),V.compressedTexSubImage3D(Ie,J,j.x,j.y,j.z,me,fe,de,ve,qe.data)):V.texSubImage3D(Ie,J,j.x,j.y,j.z,me,fe,de,ve,Ae,qe),V.pixelStorei(3314,ce),V.pixelStorei(32878,We),V.pixelStorei(3316,Xe),V.pixelStorei(3315,ct),V.pixelStorei(32877,Ke),J===0&&G.generateMipmaps&&V.generateMipmap(Ie),Q.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?ge.setTextureCube(S,0):S.isData3DTexture?ge.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?ge.setTexture2DArray(S,0):ge.setTexture2D(S,0),Q.unbindTexture()},this.resetState=function(){v=0,x=0,w=null,Q.reset(),ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class rg extends dc{}rg.prototype.isWebGL1Renderer=!0;class og extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class ag{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ho,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=yn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Xt=new X;class Ao{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}setX(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Fn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Fn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Fn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Fn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array),s=mt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Kt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ao(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const tl=new X,nl=new gt,il=new gt,lg=new X,sl=new ot;class cg extends St{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new ot,this.bindMatrixInverse=new ot}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new gt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(e,t){const n=this.skeleton,i=this.geometry;nl.fromBufferAttribute(i.attributes.skinIndex,e),il.fromBufferAttribute(i.attributes.skinWeight,e),tl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const r=il.getComponent(s);if(r!==0){const o=nl.getComponent(s);sl.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(lg.copy(tl).applyMatrix4(sl),r)}}return t.applyMatrix4(this.bindMatrixInverse)}}class fc extends bt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class hg extends zt{constructor(e=null,t=1,n=1,i,s,r,o,a,c=Ft,h=Ft,l,u){super(null,r,o,a,c,h,i,s,l,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const rl=new ot,ug=new ot;class Co{constructor(e=[],t=[]){this.uuid=yn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ot)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ot;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=e.length;s<r;s++){const o=e[s]?e[s].matrixWorld:ug;rl.multiplyMatrices(o,t[s]),rl.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Co(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=$l(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new hg(t,e,e,dn,Xn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let r=t[s];r===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),r=new fc),this.bones.push(r),this.boneInverses.push(new ot().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const r=t[i];e.bones.push(r.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class ol extends Kt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const al=new ot,ll=new ot,tr=[],dg=new ot,fs=new St;class fg extends St{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ol(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1;for(let i=0;i<n;i++)this.setMatrixAt(i,dg)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(fs.geometry=this.geometry,fs.material=this.material,fs.material!==void 0)for(let s=0;s<i;s++){this.getMatrixAt(s,al),ll.multiplyMatrices(n,al),fs.matrixWorld=ll,fs.raycast(e,tr);for(let r=0,o=tr.length;r<o;r++){const a=tr[r];a.instanceId=s,a.object=this,t.push(a)}tr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ol(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Lo extends Tn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new st(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const cl=new X,hl=new X,ul=new ot,Zr=new Mo,nr=new ns;class Ro extends bt{constructor(e=new Wt,t=new Lo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)cl.fromBufferAttribute(t,i-1),hl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=cl.distanceTo(hl);e.setAttribute("lineDistance",new Ct(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(i),nr.radius+=s,e.ray.intersectsSphere(nr)===!1)return;ul.copy(i).invert(),Zr.copy(e.ray).applyMatrix4(ul);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),a=o*o,c=new X,h=new X,l=new X,u=new X,f=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){const v=Math.max(0,r.start),x=Math.min(g.count,r.start+r.count);for(let w=v,y=x-1;w<y;w+=f){const b=g.getX(w),L=g.getX(w+1);if(c.fromBufferAttribute(p,b),h.fromBufferAttribute(p,L),Zr.distanceSqToSegment(c,h,u,l)>a)continue;u.applyMatrix4(this.matrixWorld);const _=e.ray.origin.distanceTo(u);_<e.near||_>e.far||t.push({distance:_,point:l.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}else{const v=Math.max(0,r.start),x=Math.min(p.count,r.start+r.count);for(let w=v,y=x-1;w<y;w+=f){if(c.fromBufferAttribute(p,w),h.fromBufferAttribute(p,w+1),Zr.distanceSqToSegment(c,h,u,l)>a)continue;u.applyMatrix4(this.matrixWorld);const L=e.ray.origin.distanceTo(u);L<e.near||L>e.far||t.push({distance:L,point:l.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}const dl=new X,fl=new X;class pc extends Ro{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)dl.fromBufferAttribute(t,i),fl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+dl.distanceTo(fl);e.setAttribute("lineDistance",new Ct(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class pg extends Ro{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class mc extends Tn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const pl=new ot,mo=new Mo,ir=new ns,sr=new X;class mg extends bt{constructor(e=new Wt,t=new mc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(i),ir.radius+=s,e.ray.intersectsSphere(ir)===!1)return;pl.copy(i).invert(),mo.copy(e.ray).applyMatrix4(pl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),a=o*o,c=n.index,l=n.attributes.position;if(c!==null){const u=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let g=u,m=f;g<m;g++){const p=c.getX(g);sr.fromBufferAttribute(l,p),ml(sr,p,a,i,e,t,this)}}else{const u=Math.max(0,r.start),f=Math.min(l.count,r.start+r.count);for(let g=u,m=f;g<m;g++)sr.fromBufferAttribute(l,g),ml(sr,g,a,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ml(d,e,t,n,i,s,r){const o=mo.distanceSqToPoint(d);if(o<t){const a=new X;mo.closestPointToPoint(d,a),a.applyMatrix4(n);const c=i.ray.origin.distanceTo(a);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:a,index:e,face:null,object:r})}}class Po extends Wt{constructor(e=1,t=1,n=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],l=[],u=[],f=[];let g=0;const m=[],p=n/2;let v=0;x(),r===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new Ct(l,3)),this.setAttribute("normal",new Ct(u,3)),this.setAttribute("uv",new Ct(f,2));function x(){const y=new X,b=new X;let L=0;const k=(t-e)/n;for(let _=0;_<=s;_++){const M=[],E=_/s,C=E*(t-e)+e;for(let U=0;U<=i;U++){const T=U/i,N=T*a+o,Y=Math.sin(N),te=Math.cos(N);b.x=C*Y,b.y=-E*n+p,b.z=C*te,l.push(b.x,b.y,b.z),y.set(Y,k,te).normalize(),u.push(y.x,y.y,y.z),f.push(T,1-E),M.push(g++)}m.push(M)}for(let _=0;_<i;_++)for(let M=0;M<s;M++){const E=m[M][_],C=m[M+1][_],U=m[M+1][_+1],T=m[M][_+1];h.push(E,C,T),h.push(C,U,T),L+=6}c.addGroup(v,L,0),v+=L}function w(y){const b=g,L=new et,k=new X;let _=0;const M=y===!0?e:t,E=y===!0?1:-1;for(let U=1;U<=i;U++)l.push(0,p*E,0),u.push(0,E,0),f.push(.5,.5),g++;const C=g;for(let U=0;U<=i;U++){const N=U/i*a+o,Y=Math.cos(N),te=Math.sin(N);k.x=M*te,k.y=p*E,k.z=M*Y,l.push(k.x,k.y,k.z),u.push(0,E,0),L.x=Y*.5+.5,L.y=te*.5*E+.5,f.push(L.x,L.y),g++}for(let U=0;U<i;U++){const T=b+U,N=C+U;y===!0?h.push(N,N+1,T):h.push(N+1,N,T),_+=3}c.addGroup(v,_,y===!0?1:2),v+=_}}static fromJSON(e){return new Po(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ls extends Wt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const a=Math.min(r+o,Math.PI);let c=0;const h=[],l=new X,u=new X,f=[],g=[],m=[],p=[];for(let v=0;v<=n;v++){const x=[],w=v/n;let y=0;v==0&&r==0?y=.5/t:v==n&&a==Math.PI&&(y=-.5/t);for(let b=0;b<=t;b++){const L=b/t;l.x=-e*Math.cos(i+L*s)*Math.sin(r+w*o),l.y=e*Math.cos(r+w*o),l.z=e*Math.sin(i+L*s)*Math.sin(r+w*o),g.push(l.x,l.y,l.z),u.copy(l).normalize(),m.push(u.x,u.y,u.z),p.push(L+y,1-w),x.push(c++)}h.push(x)}for(let v=0;v<n;v++)for(let x=0;x<t;x++){const w=h[v][x+1],y=h[v][x],b=h[v+1][x],L=h[v+1][x+1];(v!==0||r>0)&&f.push(w,y,L),(v!==n-1||a<Math.PI)&&f.push(y,b,L)}this.setIndex(f),this.setAttribute("position",new Ct(g,3)),this.setAttribute("normal",new Ct(m,3)),this.setAttribute("uv",new Ct(p,2))}static fromJSON(e){return new Ls(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Io extends Tn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new st(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jl,this.normalScale=new et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wi extends Io{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new et(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return kt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new st(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new st(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new st(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(e)}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function Wn(d,e,t){return gc(d)?new d.constructor(d.subarray(e,t!==void 0?t:d.length)):d.slice(e,t)}function rr(d,e,t){return!d||!t&&d.constructor===e?d:typeof e.BYTES_PER_ELEMENT=="number"?new e(d):Array.prototype.slice.call(d)}function gc(d){return ArrayBuffer.isView(d)&&!(d instanceof DataView)}function gg(d){function e(i,s){return d[i]-d[s]}const t=d.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function gl(d,e,t){const n=d.length,i=new d.constructor(n);for(let s=0,r=0;r!==n;++s){const o=t[s]*e;for(let a=0;a!==e;++a)i[r++]=d[o+a]}return i}function vc(d,e,t,n){let i=1,s=d[0];for(;s!==void 0&&s[n]===void 0;)s=d[i++];if(s===void 0)return;let r=s[n];if(r!==void 0)if(Array.isArray(r))do r=s[n],r!==void 0&&(e.push(s.time),t.push.apply(t,r)),s=d[i++];while(s!==void 0);else if(r.toArray!==void 0)do r=s[n],r!==void 0&&(e.push(s.time),r.toArray(t,t.length)),s=d[i++];while(s!==void 0);else do r=s[n],r!==void 0&&(e.push(s.time),t.push(r)),s=d[i++];while(s!==void 0)}class Ds{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let r;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}r=t.length;break t}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let a=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(i=s,s=t[--n-1],e>=s)break e}r=n,n=0;break t}break n}for(;n<r;){const o=n+r>>>1;e<t[o]?r=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let r=0;r!==i;++r)t[r]=n[s+r];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class vg extends Ds{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xa,endingEnd:xa}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,r=e+1,o=i[s],a=i[r];if(o===void 0)switch(this.getSettings_().endingStart){case ya:s=e,o=2*t-n;break;case _a:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(a===void 0)switch(this.getSettings_().endingEnd){case ya:r=e,a=2*n-t;break;case _a:r=1,a=n+i[1]-i[0];break;default:r=e-1,a=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(a-n),this._offsetPrev=s*h,this._offsetNext=r*h}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=e*o,c=a-o,h=this._offsetPrev,l=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),m=g*g,p=m*g,v=-u*p+2*u*m-u*g,x=(1+u)*p+(-1.5-2*u)*m+(-.5+u)*g+1,w=(-1-f)*p+(1.5+f)*m+.5*g,y=f*p-f*m;for(let b=0;b!==o;++b)s[b]=v*r[h+b]+x*r[c+b]+w*r[a+b]+y*r[l+b];return s}}class xg extends Ds{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=e*o,c=a-o,h=(n-t)/(i-t),l=1-h;for(let u=0;u!==o;++u)s[u]=r[c+u]*l+r[a+u]*h;return s}}class yg extends Ds{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class An{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=rr(t,this.TimeBufferType),this.values=rr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:rr(e.times,Array),values:rr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new yg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new xg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new vg(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Es:t=this.InterpolantFactoryMethodDiscrete;break;case Ki:t=this.InterpolantFactoryMethodLinear;break;case Er:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Es;case this.InterpolantFactoryMethodLinear:return Ki;case this.InterpolantFactoryMethodSmooth:return Er}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,r=i-1;for(;s!==i&&n[s]<e;)++s;for(;r!==-1&&n[r]>t;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);const o=this.getValueSize();this.times=Wn(n,s,r),this.values=Wn(this.values,s*o,r*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let o=0;o!==s;o++){const a=n[o];if(typeof a=="number"&&isNaN(a)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,a),e=!1;break}if(r!==null&&r>a){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,a,r),e=!1;break}r=a}if(i!==void 0&&gc(i))for(let o=0,a=i.length;o!==a;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=Wn(this.times),t=Wn(this.values),n=this.getValueSize(),i=this.getInterpolation()===Er,s=e.length-1;let r=1;for(let o=1;o<s;++o){let a=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)a=!0;else{const l=o*n,u=l-n,f=l+n;for(let g=0;g!==n;++g){const m=t[l+g];if(m!==t[u+g]||m!==t[f+g]){a=!0;break}}}if(a){if(o!==r){e[r]=e[o];const l=o*n,u=r*n;for(let f=0;f!==n;++f)t[u+f]=t[l+f]}++r}}if(s>0){e[r]=e[s];for(let o=s*n,a=r*n,c=0;c!==n;++c)t[a+c]=t[o+c];++r}return r!==e.length?(this.times=Wn(e,0,r),this.values=Wn(t,0,r*n)):(this.times=e,this.values=t),this}clone(){const e=Wn(this.times,0),t=Wn(this.values,0),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}An.prototype.TimeBufferType=Float32Array;An.prototype.ValueBufferType=Float32Array;An.prototype.DefaultInterpolation=Ki;class ss extends An{}ss.prototype.ValueTypeName="bool";ss.prototype.ValueBufferType=Array;ss.prototype.DefaultInterpolation=Es;ss.prototype.InterpolantFactoryMethodLinear=void 0;ss.prototype.InterpolantFactoryMethodSmooth=void 0;class xc extends An{}xc.prototype.ValueTypeName="color";class Rs extends An{}Rs.prototype.ValueTypeName="number";class _g extends Ds{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=(n-t)/(i-t);let c=e*o;for(let h=c+o;c!==h;c+=4)_n.slerpFlat(s,0,r,c-o,r,c,a);return s}}class yi extends An{InterpolantFactoryMethodLinear(e){return new _g(this.times,this.values,this.getValueSize(),e)}}yi.prototype.ValueTypeName="quaternion";yi.prototype.DefaultInterpolation=Ki;yi.prototype.InterpolantFactoryMethodSmooth=void 0;class rs extends An{}rs.prototype.ValueTypeName="string";rs.prototype.ValueBufferType=Array;rs.prototype.DefaultInterpolation=Es;rs.prototype.InterpolantFactoryMethodLinear=void 0;rs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ps extends An{}Ps.prototype.ValueTypeName="vector";class wg{constructor(e,t=-1,n,i=Uh){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=yn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let r=0,o=n.length;r!==o;++r)t.push(Mg(n[r]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,r=n.length;s!==r;++s)t.push(An.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,r=[];for(let o=0;o<s;o++){let a=[],c=[];a.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const h=gg(a);a=gl(a,1,h),c=gl(c,1,h),!i&&a[0]===0&&(a.push(s),c.push(c[0])),r.push(new Rs(".morphTargetInfluences["+t[o].name+"]",a,c).scale(1/n))}return new this(e,-1,r)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,a=e.length;o<a;o++){const c=e[o],h=c.name.match(s);if(h&&h.length>1){const l=h[1];let u=i[l];u||(i[l]=u=[]),u.push(c)}}const r=[];for(const o in i)r.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return r}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(l,u,f,g,m){if(f.length!==0){const p=[],v=[];vc(f,p,v,g),p.length!==0&&m.push(new l(u,p,v))}},i=[],s=e.name||"default",r=e.fps||30,o=e.blendMode;let a=e.length||-1;const c=e.hierarchy||[];for(let l=0;l<c.length;l++){const u=c[l].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const f={};let g;for(g=0;g<u.length;g++)if(u[g].morphTargets)for(let m=0;m<u[g].morphTargets.length;m++)f[u[g].morphTargets[m]]=-1;for(const m in f){const p=[],v=[];for(let x=0;x!==u[g].morphTargets.length;++x){const w=u[g];p.push(w.time),v.push(w.morphTarget===m?1:0)}i.push(new Rs(".morphTargetInfluence["+m+"]",p,v))}a=f.length*r}else{const f=".bones["+t[l].name+"]";n(Ps,f+".position",u,"pos",i),n(yi,f+".quaternion",u,"rot",i),n(Ps,f+".scale",u,"scl",i)}}return i.length===0?null:new this(s,a,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function bg(d){switch(d.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Rs;case"vector":case"vector2":case"vector3":case"vector4":return Ps;case"color":return xc;case"quaternion":return yi;case"bool":case"boolean":return ss;case"string":return rs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+d)}function Mg(d){if(d.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=bg(d.type);if(d.times===void 0){const t=[],n=[];vc(d.keys,t,n,"value"),d.times=t,d.values=n}return e.parse!==void 0?e.parse(d):new e(d.name,d.times,d.values,d.interpolation)}const Qi={enabled:!1,files:{},add:function(d,e){this.enabled!==!1&&(this.files[d]=e)},get:function(d){if(this.enabled!==!1)return this.files[d]},remove:function(d){delete this.files[d]},clear:function(){this.files={}}};class Sg{constructor(e,t,n){const i=this;let s=!1,r=0,o=0,a;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,r,o),s=!0},this.itemEnd=function(h){r++,i.onProgress!==void 0&&i.onProgress(h,r,o),r===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return a?a(h):h},this.setURLModifier=function(h){return a=h,this},this.addHandler=function(h,l){return c.push(h,l),this},this.removeHandler=function(h){const l=c.indexOf(h);return l!==-1&&c.splice(l,2),this},this.getHandler=function(h){for(let l=0,u=c.length;l<u;l+=2){const f=c[l],g=c[l+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const Eg=new Sg;class Ns{constructor(e){this.manager=e!==void 0?e:Eg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const Nn={};class Tg extends Error{constructor(e,t){super(e),this.response=t}}class yc extends Ns{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Qi.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Nn[e]!==void 0){Nn[e].push({onLoad:t,onProgress:n,onError:i});return}Nn[e]=[],Nn[e].push({onLoad:t,onProgress:n,onError:i});const r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,a=this.responseType;fetch(r).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Nn[e],l=c.body.getReader(),u=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=u?parseInt(u):0,g=f!==0;let m=0;const p=new ReadableStream({start(v){x();function x(){l.read().then(({done:w,value:y})=>{if(w)v.close();else{m+=y.byteLength;const b=new ProgressEvent("progress",{lengthComputable:g,loaded:m,total:f});for(let L=0,k=h.length;L<k;L++){const _=h[L];_.onProgress&&_.onProgress(b)}v.enqueue(y),x()}})}}});return new Response(p)}else throw new Tg(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(a){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const l=/charset="?([^;"\s]*)"?/i.exec(o),u=l&&l[1]?l[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Qi.add(e,c);const h=Nn[e];delete Nn[e];for(let l=0,u=h.length;l<u;l++){const f=h[l];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Nn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Nn[e];for(let l=0,u=h.length;l<u;l++){const f=h[l];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Ag extends Ns{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=Qi.get(e);if(r!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r;const o=Cs("img");function a(){h(),Qi.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(l){h(),i&&i(l),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",a,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",a,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class _c extends Ns{constructor(e){super(e)}load(e,t,n,i){const s=new zt,r=new Ag(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Do extends bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new st(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Jr=new ot,vl=new X,xl=new X;class No{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new et(512,512),this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new So,this._frameExtents=new et(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;vl.setFromMatrixPosition(e.matrixWorld),t.position.copy(vl),xl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xl),t.updateMatrixWorld(),Jr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Jr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Cg extends No{constructor(){super(new jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=As*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Lg extends Do{constructor(e,t,n=0,i=Math.PI/3,s=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(bt.DefaultUp),this.updateMatrix(),this.target=new bt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new Cg}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const yl=new ot,ps=new X,Qr=new X;class Rg extends No{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new et(4,2),this._viewportCount=6,this._viewports=[new gt(2,1,1,1),new gt(0,1,1,1),new gt(3,1,1,1),new gt(1,1,1,1),new gt(3,0,1,1),new gt(1,0,1,1)],this._cubeDirections=[new X(1,0,0),new X(-1,0,0),new X(0,0,1),new X(0,0,-1),new X(0,1,0),new X(0,-1,0)],this._cubeUps=[new X(0,1,0),new X(0,1,0),new X(0,1,0),new X(0,1,0),new X(0,0,1),new X(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ps.setFromMatrixPosition(e.matrixWorld),n.position.copy(ps),Qr.copy(n.position),Qr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Qr),n.updateMatrixWorld(),i.makeTranslation(-ps.x,-ps.y,-ps.z),yl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yl)}}class Pg extends Do{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Rg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ig extends No{constructor(){super(new Eo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Dg extends Do{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DefaultUp),this.updateMatrix(),this.target=new bt,this.shadow=new Ig}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class di{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Ng extends Ns{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=Qi.get(e);if(r!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r;const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,fetch(e,o).then(function(a){return a.blob()}).then(function(a){return createImageBitmap(a,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(a){Qi.add(e,a),t&&t(a),s.manager.itemEnd(e)}).catch(function(a){i&&i(a),s.manager.itemError(e),s.manager.itemEnd(e)}),s.manager.itemStart(e)}}class Bg{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=_l(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=_l();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function _l(){return(typeof performance>"u"?Date:performance).now()}const Bo="\\[\\]\\.:\\/",Fg=new RegExp("["+Bo+"]","g"),Fo="[^"+Bo+"]",zg="[^"+Bo.replace("\\.","")+"]",Og=/((?:WC+[\/:])*)/.source.replace("WC",Fo),Vg=/(WCOD+)?/.source.replace("WCOD",zg),Ug=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fo),kg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fo),Hg=new RegExp("^"+Og+Vg+Ug+kg+"$"),Wg=["material","materials","bones","map"];class Gg{constructor(e,t,n){const i=n||ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ft{constructor(e,t,n){this.path=t,this.parsedPath=n||ft.parseTrackName(t),this.node=ft.findNode(e,this.parsedPath.nodeName)||e,this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ft.Composite(e,t,n):new ft(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Fg,"")}static parseTrackName(e){const t=Hg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Wg.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let r=0;r<s.length;r++){const o=s[r];if(o.name===t||o.uuid===t)return o;const a=n(o.children);if(a)return a}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=ft.findNode(this.rootNode,t.nodeName)||this.rootNode,this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const r=e[i];if(r===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let a=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}a=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(a=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(a=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ft.Composite=Gg;ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ft.prototype.GetterByBindingType=[ft.prototype._getValue_direct,ft.prototype._getValue_array,ft.prototype._getValue_arrayElement,ft.prototype._getValue_toArray];ft.prototype.SetterByBindingTypeAndVersioning=[[ft.prototype._setValue_direct,ft.prototype._setValue_direct_setNeedsUpdate,ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_array,ft.prototype._setValue_array_setNeedsUpdate,ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_arrayElement,ft.prototype._setValue_arrayElement_setNeedsUpdate,ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_fromArray,ft.prototype._setValue_fromArray_setNeedsUpdate,ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class wl{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(kt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class qg extends pc{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Wt;i.setAttribute("position",new Ct(t,3)),i.setAttribute("color",new Ct(n,3));const s=new Lo({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new st,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wo);const bl={type:"change"},eo={type:"start"},Ml={type:"end"};class Xg extends _i{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new X,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:bi.ROTATE,MIDDLE:bi.DOLLY,RIGHT:bi.PAN},this.touches={ONE:Mi.ROTATE,TWO:Mi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(q){q.addEventListener("keydown",$e),this._domElementKeyEvents=q},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(bl),n.update(),s=i.NONE},this.update=function(){const q=new X,ie=new _n().setFromUnitVectors(e.up,new X(0,1,0)),De=ie.clone().invert(),Fe=new X,Le=new _n,Oe=2*Math.PI;return function(){const Qe=n.object.position;q.copy(Qe).sub(n.target),q.applyQuaternion(ie),o.setFromVector3(q),n.autoRotate&&s===i.NONE&&M(k()),n.enableDamping?(o.theta+=a.theta*n.dampingFactor,o.phi+=a.phi*n.dampingFactor):(o.theta+=a.theta,o.phi+=a.phi);let Ze=n.minAzimuthAngle,nt=n.maxAzimuthAngle;return isFinite(Ze)&&isFinite(nt)&&(Ze<-Math.PI?Ze+=Oe:Ze>Math.PI&&(Ze-=Oe),nt<-Math.PI?nt+=Oe:nt>Math.PI&&(nt-=Oe),Ze<=nt?o.theta=Math.max(Ze,Math.min(nt,o.theta)):o.theta=o.theta>(Ze+nt)/2?Math.max(Ze,o.theta):Math.min(nt,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),o.radius*=c,o.radius=Math.max(n.minDistance,Math.min(n.maxDistance,o.radius)),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),q.setFromSpherical(o),q.applyQuaternion(De),Qe.copy(n.target).add(q),n.object.lookAt(n.target),n.enableDamping===!0?(a.theta*=1-n.dampingFactor,a.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(a.set(0,0,0),h.set(0,0,0)),c=1,l||Fe.distanceToSquared(n.object.position)>r||8*(1-Le.dot(n.object.quaternion))>r?(n.dispatchEvent(bl),Fe.copy(n.object.position),Le.copy(n.object.quaternion),l=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",se),n.domElement.removeEventListener("pointerdown",Ee),n.domElement.removeEventListener("pointercancel",Ye),n.domElement.removeEventListener("wheel",Pe),n.domElement.removeEventListener("pointermove",ue),n.domElement.removeEventListener("pointerup",xe),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener("keydown",$e)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=i.NONE;const r=1e-6,o=new wl,a=new wl;let c=1;const h=new X;let l=!1;const u=new et,f=new et,g=new et,m=new et,p=new et,v=new et,x=new et,w=new et,y=new et,b=[],L={};function k(){return 2*Math.PI/60/60*n.autoRotateSpeed}function _(){return Math.pow(.95,n.zoomSpeed)}function M(q){a.theta-=q}function E(q){a.phi-=q}const C=function(){const q=new X;return function(De,Fe){q.setFromMatrixColumn(Fe,0),q.multiplyScalar(-De),h.add(q)}}(),U=function(){const q=new X;return function(De,Fe){n.screenSpacePanning===!0?q.setFromMatrixColumn(Fe,1):(q.setFromMatrixColumn(Fe,0),q.crossVectors(n.object.up,q)),q.multiplyScalar(De),h.add(q)}}(),T=function(){const q=new X;return function(De,Fe){const Le=n.domElement;if(n.object.isPerspectiveCamera){const Oe=n.object.position;q.copy(Oe).sub(n.target);let ke=q.length();ke*=Math.tan(n.object.fov/2*Math.PI/180),C(2*De*ke/Le.clientHeight,n.object.matrix),U(2*Fe*ke/Le.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(C(De*(n.object.right-n.object.left)/n.object.zoom/Le.clientWidth,n.object.matrix),U(Fe*(n.object.top-n.object.bottom)/n.object.zoom/Le.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function N(q){n.object.isPerspectiveCamera?c/=q:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*q)),n.object.updateProjectionMatrix(),l=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Y(q){n.object.isPerspectiveCamera?c*=q:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/q)),n.object.updateProjectionMatrix(),l=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function te(q){u.set(q.clientX,q.clientY)}function W(q){x.set(q.clientX,q.clientY)}function O(q){m.set(q.clientX,q.clientY)}function ee(q){f.set(q.clientX,q.clientY),g.subVectors(f,u).multiplyScalar(n.rotateSpeed);const ie=n.domElement;M(2*Math.PI*g.x/ie.clientHeight),E(2*Math.PI*g.y/ie.clientHeight),u.copy(f),n.update()}function K(q){w.set(q.clientX,q.clientY),y.subVectors(w,x),y.y>0?N(_()):y.y<0&&Y(_()),x.copy(w),n.update()}function P(q){p.set(q.clientX,q.clientY),v.subVectors(p,m).multiplyScalar(n.panSpeed),T(v.x,v.y),m.copy(p),n.update()}function H(q){q.deltaY<0?Y(_()):q.deltaY>0&&N(_()),n.update()}function D(q){let ie=!1;switch(q.code){case n.keys.UP:q.ctrlKey||q.metaKey||q.shiftKey?E(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):T(0,n.keyPanSpeed),ie=!0;break;case n.keys.BOTTOM:q.ctrlKey||q.metaKey||q.shiftKey?E(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):T(0,-n.keyPanSpeed),ie=!0;break;case n.keys.LEFT:q.ctrlKey||q.metaKey||q.shiftKey?M(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):T(n.keyPanSpeed,0),ie=!0;break;case n.keys.RIGHT:q.ctrlKey||q.metaKey||q.shiftKey?M(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):T(-n.keyPanSpeed,0),ie=!0;break}ie&&(q.preventDefault(),n.update())}function I(){if(b.length===1)u.set(b[0].pageX,b[0].pageY);else{const q=.5*(b[0].pageX+b[1].pageX),ie=.5*(b[0].pageY+b[1].pageY);u.set(q,ie)}}function R(){if(b.length===1)m.set(b[0].pageX,b[0].pageY);else{const q=.5*(b[0].pageX+b[1].pageX),ie=.5*(b[0].pageY+b[1].pageY);m.set(q,ie)}}function V(){const q=b[0].pageX-b[1].pageX,ie=b[0].pageY-b[1].pageY,De=Math.sqrt(q*q+ie*ie);x.set(0,De)}function re(){n.enableZoom&&V(),n.enablePan&&R()}function ne(){n.enableZoom&&V(),n.enableRotate&&I()}function $(q){if(b.length==1)f.set(q.pageX,q.pageY);else{const De=Ve(q),Fe=.5*(q.pageX+De.x),Le=.5*(q.pageY+De.y);f.set(Fe,Le)}g.subVectors(f,u).multiplyScalar(n.rotateSpeed);const ie=n.domElement;M(2*Math.PI*g.x/ie.clientHeight),E(2*Math.PI*g.y/ie.clientHeight),u.copy(f)}function Q(q){if(b.length===1)p.set(q.pageX,q.pageY);else{const ie=Ve(q),De=.5*(q.pageX+ie.x),Fe=.5*(q.pageY+ie.y);p.set(De,Fe)}v.subVectors(p,m).multiplyScalar(n.panSpeed),T(v.x,v.y),m.copy(p)}function he(q){const ie=Ve(q),De=q.pageX-ie.x,Fe=q.pageY-ie.y,Le=Math.sqrt(De*De+Fe*Fe);w.set(0,Le),y.set(0,Math.pow(w.y/x.y,n.zoomSpeed)),N(y.y),x.copy(w)}function Se(q){n.enableZoom&&he(q),n.enablePan&&Q(q)}function ge(q){n.enableZoom&&he(q),n.enableRotate&&$(q)}function Ee(q){n.enabled!==!1&&(b.length===0&&(n.domElement.setPointerCapture(q.pointerId),n.domElement.addEventListener("pointermove",ue),n.domElement.addEventListener("pointerup",xe)),pe(q),q.pointerType==="touch"?B(q):ze(q))}function ue(q){n.enabled!==!1&&(q.pointerType==="touch"?A(q):Ge(q))}function xe(q){ye(q),b.length===0&&(n.domElement.releasePointerCapture(q.pointerId),n.domElement.removeEventListener("pointermove",ue),n.domElement.removeEventListener("pointerup",xe)),n.dispatchEvent(Ml),s=i.NONE}function Ye(q){ye(q)}function ze(q){let ie;switch(q.button){case 0:ie=n.mouseButtons.LEFT;break;case 1:ie=n.mouseButtons.MIDDLE;break;case 2:ie=n.mouseButtons.RIGHT;break;default:ie=-1}switch(ie){case bi.DOLLY:if(n.enableZoom===!1)return;W(q),s=i.DOLLY;break;case bi.ROTATE:if(q.ctrlKey||q.metaKey||q.shiftKey){if(n.enablePan===!1)return;O(q),s=i.PAN}else{if(n.enableRotate===!1)return;te(q),s=i.ROTATE}break;case bi.PAN:if(q.ctrlKey||q.metaKey||q.shiftKey){if(n.enableRotate===!1)return;te(q),s=i.ROTATE}else{if(n.enablePan===!1)return;O(q),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(eo)}function Ge(q){switch(s){case i.ROTATE:if(n.enableRotate===!1)return;ee(q);break;case i.DOLLY:if(n.enableZoom===!1)return;K(q);break;case i.PAN:if(n.enablePan===!1)return;P(q);break}}function Pe(q){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(q.preventDefault(),n.dispatchEvent(eo),H(q),n.dispatchEvent(Ml))}function $e(q){n.enabled===!1||n.enablePan===!1||D(q)}function B(q){switch(_e(q),b.length){case 1:switch(n.touches.ONE){case Mi.ROTATE:if(n.enableRotate===!1)return;I(),s=i.TOUCH_ROTATE;break;case Mi.PAN:if(n.enablePan===!1)return;R(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case Mi.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;re(),s=i.TOUCH_DOLLY_PAN;break;case Mi.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ne(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(eo)}function A(q){switch(_e(q),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;$(q),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;Q(q),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Se(q),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ge(q),n.update();break;default:s=i.NONE}}function se(q){n.enabled!==!1&&q.preventDefault()}function pe(q){b.push(q)}function ye(q){delete L[q.pointerId];for(let ie=0;ie<b.length;ie++)if(b[ie].pointerId==q.pointerId){b.splice(ie,1);return}}function _e(q){let ie=L[q.pointerId];ie===void 0&&(ie=new et,L[q.pointerId]=ie),ie.set(q.pageX,q.pageY)}function Ve(q){const ie=q.pointerId===b[0].pointerId?b[1]:b[0];return L[ie.pointerId]}n.domElement.addEventListener("contextmenu",se),n.domElement.addEventListener("pointerdown",Ee),n.domElement.addEventListener("pointercancel",Ye),n.domElement.addEventListener("wheel",Pe,{passive:!1}),this.update()}}class Yg extends Ns{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Jg(t)}),this.register(function(t){return new rv(t)}),this.register(function(t){return new ov(t)}),this.register(function(t){return new ev(t)}),this.register(function(t){return new tv(t)}),this.register(function(t){return new nv(t)}),this.register(function(t){return new iv(t)}),this.register(function(t){return new Zg(t)}),this.register(function(t){return new sv(t)}),this.register(function(t){return new Qg(t)}),this.register(function(t){return new $g(t)}),this.register(function(t){return new av(t)}),this.register(function(t){return new lv(t)})}load(e,t,n,i){const s=this;let r;this.resourcePath!==""?r=this.resourcePath:this.path!==""?r=this.path:r=di.extractUrlBase(e),this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},a=new yc(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(c){try{s.parse(c,r,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const r={},o={};if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(di.decodeText(new Uint8Array(e,0,4))===wc){try{r[lt.KHR_BINARY_GLTF]=new cv(e)}catch(h){i&&i(h);return}s=JSON.parse(r[lt.KHR_BINARY_GLTF].content)}else s=JSON.parse(di.decodeText(new Uint8Array(e)));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const a=new bv(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});a.fileLoader.setRequestHeader(this.requestHeader);for(let c=0;c<this.pluginCallbacks.length;c++){const h=this.pluginCallbacks[c](a);o[h.name]=h,r[h.name]=!0}if(s.extensionsUsed)for(let c=0;c<s.extensionsUsed.length;++c){const h=s.extensionsUsed[c],l=s.extensionsRequired||[];switch(h){case lt.KHR_MATERIALS_UNLIT:r[h]=new Kg;break;case lt.KHR_DRACO_MESH_COMPRESSION:r[h]=new hv(s,this.dracoLoader);break;case lt.KHR_TEXTURE_TRANSFORM:r[h]=new uv;break;case lt.KHR_MESH_QUANTIZATION:r[h]=new dv;break;default:l.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}a.setExtensions(r),a.setPlugins(o),a.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function jg(){let d={};return{get:function(e){return d[e]},add:function(e,t){d[e]=t},remove:function(e){delete d[e]},removeAll:function(){d={}}}}const lt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class $g{constructor(e){this.parser=e,this.name=lt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,a=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new st(16777215);a.color!==void 0&&h.fromArray(a.color);const l=a.range!==void 0?a.range:0;switch(a.type){case"directional":c=new Dg(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Pg(h),c.distance=l;break;case"spot":c=new Lg(h),c.distance=l,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle!==void 0?a.spot.innerConeAngle:0,a.spot.outerConeAngle=a.spot.outerConeAngle!==void 0?a.spot.outerConeAngle:Math.PI/4,c.angle=a.spot.outerConeAngle,c.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+a.type)}return c.position.set(0,0,0),c.decay=2,qn(c,a),a.intensity!==void 0&&(c.intensity=a.intensity),c.name=t.createUniqueName(a.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(a){return n._getNodeRef(t.cache,o,a)})}}class Kg{constructor(){this.name=lt.KHR_MATERIALS_UNLIT}getMaterialType(){return $t}extendParams(e,t,n){const i=[];e.color=new st(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const r=s.baseColorFactor;e.color.fromArray(r),e.opacity=r[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,at))}return Promise.all(i)}}class Zg{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class Jg{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];if(r.clearcoatFactor!==void 0&&(t.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){const o=r.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new et(o,o)}return Promise.all(s)}}class Qg{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.iridescenceFactor!==void 0&&(t.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(t.iridescenceIOR=r.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(s)}}class ev{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new st(0,0,0),t.sheenRoughness=0,t.sheen=1;const r=i.extensions[this.name];return r.sheenColorFactor!==void 0&&t.sheenColor.fromArray(r.sheenColorFactor),r.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",r.sheenColorTexture,at)),r.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(s)}}class tv{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.transmissionFactor!==void 0&&(t.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",r.transmissionTexture)),Promise.all(s)}}class nv{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];t.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",r.thicknessTexture)),t.attenuationDistance=r.attenuationDistance||1/0;const o=r.attenuationColor||[1,1,1];return t.attenuationColor=new st(o[0],o[1],o[2]),Promise.all(s)}}class iv{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class sv{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];t.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",r.specularTexture));const o=r.specularColorFactor||[1,1,1];return t.specularColor=new st(o[0],o[1],o[2]),r.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",r.specularColorTexture,at)),Promise.all(s)}}class rv{constructor(e){this.parser=e,this.name=lt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,r)}}class ov{constructor(e){this.parser=e,this.name=lt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const r=s.extensions[t],o=i.images[r.source];let a=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(a=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,r.source,a);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class av{constructor(e){this.name=lt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const a=i.byteOffset||0,c=i.byteLength||0,h=i.count,l=i.byteStride,u=new Uint8Array(o,a,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(h,l,u,i.mode,i.filter).then(function(f){return f.buffer}):r.ready.then(function(){const f=new ArrayBuffer(h*l);return r.decodeGltfBuffer(new Uint8Array(f),h,l,u,i.mode,i.filter),f})})}else return null}}class lv{constructor(e){this.name=lt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==cn.TRIANGLES&&c.mode!==cn.TRIANGLE_STRIP&&c.mode!==cn.TRIANGLE_FAN&&c.mode!==void 0)return null;const r=n.extensions[this.name].attributes,o=[],a={};for(const c in r)o.push(this.parser.getDependency("accessor",r[c]).then(h=>(a[c]=h,a[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),l=h.isGroup?h.children:[h],u=c[0].count,f=[];for(const g of l){const m=new ot,p=new X,v=new _n,x=new X(1,1,1),w=new fg(g.geometry,g.material,u);for(let y=0;y<u;y++)a.TRANSLATION&&p.fromBufferAttribute(a.TRANSLATION,y),a.ROTATION&&v.fromBufferAttribute(a.ROTATION,y),a.SCALE&&x.fromBufferAttribute(a.SCALE,y),w.setMatrixAt(y,m.compose(p,v,x));for(const y in a)y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,a[y]);bt.prototype.copy.call(w,g),w.frustumCulled=!1,this.parser.assignFinalMaterial(w),f.push(w)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const wc="glTF",ms=12,Sl={JSON:1313821514,BIN:5130562};class cv{constructor(e){this.name=lt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ms);if(this.header={magic:di.decodeText(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==wc)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const n=this.header.length-ms,i=new DataView(e,ms);let s=0;for(;s<n;){const r=i.getUint32(s,!0);s+=4;const o=i.getUint32(s,!0);if(s+=4,o===Sl.JSON){const a=new Uint8Array(e,ms+s,r);this.content=di.decodeText(a)}else if(o===Sl.BIN){const a=ms+s;this.body=e.slice(a,a+r)}s+=r}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class hv{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=lt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,o={},a={},c={};for(const h in r){const l=go[h]||h.toLowerCase();o[l]=r[h]}for(const h in e.attributes){const l=go[h]||h.toLowerCase();if(r[h]!==void 0){const u=n.accessors[e.attributes[h]],f=Hi[u.componentType];c[l]=f.name,a[l]=u.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(l){i.decodeDracoFile(h,function(u){for(const f in u.attributes){const g=u.attributes[f],m=a[f];m!==void 0&&(g.normalized=m)}l(u)},o,c)})})}}class uv{constructor(){this.name=lt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return t.texCoord!==void 0&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class dv{constructor(){this.name=lt.KHR_MESH_QUANTIZATION}}class bc extends Ds{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let r=0;r!==i;r++)t[r]=n[s+r];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=o*2,c=o*3,h=i-t,l=(n-t)/h,u=l*l,f=u*l,g=e*c,m=g-c,p=-2*f+3*u,v=f-u,x=1-p,w=v-u+l;for(let y=0;y!==o;y++){const b=r[m+y+o],L=r[m+y+a]*h,k=r[g+y+o],_=r[g+y]*h;s[y]=x*b+w*L+p*k+v*_}return s}}const fv=new _n;class pv extends bc{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return fv.fromArray(s).normalize().toArray(s),s}}const cn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Hi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},El={9728:Ft,9729:en,9984:co,9985:ql,9986:cr,9987:fi},Tl={33071:un,33648:dr,10497:ji},to={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},go={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Gn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},mv={CUBICSPLINE:void 0,LINEAR:Ki,STEP:Es},no={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function gv(d){return d.DefaultMaterial===void 0&&(d.DefaultMaterial=new Io({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Kn})),d.DefaultMaterial}function gs(d,e,t){for(const n in t.extensions)d[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function qn(d,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(d.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function vv(d,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const l=e[c];if(l.POSITION!==void 0&&(n=!0),l.NORMAL!==void 0&&(i=!0),l.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(d);const r=[],o=[],a=[];for(let c=0,h=e.length;c<h;c++){const l=e[c];if(n){const u=l.POSITION!==void 0?t.getDependency("accessor",l.POSITION):d.attributes.position;r.push(u)}if(i){const u=l.NORMAL!==void 0?t.getDependency("accessor",l.NORMAL):d.attributes.normal;o.push(u)}if(s){const u=l.COLOR_0!==void 0?t.getDependency("accessor",l.COLOR_0):d.attributes.color;a.push(u)}}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(a)]).then(function(c){const h=c[0],l=c[1],u=c[2];return n&&(d.morphAttributes.position=h),i&&(d.morphAttributes.normal=l),s&&(d.morphAttributes.color=u),d.morphTargetsRelative=!0,d})}function xv(d,e){if(d.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)d.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(d.morphTargetInfluences.length===t.length){d.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)d.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function yv(d){const e=d.extensions&&d.extensions[lt.KHR_DRACO_MESH_COMPRESSION];let t;return e?t="draco:"+e.bufferView+":"+e.indices+":"+Al(e.attributes):t=d.indices+":"+Al(d.attributes)+":"+d.mode,t}function Al(d){let e="";const t=Object.keys(d).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+d[t[n]]+";";return e}function vo(d){switch(d){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function _v(d){return d.search(/\.jpe?g($|\?)/i)>0||d.search(/^data\:image\/jpeg/)===0?"image/jpeg":d.search(/\.webp($|\?)/i)>0||d.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const wv=new ot;class bv{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new jg,this.associations=new Map,this.primitiveCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new _c(this.options.manager):this.textureLoader=new Ng(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new yc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){const o={scene:r[0][i.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:i.asset,parser:n,userData:{}};gs(s,o,i),qn(o,i),Promise.all(n._invokeAll(function(a){return a.afterRoot&&a.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const r=t[i].joints;for(let o=0,a=r.length;o<a;o++)e[r[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const r=e[i];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(r,o)=>{const a=this.associations.get(r);a!=null&&this.associations.set(o,a);for(const[c,h]of r.children.entries())s(h,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[lt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,r){n.load(di.resolveURL(t.uri,i.path),s,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const r=to[i.type],o=Hi[i.componentType],a=i.normalized===!0,c=new o(i.count*r);return Promise.resolve(new Kt(c,r,a))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(r){const o=r[0],a=to[i.type],c=Hi[i.componentType],h=c.BYTES_PER_ELEMENT,l=h*a,u=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let m,p;if(f&&f!==l){const v=Math.floor(u/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+v+":"+i.count;let w=t.cache.get(x);w||(m=new c(o,v*f,i.count*f/h),w=new ag(m,f/h),t.cache.add(x,w)),p=new Ao(w,a,u%f/h,g)}else o===null?m=new c(i.count*a):m=new c(o,u,i.count*a),p=new Kt(m,a,g);if(i.sparse!==void 0){const v=to.SCALAR,x=Hi[i.sparse.indices.componentType],w=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,b=new x(r[1],w,i.sparse.count*v),L=new c(r[2],y,i.sparse.count*a);o!==null&&(p=new Kt(p.array.slice(),p.itemSize,p.normalized));for(let k=0,_=b.length;k<_;k++){const M=b[k];if(p.setX(M,L[k*a]),a>=2&&p.setY(M,L[k*a+1]),a>=3&&p.setZ(M,L[k*a+2]),a>=4&&p.setW(M,L[k*a+3]),a>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,r=t.images[s];let o=this.textureLoader;if(r.uri){const a=n.manager.getHandler(r.uri);a!==null&&(o=a)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const i=this,s=this.json,r=s.textures[e],o=s.images[t],a=(o.uri||o.bufferView)+":"+r.sampler;if(this.textureCache[a])return this.textureCache[a];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=r.name||o.name||"";const u=(s.samplers||{})[r.sampler]||{};return h.magFilter=El[u.magFilter]||en,h.minFilter=El[u.minFilter]||fi,h.wrapS=Tl[u.wrapS]||ji,h.wrapT=Tl[u.wrapT]||ji,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[a]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(l=>l.clone());const r=i.images[e],o=self.URL||self.webkitURL;let a=r.uri||"",c=!1;if(r.bufferView!==void 0)a=n.getDependency("bufferView",r.bufferView).then(function(l){c=!0;const u=new Blob([l],{type:r.mimeType});return a=o.createObjectURL(u),a});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(a).then(function(l){return new Promise(function(u,f){let g=u;t.isImageBitmapLoader===!0&&(g=function(m){const p=new zt(m);p.needsUpdate=!0,u(p)}),t.load(di.resolveURL(l,s.path),g,void 0,f)})}).then(function(l){return c===!0&&o.revokeObjectURL(a),l.userData.mimeType=r.mimeType||_v(r.uri),l}).catch(function(l){throw console.error("THREE.GLTFLoader: Couldn't load texture",a),l});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord!=0&&!(t==="aoMap"&&n.texCoord==1)&&console.warn("THREE.GLTFLoader: Custom UV set "+n.texCoord+" for texture "+t+" not yet supported."),s.extensions[lt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[lt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const a=s.associations.get(r);r=s.extensions[lt.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),s.associations.set(r,a)}}return i!==void 0&&(r.encoding=i),e[t]=r,r})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let a=this.cache.get(o);a||(a=new mc,Tn.prototype.copy.call(a,n),a.color.copy(n.color),a.map=n.map,a.sizeAttenuation=!1,this.cache.add(o,a)),n=a}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let a=this.cache.get(o);a||(a=new Lo,Tn.prototype.copy.call(a,n),a.color.copy(n.color),this.cache.add(o,a)),n=a}if(i||s||r){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),r&&(o+="flat-shading:");let a=this.cache.get(o);a||(a=n.clone(),s&&(a.vertexColors=!0),r&&(a.flatShading=!0),i&&(a.normalScale&&(a.normalScale.y*=-1),a.clearcoatNormalScale&&(a.clearcoatNormalScale.y*=-1)),this.cache.add(o,a),this.associations.set(a,this.associations.get(n))),n=a}n.aoMap&&t.attributes.uv2===void 0&&t.attributes.uv!==void 0&&t.setAttribute("uv2",t.attributes.uv),e.material=n}getMaterialType(){return Io}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let r;const o={},a=s.extensions||{},c=[];if(a[lt.KHR_MATERIALS_UNLIT]){const l=i[lt.KHR_MATERIALS_UNLIT];r=l.getMaterialType(),c.push(l.extendParams(o,s,t))}else{const l=s.pbrMetallicRoughness||{};if(o.color=new st(1,1,1),o.opacity=1,Array.isArray(l.baseColorFactor)){const u=l.baseColorFactor;o.color.fromArray(u),o.opacity=u[3]}l.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",l.baseColorTexture,at)),o.metalness=l.metallicFactor!==void 0?l.metallicFactor:1,o.roughness=l.roughnessFactor!==void 0?l.roughnessFactor:1,l.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",l.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",l.metallicRoughnessTexture))),r=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=pr);const h=s.alphaMode||no.OPAQUE;if(h===no.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===no.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&r!==$t&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new et(1,1),s.normalTexture.scale!==void 0)){const l=s.normalTexture.scale;o.normalScale.set(l,l)}return s.occlusionTexture!==void 0&&r!==$t&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&r!==$t&&(o.emissive=new st().fromArray(s.emissiveFactor)),s.emissiveTexture!==void 0&&r!==$t&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,at)),Promise.all(c).then(function(){const l=new r(o);return s.name&&(l.name=s.name),qn(l,s),t.associations.set(l,{materials:e}),s.extensions&&gs(i,l,s),l})}createUniqueName(e){const t=ft.sanitizeNodeName(e||"");let n=t;for(let i=1;this.nodeNamesUsed[n];++i)n=t+"_"+i;return this.nodeNamesUsed[n]=!0,n}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[lt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(a){return Cl(a,o,t)})}const r=[];for(let o=0,a=e.length;o<a;o++){const c=e[o],h=yv(c),l=i[h];if(l)r.push(l.promise);else{let u;c.extensions&&c.extensions[lt.KHR_DRACO_MESH_COMPRESSION]?u=s(c):u=Cl(new Wt,c,t),i[h]={primitive:c,promise:u},r.push(u)}}return Promise.all(r)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],r=s.primitives,o=[];for(let a=0,c=r.length;a<c;a++){const h=r[a].material===void 0?gv(this.cache):this.getDependency("material",r[a].material);o.push(h)}return o.push(t.loadGeometries(r)),Promise.all(o).then(function(a){const c=a.slice(0,a.length-1),h=a[a.length-1],l=[];for(let f=0,g=h.length;f<g;f++){const m=h[f],p=r[f];let v;const x=c[f];if(p.mode===cn.TRIANGLES||p.mode===cn.TRIANGLE_STRIP||p.mode===cn.TRIANGLE_FAN||p.mode===void 0)v=s.isSkinnedMesh===!0?new cg(m,x):new St(m,x),v.isSkinnedMesh===!0&&!v.geometry.attributes.skinWeight.normalized&&v.normalizeSkinWeights(),p.mode===cn.TRIANGLE_STRIP?v.geometry=Ll(v.geometry,kh):p.mode===cn.TRIANGLE_FAN&&(v.geometry=Ll(v.geometry,Yl));else if(p.mode===cn.LINES)v=new pc(m,x);else if(p.mode===cn.LINE_STRIP)v=new Ro(m,x);else if(p.mode===cn.LINE_LOOP)v=new pg(m,x);else if(p.mode===cn.POINTS)v=new mg(m,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(v.geometry.morphAttributes).length>0&&xv(v,s),v.name=t.createUniqueName(s.name||"mesh_"+e),qn(v,s),p.extensions&&gs(i,v,p),t.assignFinalMaterial(v),l.push(v)}for(let f=0,g=l.length;f<g;f++)t.associations.set(l[f],{meshes:e,primitives:f});if(l.length===1)return l[0];const u=new Yn;t.associations.set(u,{meshes:e});for(let f=0,g=l.length;f<g;f++)u.add(l[f]);return u})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new jt(ru.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Eo(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),qn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this.getDependency("node",t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),r=i,o=[],a=[];for(let c=0,h=r.length;c<h;c++){const l=r[c];if(l){o.push(l);const u=new ot;s!==null&&u.fromArray(s.array,c*16),a.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Co(o,a)})}loadAnimation(e){const n=this.json.animations[e],i=[],s=[],r=[],o=[],a=[];for(let c=0,h=n.channels.length;c<h;c++){const l=n.channels[c],u=n.samplers[l.sampler],f=l.target,g=f.node,m=n.parameters!==void 0?n.parameters[u.input]:u.input,p=n.parameters!==void 0?n.parameters[u.output]:u.output;i.push(this.getDependency("node",g)),s.push(this.getDependency("accessor",m)),r.push(this.getDependency("accessor",p)),o.push(u),a.push(f)}return Promise.all([Promise.all(i),Promise.all(s),Promise.all(r),Promise.all(o),Promise.all(a)]).then(function(c){const h=c[0],l=c[1],u=c[2],f=c[3],g=c[4],m=[];for(let v=0,x=h.length;v<x;v++){const w=h[v],y=l[v],b=u[v],L=f[v],k=g[v];if(w===void 0)continue;w.updateMatrix();let _;switch(Gn[k.path]){case Gn.weights:_=Rs;break;case Gn.rotation:_=yi;break;case Gn.position:case Gn.scale:default:_=Ps;break}const M=w.name?w.name:w.uuid,E=L.interpolation!==void 0?mv[L.interpolation]:Ki,C=[];Gn[k.path]===Gn.weights?w.traverse(function(T){T.morphTargetInfluences&&C.push(T.name?T.name:T.uuid)}):C.push(M);let U=b.array;if(b.normalized){const T=vo(U.constructor),N=new Float32Array(U.length);for(let Y=0,te=U.length;Y<te;Y++)N[Y]=U[Y]*T;U=N}for(let T=0,N=C.length;T<N;T++){const Y=new _(C[T]+"."+Gn[k.path],y.array,U,E);L.interpolation==="CUBICSPLINE"&&(Y.createInterpolant=function(W){const O=this instanceof yi?pv:bc;return new O(this.times,this.values,this.getValueSize()/3,W)},Y.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),m.push(Y)}}const p=n.name?n.name:"animation_"+e;return new wg(p,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const r=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&r.traverse(function(o){if(o.isMesh)for(let a=0,c=i.weights.length;a<c;a++)o.morphTargetInfluences[a]=i.weights[a]}),r})}loadNode(e){const t=this.json,n=this.extensions,i=this,s=t.nodes[e],r=s.name?i.createUniqueName(s.name):"";return function(){const o=[],a=i._invokeOne(function(u){return u.createNodeMesh&&u.createNodeMesh(e)});a&&o.push(a),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(u){return i._getNodeRef(i.cameraCache,s.camera,u)})),i._invokeAll(function(u){return u.createNodeAttachment&&u.createNodeAttachment(e)}).forEach(function(u){o.push(u)});const c=[],h=s.children||[];for(let u=0,f=h.length;u<f;u++)c.push(i.getDependency("node",h[u]));const l=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([Promise.all(o),Promise.all(c),l])}().then(function(o){const a=o[0],c=o[1],h=o[2];let l;if(s.isBone===!0?l=new fc:a.length>1?l=new Yn:a.length===1?l=a[0]:l=new bt,l!==a[0])for(let u=0,f=a.length;u<f;u++)l.add(a[u]);if(s.name&&(l.userData.name=s.name,l.name=r),qn(l,s),s.extensions&&gs(n,l,s),s.matrix!==void 0){const u=new ot;u.fromArray(s.matrix),l.applyMatrix4(u)}else s.translation!==void 0&&l.position.fromArray(s.translation),s.rotation!==void 0&&l.quaternion.fromArray(s.rotation),s.scale!==void 0&&l.scale.fromArray(s.scale);i.associations.has(l)||i.associations.set(l,{}),i.associations.get(l).nodes=e,h!==null&&l.traverse(function(u){u.isSkinnedMesh&&u.bind(h,wv)});for(let u=0,f=c.length;u<f;u++)l.add(c[u]);return l})}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Yn;n.name&&(s.name=i.createUniqueName(n.name)),qn(s,n),n.extensions&&gs(t,s,n);const r=n.nodes||[],o=[];for(let a=0,c=r.length;a<c;a++)o.push(i.getDependency("node",r[a]));return Promise.all(o).then(function(a){for(let h=0,l=a.length;h<l;h++)s.add(a[h]);const c=h=>{const l=new Map;for(const[u,f]of i.associations)(u instanceof Tn||u instanceof zt)&&l.set(u,f);return h.traverse(u=>{const f=i.associations.get(u);f!=null&&l.set(u,f)}),l};return i.associations=c(s),s})}}function Mv(d,e,t){const n=e.attributes,i=new ts;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],a=o.min,c=o.max;if(a!==void 0&&c!==void 0){if(i.set(new X(a[0],a[1],a[2]),new X(c[0],c[1],c[2])),o.normalized){const h=vo(Hi[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new X,a=new X;for(let c=0,h=s.length;c<h;c++){const l=s[c];if(l.POSITION!==void 0){const u=t.json.accessors[l.POSITION],f=u.min,g=u.max;if(f!==void 0&&g!==void 0){if(a.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),a.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),a.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),u.normalized){const m=vo(Hi[u.componentType]);a.multiplyScalar(m)}o.max(a)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}d.boundingBox=i;const r=new ns;i.getCenter(r.center),r.radius=i.min.distanceTo(i.max)/2,d.boundingSphere=r}function Cl(d,e,t){const n=e.attributes,i=[];function s(r,o){return t.getDependency("accessor",r).then(function(a){d.setAttribute(o,a)})}for(const r in n){const o=go[r]||r.toLowerCase();o in d.attributes||i.push(s(n[r],o))}if(e.indices!==void 0&&!d.index){const r=t.getDependency("accessor",e.indices).then(function(o){d.setIndex(o)});i.push(r)}return qn(d,e),Mv(d,e,t),Promise.all(i).then(function(){return e.targets!==void 0?vv(d,e.targets,t):d})}function Ll(d,e){let t=d.getIndex();if(t===null){const r=[],o=d.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);d.setIndex(r),t=d.getIndex()}else return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),d}const n=t.count-2,i=[];if(e===Yl)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));i.length/3!==n&&console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=d.clone();return s.setIndex(i),s}function or(d){throw new Error('Could not dynamically require "'+d+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var xo={},Sv={get exports(){return xo},set exports(d){xo=d}};(function(d,e){(function(t){d.exports=t()})(function(){return function t(n,i,s){function r(c,h){if(!i[c]){if(!n[c]){var l=typeof or=="function"&&or;if(!h&&l)return l(c,!0);if(o)return o(c,!0);throw new Error("Cannot find module '"+c+"'")}var u=i[c]={exports:{}};n[c][0].call(u.exports,function(f){var g=n[c][1][f];return r(g||f)},u,u.exports,t,n,i,s)}return i[c].exports}for(var o=typeof or=="function"&&or,a=0;a<s.length;a++)r(s[a]);return r}({1:[function(t,n,i){n.exports={name:"cannon",version:"0.6.2",description:"A lightweight 3D physics engine written in JavaScript.",homepage:"https://github.com/schteppe/cannon.js",author:"Stefan Hedman <schteppe@gmail.com> (http://steffe.se)",keywords:["cannon.js","cannon","physics","engine","3d"],main:"./build/cannon.js",engines:{node:"*"},repository:{type:"git",url:"https://github.com/schteppe/cannon.js.git"},bugs:{url:"https://github.com/schteppe/cannon.js/issues"},licenses:[{type:"MIT"}],devDependencies:{jshint:"latest","uglify-js":"latest",nodeunit:"^0.9.0",grunt:"~0.4.0","grunt-contrib-jshint":"~0.1.1","grunt-contrib-nodeunit":"^0.4.1","grunt-contrib-concat":"~0.1.3","grunt-contrib-uglify":"^0.5.1","grunt-browserify":"^2.1.4","grunt-contrib-yuidoc":"^0.5.2",browserify:"*"},dependencies:{}}},{}],2:[function(t,n,i){n.exports={version:t("../package.json").version,AABB:t("./collision/AABB"),ArrayCollisionMatrix:t("./collision/ArrayCollisionMatrix"),Body:t("./objects/Body"),Box:t("./shapes/Box"),Broadphase:t("./collision/Broadphase"),Constraint:t("./constraints/Constraint"),ContactEquation:t("./equations/ContactEquation"),Narrowphase:t("./world/Narrowphase"),ConeTwistConstraint:t("./constraints/ConeTwistConstraint"),ContactMaterial:t("./material/ContactMaterial"),ConvexPolyhedron:t("./shapes/ConvexPolyhedron"),Cylinder:t("./shapes/Cylinder"),DistanceConstraint:t("./constraints/DistanceConstraint"),Equation:t("./equations/Equation"),EventTarget:t("./utils/EventTarget"),FrictionEquation:t("./equations/FrictionEquation"),GSSolver:t("./solver/GSSolver"),GridBroadphase:t("./collision/GridBroadphase"),Heightfield:t("./shapes/Heightfield"),HingeConstraint:t("./constraints/HingeConstraint"),LockConstraint:t("./constraints/LockConstraint"),Mat3:t("./math/Mat3"),Material:t("./material/Material"),NaiveBroadphase:t("./collision/NaiveBroadphase"),ObjectCollisionMatrix:t("./collision/ObjectCollisionMatrix"),Pool:t("./utils/Pool"),Particle:t("./shapes/Particle"),Plane:t("./shapes/Plane"),PointToPointConstraint:t("./constraints/PointToPointConstraint"),Quaternion:t("./math/Quaternion"),Ray:t("./collision/Ray"),RaycastVehicle:t("./objects/RaycastVehicle"),RaycastResult:t("./collision/RaycastResult"),RigidVehicle:t("./objects/RigidVehicle"),RotationalEquation:t("./equations/RotationalEquation"),RotationalMotorEquation:t("./equations/RotationalMotorEquation"),SAPBroadphase:t("./collision/SAPBroadphase"),SPHSystem:t("./objects/SPHSystem"),Shape:t("./shapes/Shape"),Solver:t("./solver/Solver"),Sphere:t("./shapes/Sphere"),SplitSolver:t("./solver/SplitSolver"),Spring:t("./objects/Spring"),Trimesh:t("./shapes/Trimesh"),Vec3:t("./math/Vec3"),Vec3Pool:t("./utils/Vec3Pool"),World:t("./world/World")}},{"../package.json":1,"./collision/AABB":3,"./collision/ArrayCollisionMatrix":4,"./collision/Broadphase":5,"./collision/GridBroadphase":6,"./collision/NaiveBroadphase":7,"./collision/ObjectCollisionMatrix":8,"./collision/Ray":9,"./collision/RaycastResult":10,"./collision/SAPBroadphase":11,"./constraints/ConeTwistConstraint":12,"./constraints/Constraint":13,"./constraints/DistanceConstraint":14,"./constraints/HingeConstraint":15,"./constraints/LockConstraint":16,"./constraints/PointToPointConstraint":17,"./equations/ContactEquation":19,"./equations/Equation":20,"./equations/FrictionEquation":21,"./equations/RotationalEquation":22,"./equations/RotationalMotorEquation":23,"./material/ContactMaterial":24,"./material/Material":25,"./math/Mat3":27,"./math/Quaternion":28,"./math/Vec3":30,"./objects/Body":31,"./objects/RaycastVehicle":32,"./objects/RigidVehicle":33,"./objects/SPHSystem":34,"./objects/Spring":35,"./shapes/Box":37,"./shapes/ConvexPolyhedron":38,"./shapes/Cylinder":39,"./shapes/Heightfield":40,"./shapes/Particle":41,"./shapes/Plane":42,"./shapes/Shape":43,"./shapes/Sphere":44,"./shapes/Trimesh":45,"./solver/GSSolver":46,"./solver/Solver":47,"./solver/SplitSolver":48,"./utils/EventTarget":49,"./utils/Pool":51,"./utils/Vec3Pool":54,"./world/Narrowphase":55,"./world/World":56}],3:[function(t,n,i){var s=t("../math/Vec3");t("../utils/Utils"),n.exports=r;function r(c){c=c||{},this.lowerBound=new s,c.lowerBound&&this.lowerBound.copy(c.lowerBound),this.upperBound=new s,c.upperBound&&this.upperBound.copy(c.upperBound)}var o=new s;r.prototype.setFromPoints=function(c,h,l,u){var f=this.lowerBound,g=this.upperBound,m=l;f.copy(c[0]),m&&m.vmult(f,f),g.copy(f);for(var p=1;p<c.length;p++){var v=c[p];m&&(m.vmult(v,o),v=o),v.x>g.x&&(g.x=v.x),v.x<f.x&&(f.x=v.x),v.y>g.y&&(g.y=v.y),v.y<f.y&&(f.y=v.y),v.z>g.z&&(g.z=v.z),v.z<f.z&&(f.z=v.z)}return h&&(h.vadd(f,f),h.vadd(g,g)),u&&(f.x-=u,f.y-=u,f.z-=u,g.x+=u,g.y+=u,g.z+=u),this},r.prototype.copy=function(c){return this.lowerBound.copy(c.lowerBound),this.upperBound.copy(c.upperBound),this},r.prototype.clone=function(){return new r().copy(this)},r.prototype.extend=function(c){var h=c.lowerBound.x;this.lowerBound.x>h&&(this.lowerBound.x=h);var l=c.upperBound.x;this.upperBound.x<l&&(this.upperBound.x=l);var h=c.lowerBound.y;this.lowerBound.y>h&&(this.lowerBound.y=h);var l=c.upperBound.y;this.upperBound.y<l&&(this.upperBound.y=l);var h=c.lowerBound.z;this.lowerBound.z>h&&(this.lowerBound.z=h);var l=c.upperBound.z;this.upperBound.z<l&&(this.upperBound.z=l)},r.prototype.overlaps=function(c){var h=this.lowerBound,l=this.upperBound,u=c.lowerBound,f=c.upperBound;return(u.x<=l.x&&l.x<=f.x||h.x<=f.x&&f.x<=l.x)&&(u.y<=l.y&&l.y<=f.y||h.y<=f.y&&f.y<=l.y)&&(u.z<=l.z&&l.z<=f.z||h.z<=f.z&&f.z<=l.z)},r.prototype.contains=function(c){var h=this.lowerBound,l=this.upperBound,u=c.lowerBound,f=c.upperBound;return h.x<=u.x&&l.x>=f.x&&h.y<=u.y&&l.y>=f.y&&h.z<=u.z&&l.z>=f.z},r.prototype.getCorners=function(c,h,l,u,f,g,m,p){var v=this.lowerBound,x=this.upperBound;c.copy(v),h.set(x.x,v.y,v.z),l.set(x.x,x.y,v.z),u.set(v.x,x.y,x.z),f.set(x.x,v.y,v.z),g.set(v.x,x.y,v.z),m.set(v.x,v.y,x.z),p.copy(x)};var a=[new s,new s,new s,new s,new s,new s,new s,new s];r.prototype.toLocalFrame=function(c,h){var l=a,u=l[0],f=l[1],g=l[2],m=l[3],p=l[4],v=l[5],x=l[6],w=l[7];this.getCorners(u,f,g,m,p,v,x,w);for(var y=0;y!==8;y++){var b=l[y];c.pointToLocal(b,b)}return h.setFromPoints(l)},r.prototype.toWorldFrame=function(c,h){var l=a,u=l[0],f=l[1],g=l[2],m=l[3],p=l[4],v=l[5],x=l[6],w=l[7];this.getCorners(u,f,g,m,p,v,x,w);for(var y=0;y!==8;y++){var b=l[y];c.pointToWorld(b,b)}return h.setFromPoints(l)}},{"../math/Vec3":30,"../utils/Utils":53}],4:[function(t,n,i){n.exports=s;function s(){this.matrix=[]}s.prototype.get=function(r,o){if(r=r.index,o=o.index,o>r){var a=o;o=r,r=a}return this.matrix[(r*(r+1)>>1)+o-1]},s.prototype.set=function(r,o,a){if(r=r.index,o=o.index,o>r){var c=o;o=r,r=c}this.matrix[(r*(r+1)>>1)+o-1]=a?1:0},s.prototype.reset=function(){for(var r=0,o=this.matrix.length;r!==o;r++)this.matrix[r]=0},s.prototype.setNumObjects=function(r){this.matrix.length=r*(r-1)>>1}},{}],5:[function(t,n,i){var s=t("../objects/Body"),r=t("../math/Vec3"),o=t("../math/Quaternion");t("../shapes/Shape"),t("../shapes/Plane"),n.exports=a;function a(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}a.prototype.collisionPairs=function(m,p,v){throw new Error("collisionPairs not implemented for this BroadPhase class!")};var c=s.STATIC|s.KINEMATIC;a.prototype.needBroadphaseCollision=function(m,p){return!(!(m.collisionFilterGroup&p.collisionFilterMask)||!(p.collisionFilterGroup&m.collisionFilterMask)||(m.type&c||m.sleepState===s.SLEEPING)&&(p.type&c||p.sleepState===s.SLEEPING))},a.prototype.intersectionTest=function(m,p,v,x){this.useBoundingBoxes?this.doBoundingBoxBroadphase(m,p,v,x):this.doBoundingSphereBroadphase(m,p,v,x)};var h=new r;new r,new o,new r,a.prototype.doBoundingSphereBroadphase=function(m,p,v,x){var w=h;p.position.vsub(m.position,w);var y=Math.pow(m.boundingRadius+p.boundingRadius,2),b=w.norm2();b<y&&(v.push(m),x.push(p))},a.prototype.doBoundingBoxBroadphase=function(m,p,v,x){m.aabbNeedsUpdate&&m.computeAABB(),p.aabbNeedsUpdate&&p.computeAABB(),m.aabb.overlaps(p.aabb)&&(v.push(m),x.push(p))};var l={keys:[]},u=[],f=[];a.prototype.makePairsUnique=function(m,p){for(var v=l,x=u,w=f,y=m.length,b=0;b!==y;b++)x[b]=m[b],w[b]=p[b];m.length=0,p.length=0;for(var b=0;b!==y;b++){var L=x[b].id,k=w[b].id,_=L<k?L+","+k:k+","+L;v[_]=b,v.keys.push(_)}for(var b=0;b!==v.keys.length;b++){var _=v.keys.pop(),M=v[_];m.push(x[M]),p.push(w[M]),delete v[_]}},a.prototype.setWorld=function(m){};var g=new r;a.boundingSphereCheck=function(m,p){var v=g;return m.position.vsub(p.position,v),Math.pow(m.shape.boundingSphereRadius+p.shape.boundingSphereRadius,2)>v.norm2()},a.prototype.aabbQuery=function(m,p,v){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}},{"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Plane":42,"../shapes/Shape":43}],6:[function(t,n,i){n.exports=a;var s=t("./Broadphase"),r=t("../math/Vec3"),o=t("../shapes/Shape");function a(h,l,u,f,g){s.apply(this),this.nx=u||10,this.ny=f||10,this.nz=g||10,this.aabbMin=h||new r(100,100,100),this.aabbMax=l||new r(-100,-100,-100);var m=this.nx*this.ny*this.nz;if(m<=0)throw"GridBroadphase: Each dimension's n must be >0";this.bins=[],this.binLengths=[],this.bins.length=m,this.binLengths.length=m;for(var p=0;p<m;p++)this.bins[p]=[],this.binLengths[p]=0}a.prototype=new s,a.prototype.constructor=a;var c=new r;new r,a.prototype.collisionPairs=function(h,l,u){var f=h.numObjects(),g=h.bodies,re=this.aabbMax,V=this.aabbMin,m=this.nx,p=this.ny,v=this.nz,x=p*v,w=v,y=1,b=re.x,L=re.y,k=re.z,_=V.x,M=V.y,E=V.z,C=m/(b-_),U=p/(L-M),T=v/(k-E),N=(b-_)/m,Y=(L-M)/p,te=(k-E)/v,W=Math.sqrt(N*N+Y*Y+te*te)*.5,O=o.types,ee=O.SPHERE,K=O.PLANE;O.BOX,O.COMPOUND,O.CONVEXPOLYHEDRON;for(var P=this.bins,H=this.binLengths,D=this.bins.length,I=0;I!==D;I++)H[I]=0;var R=Math.ceil,V=Math.min,re=Math.max;function ne(ie,De,Fe,Le,Oe,ke,Qe){var Ze=(ie-_)*C|0,nt=(De-M)*U|0,Z=(Fe-E)*T|0,ae=R((Le-_)*C),Me=R((Oe-M)*U),Re=R((ke-E)*T);Ze<0?Ze=0:Ze>=m&&(Ze=m-1),nt<0?nt=0:nt>=p&&(nt=p-1),Z<0?Z=0:Z>=v&&(Z=v-1),ae<0?ae=0:ae>=m&&(ae=m-1),Me<0?Me=0:Me>=p&&(Me=p-1),Re<0?Re=0:Re>=v&&(Re=v-1),Ze*=x,nt*=w,Z*=y,ae*=x,Me*=w,Re*=y;for(var He=Ze;He<=ae;He+=x)for(var rt=nt;rt<=Me;rt+=w)for(var xt=Z;xt<=Re;xt+=y){var wt=He+rt+xt;P[wt][H[wt]++]=Qe}}for(var I=0;I!==f;I++){var $=g[I],Q=$.shape;switch(Q.type){case ee:var he=$.position.x,Se=$.position.y,ge=$.position.z,Ee=Q.radius;ne(he-Ee,Se-Ee,ge-Ee,he+Ee,Se+Ee,ge+Ee,$);break;case K:Q.worldNormalNeedsUpdate&&Q.computeWorldNormal($.quaternion);var ue=Q.worldNormal,xe=_+N*.5-$.position.x,Ye=M+Y*.5-$.position.y,ze=E+te*.5-$.position.z,Ge=c;Ge.set(xe,Ye,ze);for(var Pe=0,$e=0;Pe!==m;Pe++,$e+=x,Ge.y=Ye,Ge.x+=N)for(var B=0,A=0;B!==p;B++,A+=w,Ge.z=ze,Ge.y+=Y)for(var se=0,pe=0;se!==v;se++,pe+=y,Ge.z+=te)if(Ge.dot(ue)<W){var ye=$e+A+pe;P[ye][H[ye]++]=$}break;default:$.aabbNeedsUpdate&&$.computeAABB(),ne($.aabb.lowerBound.x,$.aabb.lowerBound.y,$.aabb.lowerBound.z,$.aabb.upperBound.x,$.aabb.upperBound.y,$.aabb.upperBound.z,$);break}}for(var I=0;I!==D;I++){var _e=H[I];if(_e>1)for(var Ve=P[I],Pe=0;Pe!==_e;Pe++)for(var $=Ve[Pe],B=0;B!==Pe;B++){var q=Ve[B];this.needBroadphaseCollision($,q)&&this.intersectionTest($,q,l,u)}}this.makePairsUnique(l,u)}},{"../math/Vec3":30,"../shapes/Shape":43,"./Broadphase":5}],7:[function(t,n,i){n.exports=o;var s=t("./Broadphase"),r=t("./AABB");function o(){s.apply(this)}o.prototype=new s,o.prototype.constructor=o,o.prototype.collisionPairs=function(a,c,h){var l=a.bodies,u=l.length,f,g,m,p;for(f=0;f!==u;f++)for(g=0;g!==f;g++)m=l[f],p=l[g],this.needBroadphaseCollision(m,p)&&this.intersectionTest(m,p,c,h)},new r,o.prototype.aabbQuery=function(a,c,h){h=h||[];for(var l=0;l<a.bodies.length;l++){var u=a.bodies[l];u.aabbNeedsUpdate&&u.computeAABB(),u.aabb.overlaps(c)&&h.push(u)}return h}},{"./AABB":3,"./Broadphase":5}],8:[function(t,n,i){n.exports=s;function s(){this.matrix={}}s.prototype.get=function(r,o){if(r=r.id,o=o.id,o>r){var a=o;o=r,r=a}return r+"-"+o in this.matrix},s.prototype.set=function(r,o,a){if(r=r.id,o=o.id,o>r){var c=o;o=r,r=c}a?this.matrix[r+"-"+o]=!0:delete this.matrix[r+"-"+o]},s.prototype.reset=function(){this.matrix={}},s.prototype.setNumObjects=function(r){}},{}],9:[function(t,n,i){n.exports=l;var s=t("../math/Vec3"),r=t("../math/Quaternion"),o=t("../math/Transform");t("../shapes/ConvexPolyhedron"),t("../shapes/Box");var a=t("../collision/RaycastResult"),c=t("../shapes/Shape"),h=t("../collision/AABB");function l(D,I){this.from=D?D.clone():new s,this.to=I?I.clone():new s,this._direction=new s,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=l.ANY,this.result=new a,this.hasHit=!1,this.callback=function(R){}}l.prototype.constructor=l,l.CLOSEST=1,l.ANY=2,l.ALL=4;var u=new h,f=[];l.prototype.intersectWorld=function(D,I){return this.mode=I.mode||l.ANY,this.result=I.result||new a,this.skipBackfaces=!!I.skipBackfaces,this.collisionFilterMask=typeof I.collisionFilterMask<"u"?I.collisionFilterMask:-1,this.collisionFilterGroup=typeof I.collisionFilterGroup<"u"?I.collisionFilterGroup:-1,I.from&&this.from.copy(I.from),I.to&&this.to.copy(I.to),this.callback=I.callback||function(){},this.hasHit=!1,this.result.reset(),this._updateDirection(),this.getAABB(u),f.length=0,D.broadphase.aabbQuery(D,u,f),this.intersectBodies(f),this.hasHit};var g=new s,m=new s;l.pointInTriangle=p;function p(D,I,R,V){V.vsub(I,K),R.vsub(I,g),D.vsub(I,m);var re=K.dot(K),ne=K.dot(g),$=K.dot(m),Q=g.dot(g),he=g.dot(m),Se,ge;return(Se=Q*$-ne*he)>=0&&(ge=re*he-ne*$)>=0&&Se+ge<re*Q-ne*ne}var v=new s,x=new r;l.prototype.intersectBody=function(D,I){I&&(this.result=I,this._updateDirection());var R=this.checkCollisionResponse;if(!(R&&!D.collisionResponse)&&!(!(this.collisionFilterGroup&D.collisionFilterMask)||!(D.collisionFilterGroup&this.collisionFilterMask)))for(var V=v,re=x,ne=0,$=D.shapes.length;ne<$;ne++){var Q=D.shapes[ne];if(!(R&&!Q.collisionResponse)&&(D.quaternion.mult(D.shapeOrientations[ne],re),D.quaternion.vmult(D.shapeOffsets[ne],V),V.vadd(D.position,V),this.intersectShape(Q,re,V,D),this.result._shouldStop))break}},l.prototype.intersectBodies=function(D,I){I&&(this.result=I,this._updateDirection());for(var R=0,V=D.length;!this.result._shouldStop&&R<V;R++)this.intersectBody(D[R])},l.prototype._updateDirection=function(){this.to.vsub(this.from,this._direction),this._direction.normalize()},l.prototype.intersectShape=function(D,I,R,V){var re=this.from,ne=H(re,this._direction,R);if(!(ne>D.boundingSphereRadius)){var $=this[D.type];$&&$.call(this,D,I,R,V)}},new s,new s;var w=new s,y=new s,b=new s,L=new s;new s,new a,l.prototype.intersectBox=function(D,I,R,V){return this.intersectConvex(D.convexPolyhedronRepresentation,I,R,V)},l.prototype[c.types.BOX]=l.prototype.intersectBox,l.prototype.intersectPlane=function(D,I,R,V){var re=this.from,ne=this.to,$=this._direction,Q=new s(0,0,1);I.vmult(Q,Q);var he=new s;re.vsub(R,he);var Se=he.dot(Q);ne.vsub(R,he);var ge=he.dot(Q);if(!(Se*ge>0)&&!(re.distanceTo(ne)<Se)){var Ee=Q.dot($);if(!(Math.abs(Ee)<this.precision)){var ue=new s,xe=new s,Ye=new s;re.vsub(R,ue);var ze=-Q.dot(ue)/Ee;$.scale(ze,xe),re.vadd(xe,Ye),this.reportIntersection(Q,Ye,D,V,-1)}}},l.prototype[c.types.PLANE]=l.prototype.intersectPlane,l.prototype.getAABB=function(D){var I=this.to,R=this.from;D.lowerBound.x=Math.min(I.x,R.x),D.lowerBound.y=Math.min(I.y,R.y),D.lowerBound.z=Math.min(I.z,R.z),D.upperBound.x=Math.max(I.x,R.x),D.upperBound.y=Math.max(I.y,R.y),D.upperBound.z=Math.max(I.z,R.z)};var k={faceList:[0]};l.prototype.intersectHeightfield=function(D,I,R,V){D.data,D.elementSize;var re=new s,ne=new l(this.from,this.to);o.pointToLocalFrame(R,I,ne.from,ne.from),o.pointToLocalFrame(R,I,ne.to,ne.to);var $=[],Q=null,he=null,Se=null,ge=null,Ee=D.getIndexOfPosition(ne.from.x,ne.from.y,$,!1);if(Ee&&(Q=$[0],he=$[1],Se=$[0],ge=$[1]),Ee=D.getIndexOfPosition(ne.to.x,ne.to.y,$,!1),Ee&&((Q===null||$[0]<Q)&&(Q=$[0]),(Se===null||$[0]>Se)&&(Se=$[0]),(he===null||$[1]<he)&&(he=$[1]),(ge===null||$[1]>ge)&&(ge=$[1])),Q!==null){var ue=[];D.getRectMinMax(Q,he,Se,ge,ue),ue[0],ue[1];for(var xe=Q;xe<=Se;xe++)for(var Ye=he;Ye<=ge;Ye++){if(this.result._shouldStop||(D.getConvexTrianglePillar(xe,Ye,!1),o.pointToWorldFrame(R,I,D.pillarOffset,re),this.intersectConvex(D.pillarConvex,I,re,V,k),this.result._shouldStop))return;D.getConvexTrianglePillar(xe,Ye,!0),o.pointToWorldFrame(R,I,D.pillarOffset,re),this.intersectConvex(D.pillarConvex,I,re,V,k)}}},l.prototype[c.types.HEIGHTFIELD]=l.prototype.intersectHeightfield;var _=new s,M=new s;l.prototype.intersectSphere=function(D,I,R,V){var re=this.from,ne=this.to,$=D.radius,Q=Math.pow(ne.x-re.x,2)+Math.pow(ne.y-re.y,2)+Math.pow(ne.z-re.z,2),he=2*((ne.x-re.x)*(re.x-R.x)+(ne.y-re.y)*(re.y-R.y)+(ne.z-re.z)*(re.z-R.z)),Se=Math.pow(re.x-R.x,2)+Math.pow(re.y-R.y,2)+Math.pow(re.z-R.z,2)-Math.pow($,2),ge=Math.pow(he,2)-4*Q*Se,Ee=_,ue=M;if(!(ge<0))if(ge===0)re.lerp(ne,ge,Ee),Ee.vsub(R,ue),ue.normalize(),this.reportIntersection(ue,Ee,D,V,-1);else{var xe=(-he-Math.sqrt(ge))/(2*Q),Ye=(-he+Math.sqrt(ge))/(2*Q);if(xe>=0&&xe<=1&&(re.lerp(ne,xe,Ee),Ee.vsub(R,ue),ue.normalize(),this.reportIntersection(ue,Ee,D,V,-1)),this.result._shouldStop)return;Ye>=0&&Ye<=1&&(re.lerp(ne,Ye,Ee),Ee.vsub(R,ue),ue.normalize(),this.reportIntersection(ue,Ee,D,V,-1))}},l.prototype[c.types.SPHERE]=l.prototype.intersectSphere;var E=new s;new s,new s;var C=new s;l.prototype.intersectConvex=function(I,R,V,re,ne){for(var $=E,Q=C,he=ne&&ne.faceList||null,Se=I.faces,ge=I.vertices,Ee=I.faceNormals,ue=this._direction,xe=this.from,Ye=this.to,ze=xe.distanceTo(Ye),Ge=he?he.length:Se.length,Pe=this.result,$e=0;!Pe._shouldStop&&$e<Ge;$e++){var B=he?he[$e]:$e,A=Se[B],se=Ee[B],pe=R,ye=V;Q.copy(ge[A[0]]),pe.vmult(Q,Q),Q.vadd(ye,Q),Q.vsub(xe,Q),pe.vmult(se,$);var _e=ue.dot($);if(!(Math.abs(_e)<this.precision)){var Ve=$.dot(Q)/_e;if(!(Ve<0)){ue.mult(Ve,w),w.vadd(xe,w),y.copy(ge[A[0]]),pe.vmult(y,y),ye.vadd(y,y);for(var q=1;!Pe._shouldStop&&q<A.length-1;q++){b.copy(ge[A[q]]),L.copy(ge[A[q+1]]),pe.vmult(b,b),pe.vmult(L,L),ye.vadd(b,b),ye.vadd(L,L);var ie=w.distanceTo(xe);!(p(w,y,b,L)||p(w,b,y,L))||ie>ze||this.reportIntersection($,w,I,re,B)}}}}},l.prototype[c.types.CONVEXPOLYHEDRON]=l.prototype.intersectConvex;var U=new s,T=new s,N=new s,Y=new s,te=new s,W=new s;new h;var O=[],ee=new o;l.prototype.intersectTrimesh=function(I,R,V,re,ne){var $=U,Q=O,he=ee,Se=C,ge=T,Ee=N,ue=Y,xe=W,Ye=te;ne&&ne.faceList;var ze=I.indices;I.vertices,I.faceNormals;var Ge=this.from,Pe=this.to,$e=this._direction;he.position.copy(V),he.quaternion.copy(R),o.vectorToLocalFrame(V,R,$e,ge),o.pointToLocalFrame(V,R,Ge,Ee),o.pointToLocalFrame(V,R,Pe,ue);var B=Ee.distanceSquared(ue);I.tree.rayQuery(this,he,Q);for(var A=0,se=Q.length;!this.result._shouldStop&&A!==se;A++){var pe=Q[A];I.getNormal(pe,$),I.getVertex(ze[pe*3],y),y.vsub(Ee,Se);var ye=ge.dot($),_e=$.dot(Se)/ye;if(!(_e<0)){ge.scale(_e,w),w.vadd(Ee,w),I.getVertex(ze[pe*3+1],b),I.getVertex(ze[pe*3+2],L);var Ve=w.distanceSquared(Ee);!(p(w,b,y,L)||p(w,y,b,L))||Ve>B||(o.vectorToWorldFrame(R,$,Ye),o.pointToWorldFrame(V,R,w,xe),this.reportIntersection(Ye,xe,I,re,pe))}}Q.length=0},l.prototype[c.types.TRIMESH]=l.prototype.intersectTrimesh,l.prototype.reportIntersection=function(D,I,R,V,re){var ne=this.from,$=this.to,Q=ne.distanceTo(I),he=this.result;if(!(this.skipBackfaces&&D.dot(this._direction)>0))switch(he.hitFaceIndex=typeof re<"u"?re:-1,this.mode){case l.ALL:this.hasHit=!0,he.set(ne,$,D,I,R,V,Q),he.hasHit=!0,this.callback(he);break;case l.CLOSEST:(Q<he.distance||!he.hasHit)&&(this.hasHit=!0,he.hasHit=!0,he.set(ne,$,D,I,R,V,Q));break;case l.ANY:this.hasHit=!0,he.hasHit=!0,he.set(ne,$,D,I,R,V,Q),he._shouldStop=!0;break}};var K=new s,P=new s;function H(D,I,R){R.vsub(D,K);var V=K.dot(I);I.mult(V,P),P.vadd(D,P);var re=R.distanceTo(P);return re}},{"../collision/AABB":3,"../collision/RaycastResult":10,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../shapes/Box":37,"../shapes/ConvexPolyhedron":38,"../shapes/Shape":43}],10:[function(t,n,i){var s=t("../math/Vec3");n.exports=r;function r(){this.rayFromWorld=new s,this.rayToWorld=new s,this.hitNormalWorld=new s,this.hitPointWorld=new s,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this._shouldStop=!1}r.prototype.reset=function(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this._shouldStop=!1},r.prototype.abort=function(){this._shouldStop=!0},r.prototype.set=function(o,a,c,h,l,u,f){this.rayFromWorld.copy(o),this.rayToWorld.copy(a),this.hitNormalWorld.copy(c),this.hitPointWorld.copy(h),this.shape=l,this.body=u,this.distance=f}},{"../math/Vec3":30}],11:[function(t,n,i){t("../shapes/Shape");var s=t("../collision/Broadphase");n.exports=r;function r(o){s.apply(this),this.axisList=[],this.world=null,this.axisIndex=0;var a=this.axisList;this._addBodyHandler=function(c){a.push(c.body)},this._removeBodyHandler=function(c){var h=a.indexOf(c.body);h!==-1&&a.splice(h,1)},o&&this.setWorld(o)}r.prototype=new s,r.prototype.setWorld=function(o){this.axisList.length=0;for(var a=0;a<o.bodies.length;a++)this.axisList.push(o.bodies[a]);o.removeEventListener("addBody",this._addBodyHandler),o.removeEventListener("removeBody",this._removeBodyHandler),o.addEventListener("addBody",this._addBodyHandler),o.addEventListener("removeBody",this._removeBodyHandler),this.world=o,this.dirty=!0},r.insertionSortX=function(o){for(var a=1,c=o.length;a<c;a++){for(var h=o[a],l=a-1;l>=0&&!(o[l].aabb.lowerBound.x<=h.aabb.lowerBound.x);l--)o[l+1]=o[l];o[l+1]=h}return o},r.insertionSortY=function(o){for(var a=1,c=o.length;a<c;a++){for(var h=o[a],l=a-1;l>=0&&!(o[l].aabb.lowerBound.y<=h.aabb.lowerBound.y);l--)o[l+1]=o[l];o[l+1]=h}return o},r.insertionSortZ=function(o){for(var a=1,c=o.length;a<c;a++){for(var h=o[a],l=a-1;l>=0&&!(o[l].aabb.lowerBound.z<=h.aabb.lowerBound.z);l--)o[l+1]=o[l];o[l+1]=h}return o},r.prototype.collisionPairs=function(o,a,c){var h=this.axisList,l=h.length,u=this.axisIndex,f,g;for(this.dirty&&(this.sortList(),this.dirty=!1),f=0;f!==l;f++){var m=h[f];for(g=f+1;g<l;g++){var p=h[g];if(this.needBroadphaseCollision(m,p)){if(!r.checkBounds(m,p,u))break;this.intersectionTest(m,p,a,c)}}}},r.prototype.sortList=function(){for(var o=this.axisList,a=this.axisIndex,c=o.length,h=0;h!==c;h++){var l=o[h];l.aabbNeedsUpdate&&l.computeAABB()}a===0?r.insertionSortX(o):a===1?r.insertionSortY(o):a===2&&r.insertionSortZ(o)},r.checkBounds=function(o,a,c){var h,l;c===0?(h=o.position.x,l=a.position.x):c===1?(h=o.position.y,l=a.position.y):c===2&&(h=o.position.z,l=a.position.z);var u=o.boundingRadius,f=a.boundingRadius,g=h+u,m=l-f;return m<g},r.prototype.autoDetectAxis=function(){for(var o=0,a=0,c=0,h=0,l=0,u=0,f=this.axisList,g=f.length,m=1/g,p=0;p!==g;p++){var v=f[p],x=v.position.x;o+=x,a+=x*x;var w=v.position.y;c+=w,h+=w*w;var y=v.position.z;l+=y,u+=y*y}var b=a-o*o*m,L=h-c*c*m,k=u-l*l*m;b>L?b>k?this.axisIndex=0:this.axisIndex=2:L>k?this.axisIndex=1:this.axisIndex=2},r.prototype.aabbQuery=function(o,a,c){c=c||[],this.dirty&&(this.sortList(),this.dirty=!1);var h=this.axisIndex,l="x";h===1&&(l="y"),h===2&&(l="z");var u=this.axisList;a.lowerBound[l],a.upperBound[l];for(var f=0;f<u.length;f++){var g=u[f];g.aabbNeedsUpdate&&g.computeAABB(),g.aabb.overlaps(a)&&c.push(g)}return c}},{"../collision/Broadphase":5,"../shapes/Shape":43}],12:[function(t,n,i){n.exports=c,t("./Constraint");var s=t("./PointToPointConstraint"),r=t("../equations/ConeEquation"),o=t("../equations/RotationalEquation");t("../equations/ContactEquation");var a=t("../math/Vec3");function c(h,l,u){u=u||{};var f=typeof u.maxForce<"u"?u.maxForce:1e6,g=u.pivotA?u.pivotA.clone():new a,m=u.pivotB?u.pivotB.clone():new a;this.axisA=u.axisA?u.axisA.clone():new a,this.axisB=u.axisB?u.axisB.clone():new a,s.call(this,h,g,l,m,f),this.collideConnected=!!u.collideConnected,this.angle=typeof u.angle<"u"?u.angle:0;var p=this.coneEquation=new r(h,l,u),v=this.twistEquation=new o(h,l,u);this.twistAngle=typeof u.twistAngle<"u"?u.twistAngle:0,p.maxForce=0,p.minForce=-f,v.maxForce=0,v.minForce=-f,this.equations.push(p,v)}c.prototype=new s,c.constructor=c,new a,new a,c.prototype.update=function(){var h=this.bodyA,l=this.bodyB,u=this.coneEquation,f=this.twistEquation;s.prototype.update.call(this),h.vectorToWorldFrame(this.axisA,u.axisA),l.vectorToWorldFrame(this.axisB,u.axisB),this.axisA.tangents(f.axisA,f.axisA),h.vectorToWorldFrame(f.axisA,f.axisA),this.axisB.tangents(f.axisB,f.axisB),l.vectorToWorldFrame(f.axisB,f.axisB),u.angle=this.angle,f.maxAngle=this.twistAngle}},{"../equations/ConeEquation":18,"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],13:[function(t,n,i){n.exports=r;var s=t("../utils/Utils");function r(o,a,c){c=s.defaults(c,{collideConnected:!0,wakeUpBodies:!0}),this.equations=[],this.bodyA=o,this.bodyB=a,this.id=r.idCounter++,this.collideConnected=c.collideConnected,c.wakeUpBodies&&(o&&o.wakeUp(),a&&a.wakeUp())}r.prototype.update=function(){throw new Error("method update() not implmemented in this Constraint subclass!")},r.prototype.enable=function(){for(var o=this.equations,a=0;a<o.length;a++)o[a].enabled=!0},r.prototype.disable=function(){for(var o=this.equations,a=0;a<o.length;a++)o[a].enabled=!1},r.idCounter=0},{"../utils/Utils":53}],14:[function(t,n,i){n.exports=o;var s=t("./Constraint"),r=t("../equations/ContactEquation");function o(a,c,h,l){s.call(this,a,c),typeof h>"u"&&(h=a.position.distanceTo(c.position)),typeof l>"u"&&(l=1e6),this.distance=h;var u=this.distanceEquation=new r(a,c);this.equations.push(u),u.minForce=-l,u.maxForce=l}o.prototype=new s,o.prototype.update=function(){var a=this.bodyA,c=this.bodyB,h=this.distanceEquation,l=this.distance*.5,u=h.ni;c.position.vsub(a.position,u),u.normalize(),u.mult(l,h.ri),u.mult(-l,h.rj)}},{"../equations/ContactEquation":19,"./Constraint":13}],15:[function(t,n,i){n.exports=c,t("./Constraint");var s=t("./PointToPointConstraint"),r=t("../equations/RotationalEquation"),o=t("../equations/RotationalMotorEquation");t("../equations/ContactEquation");var a=t("../math/Vec3");function c(u,f,g){g=g||{};var m=typeof g.maxForce<"u"?g.maxForce:1e6,p=g.pivotA?g.pivotA.clone():new a,v=g.pivotB?g.pivotB.clone():new a;s.call(this,u,p,f,v,m);var x=this.axisA=g.axisA?g.axisA.clone():new a(1,0,0);x.normalize();var w=this.axisB=g.axisB?g.axisB.clone():new a(1,0,0);w.normalize();var y=this.rotationalEquation1=new r(u,f,g),b=this.rotationalEquation2=new r(u,f,g),L=this.motorEquation=new o(u,f,m);L.enabled=!1,this.equations.push(y,b,L)}c.prototype=new s,c.constructor=c,c.prototype.enableMotor=function(){this.motorEquation.enabled=!0},c.prototype.disableMotor=function(){this.motorEquation.enabled=!1},c.prototype.setMotorSpeed=function(u){this.motorEquation.targetVelocity=u},c.prototype.setMotorMaxForce=function(u){this.motorEquation.maxForce=u,this.motorEquation.minForce=-u};var h=new a,l=new a;c.prototype.update=function(){var u=this.bodyA,f=this.bodyB,g=this.motorEquation,m=this.rotationalEquation1,p=this.rotationalEquation2,v=h,x=l,w=this.axisA,y=this.axisB;s.prototype.update.call(this),u.quaternion.vmult(w,v),f.quaternion.vmult(y,x),v.tangents(m.axisA,p.axisA),m.axisB.copy(x),p.axisB.copy(x),this.motorEquation.enabled&&(u.quaternion.vmult(this.axisA,g.axisA),f.quaternion.vmult(this.axisB,g.axisB))}},{"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../equations/RotationalMotorEquation":23,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],16:[function(t,n,i){n.exports=a,t("./Constraint");var s=t("./PointToPointConstraint"),r=t("../equations/RotationalEquation");t("../equations/RotationalMotorEquation"),t("../equations/ContactEquation");var o=t("../math/Vec3");function a(c,h,l){l=l||{};var u=typeof l.maxForce<"u"?l.maxForce:1e6,f=new o,g=new o,m=new o;c.position.vadd(h.position,m),m.scale(.5,m),h.pointToLocalFrame(m,g),c.pointToLocalFrame(m,f),s.call(this,c,f,h,g,u);var p=this.rotationalEquation1=new r(c,h,l),v=this.rotationalEquation2=new r(c,h,l),x=this.rotationalEquation3=new r(c,h,l);this.equations.push(p,v,x)}a.prototype=new s,a.constructor=a,new o,new o,a.prototype.update=function(){var c=this.bodyA,h=this.bodyB;this.motorEquation;var l=this.rotationalEquation1,u=this.rotationalEquation2,f=this.rotationalEquation3;s.prototype.update.call(this),c.vectorToWorldFrame(o.UNIT_X,l.axisA),h.vectorToWorldFrame(o.UNIT_Y,l.axisB),c.vectorToWorldFrame(o.UNIT_Y,u.axisA),h.vectorToWorldFrame(o.UNIT_Z,u.axisB),c.vectorToWorldFrame(o.UNIT_Z,f.axisA),h.vectorToWorldFrame(o.UNIT_X,f.axisB)}},{"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../equations/RotationalMotorEquation":23,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],17:[function(t,n,i){n.exports=a;var s=t("./Constraint"),r=t("../equations/ContactEquation"),o=t("../math/Vec3");function a(c,h,l,u,f){s.call(this,c,l),f=typeof f<"u"?f:1e6,this.pivotA=h?h.clone():new o,this.pivotB=u?u.clone():new o;var g=this.equationX=new r(c,l),m=this.equationY=new r(c,l),p=this.equationZ=new r(c,l);this.equations.push(g,m,p),g.minForce=m.minForce=p.minForce=-f,g.maxForce=m.maxForce=p.maxForce=f,g.ni.set(1,0,0),m.ni.set(0,1,0),p.ni.set(0,0,1)}a.prototype=new s,a.prototype.update=function(){var c=this.bodyA,h=this.bodyB,l=this.equationX,u=this.equationY,f=this.equationZ;c.quaternion.vmult(this.pivotA,l.ri),h.quaternion.vmult(this.pivotB,l.rj),u.ri.copy(l.ri),u.rj.copy(l.rj),f.ri.copy(l.ri),f.rj.copy(l.rj)}},{"../equations/ContactEquation":19,"../math/Vec3":30,"./Constraint":13}],18:[function(t,n,i){n.exports=o;var s=t("../math/Vec3");t("../math/Mat3");var r=t("./Equation");function o(h,l,u){u=u||{};var f=typeof u.maxForce<"u"?u.maxForce:1e6;r.call(this,h,l,-f,f),this.axisA=u.axisA?u.axisA.clone():new s(1,0,0),this.axisB=u.axisB?u.axisB.clone():new s(0,1,0),this.angle=typeof u.angle<"u"?u.angle:0}o.prototype=new r,o.prototype.constructor=o;var a=new s,c=new s;o.prototype.computeB=function(h){var l=this.a,u=this.b,f=this.axisA,g=this.axisB,m=a,p=c,v=this.jacobianElementA,x=this.jacobianElementB;f.cross(g,m),g.cross(f,p),v.rotational.copy(p),x.rotational.copy(m);var w=Math.cos(this.angle)-f.dot(g),y=this.computeGW(),b=this.computeGiMf(),L=-w*l-y*u-h*b;return L}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],19:[function(t,n,i){n.exports=o;var s=t("./Equation"),r=t("../math/Vec3");t("../math/Mat3");function o(p,v,x){x=typeof x<"u"?x:1e6,s.call(this,p,v,0,x),this.restitution=0,this.ri=new r,this.rj=new r,this.ni=new r}o.prototype=new s,o.prototype.constructor=o;var a=new r,c=new r,h=new r;o.prototype.computeB=function(p){var v=this.a,x=this.b,w=this.bi,y=this.bj,b=this.ri,L=this.rj,k=a,_=c,M=w.velocity,E=w.angularVelocity;w.force,w.torque;var C=y.velocity,U=y.angularVelocity;y.force,y.torque;var T=h,N=this.jacobianElementA,Y=this.jacobianElementB,te=this.ni;b.cross(te,k),L.cross(te,_),te.negate(N.spatial),k.negate(N.rotational),Y.spatial.copy(te),Y.rotational.copy(_),T.copy(y.position),T.vadd(L,T),T.vsub(w.position,T),T.vsub(b,T);var W=te.dot(T),O=this.restitution+1,ee=O*C.dot(te)-O*M.dot(te)+U.dot(_)-E.dot(k),K=this.computeGiMf(),P=-W*v-ee*x-p*K;return P};var l=new r,u=new r,f=new r,g=new r,m=new r;o.prototype.getImpactVelocityAlongNormal=function(){var p=l,v=u,x=f,w=g,y=m;return this.bi.position.vadd(this.ri,x),this.bj.position.vadd(this.rj,w),this.bi.getVelocityAtWorldPoint(x,p),this.bj.getVelocityAtWorldPoint(w,v),p.vsub(v,y),this.ni.dot(y)}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],20:[function(t,n,i){n.exports=o;var s=t("../math/JacobianElement"),r=t("../math/Vec3");function o(m,p,v,x){this.id=o.id++,this.minForce=typeof v>"u"?-1e6:v,this.maxForce=typeof x>"u"?1e6:x,this.bi=m,this.bj=p,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new s,this.jacobianElementB=new s,this.enabled=!0,this.setSpookParams(1e7,4,1/60)}o.prototype.constructor=o,o.id=0,o.prototype.setSpookParams=function(m,p,v){var x=p,w=m,y=v;this.a=4/(y*(1+4*x)),this.b=4*x/(1+4*x),this.eps=4/(y*y*w*(1+4*x))},o.prototype.computeB=function(m,p,v){var x=this.computeGW(),w=this.computeGq(),y=this.computeGiMf();return-w*m-x*p-y*v},o.prototype.computeGq=function(){var m=this.jacobianElementA,p=this.jacobianElementB,v=this.bi,x=this.bj,w=v.position,y=x.position;return m.spatial.dot(w)+p.spatial.dot(y)};var a=new r;o.prototype.computeGW=function(){var m=this.jacobianElementA,p=this.jacobianElementB,v=this.bi,x=this.bj,w=v.velocity,y=x.velocity,b=v.angularVelocity||a,L=x.angularVelocity||a;return m.multiplyVectors(w,b)+p.multiplyVectors(y,L)},o.prototype.computeGWlambda=function(){var m=this.jacobianElementA,p=this.jacobianElementB,v=this.bi,x=this.bj,w=v.vlambda,y=x.vlambda,b=v.wlambda||a,L=x.wlambda||a;return m.multiplyVectors(w,b)+p.multiplyVectors(y,L)};var c=new r,h=new r,l=new r,u=new r;o.prototype.computeGiMf=function(){var m=this.jacobianElementA,p=this.jacobianElementB,v=this.bi,x=this.bj,w=v.force,y=v.torque,b=x.force,L=x.torque,k=v.invMassSolve,_=x.invMassSolve;return v.invInertiaWorldSolve?v.invInertiaWorldSolve.vmult(y,l):l.set(0,0,0),x.invInertiaWorldSolve?x.invInertiaWorldSolve.vmult(L,u):u.set(0,0,0),w.mult(k,c),b.mult(_,h),m.multiplyVectors(c,l)+p.multiplyVectors(h,u)};var f=new r;o.prototype.computeGiMGt=function(){var m=this.jacobianElementA,p=this.jacobianElementB,v=this.bi,x=this.bj,w=v.invMassSolve,y=x.invMassSolve,b=v.invInertiaWorldSolve,L=x.invInertiaWorldSolve,k=w+y;return b&&(b.vmult(m.rotational,f),k+=f.dot(m.rotational)),L&&(L.vmult(p.rotational,f),k+=f.dot(p.rotational)),k};var g=new r;new r,new r,new r,new r,new r,o.prototype.addToWlambda=function(m){var p=this.jacobianElementA,v=this.jacobianElementB,x=this.bi,w=this.bj,y=g;p.spatial.mult(x.invMassSolve*m,y),x.vlambda.vadd(y,x.vlambda),v.spatial.mult(w.invMassSolve*m,y),w.vlambda.vadd(y,w.vlambda),x.invInertiaWorldSolve&&(x.invInertiaWorldSolve.vmult(p.rotational,y),y.mult(m,y),x.wlambda.vadd(y,x.wlambda)),w.invInertiaWorldSolve&&(w.invInertiaWorldSolve.vmult(v.rotational,y),y.mult(m,y),w.wlambda.vadd(y,w.wlambda))},o.prototype.computeC=function(){return this.computeGiMGt()+this.eps}},{"../math/JacobianElement":26,"../math/Vec3":30}],21:[function(t,n,i){n.exports=o;var s=t("./Equation"),r=t("../math/Vec3");t("../math/Mat3");function o(h,l,u){s.call(this,h,l,-u,u),this.ri=new r,this.rj=new r,this.t=new r}o.prototype=new s,o.prototype.constructor=o;var a=new r,c=new r;o.prototype.computeB=function(h){this.a;var l=this.b;this.bi,this.bj;var u=this.ri,f=this.rj,g=a,m=c,p=this.t;u.cross(p,g),f.cross(p,m);var v=this.jacobianElementA,x=this.jacobianElementB;p.negate(v.spatial),g.negate(v.rotational),x.spatial.copy(p),x.rotational.copy(m);var w=this.computeGW(),y=this.computeGiMf(),b=-w*l-h*y;return b}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],22:[function(t,n,i){n.exports=o;var s=t("../math/Vec3");t("../math/Mat3");var r=t("./Equation");function o(h,l,u){u=u||{};var f=typeof u.maxForce<"u"?u.maxForce:1e6;r.call(this,h,l,-f,f),this.axisA=u.axisA?u.axisA.clone():new s(1,0,0),this.axisB=u.axisB?u.axisB.clone():new s(0,1,0),this.maxAngle=Math.PI/2}o.prototype=new r,o.prototype.constructor=o;var a=new s,c=new s;o.prototype.computeB=function(h){var l=this.a,u=this.b,f=this.axisA,g=this.axisB,m=a,p=c,v=this.jacobianElementA,x=this.jacobianElementB;f.cross(g,m),g.cross(f,p),v.rotational.copy(p),x.rotational.copy(m);var w=Math.cos(this.maxAngle)-f.dot(g),y=this.computeGW(),b=this.computeGiMf(),L=-w*l-y*u-h*b;return L}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],23:[function(t,n,i){n.exports=o;var s=t("../math/Vec3");t("../math/Mat3");var r=t("./Equation");function o(a,c,h){h=typeof h<"u"?h:1e6,r.call(this,a,c,-h,h),this.axisA=new s,this.axisB=new s,this.targetVelocity=0}o.prototype=new r,o.prototype.constructor=o,o.prototype.computeB=function(a){this.a;var c=this.b;this.bi,this.bj;var h=this.axisA,l=this.axisB,u=this.jacobianElementA,f=this.jacobianElementB;u.rotational.copy(h),l.negate(f.rotational);var g=this.computeGW()-this.targetVelocity,m=this.computeGiMf(),p=-g*c-a*m;return p}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],24:[function(t,n,i){var s=t("../utils/Utils");n.exports=r;function r(o,a,c){c=s.defaults(c,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=r.idCounter++,this.materials=[o,a],this.friction=c.friction,this.restitution=c.restitution,this.contactEquationStiffness=c.contactEquationStiffness,this.contactEquationRelaxation=c.contactEquationRelaxation,this.frictionEquationStiffness=c.frictionEquationStiffness,this.frictionEquationRelaxation=c.frictionEquationRelaxation}r.idCounter=0},{"../utils/Utils":53}],25:[function(t,n,i){n.exports=s;function s(r){var o="";r=r||{},typeof r=="string"?(o=r,r={}):typeof r=="object"&&(o=""),this.name=o,this.id=s.idCounter++,this.friction=typeof r.friction<"u"?r.friction:-1,this.restitution=typeof r.restitution<"u"?r.restitution:-1}s.idCounter=0},{}],26:[function(t,n,i){n.exports=r;var s=t("./Vec3");function r(){this.spatial=new s,this.rotational=new s}r.prototype.multiplyElement=function(o){return o.spatial.dot(this.spatial)+o.rotational.dot(this.rotational)},r.prototype.multiplyVectors=function(o,a){return o.dot(this.spatial)+a.dot(this.rotational)}},{"./Vec3":30}],27:[function(t,n,i){n.exports=r;var s=t("./Vec3");function r(o){o?this.elements=o:this.elements=[0,0,0,0,0,0,0,0,0]}r.prototype.identity=function(){var o=this.elements;o[0]=1,o[1]=0,o[2]=0,o[3]=0,o[4]=1,o[5]=0,o[6]=0,o[7]=0,o[8]=1},r.prototype.setZero=function(){var o=this.elements;o[0]=0,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=0,o[6]=0,o[7]=0,o[8]=0},r.prototype.setTrace=function(o){var a=this.elements;a[0]=o.x,a[4]=o.y,a[8]=o.z},r.prototype.getTrace=function(a){var a=a||new s,c=this.elements;a.x=c[0],a.y=c[4],a.z=c[8]},r.prototype.vmult=function(o,a){a=a||new s;var c=this.elements,h=o.x,l=o.y,u=o.z;return a.x=c[0]*h+c[1]*l+c[2]*u,a.y=c[3]*h+c[4]*l+c[5]*u,a.z=c[6]*h+c[7]*l+c[8]*u,a},r.prototype.smult=function(o){for(var a=0;a<this.elements.length;a++)this.elements[a]*=o},r.prototype.mmult=function(o,a){for(var c=a||new r,h=0;h<3;h++)for(var l=0;l<3;l++){for(var u=0,f=0;f<3;f++)u+=o.elements[h+f*3]*this.elements[f+l*3];c.elements[h+l*3]=u}return c},r.prototype.scale=function(o,a){a=a||new r;for(var c=this.elements,h=a.elements,l=0;l!==3;l++)h[3*l+0]=o.x*c[3*l+0],h[3*l+1]=o.y*c[3*l+1],h[3*l+2]=o.z*c[3*l+2];return a},r.prototype.solve=function(o,a){a=a||new s;for(var c=3,h=4,l=[],u=0;u<c*h;u++)l.push(0);var u,f;for(u=0;u<3;u++)for(f=0;f<3;f++)l[u+h*f]=this.elements[u+3*f];l[3+4*0]=o.x,l[3+4*1]=o.y,l[3+4*2]=o.z;var g=3,m=g,p,v=4,x;do{if(u=m-g,l[u+h*u]===0){for(f=u+1;f<m;f++)if(l[u+h*f]!==0){p=v;do x=v-p,l[x+h*u]+=l[x+h*f];while(--p);break}}if(l[u+h*u]!==0)for(f=u+1;f<m;f++){var w=l[u+h*f]/l[u+h*u];p=v;do x=v-p,l[x+h*f]=x<=u?0:l[x+h*f]-l[x+h*u]*w;while(--p)}}while(--g);if(a.z=l[2*h+3]/l[2*h+2],a.y=(l[1*h+3]-l[1*h+2]*a.z)/l[1*h+1],a.x=(l[0*h+3]-l[0*h+2]*a.z-l[0*h+1]*a.y)/l[0*h+0],isNaN(a.x)||isNaN(a.y)||isNaN(a.z)||a.x===1/0||a.y===1/0||a.z===1/0)throw"Could not solve equation! Got x=["+a.toString()+"], b=["+o.toString()+"], A=["+this.toString()+"]";return a},r.prototype.e=function(o,a,c){if(c===void 0)return this.elements[a+3*o];this.elements[a+3*o]=c},r.prototype.copy=function(o){for(var a=0;a<o.elements.length;a++)this.elements[a]=o.elements[a];return this},r.prototype.toString=function(){for(var o="",a=",",c=0;c<9;c++)o+=this.elements[c]+a;return o},r.prototype.reverse=function(o){o=o||new r;for(var a=3,c=6,h=[],l=0;l<a*c;l++)h.push(0);var l,u;for(l=0;l<3;l++)for(u=0;u<3;u++)h[l+c*u]=this.elements[l+3*u];h[3+6*0]=1,h[3+6*1]=0,h[3+6*2]=0,h[4+6*0]=0,h[4+6*1]=1,h[4+6*2]=0,h[5+6*0]=0,h[5+6*1]=0,h[5+6*2]=1;var f=3,g=f,m,p=c,v;do{if(l=g-f,h[l+c*l]===0){for(u=l+1;u<g;u++)if(h[l+c*u]!==0){m=p;do v=p-m,h[v+c*l]+=h[v+c*u];while(--m);break}}if(h[l+c*l]!==0)for(u=l+1;u<g;u++){var x=h[l+c*u]/h[l+c*l];m=p;do v=p-m,h[v+c*u]=v<=l?0:h[v+c*u]-h[v+c*l]*x;while(--m)}}while(--f);l=2;do{u=l-1;do{var x=h[l+c*u]/h[l+c*l];m=c;do v=c-m,h[v+c*u]=h[v+c*u]-h[v+c*l]*x;while(--m)}while(u--)}while(--l);l=2;do{var x=1/h[l+c*l];m=c;do v=c-m,h[v+c*l]=h[v+c*l]*x;while(--m)}while(l--);l=2;do{u=2;do{if(v=h[a+u+c*l],isNaN(v)||v===1/0)throw"Could not reverse! A=["+this.toString()+"]";o.e(l,u,v)}while(u--)}while(l--);return o},r.prototype.setRotationFromQuaternion=function(o){var a=o.x,c=o.y,h=o.z,l=o.w,u=a+a,f=c+c,g=h+h,m=a*u,p=a*f,v=a*g,x=c*f,w=c*g,y=h*g,b=l*u,L=l*f,k=l*g,_=this.elements;return _[3*0+0]=1-(x+y),_[3*0+1]=p-k,_[3*0+2]=v+L,_[3*1+0]=p+k,_[3*1+1]=1-(m+y),_[3*1+2]=w-b,_[3*2+0]=v-L,_[3*2+1]=w+b,_[3*2+2]=1-(m+x),this},r.prototype.transpose=function(o){o=o||new r;for(var a=o.elements,c=this.elements,h=0;h!==3;h++)for(var l=0;l!==3;l++)a[3*h+l]=c[3*l+h];return o}},{"./Vec3":30}],28:[function(t,n,i){n.exports=r;var s=t("./Vec3");function r(u,f,g,m){this.x=u!==void 0?u:0,this.y=f!==void 0?f:0,this.z=g!==void 0?g:0,this.w=m!==void 0?m:1}r.prototype.set=function(u,f,g,m){this.x=u,this.y=f,this.z=g,this.w=m},r.prototype.toString=function(){return this.x+","+this.y+","+this.z+","+this.w},r.prototype.toArray=function(){return[this.x,this.y,this.z,this.w]},r.prototype.setFromAxisAngle=function(u,f){var g=Math.sin(f*.5);this.x=u.x*g,this.y=u.y*g,this.z=u.z*g,this.w=Math.cos(f*.5)},r.prototype.toAxisAngle=function(u){u=u||new s,this.normalize();var f=2*Math.acos(this.w),g=Math.sqrt(1-this.w*this.w);return g<.001?(u.x=this.x,u.y=this.y,u.z=this.z):(u.x=this.x/g,u.y=this.y/g,u.z=this.z/g),[u,f]};var o=new s,a=new s;r.prototype.setFromVectors=function(u,f){if(u.isAntiparallelTo(f)){var g=o,m=a;u.tangents(g,m),this.setFromAxisAngle(g,Math.PI)}else{var p=u.cross(f);this.x=p.x,this.y=p.y,this.z=p.z,this.w=Math.sqrt(Math.pow(u.norm(),2)*Math.pow(f.norm(),2))+u.dot(f),this.normalize()}};var c=new s,h=new s,l=new s;r.prototype.mult=function(u,f){f=f||new r;var g=this.w,m=c,p=h,v=l;return m.set(this.x,this.y,this.z),p.set(u.x,u.y,u.z),f.w=g*u.w-m.dot(p),m.cross(p,v),f.x=g*p.x+u.w*m.x+v.x,f.y=g*p.y+u.w*m.y+v.y,f.z=g*p.z+u.w*m.z+v.z,f},r.prototype.inverse=function(u){var f=this.x,g=this.y,m=this.z,p=this.w;u=u||new r,this.conjugate(u);var v=1/(f*f+g*g+m*m+p*p);return u.x*=v,u.y*=v,u.z*=v,u.w*=v,u},r.prototype.conjugate=function(u){return u=u||new r,u.x=-this.x,u.y=-this.y,u.z=-this.z,u.w=this.w,u},r.prototype.normalize=function(){var u=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);u===0?(this.x=0,this.y=0,this.z=0,this.w=0):(u=1/u,this.x*=u,this.y*=u,this.z*=u,this.w*=u)},r.prototype.normalizeFast=function(){var u=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;u===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=u,this.y*=u,this.z*=u,this.w*=u)},r.prototype.vmult=function(u,f){f=f||new s;var g=u.x,m=u.y,p=u.z,v=this.x,x=this.y,w=this.z,y=this.w,b=y*g+x*p-w*m,L=y*m+w*g-v*p,k=y*p+v*m-x*g,_=-v*g-x*m-w*p;return f.x=b*y+_*-v+L*-w-k*-x,f.y=L*y+_*-x+k*-v-b*-w,f.z=k*y+_*-w+b*-x-L*-v,f},r.prototype.copy=function(u){return this.x=u.x,this.y=u.y,this.z=u.z,this.w=u.w,this},r.prototype.toEuler=function(u,f){f=f||"YZX";var g,m,p,v=this.x,x=this.y,w=this.z,y=this.w;switch(f){case"YZX":var b=v*x+w*y;if(b>.499&&(g=2*Math.atan2(v,y),m=Math.PI/2,p=0),b<-.499&&(g=-2*Math.atan2(v,y),m=-Math.PI/2,p=0),isNaN(g)){var L=v*v,k=x*x,_=w*w;g=Math.atan2(2*x*y-2*v*w,1-2*k-2*_),m=Math.asin(2*b),p=Math.atan2(2*v*y-2*x*w,1-2*L-2*_)}break;default:throw new Error("Euler order "+f+" not supported yet.")}u.y=g,u.z=m,u.x=p},r.prototype.setFromEuler=function(u,f,g,m){m=m||"XYZ";var p=Math.cos(u/2),v=Math.cos(f/2),x=Math.cos(g/2),w=Math.sin(u/2),y=Math.sin(f/2),b=Math.sin(g/2);return m==="XYZ"?(this.x=w*v*x+p*y*b,this.y=p*y*x-w*v*b,this.z=p*v*b+w*y*x,this.w=p*v*x-w*y*b):m==="YXZ"?(this.x=w*v*x+p*y*b,this.y=p*y*x-w*v*b,this.z=p*v*b-w*y*x,this.w=p*v*x+w*y*b):m==="ZXY"?(this.x=w*v*x-p*y*b,this.y=p*y*x+w*v*b,this.z=p*v*b+w*y*x,this.w=p*v*x-w*y*b):m==="ZYX"?(this.x=w*v*x-p*y*b,this.y=p*y*x+w*v*b,this.z=p*v*b-w*y*x,this.w=p*v*x+w*y*b):m==="YZX"?(this.x=w*v*x+p*y*b,this.y=p*y*x+w*v*b,this.z=p*v*b-w*y*x,this.w=p*v*x-w*y*b):m==="XZY"&&(this.x=w*v*x-p*y*b,this.y=p*y*x-w*v*b,this.z=p*v*b+w*y*x,this.w=p*v*x+w*y*b),this},r.prototype.clone=function(){return new r(this.x,this.y,this.z,this.w)}},{"./Vec3":30}],29:[function(t,n,i){var s=t("./Vec3"),r=t("./Quaternion");n.exports=o;function o(c){c=c||{},this.position=new s,c.position&&this.position.copy(c.position),this.quaternion=new r,c.quaternion&&this.quaternion.copy(c.quaternion)}var a=new r;o.pointToLocalFrame=function(c,h,l,f){var f=f||new s;return l.vsub(c,f),h.conjugate(a),a.vmult(f,f),f},o.prototype.pointToLocal=function(c,h){return o.pointToLocalFrame(this.position,this.quaternion,c,h)},o.pointToWorldFrame=function(c,h,l,f){var f=f||new s;return h.vmult(l,f),f.vadd(c,f),f},o.prototype.pointToWorld=function(c,h){return o.pointToWorldFrame(this.position,this.quaternion,c,h)},o.prototype.vectorToWorldFrame=function(c,l){var l=l||new s;return this.quaternion.vmult(c,l),l},o.vectorToWorldFrame=function(c,h,l){return c.vmult(h,l),l},o.vectorToLocalFrame=function(c,h,l,f){var f=f||new s;return h.w*=-1,h.vmult(l,f),h.w*=-1,f}},{"./Quaternion":28,"./Vec3":30}],30:[function(t,n,i){n.exports=r;var s=t("./Mat3");function r(h,l,u){this.x=h||0,this.y=l||0,this.z=u||0}r.ZERO=new r(0,0,0),r.UNIT_X=new r(1,0,0),r.UNIT_Y=new r(0,1,0),r.UNIT_Z=new r(0,0,1),r.prototype.cross=function(h,l){var u=h.x,f=h.y,g=h.z,m=this.x,p=this.y,v=this.z;return l=l||new r,l.x=p*g-v*f,l.y=v*u-m*g,l.z=m*f-p*u,l},r.prototype.set=function(h,l,u){return this.x=h,this.y=l,this.z=u,this},r.prototype.setZero=function(){this.x=this.y=this.z=0},r.prototype.vadd=function(h,l){if(l)l.x=h.x+this.x,l.y=h.y+this.y,l.z=h.z+this.z;else return new r(this.x+h.x,this.y+h.y,this.z+h.z)},r.prototype.vsub=function(h,l){if(l)l.x=this.x-h.x,l.y=this.y-h.y,l.z=this.z-h.z;else return new r(this.x-h.x,this.y-h.y,this.z-h.z)},r.prototype.crossmat=function(){return new s([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])},r.prototype.normalize=function(){var h=this.x,l=this.y,u=this.z,f=Math.sqrt(h*h+l*l+u*u);if(f>0){var g=1/f;this.x*=g,this.y*=g,this.z*=g}else this.x=0,this.y=0,this.z=0;return f},r.prototype.unit=function(h){h=h||new r;var l=this.x,u=this.y,f=this.z,g=Math.sqrt(l*l+u*u+f*f);return g>0?(g=1/g,h.x=l*g,h.y=u*g,h.z=f*g):(h.x=1,h.y=0,h.z=0),h},r.prototype.norm=function(){var h=this.x,l=this.y,u=this.z;return Math.sqrt(h*h+l*l+u*u)},r.prototype.length=r.prototype.norm,r.prototype.norm2=function(){return this.dot(this)},r.prototype.lengthSquared=r.prototype.norm2,r.prototype.distanceTo=function(h){var l=this.x,u=this.y,f=this.z,g=h.x,m=h.y,p=h.z;return Math.sqrt((g-l)*(g-l)+(m-u)*(m-u)+(p-f)*(p-f))},r.prototype.distanceSquared=function(h){var l=this.x,u=this.y,f=this.z,g=h.x,m=h.y,p=h.z;return(g-l)*(g-l)+(m-u)*(m-u)+(p-f)*(p-f)},r.prototype.mult=function(h,l){l=l||new r;var u=this.x,f=this.y,g=this.z;return l.x=h*u,l.y=h*f,l.z=h*g,l},r.prototype.scale=r.prototype.mult,r.prototype.dot=function(h){return this.x*h.x+this.y*h.y+this.z*h.z},r.prototype.isZero=function(){return this.x===0&&this.y===0&&this.z===0},r.prototype.negate=function(h){return h=h||new r,h.x=-this.x,h.y=-this.y,h.z=-this.z,h};var o=new r,a=new r;r.prototype.tangents=function(h,l){var u=this.norm();if(u>0){var f=o,g=1/u;f.set(this.x*g,this.y*g,this.z*g);var m=a;Math.abs(f.x)<.9?(m.set(1,0,0),f.cross(m,h)):(m.set(0,1,0),f.cross(m,h)),f.cross(h,l)}else h.set(1,0,0),l.set(0,1,0)},r.prototype.toString=function(){return this.x+","+this.y+","+this.z},r.prototype.toArray=function(){return[this.x,this.y,this.z]},r.prototype.copy=function(h){return this.x=h.x,this.y=h.y,this.z=h.z,this},r.prototype.lerp=function(h,l,u){var f=this.x,g=this.y,m=this.z;u.x=f+(h.x-f)*l,u.y=g+(h.y-g)*l,u.z=m+(h.z-m)*l},r.prototype.almostEquals=function(h,l){return l===void 0&&(l=1e-6),!(Math.abs(this.x-h.x)>l||Math.abs(this.y-h.y)>l||Math.abs(this.z-h.z)>l)},r.prototype.almostZero=function(h){return h===void 0&&(h=1e-6),!(Math.abs(this.x)>h||Math.abs(this.y)>h||Math.abs(this.z)>h)};var c=new r;r.prototype.isAntiparallelTo=function(h,l){return this.negate(c),c.almostEquals(h,l)},r.prototype.clone=function(){return new r(this.x,this.y,this.z)}},{"./Mat3":27}],31:[function(t,n,i){n.exports=l;var s=t("../utils/EventTarget");t("../shapes/Shape");var r=t("../math/Vec3"),o=t("../math/Mat3"),a=t("../math/Quaternion");t("../material/Material");var c=t("../collision/AABB"),h=t("../shapes/Box");function l(C){C=C||{},s.apply(this),this.id=l.idCounter++,this.world=null,this.preStep=null,this.postStep=null,this.vlambda=new r,this.collisionFilterGroup=typeof C.collisionFilterGroup=="number"?C.collisionFilterGroup:1,this.collisionFilterMask=typeof C.collisionFilterMask=="number"?C.collisionFilterMask:1,this.collisionResponse=!0,this.position=new r,C.position&&this.position.copy(C.position),this.previousPosition=new r,this.initPosition=new r,this.velocity=new r,C.velocity&&this.velocity.copy(C.velocity),this.initVelocity=new r,this.force=new r;var U=typeof C.mass=="number"?C.mass:0;this.mass=U,this.invMass=U>0?1/U:0,this.material=C.material||null,this.linearDamping=typeof C.linearDamping=="number"?C.linearDamping:.01,this.type=U<=0?l.STATIC:l.DYNAMIC,typeof C.type==typeof l.STATIC&&(this.type=C.type),this.allowSleep=typeof C.allowSleep<"u"?C.allowSleep:!0,this.sleepState=0,this.sleepSpeedLimit=typeof C.sleepSpeedLimit<"u"?C.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof C.sleepTimeLimit<"u"?C.sleepTimeLimit:1,this.timeLastSleepy=0,this._wakeUpAfterNarrowphase=!1,this.torque=new r,this.quaternion=new a,C.quaternion&&this.quaternion.copy(C.quaternion),this.initQuaternion=new a,this.angularVelocity=new r,C.angularVelocity&&this.angularVelocity.copy(C.angularVelocity),this.initAngularVelocity=new r,this.interpolatedPosition=new r,this.interpolatedQuaternion=new a,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new r,this.invInertia=new r,this.invInertiaWorld=new o,this.invMassSolve=0,this.invInertiaSolve=new r,this.invInertiaWorldSolve=new o,this.fixedRotation=typeof C.fixedRotation<"u"?C.fixedRotation:!1,this.angularDamping=typeof C.angularDamping<"u"?C.angularDamping:.01,this.aabb=new c,this.aabbNeedsUpdate=!0,this.wlambda=new r,C.shape&&this.addShape(C.shape),this.updateMassProperties()}l.prototype=new s,l.prototype.constructor=l,l.DYNAMIC=1,l.STATIC=2,l.KINEMATIC=4,l.AWAKE=0,l.SLEEPY=1,l.SLEEPING=2,l.idCounter=0,l.prototype.wakeUp=function(){var C=this.sleepState;this.sleepState=0,C===l.SLEEPING&&this.dispatchEvent({type:"wakeup"})},l.prototype.sleep=function(){this.sleepState=l.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0)},l.sleepyEvent={type:"sleepy"},l.sleepEvent={type:"sleep"},l.prototype.sleepTick=function(C){if(this.allowSleep){var U=this.sleepState,T=this.velocity.norm2()+this.angularVelocity.norm2(),N=Math.pow(this.sleepSpeedLimit,2);U===l.AWAKE&&T<N?(this.sleepState=l.SLEEPY,this.timeLastSleepy=C,this.dispatchEvent(l.sleepyEvent)):U===l.SLEEPY&&T>N?this.wakeUp():U===l.SLEEPY&&C-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(l.sleepEvent))}},l.prototype.updateSolveMassProperties=function(){this.sleepState===l.SLEEPING||this.type===l.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))},l.prototype.pointToLocalFrame=function(C,T){var T=T||new r;return C.vsub(this.position,T),this.quaternion.conjugate().vmult(T,T),T},l.prototype.vectorToLocalFrame=function(C,T){var T=T||new r;return this.quaternion.conjugate().vmult(C,T),T},l.prototype.pointToWorldFrame=function(C,T){var T=T||new r;return this.quaternion.vmult(C,T),T.vadd(this.position,T),T},l.prototype.vectorToWorldFrame=function(C,T){var T=T||new r;return this.quaternion.vmult(C,T),T};var u=new r,f=new a;l.prototype.addShape=function(C,U,T){var N=new r,Y=new a;return U&&N.copy(U),T&&Y.copy(T),this.shapes.push(C),this.shapeOffsets.push(N),this.shapeOrientations.push(Y),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,this},l.prototype.updateBoundingRadius=function(){for(var C=this.shapes,U=this.shapeOffsets,T=C.length,N=0,Y=0;Y!==T;Y++){var te=C[Y];te.updateBoundingSphereRadius();var W=U[Y].norm(),O=te.boundingSphereRadius;W+O>N&&(N=W+O)}this.boundingRadius=N};var g=new c;l.prototype.computeAABB=function(){for(var C=this.shapes,U=this.shapeOffsets,T=this.shapeOrientations,N=C.length,Y=u,te=f,W=this.quaternion,O=this.aabb,ee=g,K=0;K!==N;K++){var P=C[K];T[K].mult(W,te),te.vmult(U[K],Y),Y.vadd(this.position,Y),P.calculateWorldAABB(Y,te,ee.lowerBound,ee.upperBound),K===0?O.copy(ee):O.extend(ee)}this.aabbNeedsUpdate=!1};var m=new o,p=new o;new o,l.prototype.updateInertiaWorld=function(C){var U=this.invInertia;if(!(U.x===U.y&&U.y===U.z&&!C)){var T=m,N=p;T.setRotationFromQuaternion(this.quaternion),T.transpose(N),T.scale(U,T),T.mmult(N,this.invInertiaWorld)}};var v=new r,x=new r;l.prototype.applyForce=function(C,U){if(this.type===l.DYNAMIC){var T=v;U.vsub(this.position,T);var N=x;T.cross(C,N),this.force.vadd(C,this.force),this.torque.vadd(N,this.torque)}};var w=new r,y=new r;l.prototype.applyLocalForce=function(C,U){if(this.type===l.DYNAMIC){var T=w,N=y;this.vectorToWorldFrame(C,T),this.pointToWorldFrame(U,N),this.applyForce(T,N)}};var b=new r,L=new r,k=new r;l.prototype.applyImpulse=function(C,U){if(this.type===l.DYNAMIC){var T=b;U.vsub(this.position,T);var N=L;N.copy(C),N.mult(this.invMass,N),this.velocity.vadd(N,this.velocity);var Y=k;T.cross(C,Y),this.invInertiaWorld.vmult(Y,Y),this.angularVelocity.vadd(Y,this.angularVelocity)}};var _=new r,M=new r;l.prototype.applyLocalImpulse=function(C,U){if(this.type===l.DYNAMIC){var T=_,N=M;this.vectorToWorldFrame(C,T),this.pointToWorldFrame(U,N),this.applyImpulse(T,N)}};var E=new r;l.prototype.updateMassProperties=function(){var C=E;this.invMass=this.mass>0?1/this.mass:0;var U=this.inertia,T=this.fixedRotation;this.computeAABB(),C.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),h.calculateInertia(C,this.mass,U),this.invInertia.set(U.x>0&&!T?1/U.x:0,U.y>0&&!T?1/U.y:0,U.z>0&&!T?1/U.z:0),this.updateInertiaWorld(!0)},l.prototype.getVelocityAtWorldPoint=function(C,U){var T=new r;return C.vsub(this.position,T),this.angularVelocity.cross(T,U),this.velocity.vadd(U,U),U}},{"../collision/AABB":3,"../material/Material":25,"../math/Mat3":27,"../math/Quaternion":28,"../math/Vec3":30,"../shapes/Box":37,"../shapes/Shape":43,"../utils/EventTarget":49}],32:[function(t,n,i){t("./Body");var s=t("../math/Vec3"),r=t("../math/Quaternion");t("../collision/RaycastResult");var o=t("../collision/Ray"),a=t("../objects/WheelInfo");n.exports=c;function c(W){this.chassisBody=W.chassisBody,this.wheelInfos=[],this.sliding=!1,this.world=null,this.indexRightAxis=typeof W.indexRightAxis<"u"?W.indexRightAxis:1,this.indexForwardAxis=typeof W.indexForwardAxis<"u"?W.indexForwardAxis:0,this.indexUpAxis=typeof W.indexUpAxis<"u"?W.indexUpAxis:2}new s,new s,new s;var h=new s,l=new s,u=new s;new o,c.prototype.addWheel=function(W){W=W||{};var O=new a(W),ee=this.wheelInfos.length;return this.wheelInfos.push(O),ee},c.prototype.setSteeringValue=function(W,O){var ee=this.wheelInfos[O];ee.steering=W},new s,c.prototype.applyEngineForce=function(W,O){this.wheelInfos[O].engineForce=W},c.prototype.setBrake=function(W,O){this.wheelInfos[O].brake=W},c.prototype.addToWorld=function(W){this.constraints,W.add(this.chassisBody);var O=this;this.preStepCallback=function(){O.updateVehicle(W.dt)},W.addEventListener("preStep",this.preStepCallback),this.world=W},c.prototype.getVehicleAxisWorld=function(W,O){O.set(W===0?1:0,W===1?1:0,W===2?1:0),this.chassisBody.vectorToWorldFrame(O,O)},c.prototype.updateVehicle=function(W){for(var O=this.wheelInfos,ee=O.length,K=this.chassisBody,P=0;P<ee;P++)this.updateWheelTransform(P);this.currentVehicleSpeedKmHour=3.6*K.velocity.norm();var H=new s;this.getVehicleAxisWorld(this.indexForwardAxis,H),H.dot(K.velocity)<0&&(this.currentVehicleSpeedKmHour*=-1);for(var P=0;P<ee;P++)this.castRay(O[P]);this.updateSuspension(W);for(var D=new s,I=new s,P=0;P<ee;P++){var R=O[P],V=R.suspensionForce;V>R.maxSuspensionForce&&(V=R.maxSuspensionForce),R.raycastResult.hitNormalWorld.scale(V*W,D),R.raycastResult.hitPointWorld.vsub(K.position,I),K.applyImpulse(D,R.raycastResult.hitPointWorld)}this.updateFriction(W);var re=new s,ne=new s,$=new s;for(P=0;P<ee;P++){var R=O[P];K.getVelocityAtWorldPoint(R.chassisConnectionPointWorld,$);var Q=1;switch(this.indexUpAxis){case 1:Q=-1;break}if(R.isInContact){this.getVehicleAxisWorld(this.indexForwardAxis,ne);var he=ne.dot(R.raycastResult.hitNormalWorld);R.raycastResult.hitNormalWorld.scale(he,re),ne.vsub(re,ne);var Se=ne.dot($);R.deltaRotation=Q*Se*W/R.radius}(R.sliding||!R.isInContact)&&R.engineForce!==0&&R.useCustomSlidingRotationalSpeed&&(R.deltaRotation=(R.engineForce>0?1:-1)*R.customSlidingRotationalSpeed*W),Math.abs(R.brake)>Math.abs(R.engineForce)&&(R.deltaRotation=0),R.rotation+=R.deltaRotation,R.deltaRotation*=.99}},c.prototype.updateSuspension=function(W){for(var O=this.chassisBody,ee=O.mass,K=this.wheelInfos,P=K.length,H=0;H<P;H++){var D=K[H];if(D.isInContact){var I,R=D.suspensionRestLength,V=D.suspensionLength,re=R-V;I=D.suspensionStiffness*re*D.clippedInvContactDotSuspension;var ne=D.suspensionRelativeVelocity,$;ne<0?$=D.dampingCompression:$=D.dampingRelaxation,I-=$*ne,D.suspensionForce=I*ee,D.suspensionForce<0&&(D.suspensionForce=0)}else D.suspensionForce=0}},c.prototype.removeFromWorld=function(W){this.constraints,W.remove(this.chassisBody),W.removeEventListener("preStep",this.preStepCallback),this.world=null};var f=new s,g=new s;c.prototype.castRay=function(W){var O=f,ee=g;this.updateWheelTransformWorld(W);var K=this.chassisBody,P=-1,H=W.suspensionRestLength+W.radius;W.directionWorld.scale(H,O);var D=W.chassisConnectionPointWorld;D.vadd(O,ee);var I=W.raycastResult;I.reset();var R=K.collisionResponse;K.collisionResponse=!1,this.world.rayTest(D,ee,I),K.collisionResponse=R;var V=I.body;if(W.raycastResult.groundObject=0,V){P=I.distance,W.raycastResult.hitNormalWorld=I.hitNormalWorld,W.isInContact=!0;var re=I.distance;W.suspensionLength=re-W.radius;var ne=W.suspensionRestLength-W.maxSuspensionTravel,$=W.suspensionRestLength+W.maxSuspensionTravel;W.suspensionLength<ne&&(W.suspensionLength=ne),W.suspensionLength>$&&(W.suspensionLength=$,W.raycastResult.reset());var Q=W.raycastResult.hitNormalWorld.dot(W.directionWorld),he=new s;K.getVelocityAtWorldPoint(W.raycastResult.hitPointWorld,he);var Se=W.raycastResult.hitNormalWorld.dot(he);if(Q>=-.1)W.suspensionRelativeVelocity=0,W.clippedInvContactDotSuspension=1/.1;else{var ge=-1/Q;W.suspensionRelativeVelocity=Se*ge,W.clippedInvContactDotSuspension=ge}}else W.suspensionLength=W.suspensionRestLength+0*W.maxSuspensionTravel,W.suspensionRelativeVelocity=0,W.directionWorld.scale(-1,W.raycastResult.hitNormalWorld),W.clippedInvContactDotSuspension=1;return P},c.prototype.updateWheelTransformWorld=function(W){W.isInContact=!1;var O=this.chassisBody;O.pointToWorldFrame(W.chassisConnectionPointLocal,W.chassisConnectionPointWorld),O.vectorToWorldFrame(W.directionLocal,W.directionWorld),O.vectorToWorldFrame(W.axleLocal,W.axleWorld)},c.prototype.updateWheelTransform=function(W){var O=h,ee=l,K=u,P=this.wheelInfos[W];this.updateWheelTransformWorld(P),P.directionLocal.scale(-1,O),ee.copy(P.axleLocal),O.cross(ee,K),K.normalize(),ee.normalize();var H=P.steering,D=new r;D.setFromAxisAngle(O,H);var I=new r;I.setFromAxisAngle(ee,P.rotation);var R=P.worldTransform.quaternion;this.chassisBody.quaternion.mult(D,R),R.mult(I,R),R.normalize();var V=P.worldTransform.position;V.copy(P.directionWorld),V.scale(P.suspensionLength,V),V.vadd(P.chassisConnectionPointWorld,V)};var m=[new s(1,0,0),new s(0,1,0),new s(0,0,1)];c.prototype.getWheelTransformWorld=function(W){return this.wheelInfos[W].worldTransform};var p=new s,v=[],x=[],w=1;c.prototype.updateFriction=function(W){for(var O=p,ee=this.wheelInfos,K=ee.length,P=this.chassisBody,H=x,D=v,I=0;I<K;I++){var R=ee[I],V=R.raycastResult.body;R.sideImpulse=0,R.forwardImpulse=0,H[I]||(H[I]=new s),D[I]||(D[I]=new s)}for(var I=0;I<K;I++){var R=ee[I],V=R.raycastResult.body;if(V){var re=D[I],ne=this.getWheelTransformWorld(I);ne.vectorToWorldFrame(m[this.indexRightAxis],re);var $=R.raycastResult.hitNormalWorld,Q=re.dot($);$.scale(Q,O),re.vsub(O,re),re.normalize(),$.cross(re,H[I]),H[I].normalize(),R.sideImpulse=te(P,R.raycastResult.hitPointWorld,V,R.raycastResult.hitPointWorld,re),R.sideImpulse*=w}}var he=1,Se=.5;this.sliding=!1;for(var I=0;I<K;I++){var R=ee[I],V=R.raycastResult.body,ge=0;if(R.slipInfo=1,V){var Ee=0,ue=R.brake?R.brake:Ee;ge=k(P,V,R.raycastResult.hitPointWorld,H[I],ue),ge+=R.engineForce*W;var xe=ue/ge;R.slipInfo*=xe}if(R.forwardImpulse=0,R.skidInfo=1,V){R.skidInfo=1;var Ye=R.suspensionForce*W*R.frictionSlip,ze=Ye,Ge=Ye*ze;R.forwardImpulse=ge;var Pe=R.forwardImpulse*Se,$e=R.sideImpulse*he,B=Pe*Pe+$e*$e;if(R.sliding=!1,B>Ge){this.sliding=!0,R.sliding=!0;var xe=Ye/Math.sqrt(B);R.skidInfo*=xe}}}if(this.sliding)for(var I=0;I<K;I++){var R=ee[I];R.sideImpulse!==0&&R.skidInfo<1&&(R.forwardImpulse*=R.skidInfo,R.sideImpulse*=R.skidInfo)}for(var I=0;I<K;I++){var R=ee[I],A=new s;if(A.copy(R.raycastResult.hitPointWorld),R.forwardImpulse!==0){var se=new s;H[I].scale(R.forwardImpulse,se),P.applyImpulse(se,A)}if(R.sideImpulse!==0){var V=R.raycastResult.body,pe=new s;pe.copy(R.raycastResult.hitPointWorld);var ye=new s;D[I].scale(R.sideImpulse,ye),P.pointToLocalFrame(A,A),A["xyz"[this.indexUpAxis]]*=R.rollInfluence,P.pointToWorldFrame(A,A),P.applyImpulse(ye,A),ye.scale(-1,ye),V.applyImpulse(ye,pe)}}};var y=new s,b=new s,L=new s;function k(W,O,ee,K,P){var H=0,D=ee,I=y,R=b,V=L;W.getVelocityAtWorldPoint(D,I),O.getVelocityAtWorldPoint(D,R),I.vsub(R,V);var re=K.dot(V),ne=U(W,ee,K),$=U(O,ee,K),Q=1,he=Q/(ne+$);return H=-re*he,P<H&&(H=P),H<-P&&(H=-P),H}var _=new s,M=new s,E=new s,C=new s;function U(W,O,ee){var K=_,P=M,H=E,D=C;return O.vsub(W.position,K),K.cross(ee,P),W.invInertiaWorld.vmult(P,D),D.cross(K,H),W.invMass+ee.dot(H)}var T=new s,N=new s,Y=new s;function te(W,O,ee,K,P,Q){var D=P.norm2();if(D>1.1)return 0;var I=T,R=N,V=Y;W.getVelocityAtWorldPoint(O,I),ee.getVelocityAtWorldPoint(K,R),I.vsub(R,V);var re=P.dot(V),ne=.2,$=1/(W.invMass+ee.invMass),Q=-ne*re*$;return Q}},{"../collision/Ray":9,"../collision/RaycastResult":10,"../math/Quaternion":28,"../math/Vec3":30,"../objects/WheelInfo":36,"./Body":31}],33:[function(t,n,i){var s=t("./Body"),r=t("../shapes/Sphere"),o=t("../shapes/Box"),a=t("../math/Vec3"),c=t("../constraints/HingeConstraint");n.exports=h;function h(f){if(this.wheelBodies=[],this.coordinateSystem=typeof f.coordinateSystem>"u"?new a(1,2,3):f.coordinateSystem.clone(),this.chassisBody=f.chassisBody,!this.chassisBody){var g=new o(new a(5,2,.5));this.chassisBody=new s(1,g)}this.constraints=[],this.wheelAxes=[],this.wheelForces=[]}h.prototype.addWheel=function(f){f=f||{};var g=f.body;g||(g=new s(1,new r(1.2))),this.wheelBodies.push(g),this.wheelForces.push(0),new a;var m=typeof f.position<"u"?f.position.clone():new a,p=new a;this.chassisBody.pointToWorldFrame(m,p),g.position.set(p.x,p.y,p.z);var v=typeof f.axis<"u"?f.axis.clone():new a(0,1,0);this.wheelAxes.push(v);var x=new c(this.chassisBody,g,{pivotA:m,axisA:v,pivotB:a.ZERO,axisB:v,collideConnected:!1});return this.constraints.push(x),this.wheelBodies.length-1},h.prototype.setSteeringValue=function(f,g){var m=this.wheelAxes[g],p=Math.cos(f),v=Math.sin(f),x=m.x,w=m.y;this.constraints[g].axisA.set(p*x-v*w,v*x+p*w,0)},h.prototype.setMotorSpeed=function(f,g){var m=this.constraints[g];m.enableMotor(),m.motorTargetVelocity=f},h.prototype.disableMotor=function(f){var g=this.constraints[f];g.disableMotor()};var l=new a;h.prototype.setWheelForce=function(f,g){this.wheelForces[g]=f},h.prototype.applyWheelForce=function(f,g){var m=this.wheelAxes[g],p=this.wheelBodies[g],v=p.torque;m.scale(f,l),p.vectorToWorldFrame(l,l),v.vadd(l,v)},h.prototype.addToWorld=function(f){for(var g=this.constraints,m=this.wheelBodies.concat([this.chassisBody]),p=0;p<m.length;p++)f.add(m[p]);for(var p=0;p<g.length;p++)f.addConstraint(g[p]);f.addEventListener("preStep",this._update.bind(this))},h.prototype._update=function(){for(var f=this.wheelForces,g=0;g<f.length;g++)this.applyWheelForce(f[g],g)},h.prototype.removeFromWorld=function(f){for(var g=this.constraints,m=this.wheelBodies.concat([this.chassisBody]),p=0;p<m.length;p++)f.remove(m[p]);for(var p=0;p<g.length;p++)f.removeConstraint(g[p])};var u=new a;h.prototype.getWheelSpeed=function(f){var g=this.wheelAxes[f],m=this.wheelBodies[f],p=m.angularVelocity;return this.chassisBody.vectorToWorldFrame(g,u),p.dot(u)}},{"../constraints/HingeConstraint":15,"../math/Vec3":30,"../shapes/Box":37,"../shapes/Sphere":44,"./Body":31}],34:[function(t,n,i){n.exports=r,t("../shapes/Shape");var s=t("../math/Vec3");t("../math/Quaternion"),t("../shapes/Particle"),t("../objects/Body"),t("../material/Material");function r(){this.particles=[],this.density=1,this.smoothingRadius=1,this.speedOfSound=1,this.viscosity=.01,this.eps=1e-6,this.pressures=[],this.densities=[],this.neighbors=[]}r.prototype.add=function(g){this.particles.push(g),this.neighbors.length<this.particles.length&&this.neighbors.push([])},r.prototype.remove=function(g){var m=this.particles.indexOf(g);m!==-1&&(this.particles.splice(m,1),this.neighbors.length>this.particles.length&&this.neighbors.pop())};var o=new s;r.prototype.getNeighbors=function(g,m){for(var p=this.particles.length,v=g.id,x=this.smoothingRadius*this.smoothingRadius,w=o,y=0;y!==p;y++){var b=this.particles[y];b.position.vsub(g.position,w),v!==b.id&&w.norm2()<x&&m.push(b)}};var a=new s,c=new s,h=new s,l=new s,u=new s,f=new s;r.prototype.update=function(){for(var g=this.particles.length,m=a,p=this.speedOfSound,v=this.eps,x=0;x!==g;x++){var w=this.particles[x],y=this.neighbors[x];y.length=0,this.getNeighbors(w,y),y.push(this.particles[x]);for(var b=y.length,L=0,k=0;k!==b;k++){w.position.vsub(y[k].position,m);var _=m.norm(),M=this.w(_);L+=y[k].mass*M}this.densities[x]=L,this.pressures[x]=p*p*(this.densities[x]-this.density)}for(var E=c,C=h,U=l,T=u,N=f,x=0;x!==g;x++){var Y=this.particles[x];E.set(0,0,0),C.set(0,0,0);for(var te,W,y=this.neighbors[x],b=y.length,k=0;k!==b;k++){var O=y[k];Y.position.vsub(O.position,T);var ee=T.norm();te=-O.mass*(this.pressures[x]/(this.densities[x]*this.densities[x]+v)+this.pressures[k]/(this.densities[k]*this.densities[k]+v)),this.gradw(T,U),U.mult(te,U),E.vadd(U,E),O.velocity.vsub(Y.velocity,N),N.mult(1/(1e-4+this.densities[x]*this.densities[k])*this.viscosity*O.mass,N),W=this.nablaw(ee),N.mult(W,N),C.vadd(N,C)}C.mult(Y.mass,C),E.mult(Y.mass,E),Y.force.vadd(C,Y.force),Y.force.vadd(E,Y.force)}},r.prototype.w=function(g){var m=this.smoothingRadius;return 315/(64*Math.PI*Math.pow(m,9))*Math.pow(m*m-g*g,3)},r.prototype.gradw=function(g,m){var p=g.norm(),v=this.smoothingRadius;g.mult(945/(32*Math.PI*Math.pow(v,9))*Math.pow(v*v-p*p,2),m)},r.prototype.nablaw=function(g){var m=this.smoothingRadius,p=945/(32*Math.PI*Math.pow(m,9))*(m*m-g*g)*(7*g*g-3*m*m);return p}},{"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Particle":41,"../shapes/Shape":43}],35:[function(t,n,i){var s=t("../math/Vec3");n.exports=r;function r(x,w,y){y=y||{},this.restLength=typeof y.restLength=="number"?y.restLength:1,this.stiffness=y.stiffness||100,this.damping=y.damping||1,this.bodyA=x,this.bodyB=w,this.localAnchorA=new s,this.localAnchorB=new s,y.localAnchorA&&this.localAnchorA.copy(y.localAnchorA),y.localAnchorB&&this.localAnchorB.copy(y.localAnchorB),y.worldAnchorA&&this.setWorldAnchorA(y.worldAnchorA),y.worldAnchorB&&this.setWorldAnchorB(y.worldAnchorB)}r.prototype.setWorldAnchorA=function(x){this.bodyA.pointToLocalFrame(x,this.localAnchorA)},r.prototype.setWorldAnchorB=function(x){this.bodyB.pointToLocalFrame(x,this.localAnchorB)},r.prototype.getWorldAnchorA=function(x){this.bodyA.pointToWorldFrame(this.localAnchorA,x)},r.prototype.getWorldAnchorB=function(x){this.bodyB.pointToWorldFrame(this.localAnchorB,x)};var o=new s,a=new s,c=new s,h=new s,l=new s,u=new s,f=new s,g=new s,m=new s,p=new s,v=new s;r.prototype.applyForce=function(){var x=this.stiffness,w=this.damping,y=this.restLength,b=this.bodyA,L=this.bodyB,k=o,_=a,M=c,E=h,C=v,U=l,T=u,N=f,Y=g,te=m,W=p;this.getWorldAnchorA(U),this.getWorldAnchorB(T),U.vsub(b.position,N),T.vsub(L.position,Y),T.vsub(U,k);var O=k.norm();_.copy(k),_.normalize(),L.velocity.vsub(b.velocity,M),L.angularVelocity.cross(Y,C),M.vadd(C,M),b.angularVelocity.cross(N,C),M.vsub(C,M),_.mult(-x*(O-y)-w*M.dot(_),E),b.force.vsub(E,b.force),L.force.vadd(E,L.force),N.cross(E,te),Y.cross(E,W),b.torque.vsub(te,b.torque),L.torque.vadd(W,L.torque)}},{"../math/Vec3":30}],36:[function(t,n,i){var s=t("../math/Vec3"),r=t("../math/Transform"),o=t("../collision/RaycastResult"),a=t("../utils/Utils");n.exports=c;function c(u){u=a.defaults(u,{chassisConnectionPointLocal:new s,chassisConnectionPointWorld:new s,directionLocal:new s,directionWorld:new s,axleLocal:new s,axleWorld:new s,suspensionRestLength:1,suspensionMaxLength:2,radius:1,suspensionStiffness:100,dampingCompression:10,dampingRelaxation:10,frictionSlip:1e4,steering:0,rotation:0,deltaRotation:0,rollInfluence:.01,maxSuspensionForce:Number.MAX_VALUE,isFrontWheel:!0,clippedInvContactDotSuspension:1,suspensionRelativeVelocity:0,suspensionForce:0,skidInfo:0,suspensionLength:0,maxSuspensionTravel:1,useCustomSlidingRotationalSpeed:!1,customSlidingRotationalSpeed:-.1}),this.maxSuspensionTravel=u.maxSuspensionTravel,this.customSlidingRotationalSpeed=u.customSlidingRotationalSpeed,this.useCustomSlidingRotationalSpeed=u.useCustomSlidingRotationalSpeed,this.sliding=!1,this.chassisConnectionPointLocal=u.chassisConnectionPointLocal.clone(),this.chassisConnectionPointWorld=u.chassisConnectionPointWorld.clone(),this.directionLocal=u.directionLocal.clone(),this.directionWorld=u.directionWorld.clone(),this.axleLocal=u.axleLocal.clone(),this.axleWorld=u.axleWorld.clone(),this.suspensionRestLength=u.suspensionRestLength,this.suspensionMaxLength=u.suspensionMaxLength,this.radius=u.radius,this.suspensionStiffness=u.suspensionStiffness,this.dampingCompression=u.dampingCompression,this.dampingRelaxation=u.dampingRelaxation,this.frictionSlip=u.frictionSlip,this.steering=0,this.rotation=0,this.deltaRotation=0,this.rollInfluence=u.rollInfluence,this.maxSuspensionForce=u.maxSuspensionForce,this.engineForce=0,this.brake=0,this.isFrontWheel=u.isFrontWheel,this.clippedInvContactDotSuspension=1,this.suspensionRelativeVelocity=0,this.suspensionForce=0,this.skidInfo=0,this.suspensionLength=0,this.sideImpulse=0,this.forwardImpulse=0,this.raycastResult=new o,this.worldTransform=new r,this.isInContact=!1}var l=new s,h=new s,l=new s;c.prototype.updateWheel=function(u){var f=this.raycastResult;if(this.isInContact){var g=f.hitNormalWorld.dot(f.directionWorld);f.hitPointWorld.vsub(u.position,h),u.getVelocityAtWorldPoint(h,l);var m=f.hitNormalWorld.dot(l);if(g>=-.1)this.suspensionRelativeVelocity=0,this.clippedInvContactDotSuspension=1/.1;else{var p=-1/g;this.suspensionRelativeVelocity=m*p,this.clippedInvContactDotSuspension=p}}else f.suspensionLength=this.suspensionRestLength,this.suspensionRelativeVelocity=0,f.directionWorld.scale(-1,f.hitNormalWorld),this.clippedInvContactDotSuspension=1}},{"../collision/RaycastResult":10,"../math/Transform":29,"../math/Vec3":30,"../utils/Utils":53}],37:[function(t,n,i){n.exports=a;var s=t("./Shape"),r=t("../math/Vec3"),o=t("./ConvexPolyhedron");function a(l){s.call(this),this.type=s.types.BOX,this.halfExtents=l,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}a.prototype=new s,a.prototype.constructor=a,a.prototype.updateConvexPolyhedronRepresentation=function(){var l=this.halfExtents.x,u=this.halfExtents.y,f=this.halfExtents.z,g=r,m=[new g(-l,-u,-f),new g(l,-u,-f),new g(l,u,-f),new g(-l,u,-f),new g(-l,-u,f),new g(l,-u,f),new g(l,u,f),new g(-l,u,f)],p=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]];new g(0,0,1),new g(0,1,0),new g(1,0,0);var v=new o(m,p);this.convexPolyhedronRepresentation=v,v.material=this.material},a.prototype.calculateLocalInertia=function(l,u){return u=u||new r,a.calculateInertia(this.halfExtents,l,u),u},a.calculateInertia=function(l,u,f){var g=l;f.x=1/12*u*(2*g.y*2*g.y+2*g.z*2*g.z),f.y=1/12*u*(2*g.x*2*g.x+2*g.z*2*g.z),f.z=1/12*u*(2*g.y*2*g.y+2*g.x*2*g.x)},a.prototype.getSideNormals=function(l,u){var f=l,g=this.halfExtents;if(f[0].set(g.x,0,0),f[1].set(0,g.y,0),f[2].set(0,0,g.z),f[3].set(-g.x,0,0),f[4].set(0,-g.y,0),f[5].set(0,0,-g.z),u!==void 0)for(var m=0;m!==f.length;m++)u.vmult(f[m],f[m]);return f},a.prototype.volume=function(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z},a.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=this.halfExtents.norm()};var c=new r;new r,a.prototype.forEachWorldCorner=function(l,u,f){for(var g=this.halfExtents,m=[[g.x,g.y,g.z],[-g.x,g.y,g.z],[-g.x,-g.y,g.z],[-g.x,-g.y,-g.z],[g.x,-g.y,-g.z],[g.x,g.y,-g.z],[-g.x,g.y,-g.z],[g.x,-g.y,g.z]],p=0;p<m.length;p++)c.set(m[p][0],m[p][1],m[p][2]),u.vmult(c,c),l.vadd(c,c),f(c.x,c.y,c.z)};var h=[new r,new r,new r,new r,new r,new r,new r,new r];a.prototype.calculateWorldAABB=function(l,u,f,g){var m=this.halfExtents;h[0].set(m.x,m.y,m.z),h[1].set(-m.x,m.y,m.z),h[2].set(-m.x,-m.y,m.z),h[3].set(-m.x,-m.y,-m.z),h[4].set(m.x,-m.y,-m.z),h[5].set(m.x,m.y,-m.z),h[6].set(-m.x,m.y,-m.z),h[7].set(m.x,-m.y,m.z);var p=h[0];u.vmult(p,p),l.vadd(p,p),g.copy(p),f.copy(p);for(var v=1;v<8;v++){var p=h[v];u.vmult(p,p),l.vadd(p,p);var x=p.x,w=p.y,y=p.z;x>g.x&&(g.x=x),w>g.y&&(g.y=w),y>g.z&&(g.z=y),x<f.x&&(f.x=x),w<f.y&&(f.y=w),y<f.z&&(f.z=y)}}},{"../math/Vec3":30,"./ConvexPolyhedron":38,"./Shape":43}],38:[function(t,n,i){n.exports=a;var s=t("./Shape"),r=t("../math/Vec3");t("../math/Quaternion");var o=t("../math/Transform");function a(P,H,D){s.call(this),this.type=s.types.CONVEXPOLYHEDRON,this.vertices=P||[],this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.faces=H||[],this.faceNormals=[],this.computeNormals(),this.worldFaceNormalsNeedsUpdate=!0,this.worldFaceNormals=[],this.uniqueEdges=[],this.uniqueAxes=D?D.slice():null,this.computeEdges(),this.updateBoundingSphereRadius()}a.prototype=new s,a.prototype.constructor=a;var c=new r;a.prototype.computeEdges=function(){var P=this.faces,H=this.vertices;H.length;var D=this.uniqueEdges;D.length=0;for(var I=c,R=0;R!==P.length;R++)for(var V=P[R],re=V.length,ne=0;ne!==re;ne++){var $=(ne+1)%re;H[V[ne]].vsub(H[V[$]],I),I.normalize();for(var Q=!1,he=0;he!==D.length;he++)if(D[he].almostEquals(I)||D[he].almostEquals(I)){Q=!0;break}Q||D.push(I.clone())}},a.prototype.computeNormals=function(){this.faceNormals.length=this.faces.length;for(var P=0;P<this.faces.length;P++){for(var H=0;H<this.faces[P].length;H++)if(!this.vertices[this.faces[P][H]])throw new Error("Vertex "+this.faces[P][H]+" not found!");var D=this.faceNormals[P]||new r;this.getFaceNormal(P,D),D.negate(D),this.faceNormals[P]=D;var I=this.vertices[this.faces[P][0]];if(D.dot(I)<0){console.error(".faceNormals["+P+"] = Vec3("+D.toString()+") looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.");for(var H=0;H<this.faces[P].length;H++)console.warn(".vertices["+this.faces[P][H]+"] = Vec3("+this.vertices[this.faces[P][H]].toString()+")")}}};var h=new r,l=new r;a.computeNormal=function(P,H,D,I){H.vsub(P,l),D.vsub(H,h),h.cross(l,I),I.isZero()||I.normalize()},a.prototype.getFaceNormal=function(P,H){var D=this.faces[P],I=this.vertices[D[0]],R=this.vertices[D[1]],V=this.vertices[D[2]];return a.computeNormal(I,R,V,H)};var u=new r;a.prototype.clipAgainstHull=function(P,H,D,I,R,V,re,ne,$){for(var Q=u,he=-1,Se=-Number.MAX_VALUE,ge=0;ge<D.faces.length;ge++){Q.copy(D.faceNormals[ge]),R.vmult(Q,Q);var Ee=Q.dot(V);Ee>Se&&(Se=Ee,he=ge)}for(var ue=[],xe=D.faces[he],Ye=xe.length,ze=0;ze<Ye;ze++){var Ge=D.vertices[xe[ze]],Pe=new r;Pe.copy(Ge),R.vmult(Pe,Pe),I.vadd(Pe,Pe),ue.push(Pe)}he>=0&&this.clipFaceAgainstHull(V,P,H,ue,re,ne,$)};var f=new r,g=new r,m=new r,p=new r,v=new r,x=new r;a.prototype.findSeparatingAxis=function(P,H,D,I,R,V,re,ne){var $=f,Q=g,he=m,Se=p,ge=v,Ee=x,ue=Number.MAX_VALUE,xe=this;if(xe.uniqueAxes)for(var ze=0;ze!==xe.uniqueAxes.length;ze++){D.vmult(xe.uniqueAxes[ze],$);var Pe=xe.testSepAxis($,P,H,D,I,R);if(Pe===!1)return!1;Pe<ue&&(ue=Pe,V.copy($))}else for(var Ye=re?re.length:xe.faces.length,ze=0;ze<Ye;ze++){var Ge=re?re[ze]:ze;$.copy(xe.faceNormals[Ge]),D.vmult($,$);var Pe=xe.testSepAxis($,P,H,D,I,R);if(Pe===!1)return!1;Pe<ue&&(ue=Pe,V.copy($))}if(P.uniqueAxes)for(var ze=0;ze!==P.uniqueAxes.length;ze++){R.vmult(P.uniqueAxes[ze],Q);var Pe=xe.testSepAxis(Q,P,H,D,I,R);if(Pe===!1)return!1;Pe<ue&&(ue=Pe,V.copy(Q))}else for(var $e=ne?ne.length:P.faces.length,ze=0;ze<$e;ze++){var Ge=ne?ne[ze]:ze;Q.copy(P.faceNormals[Ge]),R.vmult(Q,Q);var Pe=xe.testSepAxis(Q,P,H,D,I,R);if(Pe===!1)return!1;Pe<ue&&(ue=Pe,V.copy(Q))}for(var B=0;B!==xe.uniqueEdges.length;B++){D.vmult(xe.uniqueEdges[B],Se);for(var A=0;A!==P.uniqueEdges.length;A++)if(R.vmult(P.uniqueEdges[A],ge),Se.cross(ge,Ee),!Ee.almostZero()){Ee.normalize();var se=xe.testSepAxis(Ee,P,H,D,I,R);if(se===!1)return!1;se<ue&&(ue=se,V.copy(Ee))}}return I.vsub(H,he),he.dot(V)>0&&V.negate(V),!0};var w=[],y=[];a.prototype.testSepAxis=function(P,H,D,I,R,V){var re=this;a.project(re,P,D,I,w),a.project(H,P,R,V,y);var ne=w[0],$=w[1],Q=y[0],he=y[1];if(ne<he||Q<$)return!1;var Se=ne-he,ge=Q-$,Ee=Se<ge?Se:ge;return Ee};var b=new r,L=new r;a.prototype.calculateLocalInertia=function(P,H){this.computeLocalAABB(b,L);var D=L.x-b.x,I=L.y-b.y,R=L.z-b.z;H.x=1/12*P*(2*I*2*I+2*R*2*R),H.y=1/12*P*(2*D*2*D+2*R*2*R),H.z=1/12*P*(2*I*2*I+2*D*2*D)},a.prototype.getPlaneConstantOfFace=function(P){var H=this.faces[P],D=this.faceNormals[P],I=this.vertices[H[0]],R=-D.dot(I);return R};var k=new r,_=new r,M=new r,E=new r,C=new r,U=new r,T=new r,N=new r;a.prototype.clipFaceAgainstHull=function(P,H,D,I,R,V,re){for(var ne=k,$=_,Q=M,he=E,Se=C,ge=U,Ee=T,ue=N,xe=this,Ye=[],ze=I,Ge=Ye,Pe=-1,$e=Number.MAX_VALUE,B=0;B<xe.faces.length;B++){ne.copy(xe.faceNormals[B]),D.vmult(ne,ne);var A=ne.dot(P);A<$e&&($e=A,Pe=B)}if(!(Pe<0)){var se=xe.faces[Pe];se.connectedFaces=[];for(var pe=0;pe<xe.faces.length;pe++)for(var ye=0;ye<xe.faces[pe].length;ye++)se.indexOf(xe.faces[pe][ye])!==-1&&pe!==Pe&&se.connectedFaces.indexOf(pe)===-1&&se.connectedFaces.push(pe);ze.length;for(var _e=se.length,Ve=0;Ve<_e;Ve++){var q=xe.vertices[se[Ve]],ie=xe.vertices[se[(Ve+1)%_e]];q.vsub(ie,$),Q.copy($),D.vmult(Q,Q),H.vadd(Q,Q),he.copy(this.faceNormals[Pe]),D.vmult(he,he),H.vadd(he,he),Q.cross(he,Se),Se.negate(Se),ge.copy(q),D.vmult(ge,ge),H.vadd(ge,ge),-ge.dot(Se);var Le;{var De=se.connectedFaces[Ve];Ee.copy(this.faceNormals[De]);var Fe=this.getPlaneConstantOfFace(De);ue.copy(Ee),D.vmult(ue,ue);var Le=Fe-ue.dot(H)}for(this.clipFaceAgainstPlane(ze,Ge,ue,Le);ze.length;)ze.shift();for(;Ge.length;)ze.push(Ge.shift())}Ee.copy(this.faceNormals[Pe]);var Fe=this.getPlaneConstantOfFace(Pe);ue.copy(Ee),D.vmult(ue,ue);for(var Le=Fe-ue.dot(H),pe=0;pe<ze.length;pe++){var Oe=ue.dot(ze[pe])+Le;if(Oe<=R&&(console.log("clamped: depth="+Oe+" to minDist="+(R+"")),Oe=R),Oe<=V){var ke=ze[pe];if(Oe<=0){var Qe={point:ke,normal:ue,depth:Oe};re.push(Qe)}}}}},a.prototype.clipFaceAgainstPlane=function(P,H,D,I){var R,V,re=P.length;if(re<2)return H;var ne=P[P.length-1],$=P[0];R=D.dot(ne)+I;for(var Q=0;Q<re;Q++){if($=P[Q],V=D.dot($)+I,R<0)if(V<0){var he=new r;he.copy($),H.push(he)}else{var he=new r;ne.lerp($,R/(R-V),he),H.push(he)}else if(V<0){var he=new r;ne.lerp($,R/(R-V),he),H.push(he),H.push($)}ne=$,R=V}return H},a.prototype.computeWorldVertices=function(P,H){for(var D=this.vertices.length;this.worldVertices.length<D;)this.worldVertices.push(new r);for(var I=this.vertices,R=this.worldVertices,V=0;V!==D;V++)H.vmult(I[V],R[V]),P.vadd(R[V],R[V]);this.worldVerticesNeedsUpdate=!1},new r,a.prototype.computeLocalAABB=function(P,H){var D=this.vertices.length,I=this.vertices;P.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),H.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(var R=0;R<D;R++){var V=I[R];V.x<P.x?P.x=V.x:V.x>H.x&&(H.x=V.x),V.y<P.y?P.y=V.y:V.y>H.y&&(H.y=V.y),V.z<P.z?P.z=V.z:V.z>H.z&&(H.z=V.z)}},a.prototype.computeWorldFaceNormals=function(P){for(var H=this.faceNormals.length;this.worldFaceNormals.length<H;)this.worldFaceNormals.push(new r);for(var D=this.faceNormals,I=this.worldFaceNormals,R=0;R!==H;R++)P.vmult(D[R],I[R]);this.worldFaceNormalsNeedsUpdate=!1},a.prototype.updateBoundingSphereRadius=function(){for(var P=0,H=this.vertices,D=0,I=H.length;D!==I;D++){var R=H[D].norm2();R>P&&(P=R)}this.boundingSphereRadius=Math.sqrt(P)};var Y=new r;a.prototype.calculateWorldAABB=function(P,H,D,I){for(var R=this.vertices.length,V=this.vertices,re,ne,$,Q,he,Se,ge=0;ge<R;ge++){Y.copy(V[ge]),H.vmult(Y,Y),P.vadd(Y,Y);var Ee=Y;Ee.x<re||re===void 0?re=Ee.x:(Ee.x>Q||Q===void 0)&&(Q=Ee.x),Ee.y<ne||ne===void 0?ne=Ee.y:(Ee.y>he||he===void 0)&&(he=Ee.y),Ee.z<$||$===void 0?$=Ee.z:(Ee.z>Se||Se===void 0)&&(Se=Ee.z)}D.set(re,ne,$),I.set(Q,he,Se)},a.prototype.volume=function(){return 4*Math.PI*this.boundingSphereRadius/3},a.prototype.getAveragePointLocal=function(P){P=P||new r;for(var H=this.vertices.length,D=this.vertices,I=0;I<H;I++)P.vadd(D[I],P);return P.mult(1/H,P),P},a.prototype.transformAllPoints=function(P,H){var D=this.vertices.length,I=this.vertices;if(H){for(var R=0;R<D;R++){var V=I[R];H.vmult(V,V)}for(var R=0;R<this.faceNormals.length;R++){var V=this.faceNormals[R];H.vmult(V,V)}}if(P)for(var R=0;R<D;R++){var V=I[R];V.vadd(P,V)}};var te=new r,W=new r,O=new r;a.prototype.pointIsInside=function(P){var H=this.vertices.length,D=this.vertices,I=this.faces,R=this.faceNormals,V=null,re=this.faces.length,ne=te;this.getAveragePointLocal(ne);for(var $=0;$<re;$++){this.faces[$].length;var H=R[$],Q=D[I[$][0]],he=W;P.vsub(Q,he);var Se=H.dot(he),ge=O;ne.vsub(Q,ge);var Ee=H.dot(ge);if(Se<0&&Ee>0||Se>0&&Ee<0)return!1}return V?1:-1},new r;var ee=new r,K=new r;a.project=function(P,H,D,I,R){var V=P.vertices.length,re=ee,ne=0,$=0,Q=K,he=P.vertices;Q.setZero(),o.vectorToLocalFrame(D,I,H,re),o.pointToLocalFrame(D,I,Q,Q);var Se=Q.dot(re);$=ne=he[0].dot(re);for(var ge=1;ge<V;ge++){var Ee=he[ge].dot(re);Ee>ne&&(ne=Ee),Ee<$&&($=Ee)}if($-=Se,ne-=Se,$>ne){var ue=$;$=ne,ne=ue}R[0]=ne,R[1]=$}},{"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"./Shape":43}],39:[function(t,n,i){n.exports=a;var s=t("./Shape"),r=t("../math/Vec3");t("../math/Quaternion");var o=t("./ConvexPolyhedron");function a(c,h,l,u){var f=u,g=[],m=[],p=[],v=[],x=[],w=Math.cos,y=Math.sin;g.push(new r(h*w(0),h*y(0),-l*.5)),v.push(0),g.push(new r(c*w(0),c*y(0),l*.5)),x.push(1);for(var b=0;b<f;b++){var L=2*Math.PI/f*(b+1),k=2*Math.PI/f*(b+.5);b<f-1?(g.push(new r(h*w(L),h*y(L),-l*.5)),v.push(2*b+2),g.push(new r(c*w(L),c*y(L),l*.5)),x.push(2*b+3),p.push([2*b+2,2*b+3,2*b+1,2*b])):p.push([0,1,2*b+1,2*b]),(f%2===1||b<f/2)&&m.push(new r(w(k),y(k),0))}p.push(x),m.push(new r(0,0,1));for(var _=[],b=0;b<v.length;b++)_.push(v[v.length-b-1]);p.push(_),this.type=s.types.CONVEXPOLYHEDRON,o.call(this,g,p,m)}a.prototype=new o},{"../math/Quaternion":28,"../math/Vec3":30,"./ConvexPolyhedron":38,"./Shape":43}],40:[function(t,n,i){var s=t("./Shape"),r=t("./ConvexPolyhedron"),o=t("../math/Vec3"),a=t("../utils/Utils");n.exports=c;function c(h,l){l=a.defaults(l,{maxValue:null,minValue:null,elementSize:1}),this.data=h,this.maxValue=l.maxValue,this.minValue=l.minValue,this.elementSize=l.elementSize,l.minValue===null&&this.updateMinValue(),l.maxValue===null&&this.updateMaxValue(),this.cacheEnabled=!0,s.call(this),this.pillarConvex=new r,this.pillarOffset=new o,this.type=s.types.HEIGHTFIELD,this.updateBoundingSphereRadius(),this._cachedPillars={}}c.prototype=new s,c.prototype.update=function(){this._cachedPillars={}},c.prototype.updateMinValue=function(){for(var h=this.data,l=h[0][0],u=0;u!==h.length;u++)for(var f=0;f!==h[u].length;f++){var g=h[u][f];g<l&&(l=g)}this.minValue=l},c.prototype.updateMaxValue=function(){for(var h=this.data,l=h[0][0],u=0;u!==h.length;u++)for(var f=0;f!==h[u].length;f++){var g=h[u][f];g>l&&(l=g)}this.maxValue=l},c.prototype.setHeightValueAtIndex=function(h,l,u){var f=this.data;f[h][l]=u,this.clearCachedConvexTrianglePillar(h,l,!1),h>0&&(this.clearCachedConvexTrianglePillar(h-1,l,!0),this.clearCachedConvexTrianglePillar(h-1,l,!1)),l>0&&(this.clearCachedConvexTrianglePillar(h,l-1,!0),this.clearCachedConvexTrianglePillar(h,l-1,!1)),l>0&&h>0&&this.clearCachedConvexTrianglePillar(h-1,l-1,!0)},c.prototype.getRectMinMax=function(h,l,u,f,g){g=g||[];for(var m=this.data,p=this.minValue,v=h;v<=u;v++)for(var x=l;x<=f;x++){var w=m[v][x];w>p&&(p=w)}g[0]=this.minValue,g[1]=p},c.prototype.getIndexOfPosition=function(h,l,u,f){var g=this.elementSize,m=this.data,p=Math.floor(h/g),v=Math.floor(l/g);return u[0]=p,u[1]=v,f&&(p<0&&(p=0),v<0&&(v=0),p>=m.length-1&&(p=m.length-1),v>=m[0].length-1&&(v=m[0].length-1)),!(p<0||v<0||p>=m.length-1||v>=m[0].length-1)},c.prototype.getHeightAt=function(h,l,u){var f=[];this.getIndexOfPosition(h,l,f,u);var g=[];return this.getRectMinMax(f[0],f[1]+1,f[0],f[1]+1,g),(g[0]+g[1])/2},c.prototype.getCacheConvexTrianglePillarKey=function(h,l,u){return h+"_"+l+"_"+(u?1:0)},c.prototype.getCachedConvexTrianglePillar=function(h,l,u){return this._cachedPillars[this.getCacheConvexTrianglePillarKey(h,l,u)]},c.prototype.setCachedConvexTrianglePillar=function(h,l,u,f,g){this._cachedPillars[this.getCacheConvexTrianglePillarKey(h,l,u)]={convex:f,offset:g}},c.prototype.clearCachedConvexTrianglePillar=function(h,l,u){delete this._cachedPillars[this.getCacheConvexTrianglePillarKey(h,l,u)]},c.prototype.getConvexTrianglePillar=function(h,l,u){var f=this.pillarConvex,g=this.pillarOffset;if(this.cacheEnabled){var m=this.getCachedConvexTrianglePillar(h,l,u);if(m){this.pillarConvex=m.convex,this.pillarOffset=m.offset;return}f=new r,g=new o,this.pillarConvex=f,this.pillarOffset=g}var m=this.data,p=this.elementSize,v=f.faces;f.vertices.length=6;for(var x=0;x<6;x++)f.vertices[x]||(f.vertices[x]=new o);v.length=5;for(var x=0;x<5;x++)v[x]||(v[x]=[]);var w=f.vertices,y=(Math.min(m[h][l],m[h+1][l],m[h][l+1],m[h+1][l+1])-this.minValue)/2+this.minValue;u?(g.set((h+.75)*p,(l+.75)*p,y),w[0].set(.25*p,.25*p,m[h+1][l+1]-y),w[1].set(-.75*p,.25*p,m[h][l+1]-y),w[2].set(.25*p,-.75*p,m[h+1][l]-y),w[3].set(.25*p,.25*p,-y-1),w[4].set(-.75*p,.25*p,-y-1),w[5].set(.25*p,-.75*p,-y-1),v[0][0]=0,v[0][1]=1,v[0][2]=2,v[1][0]=5,v[1][1]=4,v[1][2]=3,v[2][0]=2,v[2][1]=5,v[2][2]=3,v[2][3]=0,v[3][0]=3,v[3][1]=4,v[3][2]=1,v[3][3]=0,v[4][0]=1,v[4][1]=4,v[4][2]=5,v[4][3]=2):(g.set((h+.25)*p,(l+.25)*p,y),w[0].set(-.25*p,-.25*p,m[h][l]-y),w[1].set(.75*p,-.25*p,m[h+1][l]-y),w[2].set(-.25*p,.75*p,m[h][l+1]-y),w[3].set(-.25*p,-.25*p,-y-1),w[4].set(.75*p,-.25*p,-y-1),w[5].set(-.25*p,.75*p,-y-1),v[0][0]=0,v[0][1]=1,v[0][2]=2,v[1][0]=5,v[1][1]=4,v[1][2]=3,v[2][0]=0,v[2][1]=2,v[2][2]=5,v[2][3]=3,v[3][0]=1,v[3][1]=0,v[3][2]=3,v[3][3]=4,v[4][0]=4,v[4][1]=5,v[4][2]=2,v[4][3]=1),f.computeNormals(),f.computeEdges(),f.updateBoundingSphereRadius(),this.setCachedConvexTrianglePillar(h,l,u,f,g)},c.prototype.calculateLocalInertia=function(h,l){return l=l||new o,l.set(0,0,0),l},c.prototype.volume=function(){return Number.MAX_VALUE},c.prototype.calculateWorldAABB=function(h,l,u,f){u.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE),f.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE)},c.prototype.updateBoundingSphereRadius=function(){var h=this.data,l=this.elementSize;this.boundingSphereRadius=new o(h.length*l,h[0].length*l,Math.max(Math.abs(this.maxValue),Math.abs(this.minValue))).norm()}},{"../math/Vec3":30,"../utils/Utils":53,"./ConvexPolyhedron":38,"./Shape":43}],41:[function(t,n,i){n.exports=o;var s=t("./Shape"),r=t("../math/Vec3");function o(){s.call(this),this.type=s.types.PARTICLE}o.prototype=new s,o.prototype.constructor=o,o.prototype.calculateLocalInertia=function(a,c){return c=c||new r,c.set(0,0,0),c},o.prototype.volume=function(){return 0},o.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=0},o.prototype.calculateWorldAABB=function(a,c,h,l){h.copy(a),l.copy(a)}},{"../math/Vec3":30,"./Shape":43}],42:[function(t,n,i){n.exports=o;var s=t("./Shape"),r=t("../math/Vec3");function o(){s.call(this),this.type=s.types.PLANE,this.worldNormal=new r,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}o.prototype=new s,o.prototype.constructor=o,o.prototype.computeWorldNormal=function(c){var h=this.worldNormal;h.set(0,0,1),c.vmult(h,h),this.worldNormalNeedsUpdate=!1},o.prototype.calculateLocalInertia=function(c,h){return h=h||new r,h},o.prototype.volume=function(){return Number.MAX_VALUE};var a=new r;o.prototype.calculateWorldAABB=function(c,h,l,u){a.set(0,0,1),h.vmult(a,a);var f=Number.MAX_VALUE;l.set(-f,-f,-f),u.set(f,f,f),a.x===1&&(u.x=c.x),a.y===1&&(u.y=c.y),a.z===1&&(u.z=c.z),a.x===-1&&(l.x=c.x),a.y===-1&&(l.y=c.y),a.z===-1&&(l.z=c.z)},o.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=Number.MAX_VALUE}},{"../math/Vec3":30,"./Shape":43}],43:[function(t,n,i){n.exports=s;var s=t("./Shape");t("../math/Vec3"),t("../math/Quaternion"),t("../material/Material");function s(){this.id=s.idCounter++,this.type=0,this.boundingSphereRadius=0,this.collisionResponse=!0,this.material=null}s.prototype.constructor=s,s.prototype.updateBoundingSphereRadius=function(){throw"computeBoundingSphereRadius() not implemented for shape type "+this.type},s.prototype.volume=function(){throw"volume() not implemented for shape type "+this.type},s.prototype.calculateLocalInertia=function(r,o){throw"calculateLocalInertia() not implemented for shape type "+this.type},s.idCounter=0,s.types={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256}},{"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"./Shape":43}],44:[function(t,n,i){n.exports=o;var s=t("./Shape"),r=t("../math/Vec3");function o(a){if(s.call(this),this.radius=a!==void 0?Number(a):1,this.type=s.types.SPHERE,this.radius<0)throw new Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}o.prototype=new s,o.prototype.constructor=o,o.prototype.calculateLocalInertia=function(a,c){c=c||new r;var h=2*a*this.radius*this.radius/5;return c.x=h,c.y=h,c.z=h,c},o.prototype.volume=function(){return 4*Math.PI*this.radius/3},o.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=this.radius},o.prototype.calculateWorldAABB=function(a,c,h,l){for(var u=this.radius,f=["x","y","z"],g=0;g<f.length;g++){var m=f[g];h[m]=a[m]-u,l[m]=a[m]+u}}},{"../math/Vec3":30,"./Shape":43}],45:[function(t,n,i){n.exports=h;var s=t("./Shape"),r=t("../math/Vec3");t("../math/Quaternion");var o=t("../math/Transform"),a=t("../collision/AABB"),c=t("../utils/Octree");function h(_,M){s.call(this),this.type=s.types.TRIMESH,this.vertices=new Float32Array(_),this.indices=new Int16Array(M),this.normals=new Float32Array(M.length),this.aabb=new a,this.edges=null,this.scale=new r(1,1,1),this.tree=new c,this.updateEdges(),this.updateNormals(),this.updateAABB(),this.updateBoundingSphereRadius(),this.updateTree()}h.prototype=new s,h.prototype.constructor=h;var l=new r;h.prototype.updateTree=function(){var _=this.tree;_.reset(),_.aabb.copy(this.aabb);var M=this.scale;_.aabb.lowerBound.x*=1/M.x,_.aabb.lowerBound.y*=1/M.y,_.aabb.lowerBound.z*=1/M.z,_.aabb.upperBound.x*=1/M.x,_.aabb.upperBound.y*=1/M.y,_.aabb.upperBound.z*=1/M.z;for(var E=new a,C=new r,U=new r,T=new r,N=[C,U,T],Y=0;Y<this.indices.length/3;Y++){var te=Y*3;this._getUnscaledVertex(this.indices[te],C),this._getUnscaledVertex(this.indices[te+1],U),this._getUnscaledVertex(this.indices[te+2],T),E.setFromPoints(N),_.insert(E,Y)}_.removeEmptyNodes()};var u=new a;h.prototype.getTrianglesInAABB=function(_,M){u.copy(_);var E=this.scale,C=E.x,U=E.y,T=E.z,N=u.lowerBound,Y=u.upperBound;return N.x/=C,N.y/=U,N.z/=T,Y.x/=C,Y.y/=U,Y.z/=T,this.tree.aabbQuery(u,M)},h.prototype.setScale=function(_){var M=this.scale.x===this.scale.y===this.scale.z,E=_.x===_.y===_.z;M&&E||this.updateNormals(),this.scale.copy(_),this.updateAABB(),this.updateBoundingSphereRadius()},h.prototype.updateNormals=function(){for(var _=l,M=this.normals,E=0;E<this.indices.length/3;E++){var C=E*3,U=this.indices[C],T=this.indices[C+1],N=this.indices[C+2];this.getVertex(U,v),this.getVertex(T,x),this.getVertex(N,w),h.computeNormal(x,v,w,_),M[C]=_.x,M[C+1]=_.y,M[C+2]=_.z}},h.prototype.updateEdges=function(){for(var _={},M=function(te,W){var O=U<T?U+"_"+T:T+"_"+U;_[O]=!0},E=0;E<this.indices.length/3;E++){var C=E*3,U=this.indices[C],T=this.indices[C+1];this.indices[C+2],M(),M(),M()}var N=Object.keys(_);this.edges=new Int16Array(N.length*2);for(var E=0;E<N.length;E++){var Y=N[E].split("_");this.edges[2*E]=parseInt(Y[0],10),this.edges[2*E+1]=parseInt(Y[1],10)}},h.prototype.getEdgeVertex=function(_,M,E){var C=this.edges[_*2+(M?1:0)];this.getVertex(C,E)};var f=new r,g=new r;h.prototype.getEdgeVector=function(_,M){var E=f,C=g;this.getEdgeVertex(_,0,E),this.getEdgeVertex(_,1,C),C.vsub(E,M)};var m=new r,p=new r;h.computeNormal=function(_,M,E,C){M.vsub(_,p),E.vsub(M,m),m.cross(p,C),C.isZero()||C.normalize()};var v=new r,x=new r,w=new r;h.prototype.getVertex=function(_,M){var E=this.scale;return this._getUnscaledVertex(_,M),M.x*=E.x,M.y*=E.y,M.z*=E.z,M},h.prototype._getUnscaledVertex=function(_,M){var E=_*3,C=this.vertices;return M.set(C[E],C[E+1],C[E+2])},h.prototype.getWorldVertex=function(_,M,E,C){return this.getVertex(_,C),o.pointToWorldFrame(M,E,C,C),C},h.prototype.getTriangleVertices=function(_,M,E,C){var U=_*3;this.getVertex(this.indices[U],M),this.getVertex(this.indices[U+1],E),this.getVertex(this.indices[U+2],C)},h.prototype.getNormal=function(_,M){var E=_*3;return M.set(this.normals[E],this.normals[E+1],this.normals[E+2])};var y=new a;h.prototype.calculateLocalInertia=function(_,M){this.computeLocalAABB(y);var E=y.upperBound.x-y.lowerBound.x,C=y.upperBound.y-y.lowerBound.y,U=y.upperBound.z-y.lowerBound.z;return M.set(1/12*_*(2*C*2*C+2*U*2*U),1/12*_*(2*E*2*E+2*U*2*U),1/12*_*(2*C*2*C+2*E*2*E))};var b=new r;h.prototype.computeLocalAABB=function(_){var M=_.lowerBound,E=_.upperBound,C=this.vertices.length;this.vertices;var U=b;this.getVertex(0,U),M.copy(U),E.copy(U);for(var T=0;T!==C;T++)this.getVertex(T,U),U.x<M.x?M.x=U.x:U.x>E.x&&(E.x=U.x),U.y<M.y?M.y=U.y:U.y>E.y&&(E.y=U.y),U.z<M.z?M.z=U.z:U.z>E.z&&(E.z=U.z)},h.prototype.updateAABB=function(){this.computeLocalAABB(this.aabb)},h.prototype.updateBoundingSphereRadius=function(){for(var _=0,M=this.vertices,E=new r,C=0,U=M.length/3;C!==U;C++){this.getVertex(C,E);var T=E.norm2();T>_&&(_=T)}this.boundingSphereRadius=Math.sqrt(_)},new r;var L=new o,k=new a;h.prototype.calculateWorldAABB=function(_,M,E,C){var U=L,T=k;U.position=_,U.quaternion=M,this.aabb.toWorldFrame(U,T),E.copy(T.lowerBound),C.copy(T.upperBound)},h.prototype.volume=function(){return 4*Math.PI*this.boundingSphereRadius/3},h.createTorus=function(_,M,E,C,U){_=_||1,M=M||.5,E=E||8,C=C||6,U=U||Math.PI*2;for(var T=[],N=[],Y=0;Y<=E;Y++)for(var te=0;te<=C;te++){var W=te/C*U,O=Y/E*Math.PI*2,ee=(_+M*Math.cos(O))*Math.cos(W),K=(_+M*Math.cos(O))*Math.sin(W),P=M*Math.sin(O);T.push(ee,K,P)}for(var Y=1;Y<=E;Y++)for(var te=1;te<=C;te++){var H=(C+1)*Y+te-1,D=(C+1)*(Y-1)+te-1,I=(C+1)*(Y-1)+te,R=(C+1)*Y+te;N.push(H,D,R),N.push(D,I,R)}return new h(T,N)}},{"../collision/AABB":3,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../utils/Octree":50,"./Shape":43}],46:[function(t,n,i){n.exports=r,t("../math/Vec3"),t("../math/Quaternion");var s=t("./Solver");function r(){s.call(this),this.iterations=10,this.tolerance=1e-7}r.prototype=new s;var o=[],a=[],c=[];r.prototype.solve=function(h,l){var u=0,f=this.iterations,g=this.tolerance*this.tolerance,m=this.equations,p=m.length,v=l.bodies,x=v.length,w=h,y,b,L,k,_,M;if(p!==0)for(var E=0;E!==x;E++)v[E].updateSolveMassProperties();var C=a,U=c,T=o;C.length=p,U.length=p,T.length=p;for(var E=0;E!==p;E++){var N=m[E];T[E]=0,U[E]=N.computeB(w),C[E]=1/N.computeC()}if(p!==0){for(var E=0;E!==x;E++){var Y=v[E],te=Y.vlambda,W=Y.wlambda;te.set(0,0,0),W&&W.set(0,0,0)}for(u=0;u!==f;u++){k=0;for(var O=0;O!==p;O++){var N=m[O];y=U[O],b=C[O],M=T[O],_=N.computeGWlambda(),L=b*(y-_-N.eps*M),M+L<N.minForce?L=N.minForce-M:M+L>N.maxForce&&(L=N.maxForce-M),T[O]+=L,k+=L>0?L:-L,N.addToWlambda(L)}if(k*k<g)break}for(var E=0;E!==x;E++){var Y=v[E],ee=Y.velocity,K=Y.angularVelocity;ee.vadd(Y.vlambda,ee),K&&K.vadd(Y.wlambda,K)}}return u}},{"../math/Quaternion":28,"../math/Vec3":30,"./Solver":47}],47:[function(t,n,i){n.exports=s;function s(){this.equations=[]}s.prototype.solve=function(r,o){return 0},s.prototype.addEquation=function(r){r.enabled&&this.equations.push(r)},s.prototype.removeEquation=function(r){var o=this.equations,a=o.indexOf(r);a!==-1&&o.splice(a,1)},s.prototype.removeAllEquations=function(){this.equations.length=0}},{}],48:[function(t,n,i){n.exports=o,t("../math/Vec3"),t("../math/Quaternion");var s=t("./Solver"),r=t("../objects/Body");function o(v){for(s.call(this),this.iterations=10,this.tolerance=1e-7,this.subsolver=v,this.nodes=[],this.nodePool=[];this.nodePool.length<128;)this.nodePool.push(this.createNode())}o.prototype=new s;var a=[],c=[],h={bodies:[]},l=r.STATIC;function u(v){for(var x=v.length,w=0;w!==x;w++){var y=v[w];if(!y.visited&&!(y.body.type&l))return y}return!1}var f=[];function g(v,x,w,y){for(f.push(v),v.visited=!0,x(v,w,y);f.length;)for(var b=f.pop(),L;L=u(b.children);)L.visited=!0,x(L,w,y),f.push(L)}function m(v,x,w){x.push(v.body);for(var y=v.eqs.length,b=0;b!==y;b++){var L=v.eqs[b];w.indexOf(L)===-1&&w.push(L)}}o.prototype.createNode=function(){return{body:null,children:[],eqs:[],visited:!1}},o.prototype.solve=function(v,x){for(var w=a,y=this.nodePool,b=x.bodies,L=this.equations,k=L.length,_=b.length,M=this.subsolver;y.length<_;)y.push(this.createNode());w.length=_;for(var E=0;E<_;E++)w[E]=y[E];for(var E=0;E!==_;E++){var C=w[E];C.body=b[E],C.children.length=0,C.eqs.length=0,C.visited=!1}for(var U=0;U!==k;U++){var T=L[U],E=b.indexOf(T.bi),N=b.indexOf(T.bj),Y=w[E],te=w[N];Y.children.push(te),Y.eqs.push(T),te.children.push(Y),te.eqs.push(T)}var W,O=0,ee=c;M.tolerance=this.tolerance,M.iterations=this.iterations;for(var K=h;W=u(w);){ee.length=0,K.bodies.length=0,g(W,m,K.bodies,ee);var P=ee.length;ee=ee.sort(p);for(var E=0;E!==P;E++)M.addEquation(ee[E]);M.solve(v,K),M.removeAllEquations(),O++}return O};function p(v,x){return x.id-v.id}},{"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"./Solver":47}],49:[function(t,n,i){var s=function(){};n.exports=s,s.prototype={constructor:s,addEventListener:function(r,o){this._listeners===void 0&&(this._listeners={});var a=this._listeners;return a[r]===void 0&&(a[r]=[]),a[r].indexOf(o)===-1&&a[r].push(o),this},hasEventListener:function(r,o){if(this._listeners===void 0)return!1;var a=this._listeners;return a[r]!==void 0&&a[r].indexOf(o)!==-1},removeEventListener:function(r,o){if(this._listeners===void 0)return this;var a=this._listeners;if(a[r]===void 0)return this;var c=a[r].indexOf(o);return c!==-1&&a[r].splice(c,1),this},dispatchEvent:function(r){if(this._listeners===void 0)return this;var o=this._listeners,a=o[r.type];if(a!==void 0){r.target=this;for(var c=0,h=a.length;c<h;c++)a[c].call(this,r)}return this}}},{}],50:[function(t,n,i){var s=t("../collision/AABB"),r=t("../math/Vec3");n.exports=a;function o(l){l=l||{},this.root=l.root||null,this.aabb=l.aabb?l.aabb.clone():new s,this.data=[],this.children=[]}function a(l,u){u=u||{},u.root=null,u.aabb=l,o.call(this,u),this.maxDepth=typeof u.maxDepth<"u"?u.maxDepth:8}a.prototype=new o,o.prototype.reset=function(l,u){this.children.length=this.data.length=0},o.prototype.insert=function(l,u,f){var g=this.data;if(f=f||0,!this.aabb.contains(l))return!1;var m=this.children;if(f<(this.maxDepth||this.root.maxDepth)){var p=!1;m.length||(this.subdivide(),p=!0);for(var v=0;v!==8;v++)if(m[v].insert(l,u,f+1))return!0;p&&(m.length=0)}return g.push(u),!0};var c=new r;o.prototype.subdivide=function(){var l=this.aabb,u=l.lowerBound,f=l.upperBound,g=this.children;g.push(new o({aabb:new s({lowerBound:new r(0,0,0)})}),new o({aabb:new s({lowerBound:new r(1,0,0)})}),new o({aabb:new s({lowerBound:new r(1,1,0)})}),new o({aabb:new s({lowerBound:new r(1,1,1)})}),new o({aabb:new s({lowerBound:new r(0,1,1)})}),new o({aabb:new s({lowerBound:new r(0,0,1)})}),new o({aabb:new s({lowerBound:new r(1,0,1)})}),new o({aabb:new s({lowerBound:new r(0,1,0)})})),f.vsub(u,c),c.scale(.5,c);for(var m=this.root||this,p=0;p!==8;p++){var v=g[p];v.root=m;var x=v.aabb.lowerBound;x.x*=c.x,x.y*=c.y,x.z*=c.z,x.vadd(u,x),x.vadd(c,v.aabb.upperBound)}},o.prototype.aabbQuery=function(l,u){this.data,this.children;for(var f=[this];f.length;){var g=f.pop();g.aabb.overlaps(l)&&Array.prototype.push.apply(u,g.data),Array.prototype.push.apply(f,g.children)}return u};var h=new s;o.prototype.rayQuery=function(l,u,f){return l.getAABB(h),h.toLocalFrame(u,h),this.aabbQuery(h,f),f},o.prototype.removeEmptyNodes=function(){for(var l=[this];l.length;){for(var u=l.pop(),f=u.children.length-1;f>=0;f--)u.children[f].data.length||u.children.splice(f,1);Array.prototype.push.apply(l,u.children)}}},{"../collision/AABB":3,"../math/Vec3":30}],51:[function(t,n,i){n.exports=s;function s(){this.objects=[],this.type=Object}s.prototype.release=function(){for(var r=arguments.length,o=0;o!==r;o++)this.objects.push(arguments[o])},s.prototype.get=function(){return this.objects.length===0?this.constructObject():this.objects.pop()},s.prototype.constructObject=function(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}},{}],52:[function(t,n,i){n.exports=s;function s(){this.data={keys:[]}}s.prototype.get=function(r,o){if(r>o){var a=o;o=r,r=a}return this.data[r+"-"+o]},s.prototype.set=function(r,o,a){if(r>o){var c=o;o=r,r=c}var h=r+"-"+o;this.get(r,o)||this.data.keys.push(h),this.data[h]=a},s.prototype.reset=function(){for(var r=this.data,o=r.keys;o.length>0;){var a=o.pop();delete r[a]}}},{}],53:[function(t,n,i){function s(){}n.exports=s,s.defaults=function(r,o){r=r||{};for(var a in o)a in r||(r[a]=o[a]);return r}},{}],54:[function(t,n,i){n.exports=o;var s=t("../math/Vec3"),r=t("./Pool");function o(){r.call(this),this.type=s}o.prototype=new r,o.prototype.constructObject=function(){return new s}},{"../math/Vec3":30,"./Pool":51}],55:[function(t,n,i){n.exports=g;var s=t("../collision/AABB"),r=t("../shapes/Shape"),o=t("../collision/Ray"),a=t("../math/Vec3"),c=t("../math/Transform");t("../shapes/ConvexPolyhedron");var h=t("../math/Quaternion");t("../solver/Solver");var l=t("../utils/Vec3Pool"),u=t("../equations/ContactEquation"),f=t("../equations/FrictionEquation");function g(oe){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new l,this.world=oe,this.currentContactMaterial=null,this.enableFrictionReduction=!1}g.prototype.createContactEquation=function(oe,le,we,be,je,Ne){var S;this.contactPointPool.length?(S=this.contactPointPool.pop(),S.bi=oe,S.bj=le):S=new u(oe,le),S.enabled=oe.collisionResponse&&le.collisionResponse&&we.collisionResponse&&be.collisionResponse;var j=this.currentContactMaterial;S.restitution=j.restitution,S.setSpookParams(j.contactEquationStiffness,j.contactEquationRelaxation,this.world.dt);var z=we.material||oe.material,G=be.material||le.material;return z&&G&&z.restitution>=0&&G.restitution>=0&&(S.restitution=z.restitution*G.restitution),S.si=je||we,S.sj=Ne||be,S},g.prototype.createFrictionEquationsFromContact=function(oe,le){var we=oe.bi,be=oe.bj,je=oe.si,Ne=oe.sj,S=this.world,j=this.currentContactMaterial,z=j.friction,G=je.material||we.material,J=Ne.material||be.material;if(G&&J&&G.friction>=0&&J.friction>=0&&(z=G.friction*J.friction),z>0){var me=z*S.gravity.length(),fe=we.invMass+be.invMass;fe>0&&(fe=1/fe);var de=this.frictionEquationPool,ve=de.length?de.pop():new f(we,be,me*fe),Ae=de.length?de.pop():new f(we,be,me*fe);return ve.bi=Ae.bi=we,ve.bj=Ae.bj=be,ve.minForce=Ae.minForce=-me*fe,ve.maxForce=Ae.maxForce=me*fe,ve.ri.copy(oe.ri),ve.rj.copy(oe.rj),Ae.ri.copy(oe.ri),Ae.rj.copy(oe.rj),oe.ni.tangents(ve.t,Ae.t),ve.setSpookParams(j.frictionEquationStiffness,j.frictionEquationRelaxation,S.dt),Ae.setSpookParams(j.frictionEquationStiffness,j.frictionEquationRelaxation,S.dt),ve.enabled=Ae.enabled=oe.enabled,le.push(ve,Ae),!0}return!1};var m=new a,p=new a,v=new a;g.prototype.createFrictionFromAverage=function(oe){var le=this.result[this.result.length-1];if(!(!this.createFrictionEquationsFromContact(le,this.frictionResult)||oe===1)){var we=this.frictionResult[this.frictionResult.length-2],be=this.frictionResult[this.frictionResult.length-1];m.setZero(),p.setZero(),v.setZero();var je=le.bi;le.bj;for(var Ne=0;Ne!==oe;Ne++)le=this.result[this.result.length-1-Ne],le.bodyA!==je?(m.vadd(le.ni,m),p.vadd(le.ri,p),v.vadd(le.rj,v)):(m.vsub(le.ni,m),p.vadd(le.rj,p),v.vadd(le.ri,v));var S=1/oe;p.scale(S,we.ri),v.scale(S,we.rj),be.ri.copy(we.ri),be.rj.copy(we.rj),m.normalize(),m.tangents(we.t,be.t)}};var x=new a,w=new a,y=new h,b=new h;g.prototype.getContacts=function(oe,le,we,be,je,Ne,S){this.contactPointPool=je,this.frictionEquationPool=S,this.result=be,this.frictionResult=Ne;for(var j=y,z=b,G=x,J=w,me=0,fe=oe.length;me!==fe;me++){var de=oe[me],ve=le[me],Ae=null;de.material&&ve.material&&(Ae=we.getContactMaterial(de.material,ve.material)||null);for(var Ie=0;Ie<de.shapes.length;Ie++){de.quaternion.mult(de.shapeOrientations[Ie],j),de.quaternion.vmult(de.shapeOffsets[Ie],G),G.vadd(de.position,G);for(var ce=de.shapes[Ie],We=0;We<ve.shapes.length;We++){ve.quaternion.mult(ve.shapeOrientations[We],z),ve.quaternion.vmult(ve.shapeOffsets[We],J),J.vadd(ve.position,J);var Xe=ve.shapes[We];if(!(G.distanceTo(J)>ce.boundingSphereRadius+Xe.boundingSphereRadius)){var ct=null;ce.material&&Xe.material&&(ct=we.getContactMaterial(ce.material,Xe.material)||null),this.currentContactMaterial=ct||Ae||we.defaultContactMaterial;var Ke=this[ce.type|Xe.type];Ke&&(ce.type<Xe.type?Ke.call(this,ce,Xe,G,J,j,z,de,ve,ce,Xe):Ke.call(this,Xe,ce,J,G,z,j,ve,de,ce,Xe))}}}}},g.prototype[r.types.BOX|r.types.BOX]=g.prototype.boxBox=function(oe,le,we,be,je,Ne,S,j){oe.convexPolyhedronRepresentation.material=oe.material,le.convexPolyhedronRepresentation.material=le.material,oe.convexPolyhedronRepresentation.collisionResponse=oe.collisionResponse,le.convexPolyhedronRepresentation.collisionResponse=le.collisionResponse,this.convexConvex(oe.convexPolyhedronRepresentation,le.convexPolyhedronRepresentation,we,be,je,Ne,S,j,oe,le)},g.prototype[r.types.BOX|r.types.CONVEXPOLYHEDRON]=g.prototype.boxConvex=function(oe,le,we,be,je,Ne,S,j){oe.convexPolyhedronRepresentation.material=oe.material,oe.convexPolyhedronRepresentation.collisionResponse=oe.collisionResponse,this.convexConvex(oe.convexPolyhedronRepresentation,le,we,be,je,Ne,S,j,oe,le)},g.prototype[r.types.BOX|r.types.PARTICLE]=g.prototype.boxParticle=function(oe,le,we,be,je,Ne,S,j){oe.convexPolyhedronRepresentation.material=oe.material,oe.convexPolyhedronRepresentation.collisionResponse=oe.collisionResponse,this.convexParticle(oe.convexPolyhedronRepresentation,le,we,be,je,Ne,S,j,oe,le)},g.prototype[r.types.SPHERE]=g.prototype.sphereSphere=function(oe,le,we,be,je,Ne,S,j){var z=this.createContactEquation(S,j,oe,le);be.vsub(we,z.ni),z.ni.normalize(),z.ri.copy(z.ni),z.rj.copy(z.ni),z.ri.mult(oe.radius,z.ri),z.rj.mult(-le.radius,z.rj),z.ri.vadd(we,z.ri),z.ri.vsub(S.position,z.ri),z.rj.vadd(be,z.rj),z.rj.vsub(j.position,z.rj),this.result.push(z),this.createFrictionEquationsFromContact(z,this.frictionResult)};var L=new a,k=new a,_=new a;g.prototype[r.types.PLANE|r.types.TRIMESH]=g.prototype.planeTrimesh=function(oe,le,we,be,je,Ne,S,j){var z=new a,G=L;G.set(0,0,1),je.vmult(G,G);for(var J=0;J<le.vertices.length/3;J++){le.getVertex(J,z);var me=new a;me.copy(z),c.pointToWorldFrame(be,Ne,me,z);var fe=k;z.vsub(we,fe);var de=G.dot(fe);if(de<=0){var ve=this.createContactEquation(S,j,oe,le);ve.ni.copy(G);var Ae=_;G.scale(fe.dot(G),Ae),z.vsub(Ae,Ae),ve.ri.copy(Ae),ve.ri.vsub(S.position,ve.ri),ve.rj.copy(z),ve.rj.vsub(j.position,ve.rj),this.result.push(ve),this.createFrictionEquationsFromContact(ve,this.frictionResult)}}};var M=new a,E=new a;new a;var C=new a,U=new a,T=new a,N=new a,Y=new a,te=new a,W=new a,O=new a,ee=new a,K=new a,P=new a,H=new s,D=[];g.prototype[r.types.SPHERE|r.types.TRIMESH]=g.prototype.sphereTrimesh=function(oe,le,we,be,je,Ne,S,j){var z=T,G=N,J=Y,me=te,fe=W,de=O,ve=H,Ae=U,Ie=E,ce=D;c.pointToLocalFrame(be,Ne,we,fe);var We=oe.radius;ve.lowerBound.set(fe.x-We,fe.y-We,fe.z-We),ve.upperBound.set(fe.x+We,fe.y+We,fe.z+We),le.getTrianglesInAABB(ve,ce);for(var Xe=C,ct=oe.radius*oe.radius,Ke=0;Ke<ce.length;Ke++)for(var qe=0;qe<3;qe++)if(le.getVertex(le.indices[ce[Ke]*3+qe],Xe),Xe.vsub(fe,Ie),Ie.norm2()<=ct){Ae.copy(Xe),c.pointToWorldFrame(be,Ne,Ae,Xe),Xe.vsub(we,Ie);var Ce=this.createContactEquation(S,j,oe,le);Ce.ni.copy(Ie),Ce.ni.normalize(),Ce.ri.copy(Ce.ni),Ce.ri.scale(oe.radius,Ce.ri),Ce.ri.vadd(we,Ce.ri),Ce.ri.vsub(S.position,Ce.ri),Ce.rj.copy(Xe),Ce.rj.vsub(j.position,Ce.rj),this.result.push(Ce),this.createFrictionEquationsFromContact(Ce,this.frictionResult)}for(var Ke=0;Ke<ce.length;Ke++)for(var qe=0;qe<3;qe++){le.getVertex(le.indices[ce[Ke]*3+qe],z),le.getVertex(le.indices[ce[Ke]*3+(qe+1)%3],G),G.vsub(z,J),fe.vsub(G,de);var Ot=de.dot(J);fe.vsub(z,de);var ut=de.dot(J);if(ut>0&&Ot<0){fe.vsub(z,de),me.copy(J),me.normalize(),ut=de.dot(me),me.scale(ut,de),de.vadd(z,de);var Mt=de.distanceTo(fe);if(Mt<oe.radius){var Ce=this.createContactEquation(S,j,oe,le);de.vsub(fe,Ce.ni),Ce.ni.normalize(),Ce.ni.scale(oe.radius,Ce.ri),c.pointToWorldFrame(be,Ne,de,de),de.vsub(j.position,Ce.rj),c.vectorToWorldFrame(Ne,Ce.ni,Ce.ni),c.vectorToWorldFrame(Ne,Ce.ri,Ce.ri),this.result.push(Ce),this.createFrictionEquationsFromContact(Ce,this.frictionResult)}}}for(var an=ee,Et=K,dt=P,yt=M,Ke=0,ht=ce.length;Ke!==ht;Ke++){le.getTriangleVertices(ce[Ke],an,Et,dt),le.getNormal(ce[Ke],yt),fe.vsub(an,de);var Mt=de.dot(yt);if(yt.scale(Mt,de),fe.vsub(de,de),Mt=de.distanceTo(fe),o.pointInTriangle(de,an,Et,dt)&&Mt<oe.radius){var Ce=this.createContactEquation(S,j,oe,le);de.vsub(fe,Ce.ni),Ce.ni.normalize(),Ce.ni.scale(oe.radius,Ce.ri),c.pointToWorldFrame(be,Ne,de,de),de.vsub(j.position,Ce.rj),c.vectorToWorldFrame(Ne,Ce.ni,Ce.ni),c.vectorToWorldFrame(Ne,Ce.ri,Ce.ri),this.result.push(Ce),this.createFrictionEquationsFromContact(Ce,this.frictionResult)}}ce.length=0};var I=new a,R=new a;g.prototype[r.types.SPHERE|r.types.PLANE]=g.prototype.spherePlane=function(oe,le,we,be,je,Ne,S,j){var z=this.createContactEquation(S,j,oe,le);if(z.ni.set(0,0,1),Ne.vmult(z.ni,z.ni),z.ni.negate(z.ni),z.ni.normalize(),z.ni.mult(oe.radius,z.ri),we.vsub(be,I),z.ni.mult(z.ni.dot(I),R),I.vsub(R,z.rj),-I.dot(z.ni)<=oe.radius){var G=z.ri,J=z.rj;G.vadd(we,G),G.vsub(S.position,G),J.vadd(be,J),J.vsub(j.position,J),this.result.push(z),this.createFrictionEquationsFromContact(z,this.frictionResult)}};var V=new a,re=new a,ne=new a;function $(oe,le,we){for(var be=null,je=oe.length,Ne=0;Ne!==je;Ne++){var S=oe[Ne],j=V;oe[(Ne+1)%je].vsub(S,j);var z=re;j.cross(le,z);var G=ne;we.vsub(S,G);var J=z.dot(G);if(be===null||J>0&&be===!0||J<=0&&be===!1){be===null&&(be=J>0);continue}else return!1}return!0}var Q=new a,he=new a,Se=new a,ge=new a,Ee=[new a,new a,new a,new a,new a,new a],ue=new a,xe=new a,Ye=new a,ze=new a;g.prototype[r.types.SPHERE|r.types.BOX]=g.prototype.sphereBox=function(oe,le,we,be,je,Ne,S,j){var z=this.v3pool,G=Ee;we.vsub(be,Q),le.getSideNormals(G,Ne);for(var J=oe.radius,me=!1,fe=xe,de=Ye,ve=ze,Ae=null,Ie=0,ce=0,We=0,Xe=null,ct=0,Ke=G.length;ct!==Ke&&me===!1;ct++){var qe=he;qe.copy(G[ct]);var Ce=qe.norm();qe.normalize();var Ot=Q.dot(qe);if(Ot<Ce+J&&Ot>0){var ut=Se,Mt=ge;ut.copy(G[(ct+1)%3]),Mt.copy(G[(ct+2)%3]);var an=ut.norm(),Et=Mt.norm();ut.normalize(),Mt.normalize();var dt=Q.dot(ut),yt=Q.dot(Mt);if(dt<an&&dt>-an&&yt<Et&&yt>-Et){var Dt=Math.abs(Ot-Ce-J);(Xe===null||Dt<Xe)&&(Xe=Dt,ce=dt,We=yt,Ae=Ce,fe.copy(qe),de.copy(ut),ve.copy(Mt),Ie++)}}}if(Ie){me=!0;var Je=this.createContactEquation(S,j,oe,le);fe.mult(-J,Je.ri),Je.ni.copy(fe),Je.ni.negate(Je.ni),fe.mult(Ae,fe),de.mult(ce,de),fe.vadd(de,fe),ve.mult(We,ve),fe.vadd(ve,Je.rj),Je.ri.vadd(we,Je.ri),Je.ri.vsub(S.position,Je.ri),Je.rj.vadd(be,Je.rj),Je.rj.vsub(j.position,Je.rj),this.result.push(Je),this.createFrictionEquationsFromContact(Je,this.frictionResult)}for(var ht=z.get(),tn=ue,pt=0;pt!==2&&!me;pt++)for(var Tt=0;Tt!==2&&!me;Tt++)for(var Lt=0;Lt!==2&&!me;Lt++)if(ht.set(0,0,0),pt?ht.vadd(G[0],ht):ht.vsub(G[0],ht),Tt?ht.vadd(G[1],ht):ht.vsub(G[1],ht),Lt?ht.vadd(G[2],ht):ht.vsub(G[2],ht),be.vadd(ht,tn),tn.vsub(we,tn),tn.norm2()<J*J){me=!0;var Je=this.createContactEquation(S,j,oe,le);Je.ri.copy(tn),Je.ri.normalize(),Je.ni.copy(Je.ri),Je.ri.mult(J,Je.ri),Je.rj.copy(ht),Je.ri.vadd(we,Je.ri),Je.ri.vsub(S.position,Je.ri),Je.rj.vadd(be,Je.rj),Je.rj.vsub(j.position,Je.rj),this.result.push(Je),this.createFrictionEquationsFromContact(Je,this.frictionResult)}z.release(ht),ht=null;for(var Gt=z.get(),Cn=z.get(),Je=z.get(),nn=z.get(),Dt=z.get(),Qn=G.length,pt=0;pt!==Qn&&!me;pt++)for(var Tt=0;Tt!==Qn&&!me;Tt++)if(pt%3!==Tt%3){G[Tt].cross(G[pt],Gt),Gt.normalize(),G[pt].vadd(G[Tt],Cn),Je.copy(we),Je.vsub(Cn,Je),Je.vsub(be,Je);var ei=Je.dot(Gt);Gt.mult(ei,nn);for(var Lt=0;Lt===pt%3||Lt===Tt%3;)Lt++;Dt.copy(we),Dt.vsub(nn,Dt),Dt.vsub(Cn,Dt),Dt.vsub(be,Dt);var Fc=Math.abs(ei),zc=Dt.norm();if(Fc<G[Lt].norm()&&zc<J){me=!0;var _t=this.createContactEquation(S,j,oe,le);Cn.vadd(nn,_t.rj),_t.rj.copy(_t.rj),Dt.negate(_t.ni),_t.ni.normalize(),_t.ri.copy(_t.rj),_t.ri.vadd(be,_t.ri),_t.ri.vsub(we,_t.ri),_t.ri.normalize(),_t.ri.mult(J,_t.ri),_t.ri.vadd(we,_t.ri),_t.ri.vsub(S.position,_t.ri),_t.rj.vadd(be,_t.rj),_t.rj.vsub(j.position,_t.rj),this.result.push(_t),this.createFrictionEquationsFromContact(_t,this.frictionResult)}}z.release(Gt,Cn,Je,nn,Dt)};var Ge=new a,Pe=new a,$e=new a,B=new a,A=new a,se=new a,pe=new a,ye=new a,_e=new a,Ve=new a;g.prototype[r.types.SPHERE|r.types.CONVEXPOLYHEDRON]=g.prototype.sphereConvex=function(oe,le,we,be,je,Ne,S,j){var z=this.v3pool;we.vsub(be,Ge);for(var G=le.faceNormals,J=le.faces,me=le.vertices,fe=oe.radius,de=0;de!==me.length;de++){var ve=me[de],Ae=A;Ne.vmult(ve,Ae),be.vadd(Ae,Ae);var Ie=B;if(Ae.vsub(we,Ie),Ie.norm2()<fe*fe){We=!0;var ce=this.createContactEquation(S,j,oe,le);ce.ri.copy(Ie),ce.ri.normalize(),ce.ni.copy(ce.ri),ce.ri.mult(fe,ce.ri),Ae.vsub(be,ce.rj),ce.ri.vadd(we,ce.ri),ce.ri.vsub(S.position,ce.ri),ce.rj.vadd(be,ce.rj),ce.rj.vsub(j.position,ce.rj),this.result.push(ce),this.createFrictionEquationsFromContact(ce,this.frictionResult);return}}for(var We=!1,de=0,Xe=J.length;de!==Xe&&We===!1;de++){var ct=G[de],Ke=J[de],qe=se;Ne.vmult(ct,qe);var Ce=pe;Ne.vmult(me[Ke[0]],Ce),Ce.vadd(be,Ce);var Ot=ye;qe.mult(-fe,Ot),we.vadd(Ot,Ot);var ut=_e;Ot.vsub(Ce,ut);var Mt=ut.dot(qe),an=Ve;if(we.vsub(Ce,an),Mt<0&&an.dot(qe)>0){for(var Et=[],dt=0,yt=Ke.length;dt!==yt;dt++){var ht=z.get();Ne.vmult(me[Ke[dt]],ht),be.vadd(ht,ht),Et.push(ht)}if($(Et,qe,we)){We=!0;var ce=this.createContactEquation(S,j,oe,le);qe.mult(-fe,ce.ri),qe.negate(ce.ni);var tn=z.get();qe.mult(-Mt,tn);var pt=z.get();qe.mult(-fe,pt),we.vsub(be,ce.rj),ce.rj.vadd(pt,ce.rj),ce.rj.vadd(tn,ce.rj),ce.rj.vadd(be,ce.rj),ce.rj.vsub(j.position,ce.rj),ce.ri.vadd(we,ce.ri),ce.ri.vsub(S.position,ce.ri),z.release(tn),z.release(pt),this.result.push(ce),this.createFrictionEquationsFromContact(ce,this.frictionResult);for(var dt=0,Tt=Et.length;dt!==Tt;dt++)z.release(Et[dt]);return}else for(var dt=0;dt!==Ke.length;dt++){var Lt=z.get(),Gt=z.get();Ne.vmult(me[Ke[(dt+1)%Ke.length]],Lt),Ne.vmult(me[Ke[(dt+2)%Ke.length]],Gt),be.vadd(Lt,Lt),be.vadd(Gt,Gt);var Cn=Pe;Gt.vsub(Lt,Cn);var Je=$e;Cn.unit(Je);var nn=z.get(),Dt=z.get();we.vsub(Lt,Dt);var Qn=Dt.dot(Je);Je.mult(Qn,nn),nn.vadd(Lt,nn);var ei=z.get();if(nn.vsub(we,ei),Qn>0&&Qn*Qn<Cn.norm2()&&ei.norm2()<fe*fe){var ce=this.createContactEquation(S,j,oe,le);nn.vsub(be,ce.rj),nn.vsub(we,ce.ni),ce.ni.normalize(),ce.ni.mult(fe,ce.ri),ce.rj.vadd(be,ce.rj),ce.rj.vsub(j.position,ce.rj),ce.ri.vadd(we,ce.ri),ce.ri.vsub(S.position,ce.ri),this.result.push(ce),this.createFrictionEquationsFromContact(ce,this.frictionResult);for(var dt=0,Tt=Et.length;dt!==Tt;dt++)z.release(Et[dt]);z.release(Lt),z.release(Gt),z.release(nn),z.release(ei),z.release(Dt);return}z.release(Lt),z.release(Gt),z.release(nn),z.release(ei),z.release(Dt)}for(var dt=0,Tt=Et.length;dt!==Tt;dt++)z.release(Et[dt])}}},new a,new a,g.prototype[r.types.PLANE|r.types.BOX]=g.prototype.planeBox=function(oe,le,we,be,je,Ne,S,j){le.convexPolyhedronRepresentation.material=le.material,le.convexPolyhedronRepresentation.collisionResponse=le.collisionResponse,this.planeConvex(oe,le.convexPolyhedronRepresentation,we,be,je,Ne,S,j)};var q=new a,ie=new a,De=new a,Fe=new a;g.prototype[r.types.PLANE|r.types.CONVEXPOLYHEDRON]=g.prototype.planeConvex=function(oe,le,we,be,je,Ne,S,j){var z=q,G=ie;G.set(0,0,1),je.vmult(G,G);for(var J=0,me=De,fe=0;fe!==le.vertices.length;fe++){z.copy(le.vertices[fe]),Ne.vmult(z,z),be.vadd(z,z),z.vsub(we,me);var de=G.dot(me);if(de<=0){var ve=this.createContactEquation(S,j,oe,le),Ae=Fe;G.mult(G.dot(me),Ae),z.vsub(Ae,Ae),Ae.vsub(we,ve.ri),ve.ni.copy(G),z.vsub(be,ve.rj),ve.ri.vadd(we,ve.ri),ve.ri.vsub(S.position,ve.ri),ve.rj.vadd(be,ve.rj),ve.rj.vsub(j.position,ve.rj),this.result.push(ve),J++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(ve,this.frictionResult)}}this.enableFrictionReduction&&J&&this.createFrictionFromAverage(J)};var Le=new a,Oe=new a;g.prototype[r.types.CONVEXPOLYHEDRON]=g.prototype.convexConvex=function(oe,le,we,be,je,Ne,S,j,z,G,J,me){var fe=Le;if(!(we.distanceTo(be)>oe.boundingSphereRadius+le.boundingSphereRadius)&&oe.findSeparatingAxis(le,we,je,be,Ne,fe,J,me)){var de=[],ve=Oe;oe.clipAgainstHull(we,je,le,be,Ne,fe,-100,100,de);for(var Ae=0,Ie=0;Ie!==de.length;Ie++){var ce=this.createContactEquation(S,j,oe,le,z,G),We=ce.ri,Xe=ce.rj;fe.negate(ce.ni),de[Ie].normal.negate(ve),ve.mult(de[Ie].depth,ve),de[Ie].point.vadd(ve,We),Xe.copy(de[Ie].point),We.vsub(we,We),Xe.vsub(be,Xe),We.vadd(we,We),We.vsub(S.position,We),Xe.vadd(be,Xe),Xe.vsub(j.position,Xe),this.result.push(ce),Ae++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(ce,this.frictionResult)}this.enableFrictionReduction&&Ae&&this.createFrictionFromAverage(Ae)}};var ke=new a,Qe=new a,Ze=new a;g.prototype[r.types.PLANE|r.types.PARTICLE]=g.prototype.planeParticle=function(oe,le,we,be,je,Ne,S,j){var z=ke;z.set(0,0,1),S.quaternion.vmult(z,z);var G=Qe;be.vsub(S.position,G);var J=z.dot(G);if(J<=0){var me=this.createContactEquation(j,S,le,oe);me.ni.copy(z),me.ni.negate(me.ni),me.ri.set(0,0,0);var fe=Ze;z.mult(z.dot(be),fe),be.vsub(fe,fe),me.rj.copy(fe),this.result.push(me),this.createFrictionEquationsFromContact(me,this.frictionResult)}};var nt=new a;g.prototype[r.types.PARTICLE|r.types.SPHERE]=g.prototype.sphereParticle=function(oe,le,we,be,je,Ne,S,j){var z=nt;z.set(0,0,1),be.vsub(we,z);var G=z.norm2();if(G<=oe.radius*oe.radius){var J=this.createContactEquation(j,S,le,oe);z.normalize(),J.rj.copy(z),J.rj.mult(oe.radius,J.rj),J.ni.copy(z),J.ni.negate(J.ni),J.ri.set(0,0,0),this.result.push(J),this.createFrictionEquationsFromContact(J,this.frictionResult)}};var Z=new h,ae=new a;new a;var Me=new a,Re=new a,He=new a;g.prototype[r.types.PARTICLE|r.types.CONVEXPOLYHEDRON]=g.prototype.convexParticle=function(oe,le,we,be,je,Ne,S,j){var z=-1,G=Me,J=He,me=null,fe=ae;if(fe.copy(be),fe.vsub(we,fe),je.conjugate(Z),Z.vmult(fe,fe),oe.pointIsInside(fe)){oe.worldVerticesNeedsUpdate&&oe.computeWorldVertices(we,je),oe.worldFaceNormalsNeedsUpdate&&oe.computeWorldFaceNormals(je);for(var de=0,ve=oe.faces.length;de!==ve;de++){var Ae=[oe.worldVertices[oe.faces[de][0]]],Ie=oe.worldFaceNormals[de];be.vsub(Ae[0],Re);var ce=-Ie.dot(Re);(me===null||Math.abs(ce)<Math.abs(me))&&(me=ce,z=de,G.copy(Ie))}if(z!==-1){var We=this.createContactEquation(j,S,le,oe);G.mult(me,J),J.vadd(be,J),J.vsub(we,J),We.rj.copy(J),G.negate(We.ni),We.ri.set(0,0,0);var Xe=We.ri,ct=We.rj;Xe.vadd(be,Xe),Xe.vsub(j.position,Xe),ct.vadd(we,ct),ct.vsub(S.position,ct),this.result.push(We),this.createFrictionEquationsFromContact(We,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}},g.prototype[r.types.BOX|r.types.HEIGHTFIELD]=g.prototype.boxHeightfield=function(oe,le,we,be,je,Ne,S,j){oe.convexPolyhedronRepresentation.material=oe.material,oe.convexPolyhedronRepresentation.collisionResponse=oe.collisionResponse,this.convexHeightfield(oe.convexPolyhedronRepresentation,le,we,be,je,Ne,S,j)};var rt=new a,xt=new a,wt=[0];g.prototype[r.types.CONVEXPOLYHEDRON|r.types.HEIGHTFIELD]=g.prototype.convexHeightfield=function(oe,le,we,be,je,Ne,S,j){var z=le.data,G=le.elementSize,J=oe.boundingSphereRadius,me=xt,fe=wt,de=rt;c.pointToLocalFrame(be,Ne,we,de);var ve=Math.floor((de.x-J)/G)-1,Ae=Math.ceil((de.x+J)/G)+1,Ie=Math.floor((de.y-J)/G)-1,ce=Math.ceil((de.y+J)/G)+1;if(!(Ae<0||ce<0||ve>z.length||Ie>z[0].length)){ve<0&&(ve=0),Ae<0&&(Ae=0),Ie<0&&(Ie=0),ce<0&&(ce=0),ve>=z.length&&(ve=z.length-1),Ae>=z.length&&(Ae=z.length-1),ce>=z[0].length&&(ce=z[0].length-1),Ie>=z[0].length&&(Ie=z[0].length-1);var We=[];le.getRectMinMax(ve,Ie,Ae,ce,We);var Xe=We[0],ct=We[1];if(!(de.z-J>ct||de.z+J<Xe))for(var Ke=ve;Ke<Ae;Ke++)for(var qe=Ie;qe<ce;qe++)le.getConvexTrianglePillar(Ke,qe,!1),c.pointToWorldFrame(be,Ne,le.pillarOffset,me),we.distanceTo(me)<le.pillarConvex.boundingSphereRadius+oe.boundingSphereRadius&&this.convexConvex(oe,le.pillarConvex,we,me,je,Ne,S,j,null,null,fe,null),le.getConvexTrianglePillar(Ke,qe,!0),c.pointToWorldFrame(be,Ne,le.pillarOffset,me),we.distanceTo(me)<le.pillarConvex.boundingSphereRadius+oe.boundingSphereRadius&&this.convexConvex(oe,le.pillarConvex,we,me,je,Ne,S,j,null,null,fe,null)}};var Zt=new a,tt=new a;g.prototype[r.types.SPHERE|r.types.HEIGHTFIELD]=g.prototype.sphereHeightfield=function(oe,le,we,be,je,Ne,S,j){var z=le.data,G=oe.radius,J=le.elementSize,me=tt,fe=Zt;c.pointToLocalFrame(be,Ne,we,fe);var de=Math.floor((fe.x-G)/J)-1,ve=Math.ceil((fe.x+G)/J)+1,Ae=Math.floor((fe.y-G)/J)-1,Ie=Math.ceil((fe.y+G)/J)+1;if(!(ve<0||Ie<0||de>z.length||Ie>z[0].length)){de<0&&(de=0),ve<0&&(ve=0),Ae<0&&(Ae=0),Ie<0&&(Ie=0),de>=z.length&&(de=z.length-1),ve>=z.length&&(ve=z.length-1),Ie>=z[0].length&&(Ie=z[0].length-1),Ae>=z[0].length&&(Ae=z[0].length-1);var ce=[];le.getRectMinMax(de,Ae,ve,Ie,ce);var We=ce[0],Xe=ce[1];if(!(fe.z-G>Xe||fe.z+G<We))for(var ct=this.result,Ke=de;Ke<ve;Ke++)for(var qe=Ae;qe<Ie;qe++){var Ce=ct.length;le.getConvexTrianglePillar(Ke,qe,!1),c.pointToWorldFrame(be,Ne,le.pillarOffset,me),we.distanceTo(me)<le.pillarConvex.boundingSphereRadius+oe.boundingSphereRadius&&this.sphereConvex(oe,le.pillarConvex,we,me,je,Ne,S,j),le.getConvexTrianglePillar(Ke,qe,!0),c.pointToWorldFrame(be,Ne,le.pillarOffset,me),we.distanceTo(me)<le.pillarConvex.boundingSphereRadius+oe.boundingSphereRadius&&this.sphereConvex(oe,le.pillarConvex,we,me,je,Ne,S,j);var Ot=ct.length-Ce;if(Ot>2)return}}}},{"../collision/AABB":3,"../collision/Ray":9,"../equations/ContactEquation":19,"../equations/FrictionEquation":21,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../shapes/ConvexPolyhedron":38,"../shapes/Shape":43,"../solver/Solver":47,"../utils/Vec3Pool":54}],56:[function(t,n,i){n.exports=y;var s=t("../shapes/Shape"),r=t("../math/Vec3"),o=t("../math/Quaternion"),a=t("../solver/GSSolver");t("../utils/Vec3Pool"),t("../equations/ContactEquation"),t("../equations/FrictionEquation");var c=t("./Narrowphase"),h=t("../utils/EventTarget"),l=t("../collision/ArrayCollisionMatrix"),u=t("../material/Material"),f=t("../material/ContactMaterial"),g=t("../objects/Body"),m=t("../utils/TupleDictionary"),p=t("../collision/RaycastResult"),v=t("../collision/AABB"),x=t("../collision/Ray"),w=t("../collision/NaiveBroadphase");function y(){h.apply(this),this.dt=-1,this.allowSleep=!1,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=0,this.quatNormalizeFast=!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new r,this.broadphase=new w,this.bodies=[],this.solver=new a,this.constraints=[],this.narrowphase=new c(this),this.collisionMatrix=new l,this.collisionMatrixPrevious=new l,this.materials=[],this.contactmaterials=[],this.contactMaterialTable=new m,this.defaultMaterial=new u("default"),this.defaultContactMaterial=new f(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null}}y.prototype=new h,new v;var b=new x;if(y.prototype.getContactMaterial=function(O,ee){return this.contactMaterialTable.get(O.id,ee.id)},y.prototype.numObjects=function(){return this.bodies.length},y.prototype.collisionMatrixTick=function(){var O=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=O,this.collisionMatrix.reset()},y.prototype.add=y.prototype.addBody=function(O){this.bodies.indexOf(O)===-1&&(O.index=this.bodies.length,this.bodies.push(O),O.world=this,O.initPosition.copy(O.position),O.initVelocity.copy(O.velocity),O.timeLastSleepy=this.time,O instanceof g&&(O.initAngularVelocity.copy(O.angularVelocity),O.initQuaternion.copy(O.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=O,this.dispatchEvent(this.addBodyEvent))},y.prototype.addConstraint=function(O){this.constraints.push(O)},y.prototype.removeConstraint=function(O){var ee=this.constraints.indexOf(O);ee!==-1&&this.constraints.splice(ee,1)},y.prototype.rayTest=function(O,ee,K){K instanceof p?this.raycastClosest(O,ee,{skipBackfaces:!0},K):this.raycastAll(O,ee,{skipBackfaces:!0},K)},y.prototype.raycastAll=function(O,ee,K,P){return K.mode=x.ALL,K.from=O,K.to=ee,K.callback=P,b.intersectWorld(this,K)},y.prototype.raycastAny=function(O,ee,K,P){return K.mode=x.ANY,K.from=O,K.to=ee,K.result=P,b.intersectWorld(this,K)},y.prototype.raycastClosest=function(O,ee,K,P){return K.mode=x.CLOSEST,K.from=O,K.to=ee,K.result=P,b.intersectWorld(this,K)},y.prototype.remove=function(O){O.world=null;var ee=this.bodies.length-1,K=this.bodies,P=K.indexOf(O);if(P!==-1){K.splice(P,1);for(var H=0;H!==K.length;H++)K[H].index=H;this.collisionMatrix.setNumObjects(ee),this.removeBodyEvent.body=O,this.dispatchEvent(this.removeBodyEvent)}},y.prototype.removeBody=y.prototype.remove,y.prototype.addMaterial=function(O){this.materials.push(O)},y.prototype.addContactMaterial=function(O){this.contactmaterials.push(O),this.contactMaterialTable.set(O.materials[0].id,O.materials[1].id,O)},typeof performance>"u"&&(performance={}),!performance.now){var L=Date.now();performance.timing&&performance.timing.navigationStart&&(L=performance.timing.navigationStart),performance.now=function(){return Date.now()-L}}var k=new r;y.prototype.step=function(O,ee,K){if(K=K||10,ee=ee||0,ee===0)this.internalStep(O),this.time+=O;else{var P=Math.floor((this.time+ee)/O)-Math.floor(this.time/O);P=Math.min(P,K);for(var H=performance.now(),D=0;D!==P&&(this.internalStep(O),!(performance.now()-H>O*1e3));D++);this.time+=ee;for(var I=this.time%O,R=I/O,V=k,re=this.bodies,ne=0;ne!==re.length;ne++){var $=re[ne];$.type!==g.STATIC&&$.sleepState!==g.SLEEPING?($.position.vsub($.previousPosition,V),V.scale(R,V),$.position.vadd(V,$.interpolatedPosition)):($.interpolatedPosition.copy($.position),$.interpolatedQuaternion.copy($.quaternion))}}};var _={type:"postStep"},M={type:"preStep"},E={type:"collide",body:null,contact:null},C=[],U=[],T=[],N=[];new r,new r,new r,new r,new r,new r,new r,new r,new r,new o;var Y=new o,te=new o,W=new r;y.prototype.internalStep=function(O){this.dt=O;var ee=this.contacts,K=T,P=N,H=this.numObjects(),D=this.bodies,I=this.solver,R=this.gravity,V=this.doProfiling,re=this.profile,ne=g.DYNAMIC,$,Q=this.constraints,he=U;R.norm();var Se=R.x,ge=R.y,Ee=R.z,ue=0;for(V&&($=performance.now()),ue=0;ue!==H;ue++){var xe=D[ue];if(xe.type&ne){var Ye=xe.force,ze=xe.mass;Ye.x+=ze*Se,Ye.y+=ze*ge,Ye.z+=ze*Ee}}for(var ue=0,Ge=this.subsystems.length;ue!==Ge;ue++)this.subsystems[ue].update();V&&($=performance.now()),K.length=0,P.length=0,this.broadphase.collisionPairs(this,K,P),V&&(re.broadphase=performance.now()-$);var Le=Q.length;for(ue=0;ue!==Le;ue++){var Pe=Q[ue];if(!Pe.collideConnected)for(var $e=K.length-1;$e>=0;$e-=1)(Pe.bodyA===K[$e]&&Pe.bodyB===P[$e]||Pe.bodyB===K[$e]&&Pe.bodyA===P[$e])&&(K.splice($e,1),P.splice($e,1))}this.collisionMatrixTick(),V&&($=performance.now());var B=C,A=ee.length;for(ue=0;ue!==A;ue++)B.push(ee[ue]);ee.length=0;var se=this.frictionEquations.length;for(ue=0;ue!==se;ue++)he.push(this.frictionEquations[ue]);this.frictionEquations.length=0,this.narrowphase.getContacts(K,P,this,ee,B,this.frictionEquations,he),V&&(re.narrowphase=performance.now()-$),V&&($=performance.now());for(var ue=0;ue<this.frictionEquations.length;ue++)I.addEquation(this.frictionEquations[ue]);for(var pe=ee.length,ye=0;ye!==pe;ye++){var Pe=ee[ye],xe=Pe.bi,_e=Pe.bj;Pe.si,Pe.sj;var Ve;if(xe.material&&_e.material?Ve=this.getContactMaterial(xe.material,_e.material)||this.defaultContactMaterial:Ve=this.defaultContactMaterial,Ve.friction,xe.material&&_e.material&&(xe.material.friction>=0&&_e.material.friction>=0&&xe.material.friction*_e.material.friction,xe.material.restitution>=0&&_e.material.restitution>=0&&(Pe.restitution=xe.material.restitution*_e.material.restitution)),I.addEquation(Pe),xe.allowSleep&&xe.type===g.DYNAMIC&&xe.sleepState===g.SLEEPING&&_e.sleepState===g.AWAKE&&_e.type!==g.STATIC){var q=_e.velocity.norm2()+_e.angularVelocity.norm2(),ie=Math.pow(_e.sleepSpeedLimit,2);q>=ie*2&&(xe._wakeUpAfterNarrowphase=!0)}if(_e.allowSleep&&_e.type===g.DYNAMIC&&_e.sleepState===g.SLEEPING&&xe.sleepState===g.AWAKE&&xe.type!==g.STATIC){var De=xe.velocity.norm2()+xe.angularVelocity.norm2(),Fe=Math.pow(xe.sleepSpeedLimit,2);De>=Fe*2&&(_e._wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(xe,_e,!0),this.collisionMatrixPrevious.get(xe,_e)||(E.body=_e,E.contact=Pe,xe.dispatchEvent(E),E.body=xe,_e.dispatchEvent(E))}for(V&&(re.makeContactConstraints=performance.now()-$,$=performance.now()),ue=0;ue!==H;ue++){var xe=D[ue];xe._wakeUpAfterNarrowphase&&(xe.wakeUp(),xe._wakeUpAfterNarrowphase=!1)}var Le=Q.length;for(ue=0;ue!==Le;ue++){var Pe=Q[ue];Pe.update();for(var $e=0,Oe=Pe.equations.length;$e!==Oe;$e++){var ke=Pe.equations[$e];I.addEquation(ke)}}I.solve(O,this),V&&(re.solve=performance.now()-$),I.removeAllEquations();var Qe=Math.pow;for(ue=0;ue!==H;ue++){var xe=D[ue];if(xe.type&ne){var Ze=Qe(1-xe.linearDamping,O),nt=xe.velocity;nt.mult(Ze,nt);var Z=xe.angularVelocity;if(Z){var ae=Qe(1-xe.angularDamping,O);Z.mult(ae,Z)}}}for(this.dispatchEvent(M),ue=0;ue!==H;ue++){var xe=D[ue];xe.preStep&&xe.preStep.call(xe)}V&&($=performance.now());var Me=Y,Re=te,He=this.stepnumber,rt=g.DYNAMIC|g.KINEMATIC,xt=He%(this.quatNormalizeSkip+1)===0,wt=this.quatNormalizeFast,Zt=O*.5;for(s.types.PLANE,s.types.CONVEXPOLYHEDRON,ue=0;ue!==H;ue++){var tt=D[ue],oe=tt.force,le=tt.torque;if(tt.type&rt&&tt.sleepState!==g.SLEEPING){var we=tt.velocity,be=tt.angularVelocity,je=tt.position,Ne=tt.quaternion,S=tt.invMass,j=tt.invInertiaWorld;we.x+=oe.x*S*O,we.y+=oe.y*S*O,we.z+=oe.z*S*O,tt.angularVelocity&&(j.vmult(le,W),W.mult(O,W),W.vadd(be,be)),je.x+=we.x*O,je.y+=we.y*O,je.z+=we.z*O,tt.angularVelocity&&(Me.set(be.x,be.y,be.z,0),Me.mult(Ne,Re),Ne.x+=Zt*Re.x,Ne.y+=Zt*Re.y,Ne.z+=Zt*Re.z,Ne.w+=Zt*Re.w,xt&&(wt?Ne.normalizeFast():Ne.normalize())),tt.aabb&&(tt.aabbNeedsUpdate=!0),tt.updateInertiaWorld&&tt.updateInertiaWorld()}}for(this.clearForces(),this.broadphase.dirty=!0,V&&(re.integrate=performance.now()-$),this.time+=O,this.stepnumber+=1,this.dispatchEvent(_),ue=0;ue!==H;ue++){var xe=D[ue],z=xe.postStep;z&&z.call(xe)}if(this.allowSleep)for(ue=0;ue!==H;ue++)D[ue].sleepTick(this.time)},y.prototype.clearForces=function(){for(var O=this.bodies,ee=O.length,K=0;K!==ee;K++){var P=O[K];P.force,P.torque,P.force.set(0,0,0),P.torque.set(0,0,0)}}},{"../collision/AABB":3,"../collision/ArrayCollisionMatrix":4,"../collision/NaiveBroadphase":7,"../collision/Ray":9,"../collision/RaycastResult":10,"../equations/ContactEquation":19,"../equations/FrictionEquation":21,"../material/ContactMaterial":24,"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Shape":43,"../solver/GSSolver":46,"../utils/EventTarget":49,"../utils/TupleDictionary":52,"../utils/Vec3Pool":54,"./Narrowphase":55}]},{},[2])(2)})})(Sv);const Te=xo;class zn{constructor(e){e===void 0&&(e=[0,0,0,0,0,0,0,0,0]),this.elements=e}identity(){const e=this.elements;e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1}setZero(){const e=this.elements;e[0]=0,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=0,e[6]=0,e[7]=0,e[8]=0}setTrace(e){const t=this.elements;t[0]=e.x,t[4]=e.y,t[8]=e.z}getTrace(e){e===void 0&&(e=new F);const t=this.elements;return e.x=t[0],e.y=t[4],e.z=t[8],e}vmult(e,t){t===void 0&&(t=new F);const n=this.elements,i=e.x,s=e.y,r=e.z;return t.x=n[0]*i+n[1]*s+n[2]*r,t.y=n[3]*i+n[4]*s+n[5]*r,t.z=n[6]*i+n[7]*s+n[8]*r,t}smult(e){for(let t=0;t<this.elements.length;t++)this.elements[t]*=e}mmult(e,t){t===void 0&&(t=new zn);const n=this.elements,i=e.elements,s=t.elements,r=n[0],o=n[1],a=n[2],c=n[3],h=n[4],l=n[5],u=n[6],f=n[7],g=n[8],m=i[0],p=i[1],v=i[2],x=i[3],w=i[4],y=i[5],b=i[6],L=i[7],k=i[8];return s[0]=r*m+o*x+a*b,s[1]=r*p+o*w+a*L,s[2]=r*v+o*y+a*k,s[3]=c*m+h*x+l*b,s[4]=c*p+h*w+l*L,s[5]=c*v+h*y+l*k,s[6]=u*m+f*x+g*b,s[7]=u*p+f*w+g*L,s[8]=u*v+f*y+g*k,t}scale(e,t){t===void 0&&(t=new zn);const n=this.elements,i=t.elements;for(let s=0;s!==3;s++)i[3*s+0]=e.x*n[3*s+0],i[3*s+1]=e.y*n[3*s+1],i[3*s+2]=e.z*n[3*s+2];return t}solve(e,t){t===void 0&&(t=new F);const n=3,i=4,s=[];let r,o;for(r=0;r<n*i;r++)s.push(0);for(r=0;r<3;r++)for(o=0;o<3;o++)s[r+i*o]=this.elements[r+3*o];s[3+4*0]=e.x,s[3+4*1]=e.y,s[3+4*2]=e.z;let a=3;const c=a;let h;const l=4;let u;do{if(r=c-a,s[r+i*r]===0){for(o=r+1;o<c;o++)if(s[r+i*o]!==0){h=l;do u=l-h,s[u+i*r]+=s[u+i*o];while(--h);break}}if(s[r+i*r]!==0)for(o=r+1;o<c;o++){const f=s[r+i*o]/s[r+i*r];h=l;do u=l-h,s[u+i*o]=u<=r?0:s[u+i*o]-s[u+i*r]*f;while(--h)}}while(--a);if(t.z=s[2*i+3]/s[2*i+2],t.y=(s[1*i+3]-s[1*i+2]*t.z)/s[1*i+1],t.x=(s[0*i+3]-s[0*i+2]*t.z-s[0*i+1]*t.y)/s[0*i+0],isNaN(t.x)||isNaN(t.y)||isNaN(t.z)||t.x===1/0||t.y===1/0||t.z===1/0)throw`Could not solve equation! Got x=[${t.toString()}], b=[${e.toString()}], A=[${this.toString()}]`;return t}e(e,t,n){if(n===void 0)return this.elements[t+3*e];this.elements[t+3*e]=n}copy(e){for(let t=0;t<e.elements.length;t++)this.elements[t]=e.elements[t];return this}toString(){let e="";const t=",";for(let n=0;n<9;n++)e+=this.elements[n]+t;return e}reverse(e){e===void 0&&(e=new zn);const t=3,n=6,i=Ev;let s,r;for(s=0;s<3;s++)for(r=0;r<3;r++)i[s+n*r]=this.elements[s+3*r];i[3+6*0]=1,i[3+6*1]=0,i[3+6*2]=0,i[4+6*0]=0,i[4+6*1]=1,i[4+6*2]=0,i[5+6*0]=0,i[5+6*1]=0,i[5+6*2]=1;let o=3;const a=o;let c;const h=n;let l;do{if(s=a-o,i[s+n*s]===0){for(r=s+1;r<a;r++)if(i[s+n*r]!==0){c=h;do l=h-c,i[l+n*s]+=i[l+n*r];while(--c);break}}if(i[s+n*s]!==0)for(r=s+1;r<a;r++){const u=i[s+n*r]/i[s+n*s];c=h;do l=h-c,i[l+n*r]=l<=s?0:i[l+n*r]-i[l+n*s]*u;while(--c)}}while(--o);s=2;do{r=s-1;do{const u=i[s+n*r]/i[s+n*s];c=n;do l=n-c,i[l+n*r]=i[l+n*r]-i[l+n*s]*u;while(--c)}while(r--)}while(--s);s=2;do{const u=1/i[s+n*s];c=n;do l=n-c,i[l+n*s]=i[l+n*s]*u;while(--c)}while(s--);s=2;do{r=2;do{if(l=i[t+r+n*s],isNaN(l)||l===1/0)throw`Could not reverse! A=[${this.toString()}]`;e.e(s,r,l)}while(r--)}while(s--);return e}setRotationFromQuaternion(e){const t=e.x,n=e.y,i=e.z,s=e.w,r=t+t,o=n+n,a=i+i,c=t*r,h=t*o,l=t*a,u=n*o,f=n*a,g=i*a,m=s*r,p=s*o,v=s*a,x=this.elements;return x[3*0+0]=1-(u+g),x[3*0+1]=h-v,x[3*0+2]=l+p,x[3*1+0]=h+v,x[3*1+1]=1-(c+g),x[3*1+2]=f-m,x[3*2+0]=l-p,x[3*2+1]=f+m,x[3*2+2]=1-(c+u),this}transpose(e){e===void 0&&(e=new zn);const t=this.elements,n=e.elements;let i;return n[0]=t[0],n[4]=t[4],n[8]=t[8],i=t[1],n[1]=t[3],n[3]=i,i=t[2],n[2]=t[6],n[6]=i,i=t[5],n[5]=t[7],n[7]=i,e}}const Ev=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class F{constructor(e,t,n){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0),this.x=e,this.y=t,this.z=n}cross(e,t){t===void 0&&(t=new F);const n=e.x,i=e.y,s=e.z,r=this.x,o=this.y,a=this.z;return t.x=o*s-a*i,t.y=a*n-r*s,t.z=r*i-o*n,t}set(e,t,n){return this.x=e,this.y=t,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(e,t){if(t)t.x=e.x+this.x,t.y=e.y+this.y,t.z=e.z+this.z;else return new F(this.x+e.x,this.y+e.y,this.z+e.z)}vsub(e,t){if(t)t.x=this.x-e.x,t.y=this.y-e.y,t.z=this.z-e.z;else return new F(this.x-e.x,this.y-e.y,this.z-e.z)}crossmat(){return new zn([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const e=this.x,t=this.y,n=this.z,i=Math.sqrt(e*e+t*t+n*n);if(i>0){const s=1/i;this.x*=s,this.y*=s,this.z*=s}else this.x=0,this.y=0,this.z=0;return i}unit(e){e===void 0&&(e=new F);const t=this.x,n=this.y,i=this.z;let s=Math.sqrt(t*t+n*n+i*i);return s>0?(s=1/s,e.x=t*s,e.y=n*s,e.z=i*s):(e.x=1,e.y=0,e.z=0),e}length(){const e=this.x,t=this.y,n=this.z;return Math.sqrt(e*e+t*t+n*n)}lengthSquared(){return this.dot(this)}distanceTo(e){const t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,o=e.z;return Math.sqrt((s-t)*(s-t)+(r-n)*(r-n)+(o-i)*(o-i))}distanceSquared(e){const t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,o=e.z;return(s-t)*(s-t)+(r-n)*(r-n)+(o-i)*(o-i)}scale(e,t){t===void 0&&(t=new F);const n=this.x,i=this.y,s=this.z;return t.x=e*n,t.y=e*i,t.z=e*s,t}vmul(e,t){return t===void 0&&(t=new F),t.x=e.x*this.x,t.y=e.y*this.y,t.z=e.z*this.z,t}addScaledVector(e,t,n){return n===void 0&&(n=new F),n.x=this.x+e*t.x,n.y=this.y+e*t.y,n.z=this.z+e*t.z,n}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(e){return e===void 0&&(e=new F),e.x=-this.x,e.y=-this.y,e.z=-this.z,e}tangents(e,t){const n=this.length();if(n>0){const i=Tv,s=1/n;i.set(this.x*s,this.y*s,this.z*s);const r=Av;Math.abs(i.x)<.9?(r.set(1,0,0),i.cross(r,e)):(r.set(0,1,0),i.cross(r,e)),i.cross(e,t)}else e.set(1,0,0),t.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}lerp(e,t,n){const i=this.x,s=this.y,r=this.z;n.x=i+(e.x-i)*t,n.y=s+(e.y-s)*t,n.z=r+(e.z-r)*t}almostEquals(e,t){return t===void 0&&(t=1e-6),!(Math.abs(this.x-e.x)>t||Math.abs(this.y-e.y)>t||Math.abs(this.z-e.z)>t)}almostZero(e){return e===void 0&&(e=1e-6),!(Math.abs(this.x)>e||Math.abs(this.y)>e||Math.abs(this.z)>e)}isAntiparallelTo(e,t){return this.negate(Rl),Rl.almostEquals(e,t)}clone(){return new F(this.x,this.y,this.z)}}F.ZERO=new F(0,0,0);F.UNIT_X=new F(1,0,0);F.UNIT_Y=new F(0,1,0);F.UNIT_Z=new F(0,0,1);const Tv=new F,Av=new F,Rl=new F;class pn{constructor(e){e===void 0&&(e={}),this.lowerBound=new F,this.upperBound=new F,e.lowerBound&&this.lowerBound.copy(e.lowerBound),e.upperBound&&this.upperBound.copy(e.upperBound)}setFromPoints(e,t,n,i){const s=this.lowerBound,r=this.upperBound,o=n;s.copy(e[0]),o&&o.vmult(s,s),r.copy(s);for(let a=1;a<e.length;a++){let c=e[a];o&&(o.vmult(c,Pl),c=Pl),c.x>r.x&&(r.x=c.x),c.x<s.x&&(s.x=c.x),c.y>r.y&&(r.y=c.y),c.y<s.y&&(s.y=c.y),c.z>r.z&&(r.z=c.z),c.z<s.z&&(s.z=c.z)}return t&&(t.vadd(s,s),t.vadd(r,r)),i&&(s.x-=i,s.y-=i,s.z-=i,r.x+=i,r.y+=i,r.z+=i),this}copy(e){return this.lowerBound.copy(e.lowerBound),this.upperBound.copy(e.upperBound),this}clone(){return new pn().copy(this)}extend(e){this.lowerBound.x=Math.min(this.lowerBound.x,e.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,e.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,e.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,e.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,e.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,e.upperBound.z)}overlaps(e){const t=this.lowerBound,n=this.upperBound,i=e.lowerBound,s=e.upperBound,r=i.x<=n.x&&n.x<=s.x||t.x<=s.x&&s.x<=n.x,o=i.y<=n.y&&n.y<=s.y||t.y<=s.y&&s.y<=n.y,a=i.z<=n.z&&n.z<=s.z||t.z<=s.z&&s.z<=n.z;return r&&o&&a}volume(){const e=this.lowerBound,t=this.upperBound;return(t.x-e.x)*(t.y-e.y)*(t.z-e.z)}contains(e){const t=this.lowerBound,n=this.upperBound,i=e.lowerBound,s=e.upperBound;return t.x<=i.x&&n.x>=s.x&&t.y<=i.y&&n.y>=s.y&&t.z<=i.z&&n.z>=s.z}getCorners(e,t,n,i,s,r,o,a){const c=this.lowerBound,h=this.upperBound;e.copy(c),t.set(h.x,c.y,c.z),n.set(h.x,h.y,c.z),i.set(c.x,h.y,h.z),s.set(h.x,c.y,h.z),r.set(c.x,h.y,c.z),o.set(c.x,c.y,h.z),a.copy(h)}toLocalFrame(e,t){const n=Il,i=n[0],s=n[1],r=n[2],o=n[3],a=n[4],c=n[5],h=n[6],l=n[7];this.getCorners(i,s,r,o,a,c,h,l);for(let u=0;u!==8;u++){const f=n[u];e.pointToLocal(f,f)}return t.setFromPoints(n)}toWorldFrame(e,t){const n=Il,i=n[0],s=n[1],r=n[2],o=n[3],a=n[4],c=n[5],h=n[6],l=n[7];this.getCorners(i,s,r,o,a,c,h,l);for(let u=0;u!==8;u++){const f=n[u];e.pointToWorld(f,f)}return t.setFromPoints(n)}overlapsRay(e){const{direction:t,from:n}=e,i=1/t.x,s=1/t.y,r=1/t.z,o=(this.lowerBound.x-n.x)*i,a=(this.upperBound.x-n.x)*i,c=(this.lowerBound.y-n.y)*s,h=(this.upperBound.y-n.y)*s,l=(this.lowerBound.z-n.z)*r,u=(this.upperBound.z-n.z)*r,f=Math.max(Math.max(Math.min(o,a),Math.min(c,h)),Math.min(l,u)),g=Math.min(Math.min(Math.max(o,a),Math.max(c,h)),Math.max(l,u));return!(g<0||f>g)}}const Pl=new F,Il=[new F,new F,new F,new F,new F,new F,new F,new F];class Ht{constructor(e,t,n,i){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=e,this.y=t,this.z=n,this.w=i}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(e,t){const n=Math.sin(t*.5);return this.x=e.x*n,this.y=e.y*n,this.z=e.z*n,this.w=Math.cos(t*.5),this}toAxisAngle(e){e===void 0&&(e=new F),this.normalize();const t=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(e.x=this.x,e.y=this.y,e.z=this.z):(e.x=this.x/n,e.y=this.y/n,e.z=this.z/n),[e,t]}setFromVectors(e,t){if(e.isAntiparallelTo(t)){const n=Cv,i=Lv;e.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=e.cross(t);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(e.length()**2*t.length()**2)+e.dot(t),this.normalize()}return this}mult(e,t){t===void 0&&(t=new Ht);const n=this.x,i=this.y,s=this.z,r=this.w,o=e.x,a=e.y,c=e.z,h=e.w;return t.x=n*h+r*o+i*c-s*a,t.y=i*h+r*a+s*o-n*c,t.z=s*h+r*c+n*a-i*o,t.w=r*h-n*o-i*a-s*c,t}inverse(e){e===void 0&&(e=new Ht);const t=this.x,n=this.y,i=this.z,s=this.w;this.conjugate(e);const r=1/(t*t+n*n+i*i+s*s);return e.x*=r,e.y*=r,e.z*=r,e.w*=r,e}conjugate(e){return e===void 0&&(e=new Ht),e.x=-this.x,e.y=-this.y,e.z=-this.z,e.w=this.w,e}normalize(){let e=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return e===0?(this.x=0,this.y=0,this.z=0,this.w=0):(e=1/e,this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}normalizeFast(){const e=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return e===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}vmult(e,t){t===void 0&&(t=new F);const n=e.x,i=e.y,s=e.z,r=this.x,o=this.y,a=this.z,c=this.w,h=c*n+o*s-a*i,l=c*i+a*n-r*s,u=c*s+r*i-o*n,f=-r*n-o*i-a*s;return t.x=h*c+f*-r+l*-a-u*-o,t.y=l*c+f*-o+u*-r-h*-a,t.z=u*c+f*-a+h*-o-l*-r,t}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w,this}toEuler(e,t){t===void 0&&(t="YZX");let n,i,s;const r=this.x,o=this.y,a=this.z,c=this.w;switch(t){case"YZX":const h=r*o+a*c;if(h>.499&&(n=2*Math.atan2(r,c),i=Math.PI/2,s=0),h<-.499&&(n=-2*Math.atan2(r,c),i=-Math.PI/2,s=0),n===void 0){const l=r*r,u=o*o,f=a*a;n=Math.atan2(2*o*c-2*r*a,1-2*u-2*f),i=Math.asin(2*h),s=Math.atan2(2*r*c-2*o*a,1-2*l-2*f)}break;default:throw new Error(`Euler order ${t} not supported yet.`)}e.y=n,e.z=i,e.x=s}setFromEuler(e,t,n,i){i===void 0&&(i="XYZ");const s=Math.cos(e/2),r=Math.cos(t/2),o=Math.cos(n/2),a=Math.sin(e/2),c=Math.sin(t/2),h=Math.sin(n/2);return i==="XYZ"?(this.x=a*r*o+s*c*h,this.y=s*c*o-a*r*h,this.z=s*r*h+a*c*o,this.w=s*r*o-a*c*h):i==="YXZ"?(this.x=a*r*o+s*c*h,this.y=s*c*o-a*r*h,this.z=s*r*h-a*c*o,this.w=s*r*o+a*c*h):i==="ZXY"?(this.x=a*r*o-s*c*h,this.y=s*c*o+a*r*h,this.z=s*r*h+a*c*o,this.w=s*r*o-a*c*h):i==="ZYX"?(this.x=a*r*o-s*c*h,this.y=s*c*o+a*r*h,this.z=s*r*h-a*c*o,this.w=s*r*o+a*c*h):i==="YZX"?(this.x=a*r*o+s*c*h,this.y=s*c*o+a*r*h,this.z=s*r*h-a*c*o,this.w=s*r*o-a*c*h):i==="XZY"&&(this.x=a*r*o-s*c*h,this.y=s*c*o-a*r*h,this.z=s*r*h+a*c*o,this.w=s*r*o+a*c*h),this}clone(){return new Ht(this.x,this.y,this.z,this.w)}slerp(e,t,n){n===void 0&&(n=new Ht);const i=this.x,s=this.y,r=this.z,o=this.w;let a=e.x,c=e.y,h=e.z,l=e.w,u,f,g,m,p;return f=i*a+s*c+r*h+o*l,f<0&&(f=-f,a=-a,c=-c,h=-h,l=-l),1-f>1e-6?(u=Math.acos(f),g=Math.sin(u),m=Math.sin((1-t)*u)/g,p=Math.sin(t*u)/g):(m=1-t,p=t),n.x=m*i+p*a,n.y=m*s+p*c,n.z=m*r+p*h,n.w=m*o+p*l,n}integrate(e,t,n,i){i===void 0&&(i=new Ht);const s=e.x*n.x,r=e.y*n.y,o=e.z*n.z,a=this.x,c=this.y,h=this.z,l=this.w,u=t*.5;return i.x+=u*(s*l+r*h-o*c),i.y+=u*(r*l+o*a-s*h),i.z+=u*(o*l+s*c-r*a),i.w+=u*(-s*a-r*c-o*h),i}}const Cv=new F,Lv=new F,Rv={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class Ue{constructor(e){e===void 0&&(e={}),this.id=Ue.idCounter++,this.type=e.type||0,this.boundingSphereRadius=0,this.collisionResponse=e.collisionResponse?e.collisionResponse:!0,this.collisionFilterGroup=e.collisionFilterGroup!==void 0?e.collisionFilterGroup:1,this.collisionFilterMask=e.collisionFilterMask!==void 0?e.collisionFilterMask:-1,this.material=e.material?e.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(e,t){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(e,t,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}Ue.idCounter=0;Ue.types=Rv;class Qt{constructor(e){e===void 0&&(e={}),this.position=new F,this.quaternion=new Ht,e.position&&this.position.copy(e.position),e.quaternion&&this.quaternion.copy(e.quaternion)}pointToLocal(e,t){return Qt.pointToLocalFrame(this.position,this.quaternion,e,t)}pointToWorld(e,t){return Qt.pointToWorldFrame(this.position,this.quaternion,e,t)}vectorToWorldFrame(e,t){return t===void 0&&(t=new F),this.quaternion.vmult(e,t),t}static pointToLocalFrame(e,t,n,i){return i===void 0&&(i=new F),n.vsub(e,i),t.conjugate(Dl),Dl.vmult(i,i),i}static pointToWorldFrame(e,t,n,i){return i===void 0&&(i=new F),t.vmult(n,i),i.vadd(e,i),i}static vectorToWorldFrame(e,t,n){return n===void 0&&(n=new F),e.vmult(t,n),n}static vectorToLocalFrame(e,t,n,i){return i===void 0&&(i=new F),t.w*=-1,t.vmult(n,i),t.w*=-1,i}}const Dl=new Ht;new F;new F;new F;new F;new F,new F,new F,new F,new F,new F,new F,new F;new F;new Ht;new pn;new zn;new zn;new zn;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new Ht;new F;new F;new F;new F;class yo{constructor(){this.rayFromWorld=new F,this.rayToWorld=new F,this.hitNormalWorld=new F,this.hitPointWorld=new F,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(e,t,n,i,s,r,o){this.rayFromWorld.copy(e),this.rayToWorld.copy(t),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=s,this.body=r,this.distance=o}}let Mc,Sc,Ec,Tc,Ac,Cc,Lc;const zo={CLOSEST:1,ANY:2,ALL:4};Mc=Ue.types.SPHERE;Sc=Ue.types.PLANE;Ec=Ue.types.BOX;Tc=Ue.types.CYLINDER;Ac=Ue.types.CONVEXPOLYHEDRON;Cc=Ue.types.HEIGHTFIELD;Lc=Ue.types.TRIMESH;class Ut{get[Mc](){return this._intersectSphere}get[Sc](){return this._intersectPlane}get[Ec](){return this._intersectBox}get[Tc](){return this._intersectConvex}get[Ac](){return this._intersectConvex}get[Cc](){return this._intersectHeightfield}get[Lc](){return this._intersectTrimesh}constructor(e,t){e===void 0&&(e=new F),t===void 0&&(t=new F),this.from=e.clone(),this.to=t.clone(),this.direction=new F,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=Ut.ANY,this.result=new yo,this.hasHit=!1,this.callback=n=>{}}intersectWorld(e,t){return this.mode=t.mode||Ut.ANY,this.result=t.result||new yo,this.skipBackfaces=!!t.skipBackfaces,this.collisionFilterMask=typeof t.collisionFilterMask<"u"?t.collisionFilterMask:-1,this.collisionFilterGroup=typeof t.collisionFilterGroup<"u"?t.collisionFilterGroup:-1,this.checkCollisionResponse=typeof t.checkCollisionResponse<"u"?t.checkCollisionResponse:!0,t.from&&this.from.copy(t.from),t.to&&this.to.copy(t.to),this.callback=t.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Nl),io.length=0,e.broadphase.aabbQuery(e,Nl,io),this.intersectBodies(io),this.hasHit}intersectBody(e,t){t&&(this.result=t,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!e.collisionResponse||!(this.collisionFilterGroup&e.collisionFilterMask)||!(e.collisionFilterGroup&this.collisionFilterMask))return;const i=Pv,s=Iv;for(let r=0,o=e.shapes.length;r<o;r++){const a=e.shapes[r];if(!(n&&!a.collisionResponse)&&(e.quaternion.mult(e.shapeOrientations[r],s),e.quaternion.vmult(e.shapeOffsets[r],i),i.vadd(e.position,i),this.intersectShape(a,s,i,e),this.result.shouldStop))break}}intersectBodies(e,t){t&&(this.result=t,this.updateDirection());for(let n=0,i=e.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(e[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(e,t,n,i){const s=this.from;if(Xv(s,this.direction,n)>e.boundingSphereRadius)return;const o=this[e.type];o&&o.call(this,e,t,n,i,e)}_intersectBox(e,t,n,i,s){return this._intersectConvex(e.convexPolyhedronRepresentation,t,n,i,s)}_intersectPlane(e,t,n,i,s){const r=this.from,o=this.to,a=this.direction,c=new F(0,0,1);t.vmult(c,c);const h=new F;r.vsub(n,h);const l=h.dot(c);o.vsub(n,h);const u=h.dot(c);if(l*u>0||r.distanceTo(o)<l)return;const f=c.dot(a);if(Math.abs(f)<this.precision)return;const g=new F,m=new F,p=new F;r.vsub(n,g);const v=-c.dot(g)/f;a.scale(v,m),r.vadd(m,p),this.reportIntersection(c,p,s,i,-1)}getAABB(e){const{lowerBound:t,upperBound:n}=e,i=this.to,s=this.from;t.x=Math.min(i.x,s.x),t.y=Math.min(i.y,s.y),t.z=Math.min(i.z,s.z),n.x=Math.max(i.x,s.x),n.y=Math.max(i.y,s.y),n.z=Math.max(i.z,s.z)}_intersectHeightfield(e,t,n,i,s){e.data,e.elementSize;const r=Dv;r.from.copy(this.from),r.to.copy(this.to),Qt.pointToLocalFrame(n,t,r.from,r.from),Qt.pointToLocalFrame(n,t,r.to,r.to),r.updateDirection();const o=Nv;let a,c,h,l;a=c=0,h=l=e.data.length-1;const u=new pn;r.getAABB(u),e.getIndexOfPosition(u.lowerBound.x,u.lowerBound.y,o,!0),a=Math.max(a,o[0]),c=Math.max(c,o[1]),e.getIndexOfPosition(u.upperBound.x,u.upperBound.y,o,!0),h=Math.min(h,o[0]+1),l=Math.min(l,o[1]+1);for(let f=a;f<h;f++)for(let g=c;g<l;g++){if(this.result.shouldStop)return;if(e.getAabbAtIndex(f,g,u),!!u.overlapsRay(r)){if(e.getConvexTrianglePillar(f,g,!1),Qt.pointToWorldFrame(n,t,e.pillarOffset,ar),this._intersectConvex(e.pillarConvex,t,ar,i,s,Bl),this.result.shouldStop)return;e.getConvexTrianglePillar(f,g,!0),Qt.pointToWorldFrame(n,t,e.pillarOffset,ar),this._intersectConvex(e.pillarConvex,t,ar,i,s,Bl)}}}_intersectSphere(e,t,n,i,s){const r=this.from,o=this.to,a=e.radius,c=(o.x-r.x)**2+(o.y-r.y)**2+(o.z-r.z)**2,h=2*((o.x-r.x)*(r.x-n.x)+(o.y-r.y)*(r.y-n.y)+(o.z-r.z)*(r.z-n.z)),l=(r.x-n.x)**2+(r.y-n.y)**2+(r.z-n.z)**2-a**2,u=h**2-4*c*l,f=Bv,g=Fv;if(!(u<0))if(u===0)r.lerp(o,u,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,s,i,-1);else{const m=(-h-Math.sqrt(u))/(2*c),p=(-h+Math.sqrt(u))/(2*c);if(m>=0&&m<=1&&(r.lerp(o,m,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,s,i,-1)),this.result.shouldStop)return;p>=0&&p<=1&&(r.lerp(o,p,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,s,i,-1))}}_intersectConvex(e,t,n,i,s,r){const o=zv,a=Fl,c=r&&r.faceList||null,h=e.faces,l=e.vertices,u=e.faceNormals,f=this.direction,g=this.from,m=this.to,p=g.distanceTo(m),v=c?c.length:h.length,x=this.result;for(let w=0;!x.shouldStop&&w<v;w++){const y=c?c[w]:w,b=h[y],L=u[y],k=t,_=n;a.copy(l[b[0]]),k.vmult(a,a),a.vadd(_,a),a.vsub(g,a),k.vmult(L,o);const M=f.dot(o);if(Math.abs(M)<this.precision)continue;const E=o.dot(a)/M;if(!(E<0)){f.scale(E,Jt),Jt.vadd(g,Jt),xn.copy(l[b[0]]),k.vmult(xn,xn),_.vadd(xn,xn);for(let C=1;!x.shouldStop&&C<b.length-1;C++){wn.copy(l[b[C]]),bn.copy(l[b[C+1]]),k.vmult(wn,wn),k.vmult(bn,bn),_.vadd(wn,wn),_.vadd(bn,bn);const U=Jt.distanceTo(g);!(Ut.pointInTriangle(Jt,xn,wn,bn)||Ut.pointInTriangle(Jt,wn,xn,bn))||U>p||this.reportIntersection(o,Jt,s,i,y)}}}}_intersectTrimesh(e,t,n,i,s,r){const o=Ov,a=Gv,c=qv,h=Fl,l=Vv,u=Uv,f=kv,g=Wv,m=Hv,p=e.indices;e.vertices;const v=this.from,x=this.to,w=this.direction;c.position.copy(n),c.quaternion.copy(t),Qt.vectorToLocalFrame(n,t,w,l),Qt.pointToLocalFrame(n,t,v,u),Qt.pointToLocalFrame(n,t,x,f),f.x*=e.scale.x,f.y*=e.scale.y,f.z*=e.scale.z,u.x*=e.scale.x,u.y*=e.scale.y,u.z*=e.scale.z,f.vsub(u,l),l.normalize();const y=u.distanceSquared(f);e.tree.rayQuery(this,c,a);for(let b=0,L=a.length;!this.result.shouldStop&&b!==L;b++){const k=a[b];e.getNormal(k,o),e.getVertex(p[k*3],xn),xn.vsub(u,h);const _=l.dot(o),M=o.dot(h)/_;if(M<0)continue;l.scale(M,Jt),Jt.vadd(u,Jt),e.getVertex(p[k*3+1],wn),e.getVertex(p[k*3+2],bn);const E=Jt.distanceSquared(u);!(Ut.pointInTriangle(Jt,wn,xn,bn)||Ut.pointInTriangle(Jt,xn,wn,bn))||E>y||(Qt.vectorToWorldFrame(t,o,m),Qt.pointToWorldFrame(n,t,Jt,g),this.reportIntersection(m,g,s,i,k))}a.length=0}reportIntersection(e,t,n,i,s){const r=this.from,o=this.to,a=r.distanceTo(t),c=this.result;if(!(this.skipBackfaces&&e.dot(this.direction)>0))switch(c.hitFaceIndex=typeof s<"u"?s:-1,this.mode){case Ut.ALL:this.hasHit=!0,c.set(r,o,e,t,n,i,a),c.hasHit=!0,this.callback(c);break;case Ut.CLOSEST:(a<c.distance||!c.hasHit)&&(this.hasHit=!0,c.hasHit=!0,c.set(r,o,e,t,n,i,a));break;case Ut.ANY:this.hasHit=!0,c.hasHit=!0,c.set(r,o,e,t,n,i,a),c.shouldStop=!0;break}}static pointInTriangle(e,t,n,i){i.vsub(t,ai),n.vsub(t,vs),e.vsub(t,so);const s=ai.dot(ai),r=ai.dot(vs),o=ai.dot(so),a=vs.dot(vs),c=vs.dot(so);let h,l;return(h=a*o-r*c)>=0&&(l=s*c-r*o)>=0&&h+l<s*a-r*r}}Ut.CLOSEST=zo.CLOSEST;Ut.ANY=zo.ANY;Ut.ALL=zo.ALL;const Nl=new pn,io=[],vs=new F,so=new F,Pv=new F,Iv=new Ht,Jt=new F,xn=new F,wn=new F,bn=new F;new F;new yo;const Bl={faceList:[0]},ar=new F,Dv=new Ut,Nv=[],Bv=new F,Fv=new F,zv=new F;new F;new F;const Fl=new F,Ov=new F,Vv=new F,Uv=new F,kv=new F,Hv=new F,Wv=new F;new pn;const Gv=[],qv=new Qt,ai=new F,lr=new F;function Xv(d,e,t){t.vsub(d,ai);const n=ai.dot(e);return e.scale(n,lr),lr.vadd(d,lr),t.distanceTo(lr)}new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new Ut;new F;new F;new F;new F(1,0,0),new F(0,1,0),new F(0,0,1);new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new pn;new F;new pn;new F;new F;new F;new F;new F;new F;new F;new pn;new F;new Qt;new pn;Ue.types.SPHERE,Ue.types.SPHERE|Ue.types.PLANE,Ue.types.BOX|Ue.types.BOX,Ue.types.SPHERE|Ue.types.BOX,Ue.types.PLANE|Ue.types.BOX,Ue.types.CONVEXPOLYHEDRON,Ue.types.SPHERE|Ue.types.CONVEXPOLYHEDRON,Ue.types.PLANE|Ue.types.CONVEXPOLYHEDRON,Ue.types.BOX|Ue.types.CONVEXPOLYHEDRON,Ue.types.SPHERE|Ue.types.HEIGHTFIELD,Ue.types.BOX|Ue.types.HEIGHTFIELD,Ue.types.CONVEXPOLYHEDRON|Ue.types.HEIGHTFIELD,Ue.types.PARTICLE|Ue.types.SPHERE,Ue.types.PLANE|Ue.types.PARTICLE,Ue.types.BOX|Ue.types.PARTICLE,Ue.types.PARTICLE|Ue.types.CONVEXPOLYHEDRON,Ue.types.CYLINDER,Ue.types.SPHERE|Ue.types.CYLINDER,Ue.types.PLANE|Ue.types.CYLINDER,Ue.types.BOX|Ue.types.CYLINDER,Ue.types.CONVEXPOLYHEDRON|Ue.types.CYLINDER,Ue.types.HEIGHTFIELD|Ue.types.CYLINDER,Ue.types.PARTICLE|Ue.types.CYLINDER,Ue.types.SPHERE|Ue.types.TRIMESH,Ue.types.PLANE|Ue.types.TRIMESH;new F;new F;new F;new F;new F;new Ht;new Ht;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new pn;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F,new F,new F,new F,new F,new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new F;new Ht;new F;new F;new F;new F;new F;new F;new F;new F;new F;new pn;new Ut;const xs=globalThis.performance||{};if(!xs.now){let d=Date.now();xs.timing&&xs.timing.navigationStart&&(d=xs.timing.navigationStart),xs.now=()=>Date.now()-d}new F;function Yv(d,e,t){let{color:n=65280,scale:i=1,onInit:s,onUpdate:r}=t===void 0?{}:t;const o=[],a=new $t({color:n??65280,wireframe:!0}),c=new F,h=new F,l=new F,u=new Ht,f=new Ls(1),g=new vi(1,1,1),m=new Ji(10,10,10,10);m.translate(0,0,1e-4);function p(_){const M=new Wt,E=[];for(let U=0;U<_.vertices.length;U++){const T=_.vertices[U];E.push(T.x,T.y,T.z)}M.setAttribute("position",new Ct(E,3));const C=[];for(let U=0;U<_.faces.length;U++){const T=_.faces[U],N=T[0];for(let Y=1;Y<T.length-1;Y++){const te=T[Y],W=T[Y+1];C.push(N,te,W)}}return M.setIndex(C),M.computeBoundingSphere(),M.computeVertexNormals(),M}function v(_){const M=new Wt,E=[],C=c,U=h,T=l;for(let N=0;N<_.indices.length/3;N++)_.getTriangleVertices(N,C,U,T),E.push(C.x,C.y,C.z),E.push(U.x,U.y,U.z),E.push(T.x,T.y,T.z);return M.setAttribute("position",new Ct(E,3)),M.computeBoundingSphere(),M.computeVertexNormals(),M}function x(_){const M=new Wt,E=_.elementSize||1,C=_.data.flatMap((T,N)=>T.flatMap((Y,te)=>[N*E,te*E,Y])),U=[];for(let T=0;T<_.data.length-1;T++)for(let N=0;N<_.data[T].length-1;N++){const Y=_.data[T].length,te=T*Y+N;U.push(te+1,te+Y,te+Y+1),U.push(te+Y,te+1,te)}return M.setIndex(U),M.setAttribute("position",new Ct(C,3)),M.computeBoundingSphere(),M.computeVertexNormals(),M}function w(_){let M=new St;const{SPHERE:E,BOX:C,PLANE:U,CYLINDER:T,CONVEXPOLYHEDRON:N,TRIMESH:Y,HEIGHTFIELD:te}=Ue.types;switch(_.type){case E:{M=new St(f,a);break}case C:{M=new St(g,a);break}case U:{M=new St(m,a);break}case T:{const W=new Po(_.radiusTop,_.radiusBottom,_.height,_.numSegments);M=new St(W,a),_.geometryId=W.id;break}case N:{const W=p(_);M=new St(W,a),_.geometryId=W.id;break}case Y:{const W=v(_);M=new St(W,a),_.geometryId=W.id;break}case te:{const W=x(_);M=new St(W,a),_.geometryId=W.id;break}}return d.add(M),M}function y(_,M){const{SPHERE:E,BOX:C,PLANE:U,CYLINDER:T,CONVEXPOLYHEDRON:N,TRIMESH:Y,HEIGHTFIELD:te}=Ue.types;switch(M.type){case E:{const{radius:W}=M;_.scale.set(W*i,W*i,W*i);break}case C:{_.scale.copy(M.halfExtents),_.scale.multiplyScalar(2*i);break}case U:break;case T:{_.scale.set(1*i,1*i,1*i);break}case N:{_.scale.set(1*i,1*i,1*i);break}case Y:{_.scale.copy(M.scale).multiplyScalar(i);break}case te:{_.scale.set(1*i,1*i,1*i);break}}}function b(_,M){if(!_)return!1;const{geometry:E}=_;return E instanceof Ls&&M.type===Ue.types.SPHERE||E instanceof vi&&M.type===Ue.types.BOX||E instanceof Ji&&M.type===Ue.types.PLANE||E.id===M.geometryId&&M.type===Ue.types.CYLINDER||E.id===M.geometryId&&M.type===Ue.types.CONVEXPOLYHEDRON||E.id===M.geometryId&&M.type===Ue.types.TRIMESH||E.id===M.geometryId&&M.type===Ue.types.HEIGHTFIELD}function L(_,M){let E=o[_],C=!1;return b(E,M)||(E&&d.remove(E),o[_]=E=w(M),C=!0),y(E,M),C}function k(){const _=o,M=c,E=u;let C=0;for(const U of e.bodies)for(let T=0;T!==U.shapes.length;T++){const N=U.shapes[T],Y=L(C,N),te=_[C];te&&(U.quaternion.vmult(U.shapeOffsets[T],M),U.position.vadd(M,M),U.quaternion.mult(U.shapeOrientations[T],E),te.position.copy(M),te.quaternion.copy(E),Y&&s instanceof Function&&s(U,te,N),!Y&&r instanceof Function&&r(U,te,N)),C++}for(let U=C;U<_.length;U++){const T=_[U];T&&d.remove(T)}_.length=C}return{update:k}}new X(-.8245664238929749,-.6986499428749084,0),new X(-.8596121072769165,-.7160230278968811,0),new X(-.9364746809005737,-.7425732016563416,0),new X(-1.0249135494232178,-.7525742053985596,0),new X(-1.1209981441497803,-.745711088180542,0),new X(-1.2207980155944824,-.7216687202453613,0),new X(-1.3203821182250977,-.6801321506500244,0),new X(-1.4158198833465576,-.6207864284515381,0),new X(-1.503180742263794,-.5433164834976196,0),new X(-1.5785338878631592,-.44740745425224304,0),new X(-1.6379486322402954,-.33274421095848083,0),new X(-1.6774944067001343,-.19901180267333984,0),new X(-1.6935925483703613,-.04955729842185974,0),new X(-1.6845369338989258,.10452291369438171,0),new X(-1.6515414714813232,.2510691285133362,0),new X(-1.5974509716033936,.38439521193504333,0),new X(-1.5253430604934692,.5022644996643066,0),new X(-1.4382944107055664,.6024401187896729,0),new X(-1.3393821716308594,.6826856136322021,0),new X(-1.2316834926605225,.740763783454895,0),new X(-1.1182752847671509,.7744381427764893,0),new X(-1.002234697341919,.7814720869064331,0),new X(-.8866387605667114,.7596287727355957,0),new X(-.7745647430419922,.7066712975502014,0),new X(-.7197928428649902,.672134518623352,0),new X(-.9019842147827148,-.4645122289657593,0),new X(-.962549090385437,-.49768978357315063,0),new X(-1.0369646549224854,-.5105612277984619,0),new X(-1.1195809841156006,-.5028873085975647,0),new X(-1.2047474384307861,-.47442924976348877,0),new X(-1.2868142127990723,-.4249476492404938,0),new X(-1.3601313829421997,-.35420361161231995,0),new X(-1.4190478324890137,-.26195797324180603,0),new X(-1.4579143524169922,-.1479717493057251,0),new X(-1.4714053869247437,-.009337037801742554,0),new X(-1.457734227180481,.1273602992296219,0),new X(-1.4172612428665161,.26481863856315613,0),new X(-1.3538848161697388,.37624281644821167,0),new X(-1.273324966430664,.4614526927471161,0),new X(-1.1813024282455444,.5202683210372925,0),new X(-1.083536148071289,.5525099039077759,0),new X(-.9857471585273743,.5579971671104431,0),new X(-.8936552405357361,.5365500450134277,0),new X(-.812980055809021,.48798906803131104,0),new X(.6584159135818481,-.4065689444541931,0),new X(.6347509026527405,-.4967222809791565,0),new X(.5867247581481934,-.5822246074676514,0),new X(.5169962644577026,-.6612042188644409,0),new X(.4282243549823761,-.7317894697189331,0),new X(.3230677843093872,-.7921087741851807,0),new X(.20418542623519897,-.840290367603302,0),new X(.07423615455627441,-.8744627237319946,0),new X(-.06412117928266525,-.892754077911377,0),new X(-.2082277536392212,-.8932929039001465,0),new X(-.3554247319698334,-.8742074370384216,0),new X(-.5030532479286194,-.8336260318756104,0),new X(-.6484544277191162,-.7696771621704102,0),new X(-.7889693379402161,-.6804891228675842,0);const Bt={x:.5,y:.5};window.addEventListener("mousemove",d=>{Bt.x=d.clientX/hn.width,Bt.y=d.clientY/hn.height});new _o({width:400});const Rc=document.querySelector("canvas.webgl"),jn=new og,Oo=new _c,jv=new Yg,Vo=Oo.load("ground.png");Vo.flipY=!1;Vo.encoding=at;const Uo=Oo.load("floor.png");Uo.flipY=!1;Uo.encoding=at;const ko=Oo.load("letters.png");ko.flipY=!1;ko.encoding=at;new $t({color:16711680});const $v=new $t({map:Vo}),Kv=new $t({map:Uo}),Zv=new $t({map:ko}),zl=new $t({color:16777215});let Wi,Gi,ci,qi=null,Ol=null;jv.load("ynvdemo.gltf",d=>{Wi=d.scene.children.find(e=>e.name==="floor"),Wi.material=Kv,Gi=d.scene.children.find(e=>e.name==="ground"),Gi.material=$v,ci=d.scene.children.find(e=>e.name==="letters"),ci.material=Zv,qi=d.scene.children.find(e=>e.name==="outer_rim"),qi.material=zl,Ol=d.scene.children.find(e=>e.name==="cloudA"),Ol.material=zl,jn.add(Wi),jn.add(Gi),jn.add(ci),jn.add(qi)});const Jn=new Te.World;Jn.gravity.set(0,-9.82,0);new Yn;new Te.Material("concrete");new Te.Material("plastic");new Yv(jn,Jn);const Jv=new Te.Sphere(.05),Pc=new Te.Body({mass:100,position:new Te.Vec3(-.1,.1,.1),shape:Jv});Jn.addBody(Pc);const Qv=new Te.Plane,vt=new Te.Body({mass:0,shape:Qv});vt.quaternion.setFromAxisAngle(new Te.Vec3(-1,0,0),Math.PI/2);Jn.addBody(vt);const e0=new Te.Box(new Te.Vec3(.25,.05,.2)),vr=new Te.Body({mass:0});vr.quaternion.setFromAxisAngle(new Te.Vec3(0,.75,0),Math.PI/2);vr.addShape(e0,new Te.Vec3(.2,-.5,0));Jn.addBody(vr);const t0=new Te.Box(new Te.Vec3(.05,.21,.2)),n0=new Te.Box(new Te.Vec3(.05,.15,.2)),Bs=new Te.Body({mass:0});Bs.quaternion.setFromAxisAngle(new Te.Vec3(0,.75,0),Math.PI/2);Bs.addShape(t0,new Te.Vec3(-0,.19,0));Bs.addShape(n0,new Te.Vec3(.15,.12,0));Jn.addBody(Bs);const i0=new Te.Box(new Te.Vec3(.17,.21,.2));new Te.Box(new Te.Vec3(.05,.15,.2));const xr=new Te.Body({mass:0});xr.quaternion.setFromAxisAngle(new Te.Vec3(0,.75,0),Math.PI/2);xr.addShape(i0,new Te.Vec3(-.75,.6,0));Jn.addBody(xr);const s0=new Te.Cylinder(.155,.155,.4,12),r0=new Te.Cylinder(.125,.125,.4,12),o0=new Te.Cylinder(.155,.155,.4,12),a0=new Te.Cylinder(.07,.07,.4,12),l0=new Te.Box(new Te.Vec3(.15,.05,.2)),c0=new Te.Box(new Te.Vec3(.39,.051,.1)),h0=new Te.Box(new Te.Vec3(.06,.05,.1)),u0=new Te.Box(new Te.Vec3(.11,.05,.1)),d0=new Te.Box(new Te.Vec3(.22,.05,.1));new Te.Box(new Te.Vec3(1,.35,.2));const f0=new Te.Box(new Te.Vec3(.17,.05,.1)),p0=new Te.Box(new Te.Vec3(.29,.05,.1)),m0=new Te.Box(new Te.Vec3(.18,.05,.1)),g0=new Te.Box(new Te.Vec3(.17,.05,.1)),v0=new Te.Box(new Te.Vec3(.05,.4,.1)),x0=new Te.Box(new Te.Vec3(.06,.12,.1)),y0=new Te.Box(new Te.Vec3(.06,.12,.1)),_0=new Te.Box(new Te.Vec3(.1,1.2,.3)),Ic=new Te.Box(new Te.Vec3(1.7,.1,.3)),Dc=new Te.Box(new Te.Vec3(.1,.4,.3)),Nc=new Te.Box(new Te.Vec3(.3,.02,.3));new Te.Cylinder(.05,.05,.4,5);vt.addShape(s0,new Te.Vec3(.33,.14,0));vt.addShape(r0,new Te.Vec3(.22,-.16,0));vt.addShape(o0,new Te.Vec3(-.39,-.15,0));vt.addShape(a0,new Te.Vec3(.635,.065,0));vt.addShape(l0,new Te.Vec3(-.39,-.25,0));vt.addShape(c0,new Te.Vec3(-.15,.37,.1));vt.addShape(h0,new Te.Vec3(.505,.37,.1));vt.addShape(u0,new Te.Vec3(.88,.37,.1));vt.addShape(d0,new Te.Vec3(-.96,.37,.1));vt.addShape(f0,new Te.Vec3(-1.01,-.36,.1));vt.addShape(p0,new Te.Vec3(-.36,-.36,.1));vt.addShape(m0,new Te.Vec3(.28,-.36,.1));vt.addShape(g0,new Te.Vec3(.83,-.36,.1));vt.addShape(v0,new Te.Vec3(-1.12,0,.1));vt.addShape(x0,new Te.Vec3(.95,.24,.1));vt.addShape(y0,new Te.Vec3(.95,-.24,.1));vt.addShape(_0,new Te.Vec3(-1.69,0,0));vt.addShape(Ic,new Te.Vec3(0,-.91,0));vt.addShape(Ic,new Te.Vec3(0,.91,0));vt.addShape(Dc,new Te.Vec3(1.49,.57,0));vt.addShape(Dc,new Te.Vec3(1.49,-.54,0));vt.addShape(Nc,new Te.Vec3(1.2,.16,0));vt.addShape(Nc,new Te.Vec3(1.2,-.15,0));const Ho=new St(new Ls(.05,32,32),new $t({color:16777215}));Ho.position.y=1;jn.add(Ho);const w0=new Ji(3,3),b0=new $t({color:65280}),M0=new St(w0,b0);M0.quaternion.setFromAxisAngle(new Te.Vec3(-1,0,0),Math.PI/2);new qg;const hn={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{hn.width=window.innerWidth,hn.height=window.innerHeight,Zn.aspect=hn.width/hn.height,Zn.updateProjectionMatrix(),es.setSize(hn.width,hn.height),es.setPixelRatio(Math.min(window.devicePixelRatio,2))});const S0={x:2,y:3,z:2,fov:45},yr=S0,Zn=new jt(yr.fov,hn.width/hn.height,.1,100);Zn.position.x=yr.x;Zn.position.y=yr.y;Zn.position.z=yr.z;jn.add(Zn);const Wo=new Xg(Zn,Rc);Wo.enableDamping=!0;Wo.enableRotate=!0;const es=new dc({canvas:Rc,antialias:!0});es.setSize(hn.width,hn.height);es.setPixelRatio(Math.min(window.devicePixelRatio,2));es.outputEncoding=at;const E0=new Bg;let Vl=0;new _n;const Bc=()=>{const d=E0.getElapsedTime(),e=d-Vl;Vl=d,Wo.update(),d>2&&Jn.step(1/60,e,3),Ho.position.copy(Pc.position),vt.quaternion.setFromEuler(-Math.PI/3-Bt.x,Bt.y-.5,0),vt.quaternion,vr.quaternion.setFromEuler(-Math.PI/3-Bt.x,Bt.y-.5,1),Bs.quaternion.setFromEuler(-Math.PI/3-Bt.x,Bt.y-.5,1.2),xr.quaternion.setFromEuler(-Math.PI/3-Bt.x,Bt.y-.5,.6),Wi&&(Wi.rotation.x=Math.PI*.3-Bt.x-.419,Wi.rotation.z=.5-Bt.y),Gi&&(Gi.rotation.x=Math.PI/3-Bt.x-.53,Gi.rotation.z=.5-Bt.y),ci&&(ci.rotation.x=Math.PI/3-Bt.x-.552,ci.rotation.z=.5-Bt.y,ci.rotation.y),qi&&(qi.rotation.x=Math.PI*.3-Bt.x-.419,qi.rotation.z=.5-Bt.y),es.render(jn,Zn),window.requestAnimationFrame(Bc)};Bc();
//# sourceMappingURL=index-0df682dc.js.map
