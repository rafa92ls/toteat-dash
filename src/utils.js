

const moneyFormat = (x) => {
    return `$${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
}

export {
    moneyFormat
}