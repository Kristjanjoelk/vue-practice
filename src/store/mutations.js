export const STORAGE_KEY = 'first-project'

export const state = {
  todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
}

export const mutations = {

}
