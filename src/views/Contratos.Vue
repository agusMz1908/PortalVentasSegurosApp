<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import apiClient from "../utils/api";
import { tiposSeguros } from "../utils/seguros";

const route = useRoute();
const clienteId = route.params.clienteId;
const clienteNombre = route.params.clienteNombre;

const contratos = ref([]);
const loading = ref(true);
const contratoExpandido = ref(null);

const fetchContratos = async () => {
    try {
        const response = await apiClient.get(`/contratos?filter[clientes]=${clienteId}`);
        contratos.value = response.data.contratos;
    } catch (error) {
        console.error("Error obteniendo contratos:", error);
    } finally {
        loading.value = false;
    }
};

const contratosPorRamo = computed(() => {
    const contador = {};
    tiposSeguros.forEach(ramo => (contador[ramo] = 0));
    contratos.value.forEach(contrato => {
        if (contrato.ramo) {
            contador[contrato.ramo] = (contador[contrato.ramo] || 0) + 1;
        }
    });
    return contador;
});

const toggleDetalle = (id) => {
    contratoExpandido.value = contratoExpandido.value === id ? null : id;
};

onMounted(fetchContratos);
</script>

<template>
    <div>
        <h1>Contratos de {{ clienteNombre }}</h1>
        <p class="total-contratos">Total de contratos: <strong>{{ contratos.length }}</strong></p>

        <div class="ramos-container">
            <div v-for="ramo in tiposSeguros" :key="ramo" class="ramo-box">
                <span class="ramo-nombre">{{ ramo }}</span>
                <span class="ramo-cantidad" :class="{ 'cantidad-cero': contratosPorRamo[ramo] === 0 }">
                    {{ contratosPorRamo[ramo] || 0 }}
                </span>
            </div>
        </div>

        <div v-if="loading" class="spinner-container">
            <div class="spinner"></div>
        </div>

        <div v-else class="contrato-list">
            <div v-for="contrato in contratos" :key="contrato.id" class="contrato-item">
                <div class="contrato-header">
                    <span class="contrato-id">#{{ contrato.id }}</span>
                    <span class="contrato-rubro">Rubro: {{ contrato.ramo || "Sin ramo" }}</span>
                    <button @click="toggleDetalle(contrato.id)" class="ver-mas-btn">
                        {{ contratoExpandido === contrato.id ? "Ver menos" : "Ver más" }}
                    </button>
                </div>

                <div v-if="contratoExpandido === contrato.id" class="contrato-detalle">
                    <p><strong>ID Cliente:</strong> {{ contrato.clinro }}</p>
                    <p><strong>Cliente:</strong> {{ contrato.clinom }}</p>
                    <p><strong>Corredor:</strong> {{ contrato.corrnom }}</p>
                    <p><strong>Alias:</strong> {{ contrato.conalias || "No disponible" }}</p>
                    <p><strong>Fecha Ingreso:</strong> {{ contrato.ingresado || "No disponible" }}</p>
                    <p><strong>Detalle:</strong> {{ contrato.condetail || "No disponible" }}</p>
                </div>
            </div>
        </div>

        <router-link to="/" class="volver-btn">Volver</router-link>
    </div>
</template>

<style scoped>
.ramos-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 15px;
    width: 50vw;
    flex-wrap: wrap;
}

.ramo-box {
    background: #444;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 120px;
}

.ramo-nombre {
    font-weight: bold;
    margin-right: 10px;
}

.ramo-cantidad {
    background: #DB8D15;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
}

.cantidad-cero {
    background: red !important;
}

.contrato-list {
    width: 50vw;
    height: 500px;
    overflow-y: auto;
    background: #2c2c2c;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    margin: 0 auto;
}

.contrato-item {
    background: #3a3a3a;
    color: white;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 5px;
    transition: background 0.3s ease-in-out;
}

.contrato-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.ver-mas-btn {
    background-color: #DB8D15;
    border: none;
    color: white;
    font-weight: bold;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
}

.ver-mas-btn:hover {
    background-color: #b37410;
}

.contrato-detalle {
    margin-top: 10px;
    background: #444;
    padding: 10px;
    border-radius: 5px;
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

.volver-btn {
    display: block;
    margin-top: 20px;
    background-color: #DB8D15;
    padding: 10px;
    color: white;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
}

.volver-btn:hover {
    background-color: #b37410;
}
</style>
