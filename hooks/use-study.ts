import { useStudyContext } from '@/store/study-provider';

export function useStudy() {
  return useStudyContext();
}
