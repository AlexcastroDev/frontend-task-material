import { cleanup, render, screen } from "@testing-library/react"
import { act, fireEvent } from "@testing-library/react"
import { Row } from ".."

const mock = {
    "name": "les Escaldes",
    "country": "Andorra",
    "subcountry": "Escaldes-Engordany",
    "id": 3040051
}

describe('Row Component', () => {
    beforeEach(() => {
        cleanup()
    })

    it("should row", () => {
        render(<Row row={mock} />)
        expect(screen).toMatchSnapshot()
    })
    it("should show loading details", async () => {
        jest.mock('react-query', () => ({
            ...jest.requireActual('react-query'),
            useMutation: () => ({
                data: {},
                isLoading: true,
                mutate: jest.fn,
            }),
        }));
        
        render(<Row row={mock} />)
        const button = await screen.findByTestId("action-button-row")

        act(() => {
            fireEvent.click(button)
        })
    })
 })