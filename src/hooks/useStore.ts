import { Draft, produce } from "immer"
import { create } from "zustand"

export type AppState = {
  isDrawerOpen: boolean
  setIsDrawerOpen: (isDrawerOpen: boolean) => void
}

const useStore = create<AppState>((set, _get) => ({
  isDrawerOpen: true,
  setIsDrawerOpen: (isDrawerOpen) =>
    set(
      produce((state: Draft<AppState>) => {
        state.isDrawerOpen = isDrawerOpen
      }),
    ),
}))

export default useStore
