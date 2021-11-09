import store from '@/store'
import ru from '@/locales/ru.json'

const locales = {
  'ru-RU': ru,
}

export default function errorFilter (key) {
  const locale = store.getters.info.locale || 'ru-RU'
  return locales[locale][key] || `[Localize error: key ${key} not found]`
}
