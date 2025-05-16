import React from 'react';

type Props = {
  isEdit: boolean;
  isCreate: boolean;
  isDuplicate: boolean;
  isDraft: boolean;
  isLoading: boolean;
};

const FormStatusContext = React.createContext<Props>({
  isEdit: false,
  isCreate: false,
  isDuplicate: false,
  isDraft: false,
  isLoading: false,
});

export const FormStatusContextProvider = FormStatusContext.Provider;
export const useFormStatusContext = () => React.useContext(FormStatusContext);
