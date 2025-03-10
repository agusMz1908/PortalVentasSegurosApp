import { createRouter, createWebHistory } from "vue-router";
import Clientes from "../views/Clientes.vue";
import Contratos from "../views/Contratos.vue";

const routes = [
  { path: "/", component: Clientes },
  { path: "/contratos/:clienteId/:clienteNombre", component: Contratos, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

