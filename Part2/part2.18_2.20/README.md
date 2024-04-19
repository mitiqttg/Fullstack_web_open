# React + Vite
API used is from https://openweathermap.org. To obtain API key, you can create an account, and go to `My API keys` or (https://home.openweathermap.org/api_keys) and copy one active key. It might take some minutes until a generated API key is valid.

How to run locally: 
- Open Integrated Terminal at folder part2.18_2.20
- Run  `npm install`
- Run  `npm install axios`
- Run  `npm install json-server --save-dev`
- Run `npm run server`
- Open/split another Integrated Terminal at folder part2.18_2.20
  

- NB: Use an environment variable to save the key. Assuming your API key is `aa26841n3n4v41m34rv0`, you can set it by:
    ```
    export VITE_SOME_KEY=aa26841n3n4v41m34rv0 && npm run dev // For Linux/macOS Bash
    ($env:VITE_SOME_KEY="aa26841n3n4v41m34rv0") -and (npm run dev) // For Windows PowerShell
    set "VITE_SOME_KEY=aa26841n3n4v41m34rv0" && npm run dev // For Windows cmd.exe
    ```
- Finally run `npm run dev` and go to your localhost

- Result
<img src="" width="800" height="500">
<img src="" width="800" height="500">