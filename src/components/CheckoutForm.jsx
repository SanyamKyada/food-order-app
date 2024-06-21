import React, { forwardRef, useContext, useImperativeHandle } from 'react'
import { CartContext } from '../store/cart-context';
import { hasMinLength, isEmail, isNotEmpty } from '../util/validation';
import Input from './Input';
import { useInput } from '../hooks/useInput';

const CheckoutForm = forwardRef(( {}, ref ) => {
    const { totalAmount } = useContext(CartContext);

    const {value: nameValue, 
        handleInputBlur: handleNameBlur, 
        handleInputChange: handleNameChange,
        hasError: nameHasError
    } = useInput('', (val) => isNotEmpty(val));

    const {
        value: emailValue,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: emailHasError
    } = useInput('', (value) => isEmail(value));

    const {
        value: streetValue,
        handleInputChange: handleStreetChange,
        handleInputBlur: handleStreetBlur,
        hasError: streetHasError
    } = useInput('', (value) => isNotEmpty(value));

    const {
        value: postalCodeValue,
        handleInputChange: handlePostalCodeChange,
        handleInputBlur: handlePostalCodeBlur,
        hasError: postalCodeHasError
    } = useInput('', (value) => hasMinLength(value, 6));

    const {
        value: cityValue,
        handleInputChange: handleCityChange,
        handleInputBlur: handleCityBlur,
        hasError: cityHasError
    } = useInput('', (value) => isNotEmpty(value));

    const handleSubmit = (event) => {
        event.preventDefault();
        onCheckout({});
    }

    useImperativeHandle(ref, () => {
      return {
        getFormData: () => {
          return {
            isValid: isNotEmpty(nameValue) && isEmail(emailValue) && isNotEmpty(streetValue) && isNotEmpty(postalCodeValue) && isNotEmpty(cityValue),
            customerDetails: {
                email: emailValue,
                name: nameValue,
                street: streetValue,
                'postal-code': postalCodeValue,
                city: cityValue
            }
          };
        }
      }
    });

  return (
    <>
    <p>{`Total Amount ${totalAmount}`}</p>
    <Input 
      label="Full Name"
      id="name"
      type="text"
      name="name"
      onChange={handleNameChange}
      onBlur={handleNameBlur}
      value={nameValue}
      error={nameHasError && 'Name is required'}
    />
    <Input
      label="E-mail Address"
      id="email"
      type="email"
      name="email"
      onChange={handleEmailChange}
      onBlur={handleEmailBlur}
      value={emailValue}
      error={emailHasError && 'Please enter a valid email!'}
    />
    <Input 
      label="Street"
      id="street"
      type="text"
      name="street"
      onChange={handleStreetChange}
      onBlur={handleStreetBlur}
      value={streetValue}
      error={streetHasError && 'Please enter the street'}
    />
    <div className="control-row">
      <Input 
        label="Postal code"
        id="postalCode"
        type="number"
        name="postalCode"
        onChange={handlePostalCodeChange}
        onBlur={handlePostalCodeBlur}
        value={postalCodeValue}
        error={postalCodeHasError && 'Please enter a valid code'}
      />
      <Input 
        label="City"
        id="city"
        type="text"
        name="city"
        onChange={handleCityChange}
        onBlur={handleCityBlur}
        value={cityValue}
        error={cityHasError && 'Please enter a valid code'}
      />
    </div>
    </>
  )
});

export default CheckoutForm;
