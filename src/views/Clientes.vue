<script setup>
import { ref, computed, onMounted } from "vue";
import apiClient from "../utils/api";
import { useRouter } from "vue-router";

const clientes = ref([]);
const searchQuery = ref("");
const router = useRouter();
const loading = ref(true);

const fetchClientes = async () => {
    loading.value = true;
    try {
        const response = await apiClient.get("/clientes");
        clientes.value = response.data.clientes;
    } catch (error) {
        console.error("Error obteniendo clientes:", error);
    } finally {
        loading.value = false;
    }
};

const filteredClientes = computed(() => {
    return clientes.value.filter(cliente =>
        cliente.clinom.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const verContratos = (cliente) => {
    router.push(`/contratos/${cliente.id}/${cliente.clinom}`);
};

onMounted(fetchClientes);
</script>

<template>
    <div>
        <h1>Clientes</h1>

        <!-- Contador de clientes -->
        <p class="clientes-contador">
            Mostrando {{ filteredClientes.length }} de {{ clientes.length }} clientes
        </p>

        <div class="clientes-busqueda-container">
            <input type="text" v-model="searchQuery" placeholder="Buscar cliente..." class="clientes-busqueda" />
        </div>

        <div v-if="loading" class="spinner-container">
            <div class="spinner"></div>
        </div>

        <div v-else class="clientes-lista">
            <ul class="clientes-ul">
                <li v-for="cliente in filteredClientes" :key="cliente.id" class="list-group-item">
                    <div class="cliente-info">
                        <span class="cliente-id">{{ cliente.id }}</span>
                        <span class="cliente-nombre">{{ cliente.clinom }}</span>
                    </div>
                    <button @click="verContratos(cliente)" class="ver-contratos-btn">Ver contratos</button>
                </li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
.clientes-contador {
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    margin-bottom: 10px;
}

.clientes-busqueda-container {
    width: 50vw;
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}

.clientes-busqueda {
    width: 100%;
    max-width: 600px;
    padding: 10px;
    font-size: 16px;
    border-radius: 8px;
}

.clientes-lista {
    height: 500px;
    width: 50vw;
    overflow-y: auto;
    background: #2c2c2c;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
}

.clientes-ul {
    list-style: none;
    padding: 0;
}

.list-group-item {
    background: #3a3a3a;
    color: white;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    margin-bottom: 5px;
    transition: background 0.3s ease-in-out;
}

.cliente-info {
    display: flex;
    align-items: center;
    flex-grow: 1;
}

.cliente-id {
    font-weight: bold;
    margin-right: 15px;
    min-width: 40px;
    text-align: left;
}

.cliente-nombre {
    flex-grow: 1;
    text-align: left;
}

.ver-contratos-btn {
    background-color: #DB8D15 !important;
    border: none;
    color: white;
    font-weight: bold;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background 0.3s;
}

.ver-contratos-btn:hover {
    background-color: #b37410 !important;
}

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.2);
    border-top-color: #DB8D15;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
