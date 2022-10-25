

const moneyFormat = (monto) => {
    return `$${monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
}

const formatDate = (date) => {
    const fecha = new Date(date)
    const yyyy = fecha.getFullYear();
    let mm = fecha.getMonth() + 1;
    let dd = fecha.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = `${dd}/${mm}/${yyyy} ${date.split(' ')[1]} `
    return formattedToday
}
export {
    moneyFormat,
    formatDate
}