
export interface Doctor {
    name: string
    extendedName: string
    address: Address
    openingTimes: OpeningTime[]
  }
  
  export interface Address {
    city: string
    country: string
    houseNumber: string
    postalCode: string
    street: string
  }
  
  export interface OpeningTime {
    day: string
    startTime: string
    endTime: string
  }
  