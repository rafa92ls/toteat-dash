<template>
    <div>
        <h1>Zonas por fecha</h1>
        Acá encontrarás información relacionada con las ventas en cada zona del local, y los productos
        que se venden en cada zona agrupados en sus respectivas categorías. Debes escoger una fecha
        de inicio y de término para ver la información entre ese periodo de tiempo.
        <hr />
        Fecha inicial:
        <date-picker v-model="date1" />
        Fecha final:
        <date-picker v-model="date2" />
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
                <div v-for="dataDetail of dataGraficos.categorias">
                    <h4>{{ dataDetail.title }}</h4>
                    <div class="graphs">
                        <apexchart width="150%" type="bar" :options="dataDetail.options1"
                            :series="dataDetail.series1" />
                        <apexchart width="150%" type="bar" :options="dataDetail.options2"
                            :series="dataDetail.series2" />
                    </div>
                </div>
                <hr />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapState } from 'vuex'
import { moneyFormat } from '../../utils.js'
export default {
    name: 'ZonasFechas',
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
        async fetchDataZonas(fecha1 = '2019-03-18', fecha2 = '2019-03-18') {
            try {
                this.setIsLoading(true)
                this.items = []
                this.chartValues = []
                const { data, status } = await axios.get(
                    `/api/ventas/zonas/fechas/${fecha1}/${fecha2}`
                )
                if (status !== 200)
                    return 'error'

                //Tabla Principal
                for (const [keyZone, dataZone] of Object.entries(data)) {
                    let total = 0
                    for (const values1 of Object.values(dataZone)) {
                        for (const values2 of Object.values(values1)) {
                            total += values2.priceTotal
                        }
                    }
                    this.items.push({ categoria: keyZone, total: moneyFormat(total) })
                }

                //Gráficos
                for (const [keyZone, dataZone] of Object.entries(data)) {
                    let objValues = {}
                    const categoriasEntries = []
                    for (const [keyCat, dataCat] of Object.entries(dataZone)) {
                        const xAxis = { categories: [] }
                        const dataGraph1 = []
                        const dataGraph2 = []
                        for (const [keyProd, dataProd] of Object.entries(dataCat)) {
                            xAxis.categories.push(keyProd)
                            dataGraph1.push(dataProd.priceTotal)
                            dataGraph2.push(dataProd.quantityTotal)
                        }
                        objValues = {
                            title: keyCat,
                            options1: {
                                chart: { id: `${keyCat} $` },
                                xaxis: xAxis,
                                title: {
                                    text: 'Montos Vendidos ($)',
                                    align: 'center',
                                    style: {
                                        fontSize: '14px'
                                    }
                                },
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
                                title: {
                                    text: 'Cantidad Vendida',
                                    align: 'center',
                                    style: {
                                        fontSize: '14px'
                                    }
                                },
                            },
                            series2: [
                                {
                                    name: "Cantidad",
                                    data: dataGraph2,
                                },
                            ],
                        }
                        categoriasEntries.push(objValues)
                    }
                    this.chartValues.push({
                        title: keyZone,
                        categorias: categoriasEntries
                    })
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
                const fecha1 = val.toISOString().split('T')[0]
                const fecha2 = this.date2.toISOString().split('T')[0]
                this.fetchDataZonas(fecha1, fecha2)
            }
        },
        date2: function (val) {
            if (this.date1) {
                const fecha1 = this.date1.toISOString().split('T')[0]
                const fecha2 = val.toISOString().split('T')[0]
                this.fetchDataZonas(fecha1, fecha2)
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