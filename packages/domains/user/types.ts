export interface User {
    id: string
    firstName: string
    lastName: string
    companyName: string
    ssn: string
}

export interface UserExpenses {
    firstName: string
    lastName: string
    companyName: string
    merchantName: string
    amountInCents: string
    currency: string
    status: string
}
