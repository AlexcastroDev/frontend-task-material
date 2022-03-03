import { ICity, ICities } from './Table.interface';

export type IUseCities = {
    getCities: () => Promise<IGetCitiesResponse>;
    getCity: (params: IGetCityParams) => Promise<IGetCityResponse>;
}

export interface IGetCitiesResponse {
    cities: ICities
}

export type IGetCityParams = {
    id: number
}

export type IGetCityResponse = ICity