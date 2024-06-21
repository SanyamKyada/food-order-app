import React, { useContext, useRef, useState } from "react";
import { CartContext } from "../store/cart-context";
import Modal from "./Modal";
import Cart from "./Cart";
import CheckoutForm from "./CheckoutForm";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";

export default function Header() {
  const modalRef = useRef();
  const checkoutFormRef = useRef();
  const [currentModalState, setCurrentModalState] = useState({
    isShowCheckoutModal: false,
    isShowSuccessModal: false,
  });
  const { items, clearCart } = useContext(CartContext);
  const cartQuantity = items.reduce((x, y) => x + y.quantity, 0);

  const handlePlaceOrder = async () => {
    const data = checkoutFormRef.current.getFormData();

    if (!data.isValid) return;

    const orderData = {
      order: {
        customer: data.customerDetails,
        items,
      },
    };

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      setCurrentModalState({
        isShowSuccessModal: true,
        isShowCheckoutModal: false,
      });
      const responseData = await response.json();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  let modalTitle = "Your Cart";
  let modalContent = <Cart />;
  let modalActions = (
    <Button
      onClick={() => {
        modalRef.current.closeModal();
        setCurrentModalState({
          isShowSuccessModal: false,
          isShowCheckoutModal: false,
        });
      }}
    >
      close
    </Button>
  );
  if (currentModalState.isShowCheckoutModal) {
    modalTitle = "Checkout";
    modalContent = <CheckoutForm ref={checkoutFormRef} />;
    modalActions = (
      <>
        {modalActions}
        <Button onClick={handlePlaceOrder}>Submit Order</Button>
      </>
    );
  } else if (currentModalState.isShowSuccessModal) {
    modalTitle = "Success!";
    modalContent = (
      <>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
      </>
    );
    modalActions = (
      <>
        <Button
          onClick={() => {
            setCurrentModalState({
              isShowSuccessModal: false,
              isShowCheckoutModal: false,
            });
            modalRef.current.closeModal();
            clearCart();
          }}
        >
          Okay
        </Button>
      </>
    );
  } else if (cartQuantity > 0) {
    modalActions = (
      <>
        {modalActions}
        <Button
          onClick={() =>
            setCurrentModalState({
              isShowSuccessModal: false,
              isShowCheckoutModal: true,
            })
          }
        >
          Go to Checkout
        </Button>
      </>
    );
  }

  return (
    <>
      <Modal
        ref={modalRef}
        title={modalTitle}
        content={modalContent}
        actions={modalActions}
      />
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="logo" />
          <h1>REACTFOOD</h1>
        </div>
        <Button textOnly onClick={() => modalRef.current.openModal()}>
          Cart ({cartQuantity})
        </Button>
      </header>
    </>
  );
}
