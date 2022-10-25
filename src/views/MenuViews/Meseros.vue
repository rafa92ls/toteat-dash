<template>
    <div>
        <h1>Meseros(as)</h1>
        <hr />
        <EasyDataTable :headers="headers" :items="items" :hide-footer="true" />
        <br />
        <div v-for="dataGraficos of chartValues" class="graphContainer">
            <h2>{{ dataGraficos.title }}</h2>
            <div v-for="dataDetail of dataGraficos.categorias">
                <h4>{{ dataDetail.title }}</h4>
                <div class="graphs">
                    <apexchart width="150%" type="bar" :options="dataDetail.options1" :series="dataDetail.series1" />
                    <apexchart width="150%" type="bar" :options="dataDetail.options2" :series="dataDetail.series2" />
                </div>
            </div>
            <hr />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import { moneyFormat } from '../../utils.js'
export default {
    name: 'Meseros',
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
        this.fetchdataZoneegorias()
    },
    methods: {
        ...mapMutations(["setIsLoading"]),
        async fetchdataZoneegorias() {
            try {
                this.setIsLoading(true)
                this.items = []
                const { data, status } = await axios.get('/api/ventas/meseros')
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