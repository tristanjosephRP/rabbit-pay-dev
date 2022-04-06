const env = import.meta.env

export interface IApiConfig {
  protocol: string
  uri: string
  path: string
  key: string
}

export interface IAppConfig {
  apiBaseUrl: string
  apiKey: string
  peachBaseUrl: string
}

export const apiConfig: IApiConfig = {
  protocol: `${env.VITE_API_PROTOCOL}`,
  uri: `${env.VITE_API_URI}`,
  path: `${env.VITE_API_PATH}`,
  key: `${env.VITE_API_KEY}`,
}

export const appConfig: IAppConfig = {
  apiBaseUrl: `${apiConfig.protocol}${apiConfig.uri}${apiConfig.path}`,
  apiKey: apiConfig.key,
  peachBaseUrl: `${env.VITE_PEACH_BASE_URL}`
}