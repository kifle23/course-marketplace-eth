import { toast } from "react-toastify";

interface ErrorData {
  message?: string;
}

export const withToast = (promise: Promise<any>) => {
  toast.promise<any, ErrorData>(
    promise,
    {
      pending: {
        render() {
          return (
            <div className="p-6 py-2">
              <p className="mb-2">Your transaction is being processed.</p>
              <p>Hang tight... Just a few more moments.</p>
            </div>
          );
        },
        icon: false,
      },
      success: {
        render({ data }) {
          return (
            <div>
              <p className="font-bold">
                Tx: {data?.transactionHash.slice(0, 20)}...
              </p>
              <p>Has been successfully processed.</p>
              <a
                href={
                  process.env.NODE_ENV === "production"
                    ? `https://sepolia.etherscan.io/tx/${data?.transactionHash}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="text-indigo-600 underline">See Tx Details</i>
              </a>
            </div>
          );
        },
        icon: (
          <span role="img" aria-label="success">
            🟢
          </span>
        ),
      },
      error: {
        render({ data }) {
          return <div>{data?.message ?? "Transaction has failed"}</div>;
        },
      },
    },
    {
      closeButton: true,
    }
  );
};
