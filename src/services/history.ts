import { ICreateHistoryItemPayload } from '@/interfaces/api/history';
import { apiClient } from '@/services';

const API_PATH = '/history';

export const createHistoryItem = async (payload: ICreateHistoryItemPayload) => {
  try {
    const res = await apiClient.post(`${API_PATH}}`, payload);
    return res;
  } catch (err) {
    console.log(err);
  }
};
