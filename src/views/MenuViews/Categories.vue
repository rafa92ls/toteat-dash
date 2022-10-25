<template>
    <div>
        <h1>Categorías y Productos <span :style="'font-size: 20px'">(totales generales)</span></h1>
        <hr />
        <EasyDataTable :headers="headers" :items="items" :hide-footer="true" />
        <br />
        <div v-for="dataGraficos of chartValues" class="graphContainer">
            <h2>{{ dataGraficos.title }}</h2>
            <div class="graphs">
                <apexchart width="150%" type="bar" :options="dataGraficos.options1" :series="dataGraficos.series1" />
                <apexchart width="150%" type="bar" :options="dataGraficos.options2" :series="dataGraficos.series2" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import { moneyFormat } from '../../utils.js'
export default {
    name: 'Categorias',
    data() {
        return {
            headers: [
                { text: "Categoría", value: "categoria" },
                { text: "Total Vendido", value: "total" },
            ],
            items: [],
            chartValues: [],
        }
    },
    created() {
        this.fetchDataCategorias()
    },
    methods: {
        ...mapMutations(["setIsLoading"]),
        async fetchDataCategorias() {
            try {
                this.setIsLoading(true)
                this.items = []
                const { data, status } = await axios.get('/api/ventas/categorias')
                if (status !== 200)
                    return 'error'

                //Tabla Principal
                for (const [keyCat, dataCat] of Object.entries(data)) {
                    let total = 0
                    for (const values of Object.values(dataCat)) {
                        total += values.priceTotal
                    }
                    this.items.push({ categoria: keyCat, total: moneyFormat(total) })
                }

                //Gráficos
                for (const [keyCat, dataCat] of Object.entries(data)) {
                    const xAxis = { categories: [] }
                    const dataGraph1 = []
                    const dataGraph2 = []
                    for (const [keyProd, dataProd] of Object.entries(dataCat)) {
                        xAxis.categories.push(keyProd)
                        dataGraph1.push(dataProd.priceTotal)
                        dataGraph2.push(dataProd.quantityTotal)
                    }
                    const objValues = {
                        title: keyCat,
                        options1: {
                            chart: { id: `${keyCat} $` },
                            xaxis: xAxis,
                        },
                        series1: [
                            {
                                name: "$",
                                data: dataGraph1,
                            },
                        ],
                        options2: {
                            chart: { id: `${keyCat} Cantidad` },
                            xaxis: xAxis,
                        },
                        series2: [
                            {
                                name: "Cantidad",
                                data: dataGraph2,
                            },
                        ],
                    }
                    this.chartValues.push(objValues)
                }
            } catch (error) {
                console.error(error)
            } finally {
                this.setIsLoading(false)
            }
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

.graphs {
    display: flex;
    flex-direction: row;
}
</style>