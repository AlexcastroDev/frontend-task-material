export interface ICity {
    id: number
    name: string
    country: string
    subcountry: string
}

export type ICities = Pick<ICity, "id" | "name">[]

export type ICitiesRow = Pick<ICity, "id" | "name">