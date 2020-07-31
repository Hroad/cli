# 项目目录结构
## 项目根目录
> config:项目任务自动化，构建编译配置目录,无需改动

> src: 项目开发目录
---
> #### src——开发目录/文件
    -images         : 图片素材文件，当前css/less中,引入图片作为背景，可以直接使用别名images来引入图片，例如background:url(‘~images/XXX.jpg’) ，html中使用时可以直接images/XXX.jpg

    -style          : 样式文件，如果开启了allowLess，该目录下也可以放置less文件
    
    -toolkit        ：工具箱，内置了（基于es6的）表单验证，axios等服务封装，后续也会放入基于es5的功能插件，如果不调用，则不会被构建；toolkit目录下的插件引用时可使用require（es5），或者import（es6），进行依赖引入。
            --toolkit/build  : 特殊目录，build下面主要用于引入style下css/less文件依赖；

    -assets         : 静态资源目录
            --assets/vendors : 特殊目录，不需要进行构建的第三方/或公共插件js,css文件等，请放置在这个目录下（构建后会js被复制到js/目录下，css会被复制到css/目录下），
                                ** 这些不需要构建的文件可以手动引入到html，也可以再onfig/head-config.common.js中配置 **
            --assets/font    : 字体文件资源目录;css中使用时可以~font/字体名；
            --assets/media   : 多媒体文件资源目录；html中使用时可以通过~media/文件名；js文件中调用时，可以使用media/文件名

    -js             ：个人编写的js入口文件，这些js文件最终都会被重新构建编译,如果需要进行模块化处理，可以在js下新建非入口js文件。

    -common-ui      ：针对单个项目来说这里可以放置单个项目公共vue组件，对于脚手架来说，后续会定期更新开发较好的通用组件，作为一个通用组件库来使用，例如banner，轮播，导航，行程模板等。
            --common-ui/any-lib  : 自主封装的灵活简单的常用组件，仅通过传参即可调用，支持外部样式修改，不建议修改源代码文件；组件命名规范为:any-文件名，例如<any-banner></any-banner>;每个组件独立目录，目录文件夹名等同文件名（第一个字母变成大写），例如any-banner组件的文件名为Banner.vue、目录文件夹名称为Banner，其中ui组件所需要的其他子组件均放在同一目录下。
            --common-ui/tmpl-lib : 模板组件库，针对常规项目常用设计，整理的组件，例如行程，职位等；支持针对项目需求通过源代码的简单修改而满足需求；定义模板组件目录/文件时，只用名称+编号形式，例如：Header001，如同类型模板组件数量超过999，怎命名编号为HeaderX001，当前预测同类型的模板组件不会超过1999种。组件name命名规范为：i-文件名，例如Header001代用时<i-header001></i-header001>

    -views          ：针对基于vue开发的项目提供的视图开发管理目录，views放置针对项目的vue视图组件/模块，路由等内容，具体根据项目由开发人员自行创建。

    -entry.config.js：构建入口配置js，必须文件；包括htmlEntryConfig对象和CompatibleConfig对象的配置，具体请参考注释。
---
    -htmlEntryConfig对象配置说明：
         ** 所有属性值均为数组，除第一个属性外，其他属性的key为html的名字
         ** common-特殊key，公共js文件，配置在这里的js文件将会插入到所有的html，如果所有的html页面使用同一个js文件，可以只配置这里。
         ** html文件属性：必填，key值同html文件的名字，value为要特殊插入到该html的js文件名，如果没有可以为[],不可为其他值。
         ** ——当前只处理2级目录，如果html文件处于子目录中，key值请使用 '目录名$html名'的形式;
---
    -CompatibleConfig对象配置说明
         ** allowBabel:true,//是否使用bebal，将兼容es6语法，同时将导致编译后的js文件仅支持IE9以上浏览器，开启babel，可以使用toolkit中的部分工具；
         ** allowLess:true,//是否开启less预编译，可根据开发习惯处理；
         ** cssUnit:'rem',//有两个值，默认为px，可以设置为rem，设置rem后，构建时，会将px转换成rem；如果开启rem，请在head标签内引入ienv.js,并调用相关方法；
         ** trackingHtml:[],//是否开启html模板文件追踪(数组为空即为关闭)，页面较少时可以关闭（例如H5项目）；如果配置该属性的路径，htmlEntryConfig中无需配置全部页面，仅配置commonScript和需要单独处理的页面即可（如果没有js，可以全部不配置），其他页面会自动追踪；例如['./src','./src/jobs'],构建时会自动追踪这两个目录下的html作为模板进行构建
         ** baseVUE:true,//是否给予vue开发，默认开启
    -个人开发的html文件，直接放在src目录下，如果需要创建子目录，请参照htmlEntryConfig说明。

---
    -DeveloperInfo对象配置说明
        用于配置开发者信息，当前包括Designer，Developer，PM，Code，Date等内容的配置。次数配置的内容会插入到header作为注释存在
---
    -devEnv 和 -prodEnv 本地定义构建环境变量，具体根据项目需求
---
## 命令
> npm run start     : 开发环境默认启动命令，启动后默认打开index.html

> npm run start --start  页面名字 ：启动后默认打开指定的html页面，例如 npm run start --start post/detail 

> npm run build:prod     : 生产环境构建，构建后的文件可以直接部署至服务器，构建后的文件请至根目录dist文件夹下查看

