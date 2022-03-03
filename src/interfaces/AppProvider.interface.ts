import { ICities } from './Table.interface';

export type IAppContext = {
    cities: {
        data: ICities
        isLoading: boolean
        fetchCities: () => void
    }
}