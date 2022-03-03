import { IGetCityParams, IUseCities } from './../interfaces/useCities.interface';
import { api } from '../services/api';

const useCities = (): IUseCities => {
    return {
        getCities: async () => {
            const request = await api.get("/cities")
            return await request.data
        },
        getCity: async (params: IGetCityParams) => {
            const request = await api.get("/cities/" + params.id)
            return await request.data
        }
    }
}

export default useCities