> npm run build:prod -- debug :调试构建，构建后的文件会进行代码的压缩，但是扔会输出控制台信息。

> npm run build     : 开发环境构建，构建的后的文件未进行压缩混淆，可以用作开发调试

---
## HTML页面
> 每个页面html页面对于构建配置来说都认为是一个模板，所以创建的所有html页面中，除了不需要要构建的css和js需要手动引入外，其他的css和js构建工具会自动插入页面；

> 每个页面的结构和平时开发的页面基本相同，仅在head内有部分针对开发的配置（html页面中必须存在的内容如下）：

 ```
        <%= htmlWebpackPlugin.files.webpackManifest %>
        <% if (htmlWebpackPlugin.options.metadata.isDevServer && htmlWebpackPlugin.options.metadata.HMR !== true) { %>
        <!-- Webpack Dev Server reload -->
        <script src="/webpack-dev-server.js"></script>
        <% } %>
 ```
 > html模板可自行删除/保留的内容
 
 ```
  <!--<%= htmlWebpackPlugin.options.metadata.headerInfo %> -->  //developerinfo信息，删除后则无法通过配置插入开发者信息。
  <%= htmlWebpackPlugin.options.title %> //删除后，无法config.common.json统一配置构建页面的title，只能自行手动填写
  <%= htmlWebpackPlugin.options.metadata.description %> //删除后，无法config.common.json统一配置构建页面的description，只能自行手动填写
  <%= htmlWebpackPlugin.options.metadata.baseUrl %> //删除后，无法通过entry.config.js的环境变量配置构建后的baseUrl，只能自行手动填写（非vue框架项目，可以忽略）
  <% if (webpackConfig.htmlElements.headTags) { %> //删除后，无法通过head-config.common.js统一配置构建页面的meta信息，置前插入的css文件和js文件等，只能自行手动填写
    <!-- Configured Head Tags  -->
    <%= webpackConfig.htmlElements.headTags %>
  <% } %>
 ```


# 更新日志
##
> ## V0.1.2
主要变动：
* webpack.common.js更新，
    1. 解决了images目录下嵌套子目录的图片文件构建路径问题；
    2. 新增autoprefixer插件，并新增package.json中browserslist配置项；删除了cssnano插件和 postcss-cssnext插件的使用。
    3. 增加了针对开发目录的别名映射和文件构建（字体文件，多媒体文件等）。

* webpack.dev.js更新，解决了开发环境下由于js文件缓存导致的webpack-dev-server重载css样式延迟的问题。

* src目录下开发目录变动
    1. 删除了原src/vendors
    2. 新增 src/assets;目录下包括font——字体文件资源；media——多媒体文件资源；vendors——第三方插件资源（功能同原src/vendors）
    
* src/common-ui目录先新增any-lib和tmpl-lib用于开发独立的any-ui和常规想模板组件，后续会新增按需引入配置。

新增扩展：
* 新增了基于vant组件的扩展使用，详见SVN：http://10.80.53.248/svn/devScaffold/routine-project-vue-vant
* entry.config.js新增DeveloperInfo配置对象，构建时，会再<head>标签内动态插入开发者信息注释
---

> ## V0.1.1
主要变动：
* 加强less或css文件引入的场景兼容性，解决css/less中引入图片作为背景的构建路径错误的问题；当前css/less中,引入图片作为背景，可以直接使用别名images来引入图片，例如background:url(‘~images/XXX.jpg’) ,构建后，图片会构建至images文件夹；针对常规页面，如果直接在页面中使用style标签包裹，写样式时，图片路径请使用构建后的目标路径，例如 images/XXX.jpg等，和在页面中插入图片的方式一致；

* 重构了config下，webpack构建配置的主要三个js文件，使得构建更灵活，代码可读性更高。其中针对vue的构建配置更容易独立操作。

* 优化构建后页面js文件的引入，针对不需要js的页面精简不必要的js文件，特别是vendors相关的chunk文件，（生产环境的）静态页面中可以不被引入。

---

> ## V0.1.0
作为routine-project脚手架的vue扩展版，适合中小型基于vue框架开发的常规项目
* 新增common-ui：针对单个项目来说这里可以放置单个项目公共vue组件，对于脚手架来说，后续会定期更新开发较好的通用组件，作为一个通用组件库来使用，例如banner，轮播，导航，行程模板等，后续也鼓励大家踊跃填充功能更组件库。

* 新增views：针对基于vue开发的项目提供的视图开发管理目录，views放置针对项目的vue视图组件/模块，路由等内容，具体根据项目由开发人员自行创建。

* toolkit目录新增 ：toolkit目录根据vue开发需要，新增了toolkit/func, toolkit/store, toolkit/utils等，均已经进行路径别名处理，可以直接引用。

* entry.config.js  
    1. HtmlEntryConfig，在基于vue框架的项目开发中，HtmlEntryConfig中的配置将视为页面入口js的配置，和routine-project脚手架中的配置相同，但是含义不同。
    2. CompatibleConfig,新增baseVUE，默认为true，如果基于vue开发，CompatibleConfig的  allowBabel、allowLess、baseVUE均需要设置为true
    3.  新增devEnv 和 prodEnv 本地定义构建环境变量，具体根据项目需求

* html模板结构新增可统一配置的内容，详见readme.md





