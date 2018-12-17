
export interface Quote {
    recipient: Recipient,
    order: Order,
    product: Product
}

export interface Recipient {
    countryIsoCode: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    postcode: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    currencyIsoCode: string
}

export interface Product {
    itemReferenceId: number,
    productUid: string,
    pdfUrl: string,
    quantity: number
}

export interface ProductOrder {
    id: string,
    qty: number
}

export interface Order {
    orderReferenceId: number,
    customerReferenceId: number,
    currencyIsoCode: string
}

export interface Currency {
    id: string,
    name: string,
    symbol: string
}

export interface ProductData{
    id: string,
    name: string,
    price: number
}