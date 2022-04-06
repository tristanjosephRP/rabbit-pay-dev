import { AxiosError } from "axios";
import { ApiError, IErrorDetail } from "../classes";

export class ErrorHandlerUtil {

  public static processApiError = (error: AxiosError): ApiError => {
    return new ApiError({
      status: error.response?.status,
      detail: error.response?.data as IErrorDetail[]
    })
  }

}