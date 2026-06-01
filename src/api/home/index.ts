import { LOCAL_INSTANCE } from '@/utils/instance'

export function getHome() {
  return LOCAL_INSTANCE.get('/api/home')
}
