import * as AppProvider from "@root/contexts/AppProvider"
import { cleanup, render, screen } from "@testing-library/react"
import { Home } from ".."
import MockCities from "@root/tests/mocks/cities.json"


jest.mock('react-query', () => ({
    ...jest.requireActual('react-query'),
    useMutation: () => ({
        data: MockCities,
        isLoading: false,
        mutate: jest.fn,
    }),
}));

describe('Home View', () => {
    beforeEach(() => {
        cleanup()
    })

    it("should render table with Rows", () => {
        const useAppContext = jest.spyOn(AppProvider, "useAppContext");

        useAppContext.mockImplementation(() => ({
            cities: {
                data: MockCities,
                isLoading: false,
                fetchCities: jest.fn,
            }
        }))

   

        render(<Home />)
        expect(screen).toMatchSnapshot()
    })
 })