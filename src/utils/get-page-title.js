import defaultSettings from '@/settings'

const title = defaultSettings.title || '交工云信息共享平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
