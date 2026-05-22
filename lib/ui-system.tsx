// rsc:client
"use client";

import { createContext, useSyncExternalStore, type ReactNode } from "react";

export type UISystem = "krds" | "shadcn";

// ---------------------------------------------------------------------------
// Module-level external store (localStorage + in-memory subscriber list)
// useSyncExternalStore avoids setState-in-effect, handles SSR hydration safely
// ---------------------------------------------------------------------------
const STORAGE_KEY = "krds-ui-system";
const listeners = new Set<() => void>();

function subscribeToSystem(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSystemSnapshot(): UISystem {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "krds" || stored === "shadcn" ? stored : "krds";
}

function getSystemServerSnapshot(): UISystem {
  return "krds"; // CD-3: default "krds" for SSR
}

function writeSystem(value: UISystem): void {
  localStorage.setItem(STORAGE_KEY, value);
  listeners.forEach((l) => l());
}

// ---------------------------------------------------------------------------
// Context — carries only setSystem; system value is read via useUISystem()
// ---------------------------------------------------------------------------
interface UISystemContextValue {
  setSystem: (value: UISystem) => void;
}

const UISystemContext = createContext<UISystemContextValue>({ setSystem: writeSystem });

export { UISystemContext, UISystemProvider, useUISystem };

interface UISystemProviderProps {
  children: ReactNode;
}

function UISystemProvider({ children }: UISystemProviderProps) {
  return <UISystemContext.Provider value={{ setSystem: writeSystem }}>{children}</UISystemContext.Provider>;
}

/** Returns the current UI system ("krds" | "shadcn"). Use in component dispatchers. */
function useUISystem(): UISystem {
  return useSyncExternalStore(subscribeToSystem, getSystemSnapshot, getSystemServerSnapshot);
}
