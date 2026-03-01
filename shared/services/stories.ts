import { Story, StoryItem } from '@prisma/client';
import { axiosInstance } from './instance';

export type IStory = Story & {
  items: StoryItem[];
};

export const getAll = async () => {
  const { data } = await axiosInstance.get<IStory[]>('/stories', {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });

  return data;
};