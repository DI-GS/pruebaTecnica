import { createRouter, createWebHistory } from 'vue-router';
import ViewTasks from '@/views/task-managment/viewAddUsers.vue'
import ViewInicio from '@/views/signUp/signUp.vue'
import ViewLogin from '@/views/login/loginUser.vue'

//Creación de rutas
const routes = [
    { path: '/', name: "/", component: ViewLogin },
    { path: '/Visualizar-tareas', name: 'Viewtasks', meta:{auth:true}, component: ViewTasks},
    { path: '/Visualizar-formularioInicio', name: 'formulario_i', component: ViewInicio},
    { path: '/Iniciar-sesion', name: 'login', component: ViewLogin},

];

//Configuración del router
const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router 