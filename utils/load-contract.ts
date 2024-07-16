const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID || "";

export const loadContract = async (name: string, web3: any) => {
  try {
    const res = await fetch(`/contracts/${name}.json`);
    const artifact = await res.json();

    return new web3.eth.Contract(
      artifact.abi,
      artifact.networks[NETWORK_ID].address
    );
  } catch (error) {
    console.error("Failed to load contract:", error);
    return null;
  }
};
