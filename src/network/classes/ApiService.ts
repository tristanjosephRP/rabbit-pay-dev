import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { appConfig } from "../../config"



export default class ApiService {

  private readonly api: AxiosInstance

  constructor(axios: AxiosInstance) {
    this.api = axios
  }

  protected readonly get = async (options: AxiosRequestConfig) => {
    return this.request({
      method: 'GET',
      ...options
    })
  }

  protected readonly post = async (options: AxiosRequestConfig) => {
    return this.request({
      method: 'POST',
      ...options
    })
  }

  protected readonly put = async (options: AxiosRequestConfig) => {
    return this.request({
      method: 'PUT',
      ...options
    })
  }

  protected readonly delete = async (options: AxiosRequestConfig) => {
    return this.request({
      method: 'DELETE',
      ...options
    })
  }

  private readonly request = async (options: AxiosRequestConfig) => {
    const onSuccess = function (response: AxiosResponse) {
      return response.data
    }
  
    const onError = function (error: AxiosError) {
      return Promise.reject(error.response)
    }
  
    return this.api(options).then(onSuccess).catch(onError)
  }
}