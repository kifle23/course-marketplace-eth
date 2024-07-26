export interface Account {
  account: {
    data: string;
    isAdmin: boolean;
    mutate: () => void;
    isInitialized: boolean;
    isEmpty?: boolean;
  };
}

export interface Network {
  network: {
    data: string;
    target: string;
    isSupported: boolean;
    isInitialized: boolean;
  };
}
