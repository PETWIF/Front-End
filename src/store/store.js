import { create } from 'zustand';

export const useStore = create((set) => ({
  isStickerSelected: false,
  isMineSelected: true,
  isMarketSelected: false,
  isCoverEditing: false,
  isTextEditing: false,
  selectSticker: () =>
    set((state) => ({ isStickerSelected: !state.isStickerSelected })),
  selectMine: () => set({ isMineSelected: true, isMarketSelected: false }),
  selectMarket: () => set({ isMineSelected: false, isMarketSelected: true }),
  startCoverEditing: () => set({ isCoverEditing: true }),
  stopCoverEditing: () => set({ isCoverEditing: false }),
  toggleTextEditing: () =>
    set((state) => ({ isTextEditing: !state.isTextEditing })),
}));
