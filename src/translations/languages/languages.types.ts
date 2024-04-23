export type Resources = Record<Language, Translations>;

export type Language = 'en' | 'es';

export type Translations = {
  translation: {
    LOG_IN: string;
    CRYPTO_MARKET: string;
  };
};
