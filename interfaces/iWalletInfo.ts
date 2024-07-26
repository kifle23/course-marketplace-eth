export interface Account {
  data: string;
  isAdmin: boolean;
  mutate: () => void;
  isInitialized?: boolean;
  isEmpty?: boolean;
}

export interface Network {
  data: string;
  target: string;
  isSupported: boolean;
  isInitialized?: boolean;
  isEmpty?: boolean;
}
