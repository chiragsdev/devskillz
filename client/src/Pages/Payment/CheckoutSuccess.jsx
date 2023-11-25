import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserData } from "../../Redux/Slices/AuthSlice";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return <div>CheckoutSuccess page</div>;
};

export default CheckoutSuccess;
