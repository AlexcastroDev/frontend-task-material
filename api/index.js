/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createServer, Model } from "miragejs"
import MockDB from "@root/tests/mocks/db.json"
import MockCities from "@root/tests/mocks/cities.json"

export function makeServer({ environment = "test" } = {}) {
    let server = createServer({
        environment,
        models: {
          cities: Model,
        },
        fixtures: {
          cities: MockCities,
        },

        routes() {
          this.namespace = "api"
         
          this.get("/cities", (schema) => schema.cities.all(), { timing: 1200 })
          this.get("/cities/:id", (schema, request) => MockDB.find(item => item.id === Number(request.params.id)), { timing: 600 })
        },
      })
    
    return server
}