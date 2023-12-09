'use client';

import { useContext } from "react";
import { localeContext } from "../localeProvider";

export function Header() {
  const { state, dispatch } = useContext(localeContext);

  const toggleLang = () => {
    dispatch({ type: "toggleLocale" });
  };

  return (
    <>
      <button onClick={toggleLang}>switch to {(state.currentLocale.id === 'en' ? 'ru' : 'en').toUpperCase()}</button>
      <p>current language: {state.currentLocale.id}</p>
    </>
  )
}
