### Devpulse Backend
### Requirements
- [NodeJS](https://nodejs.org/en/): Version 10
- [sequelize](https://sequelize.org/): Version 5

### How to run
- `yarn install` to add dependencies
- Create `.env` file and follow `.env.example` to learn of all necessary variables
- Setup `config.json` configs to match your login credentials for sequelize
- `npx sequelize create:db` to create the database
- `yarn dev` to create migrations and run the app in development mode