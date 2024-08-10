"use client";
import { useEthPrice } from "@components/hooks/useEthPrice";
import { Button, Modal } from "@components/ui/common";
import { Course } from "@content/courses/types";
import { useEffect, useState } from "react";

interface OrderModalProps {
  course: Course | null;
  onClose: () => void;
  onSubmit: (order: Order) => void;
  isNewPurchase: boolean;
}

interface Order {
  price: string;
  email: string;
  confirmationEmail: string;
}

interface FormState {
  isDisabled: boolean;
  messages: {
    price?: string;
    email?: string;
    confirmationEmail?: string;
    tos?: string;
  };
}

const defaultOrder: Order = {
  price: "",
  email: "",
  confirmationEmail: "",
};

const validateOrder = (
  order: Order,
  hasAgreedTOS: boolean,
  isNewPurchase: boolean
): FormState => {
  const messages: {
    price?: string;
    email?: string;
    confirmationEmail?: string;
    tos?: string;
  } = {};

  if (!order.price || Number(order.price) <= 0) {
    messages.price = "Price is not valid.";
  }

  if (isNewPurchase) {
    if (!order.email) {
      messages.email = "Email is required.";
    }
    if (order.email !== order.confirmationEmail) {
      messages.confirmationEmail = "Emails do not match.";
    }
  }

  if (!hasAgreedTOS) {
    messages.tos =
      "You need to agree with terms of service to submit the form.";
  }

  return {
    isDisabled: Object.values(messages).some((msg) => msg !== undefined),
    messages,
  };
};

export default function OrderModal({
  course,
  onClose,
  isNewPurchase,
  onSubmit,
}: OrderModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(defaultOrder);
  const [enablePrice, setEnablePrice] = useState(false);
  const [hasAgreedTOS, setHasAgreedTOS] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    isDisabled: true,
    messages: {},
  });
  const { eth } = useEthPrice();

  useEffect(() => {
    if (course) {
      setIsOpen(true);
      setOrder({
        ...defaultOrder,
        price: eth.perItem ? eth.perItem.toString() : "",
      });
    }
  }, [course, eth.perItem]);

  useEffect(() => {
    setFormState(validateOrder(order, hasAgreedTOS, isNewPurchase));
  }, [order, hasAgreedTOS, isNewPurchase]);

  const handleModalClose = () => {
    setIsOpen(false);
    setOrder(defaultOrder);
    setEnablePrice(false);
    setHasAgreedTOS(false);
    setFormState({ isDisabled: true, messages: {} });
    onClose();
  };

  const handleInputChange = (field: keyof Order, value: string) => {
    const updatedOrder = { ...order, [field]: value };
    setOrder(updatedOrder);
  };

  const handleTOSChange = (checked: boolean) => {
    setHasAgreedTOS(checked);
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="mb-7 text-lg font-bold leading-6 text-gray-900"
                id="modal-title"
              >
                {course?.title}
              </h3>
              <div className="mt-1 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Price(eth)</label>
                  <div className="text-xs text-gray-700 flex">
                    <label className="flex items-center mr-2">
                      <input
                        checked={enablePrice}
                        onChange={({ target: { checked } }) => {
                          setOrder({
                            ...order,
                            price: checked
                              ? order.price
                              : eth.perItem?.toString() || "",
                          });
                          setEnablePrice(checked);
                        }}
                        type="checkbox"
                        className="form-checkbox"
                      />
                    </label>
                    <span>
                      Adjust Price - only when the price is not correct
                    </span>
                  </div>
                </div>
                <input
                  disabled={!enablePrice}
                  value={order.price}
                  onChange={({ target: { value } }) =>
                    handleInputChange("price", value)
                  }
                  type="text"
                  name="price"
                  className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                />
                {formState.messages.price && (
                  <p className="text-xs text-red-700">
                    {formState.messages.price}
                  </p>
                )}
                <p className="text-xs text-gray-700">
                  Price will be verified at the time of the order. If the price
                  will be lower, order can be declined (+- 2% slipage is
                  allowed)
                </p>
              </div>
              {isNewPurchase && (
                <>
                  <div className="mt-2 relative rounded-md">
                    <div className="mb-1">
                      <label className="mb-2 font-bold">Email</label>
                    </div>
                    <input
                      onChange={({ target: { value } }) =>
                        handleInputChange("email", value)
                      }
                      type="email"
                      name="email"
                      className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                      placeholder="x@y.com"
                    />
                    {formState.messages.email && (
                      <p className="text-xs text-red-700">
                        {formState.messages.email}
                      </p>
                    )}
                    <p className="text-xs text-gray-700 mt-1">
                      It&apos;s important to fill a correct email, otherwise the
                      order cannot be verified. We are not storing your email
                      anywhere
                    </p>
                  </div>
                  <div className="my-2 relative rounded-md">
                    <div className="mb-1">
                      <label className="mb-2 font-bold">Repeat Email</label>
                    </div>
                    <input
                      onChange={({ target: { value } }) =>
                        handleInputChange("confirmationEmail", value)
                      }
                      type="email"
                      name="confirmationEmail"
                      className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                      placeholder="x@y.com"
                    />
                    {formState.messages.confirmationEmail && (
                      <p className="text-xs text-red-700">
                        {formState.messages.confirmationEmail}
                      </p>
                    )}
                  </div>
                </>
              )}
              <div className="text-xs text-gray-700 flex mt-5">
                <label className="flex items-center mr-2">
                  <input
                    checked={hasAgreedTOS}
                    onChange={({ target: { checked } }) =>
                      handleTOSChange(checked)
                    }
                    type="checkbox"
                    className="form-checkbox"
                  />
                </label>
                <span>
                  I accept &apos;terms of service&apos; and I agree that my
                  order can be rejected in the case data provided above are not
                  correct
                </span>
              </div>
              {formState.messages.tos && (
                <p className="text-xs text-red-700">{formState.messages.tos}</p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <Button
            disabled={formState.isDisabled}
            onClick={() => {
              onSubmit(order);
              handleModalClose();
            }}
          >
            Submit
          </Button>
          <Button variant="danger" onClick={handleModalClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

