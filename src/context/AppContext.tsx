import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
    collapseMenu: boolean;
    setCollapseMenu: (v: boolean) => void;
    refreshProduct: boolean;
    setRefreshProduct: (v: boolean) => void;
    refreshCategory: boolean;
    setRefreshCategory: (v: boolean) => void;
    refreshGallery: boolean;
    setRefreshGallery: (v: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [collapseMenu, setCollapseMenu] = useState(false);
    const [refreshProduct, setRefreshProduct] = useState(false)
    const [refreshCategory, setRefreshCategory] = useState(false)
    const [refreshGallery, setRefreshGallery] = useState(false)
    return (
        <AppContext.Provider value={{
            collapseMenu, setCollapseMenu,
            refreshProduct, setRefreshProduct,
            refreshCategory, setRefreshCategory,
            refreshGallery, setRefreshGallery
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
