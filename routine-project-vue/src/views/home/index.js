/**
 * configuration for home routes
 */
const HomeRoutes=[ 
    {path:'/index',name:'home-master',component:()=>import('@views/home/home-master.vue'),meta:{headTag:'home',keepAlive :false,noLogin:true}}
    ];
export default HomeRoutes;