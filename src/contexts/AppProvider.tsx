import useCities from '@root/hooks/useCities'
import { ICities } from '@root/interfaces/Table.interface'
import { IGetCitiesResponse } from '@root/interfaces/useCities.interface'
import React, { FunctionComponent } from 'react'
import { useQuery } from 'react-query'
import { createContext, useContextSelector } from 'use-context-selector'
import { IAppContext } from '../interfaces/AppProvider.interface'

export const AppContext = createContext<IAppContext>({} as IAppContext)

export const AppProvider: FunctionComponent = ({ children }) => {
   const Cities = useCities()

    const { isRefetching: citiesIsRefetching, isLoading: citiesIsLoading, data: citiesData, refetch: fetchCities } = useQuery('cities', async () => {
      const response: IGetCitiesResponse = await Cities.getCities()
      return response.cities
    },
    {
      refetchOnWindowFocus: false
    })

  return (
    <AppContext.Provider
      value={{
        cities: {
          data: citiesData || [] as ICities,
          isLoading: citiesIsLoading || citiesIsRefetching,
          fetchCities,
        }
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): IAppContext => {
  const {cities} = useContextSelector(AppContext, (state) => ({
    cities: state.cities,
  }))

  return { cities }
}