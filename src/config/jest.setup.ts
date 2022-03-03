import MockCities from "@root/tests/mocks/cities.json"

jest.mock('react-query', () => ({
    ...jest.requireActual('react-query'),
    useMutation: () => ({
        data: MockCities,
        isLoading: false,
        mutate: jest.fn,
    }),
}));