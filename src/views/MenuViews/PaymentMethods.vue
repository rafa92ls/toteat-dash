<template>
    <div>
        <h1>Medios de Pago <span :style="'font-size: 20px'">(totales generales)</span></h1>
        <br /><br />
        <hr />
        <br /><br />
        <EasyDataTable :headers="headers" :items="items" :hide-footer="true" />

    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import { moneyFormat } from '../../utils.js'
export default {
    name: 'MediosPago',
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
                const { data, status } = await axios.get('/api/ventas/medios-pago')
                if (status !== 200)
                    return 'error'

                //Tabla Principal
                for (const [keyCat, dataCat] of Object.entries(data)) {
                    this.items.push({ categoria: keyCat, total: moneyFormat(dataCat) })
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
</style>