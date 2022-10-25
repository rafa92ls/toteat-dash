<template>
    <div>
        <h1>Categorías <span>(totales generales)</span></h1>
        <hr />
        <EasyDataTable :headers="headers" :items="items" :hide-footer="true" />
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import { moneyFormat } from '../../utils.js'
export default {
    data() {
        return {
            headers: [
                { text: "Categoría", value: "categoria" },
                { text: "Total Vendido", value: "total" },
            ],
            items: [
                { categoria: "Bebidas", total: "123" },
                { categoria: "Stephen Curry", total: "GSW" },
                { categoria: "Stephen Curry", total: "GSW" },
                { categoria: "Stephen Curry", total: "GSW" },
            ]
        }
    },
    created() {
        this.fetchDataCategorias()
    },
    methods: {
        ...mapMutations(["setIsLoading"]),
        async fetchDataCategorias() {
            try {
                console.log(moneyFormat(31232132321))
                this.setIsLoading(true)
                this.items = []
                const { data, status } = await axios.get('/api/ventas/categorias')
                if (status !== 200)
                    return 'error'
                console.log(data)
                for (const [keyCat, dataCat] of Object.entries(data)) {
                    let total = 0
                    for (const values of Object.values(dataCat)) {
                        total += values.priceTotal
                    }
                    this.items.push({ categoria: keyCat, total: moneyFormat(total) })
                }
            } catch (error) {
                console.log('error', error)
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