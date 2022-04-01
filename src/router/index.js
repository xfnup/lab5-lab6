import {createRouter, createWebHashHistory} from 'vue-router'
import Main from "@/views/Main";
import MyMain from "@/views/MyMain";
import Storage from "@/views/Storage";
import Customer from "@/views/Customer";
import Merchant from "@/views/Merchant";

const routes = [
    {
        path:"/Main",
        name:"Main",
        component: Main
    },
    {
        path:"/Storage",
        name:"Storage",
        component: Storage
    },
    {
        path:"/Customer",
        name:"Customer",
        component: Customer
    },
    {
        path:"/Merchant",
        name:"Merchant",
        component: Merchant
    },
    {
        path: "/",
        name: "MyMain",
        component: MyMain
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
