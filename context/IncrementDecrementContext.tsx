import { ReactNode, createContext, useState } from "react";

export type IncrementDecrementProps = {
    quantity : number,
    incrementQuantity : () => void,
    decrementQuantity : () => void
}

type CounterProviderProps = {
    children : ReactNode
};

export const CounterContext = createContext<IncrementDecrementProps | undefined>(undefined);

export default function IncrementDecrementProvider({children} : CounterProviderProps) {

    const [quantity, setQuantity] = useState(0);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    return(
        <CounterContext.Provider
            value={{quantity, incrementQuantity, decrementQuantity}}
        >
            {children}
        </CounterContext.Provider>
    );
}