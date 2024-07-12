interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Modal({ isOpen, children }: ModalProps) {
  return (
    <section>
      <div
        className={`${!isOpen && "hidden"} fixed z-10 inset-0 overflow-y-auto`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="false"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {isOpen && (
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="false"
            ></div>
          )}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="false"
          >
            &#8203;
          </span>
          {children}
        </div>
      </div>
    </section>
  );
}

