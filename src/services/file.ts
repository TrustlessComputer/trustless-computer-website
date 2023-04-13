import { IUploadFilePayload, IUploadFileResponse } from '@/interfaces/api/files';
import { camelCaseKeys } from '@/utils';
import { apiClient } from '.';

const API_PATH = '/upload';

export const uploadFile = async (payload: IUploadFilePayload): Promise<IUploadFileResponse> => {
  try {
    const formData = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      formData.append(key, value);
    }
    const res = await apiClient.post(`${API_PATH}/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    throw Error('Failed to upload file');
  }
};
