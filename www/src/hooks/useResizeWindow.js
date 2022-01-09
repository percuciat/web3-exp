import {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {setWindowSize} from "../store/slices/common";

export const useResizeWindow = () => {
  const dispatch = useDispatch();

  const handleSubscribe = useCallback(() => {
    dispatch(setWindowSize(window.innerWidth))
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleSubscribe);
    return () => window.removeEventListener('resize', handleSubscribe)
  }, [])
};