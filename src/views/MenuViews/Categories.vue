<template>
    <div>
        <h1>Categorías <span>(totales generales)</span></h1>
        <hr />
        <table class="mainTable">
            <th>
                <td>Categoría</td>
                <td>Monto Vendido</td>
            </th>
            <tr v-for="item in mainTableData" :key="item.name">
                <td>{{item.name}}</td>
                <td>{{item.total}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mainTableData: [{name: 'Bebidas', total: 123456},{name: 'Tragos', total: 654321}],            
        }
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
</style>