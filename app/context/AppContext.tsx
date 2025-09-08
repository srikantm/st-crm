"use client"

import dayjs from "dayjs";
import { createContext, ReactNode, useContext, useState } from "react";

interface AppType {
  startDate: string,
  endDate: string,
  userId: string,
  shortName:string,
  name: string,
  email: string,
  contactNumber: string,
  companyId: number,
  branchId: number
}

interface AppContextType {
  appData: AppType,
  setAppData: (app: AppType) => void
}

const now = dayjs();


const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppProvider = ({ children }: { children: ReactNode }) => {
  
  const [appData, setAppData] = useState<AppType>({
    startDate: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    endDate: now.format('YYYY-MM-DD'),
    userId: "",
    name: "Madhu Krishnappa",
    shortName:"MK",
    email: "",
    contactNumber: "",
    companyId: 1,
    branchId: 1
  });

  return (
    <AppContext.Provider value={{appData, setAppData}}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a App Provider");
  }
  return context;
};