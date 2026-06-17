import { createContext, useContext, useState } from "react";

const RegisterContext = createContext(null);

export const RegisterProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    id: "", password: "", passwordConfirm: "", name: "", phone: "",
  });

  const updateForm = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const resetForm = () =>
    setFormData({ id: "", password: "", passwordConfirm: "", name: "", phone: "" });

  return (
    <RegisterContext.Provider value={{ formData, updateForm, resetForm }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => useContext(RegisterContext);
