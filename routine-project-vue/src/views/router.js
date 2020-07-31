import Vue from 'vue'
import VueRouter from 'vue-router'; 
import HomeRoutes from '@views/home';
Vue.use(VueRouter);
let routes=[ 
    ...HomeRoutes,//home-routes
    {path:'/',redirect:'/index'}//首页根据需要确定
    ];
const router=new VueRouter({
    routes:routes
});  
export default router;
