import 'vite/client';

declare global {
  interface ImportMetaEnv {
    readonly VITE_SECRET_PASSWORD?: string;
    readonly VITE_PUZZLE_IMAGE_URL?: string;
    readonly VITE_PARTNER_NAME?: string;
    readonly VITE_MESSAGE_INSPIRATION?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
