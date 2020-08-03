const { env } = process;

const config = {
  env: env.NODE_ENV || 'development',
};

const devConfig = {
  db: 'mongodb://localhost/record-shop',
};

const prodConfig = {
  db:
    'mongodb+srv://freak:WjNh5gtvwUJUCNYY@recordstore.iyab0.mongodb.net/test?retryWrites=true&w=majority',
};

const currentConfig =
  config.env === 'production' ? prodConfig : devConfig;

module.exports = Object.assign({}, config, currentConfig);
