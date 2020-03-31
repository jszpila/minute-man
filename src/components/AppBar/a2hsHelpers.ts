/**
 * A2HS hook & stuff
 * https://gist.github.com/rikukissa/cb291a4a82caa670d2e0547c520eae53
 */

import * as React from "react";

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function useAddToHomescreenPrompt(): [
    IBeforeInstallPromptEvent | null,
    () => void
  ] {
  const [prompt, setState] = React.useState<IBeforeInstallPromptEvent | null>(null);
  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt();
    }

    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event'
      )
    );
  };

  React.useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault();
      setState(e);
    };

    window.addEventListener("beforeinstallprompt", ready as any);

    return () => {
      window.removeEventListener("beforeinstallprompt", ready as any);
    };
  }, []);

  return [prompt, promptToInstall];
}

export function checkIfIsInstalled(): boolean {
  let isInstalled = false;

  if (window.matchMedia
    && window.matchMedia('(display-mode: standalone)').matches) {
      isInstalled = true;
  }

  return isInstalled;
}
