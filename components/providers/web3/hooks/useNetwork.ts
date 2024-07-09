interface Network {
  network: {
    data: string;
  };
}

export const NetworkHandler = ({ ...dep }) => {
  const getNetwork = (): Network => {
    return {
      network: {
        data: "Testing Network",
      },
    };
  };

  return getNetwork();
};
