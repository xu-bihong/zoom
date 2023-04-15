# zoom
vue指令控制放大缩小实现缩放

在main.js中导入directive.js<br> 
`import { scale } from "./utils/directive";`<br> 
声明指令<br> 
`Vue.directive("scale", scale);`<br> 

## 使用
`<div class="canvas" v-scale></div>`
