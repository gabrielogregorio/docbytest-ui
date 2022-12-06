import { mountCurl } from './mountCurl';
import { MountCurlType, TypeToMountEnum } from './types';

export const mountRequestItem = (content: MountCurlType, typeToMount: TypeToMountEnum): string => {
  const mounters: { [mounters in TypeToMountEnum]: () => string } = {
    [TypeToMountEnum.CURL]: () => mountCurl(content),
  };
  return mounters?.[typeToMount]?.() || '';
};
