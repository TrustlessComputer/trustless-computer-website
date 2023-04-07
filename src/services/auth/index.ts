import moduleName from 'module';
import { API_URL } from '@/configs';
import { ICollection } from '@/models/collection';
import { IInscription } from '@/models/inscription';
import { swrFetcher } from '@/utils/swr';
import {
  IGenerativeNonceMessagePayload,
  IGenerativeNonceMessageResponse,
  IVerifyNonceMessagePayload,
  IVerifyNonceMessageResponse,
} from '@/interfaces/api/auth';

const API_PATH = API_URL + '/auth';

// export const getCollections = (page: number, limit: number): Promise<ICollection[]> =>
//   swrFetcher(`${API_PATH}/collections?limit=${limit}&page=${page}`, {
//     method: 'GET',
//   });

// export const generateNonceMessage = async (
//     payload: IGenerativeNonceMessagePayload
//   ): Promise<IGenerativeNonceMessageResponse> => {
//     try {
//       const res = await post<
//         IGenerativeNonceMessagePayload,
//         IGenerativeNonceMessageResponse
//       >(`${API_PATH}/nonce`, payload);
//       return res;
//     } catch (err: unknown) {
//       log('failed to generate nonce message', LogLevel.ERROR, LOG_PREFIX);
//       throw Error('Failed to generate nonce message');
//     }
//   };

export const generateNonceMessage = (payload: IGenerativeNonceMessagePayload): Promise<string> =>
  swrFetcher(`${API_PATH}/nonce`, {
    method: 'POST',
    data: payload,
    error: 'Failed to generate nonce message',
  });

export const verifyNonceMessage = (payload: IVerifyNonceMessagePayload): Promise<any> => {
  return swrFetcher(`${API_PATH}/nonce/verify`, {
    method: 'POST',
    data: payload,
    error: 'Failed to verify nonce message',
  });
};
