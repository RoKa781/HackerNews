type Environment = 'development' | 'production';

const config: Record<Environment, { apiUrl: string }> = {
  development: {
    apiUrl: 'https://hacker-news.firebaseio.com/v0/',
  },
  production: {
    apiUrl: 'https://hacker-news.firebaseio.com/v0/',
  },
};

const environment = 'development';

export default config[environment];