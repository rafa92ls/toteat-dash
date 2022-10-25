<template>
    <div>
        <h1>Búsqueda Avanzada de ventas</h1>
        <br /><br />
        <hr />
        <br />
        <div class="input-container">
            <h5>Id Venta:</h5>
            <input type="text" placeholder="Ingrese el Id de Venta" v-model="idSearch" />
            <h5>Mesero(a)</h5>
            <select name="Mesero(a)" id="mesero" v-model="meseroSearch">
                <option value="" disabled selected>Seleccione</option>
                <option v-for="item in waiterItems" :value="item" :key="item">
                    {{ item }}
                </option>
            </select>
            <h5>Cajero(a)</h5>
            <select name="Cajero(a)" id="cajero" v-model="cajeroSearch">
                <option value="" disabled selected>Seleccione</option>
                <option v-for="item in cashierItems" :value="item" :key="item">
                    {{ item }}
                </option>
            </select>
            <h5>Fecha</h5>
            <date-picker class="date-picker" v-model="fechaSearch" />
            <h5>Mesa</h5>
            <input type="text" v-model="mesaSearch" placeholder="Ingrese el número de mesa"/>
            <h5>Zona</h5>
            <select name="Zona" id="zona" v-model="zonaSearch">
                <option value="" disabled selected>Seleccione</option>
                <option v-for="item in zoneItems" :value="item" :key="item">
                    {{ item }}
                </option>
            </select>
            <button @click="goSearch()">Buscar</button>

        </div>

        <br />
        <EasyDataTable :headers="headers" :items="items">
            <template #expand="item">
                <div style="padding: 15px">
                    <h4>Productos:</h4>
                    <ul v-for="prod of item.productos">
                        <li>{{ prod.name }}</li>
                        <ul>
                            <li>Cantidad: {{ prod.quantity }}</li>
                            <li>{{ prod.price }}</li>
                        </ul>
                    </ul>
                    <h4>Medios de Pago:</h4>
                    <ul v-for="medio of item.mediosPago">
                        <li>{{ medio.type }} </li>
                        <ul>
                            <li>{{ medio.amount }}</li>
                        </ul>
                    </ul>
                </div>
            </template>
        </EasyDataTable>


    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import { moneyFormat, formatDate } from '../../utils.js'
export default {
    name: 'MediosPago',
    data() {
        return {
            headers: [
                { text: "Id Venta", value: "id" },
                { text: "Total", value: "total" },
                { text: "Fecha Apertura", value: "fecha1" },
                { text: "Fecha Cierre", value: "fecha2" },
                { text: "Mesa", value: "mesa" },
                { text: "Zona", value: "zona" },
                { text: "Mesero(a)", value: "mesero" },
                { text: "Cajero(a)", value: "cajero" },
            ],
            items: [],
            chartValues: [],
            idSearch: null,
            meseroSearch: null,
            cajeroSearch: null,
            fechaSearch: null,
            mesaSearch: null,
            zonaSearch: null,
            selected: null,
            options: ['list', 'of', 'options'],
            waiterItems: [],
            cashierItems: [],
            zoneItems: []
        }
    },
    created() {
        this.fetchSelectData()
        this.fetchDataCategorias()
    },
    methods: {
        ...mapMutations(["setIsLoading"]),
        async fetchSelectData () {
            try {
                const { data, status } = await axios.get(
                    '/api/ventas/items-busqueda-avanzada',
                )

                if (status !== 200)
                    return 'error'
                
                this.waiterItems = data.waiters
                this.cashierItems = data.cashiers
                this.zoneItems = data.zones
                
            } catch (error) {
                
            }
        },
        async fetchDataCategorias() {
            try {
                this.setIsLoading(true)
                this.items = []
                const queryParams = {
                    params: {
                        id: this.idSearch,
                        mesero: this.meseroSearch,
                        cajero: this.cajeroSearch,
                        fecha: this.fechaSearch?.toISOString().split('T')[0],
                        mesa: this.mesaSearch,
                        zona: this.zonaSearch
                    }
                }
                const { data, status } = await axios.get(
                    '/api/ventas/buscar',
                    queryParams
                )
                if (status !== 200)
                    return 'error'

                //Tabla Principal
                for (const dataSearch of Object.values(data)) {
                    const productos = dataSearch.products.map(el => {
                        el.price = moneyFormat(el.price)
                        return el
                    })
                    const mediosPago = dataSearch.payments.map(el => {
                        el.amount = moneyFormat(el.amount)
                        return el
                    })
                    this.items.push({
                        id: dataSearch.id,
                        fecha1: formatDate(dataSearch.date_closed),
                        fecha2: formatDate(dataSearch.date_opened),
                        mesa: dataSearch.table,
                        zona: dataSearch.zone,
                        mesero: dataSearch.waiter,
                        cajero: dataSearch.cashier,
                        productos,
                        mediosPago,
                        total: moneyFormat(dataSearch.total)
                    })
                }
            } catch (error) {
                console.error(error)
            } finally {
                this.setIsLoading(false)
            }
        },
        goSearch() {
            this.fetchDataCategorias()
        }
    },
}
</script>

<style>
.mainTable,
tr,
td,
th {
    table-layout: fixed;
    width: 300px;
    border: 1px solid black;
}

.input-container {
    display: flex;
    flex-direction: column;
    width: 50%;
}

h5 {
    margin-top: 10px;
    margin-bottom: 0px;
}

button {
    margin-top: 20px;
    padding: 10px 0px;
}

input,
select {
    height: 40px;
    padding: 0px 10px;
    border-radius: 4px;
    border: 1px solid;
    border-color: #ddd;
}

@media only screen and (max-width: 768px) {
    .input-container {
        width: 100%;
    }
}
</style>