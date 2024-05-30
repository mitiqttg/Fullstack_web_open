How to run:
- `npm run dev` in the Integrated Terminal
- Then the API function can be tested with Postman:

    - Send GET request to http://localhost:3001/info and http://localhost:3001/api/persons

    - Send POST request to http://localhost:3001/api/persons with a name and number in the body raw JSON, e.g.     
        ```
        {
            "name": "Miti",
            "number": "222-1111"
        }
        ```

    - Send DELETE request to http://localhost:3001/api/persons/:id to remove a person contact