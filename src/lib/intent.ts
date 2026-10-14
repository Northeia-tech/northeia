import { create } from "zustand";

type IntentState = {
  challenge: string;
  detail: string;
  source: string;
  nonce: number;
  setIntent: (challenge: string, detail?: string, source?: string) => void;
};

export const useIntent = create<IntentState>((set) => ({
  challenge: "",
  detail: "",
  source: "site",
  nonce: 0,
  setIntent: (challenge, detail = "", source = "site") =>
    set((state) => ({
      challenge,
      detail,
      source,
      nonce: state.nonce + 1,
    })),
}));
