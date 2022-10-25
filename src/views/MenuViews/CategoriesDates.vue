<template>
    <div>
        <h1>Categorías por fecha</h1>
        <hr />
        Fecha inicial:
        <Datepicker v-model="date1" />
        Fecha final:
        <Datepicker v-model="date2" />
        <br /><br />
        <div v-if="!date1 || !date2">
            Escoge una fecha de inicio y término para mostrar resultados
        </div>
        <div v-else-if="items.length === 0 && !isLoading">
            No hay registros para las fechas ingresadas
        </div>
        <div v-else>
            <EasyDataTable :headers="headers" :items="items" :hide-footer="true" />
            <br />
            <div v-for="dataGraficos of chartValues" class="graphContainer">
                <h2>{{ dataGraficos.title }}</h2>
                <div class="graphs">
                    <apexchart width="150%" type="bar" :options="dataGraficos.options1"
                        :series="dataGraficos.series1" />
                    <apexchart width="150%" type="bar" :options="dataGraficos.options2"
                        :series="dataGraficos.series2" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapState } from 'vuex'
import { moneyFormat } from '../../utils.js'
export default {
    name: 'CategoriasFechas',
    data() {
        return {
            headers: [
                { text: "Categoría", value: "categoria" },
                { text: "Total Vendido", value: "total" },
            ],
            items: [],
            chartValues: [],
            date1: null,
            date2: null
        }
    },
    methods: {
        ...mapMutations(["setIsLoading"]),
        async fetchDataCategorias(fecha1 = '2019-03-18', fecha2 = '2019-03-18') {
            try {
                this.setIsLoading(true)
                this.items = []
                this.chartValues = []
                console.log
                const { data, status } = await axios.get(
                    `/api/ventas/categorias/fechas/${fecha1}/${fecha2}`
                )
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
    watch: {
        date1: function (val) {
            if (this.date2) {
                console.log('buscar1')
                const fecha1 = val.toISOString().split('T')[0]
                const fecha2 = this.date2.toISOString().split('T')[0]
                this.fetchDataCategorias(fecha1, fecha2)
            }
        },
        date2: function (val) {
            if (this.date1) {
                console.log('buscar2')
                const fecha1 = this.date1.toISOString().split('T')[0]
                const fecha2 = val.toISOString().split('T')[0]
                this.fetchDataCategorias(fecha1, fecha2)
            }
        }
    },
    computed: {
        ...mapState(['isLoading']),
    }
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