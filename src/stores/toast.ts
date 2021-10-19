import { writable } from "svelte/store"

type Toast = {
  text: string
  type: "success" | "error" | "reject"
}

const { subscribe, set } = writable<Toast>()

export const toast = {
  subscribe,
  set: (toast: Toast) => {
    set(toast)
    setTimeout(() => set(null), 3000)
  },
}