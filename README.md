# PhoenixC2-Frontend

This is the offical frontend for the PhoenixC2 project. It is written in React and Bootstrap, and was built using [Creative Tim's](https://www.creative-tim.com/) [Material Dashboard Dark](https://www.creative-tim.com/product/material-dashboard-dark) template.

## Installation
The frontend is automatically included in the docker version of PhoenixC2. If you are running the standalone version of PhoenixC2, you can install the frontend by running the following commands (PhoenixC2 must be installed first):

```bash
poetry run phserver --exit --add-plugin-url https://github.com/PhoenixC2/Frontend/releases/latest/download/phoenixc2-dist.zip
```
This command will download the latest release of the already built frontend and install it into the PhoenixC2 plugins directory. You can then start PhoenixC2 normally and the frontend will be available at the root of the API.

## Development
If you want to contribute to the frontend, you can run it locally by following these steps:

```bash
# Clone the repository
...
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Building
To build the frontend, run the following command:

```bash
npm run build
```
