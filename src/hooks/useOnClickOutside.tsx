import { useEffect, type RefObject } from "react";

interface useOnClickOutsideProps<T extends HTMLElement = HTMLElement, B extends HTMLElement = HTMLElement> {
    ref: RefObject<T | null>,
    handler: (event: Event) => void, 
    closeBtn?: RefObject<B | null>
}

export const useOnClickOutside = ({ ref, handler, closeBtn }: useOnClickOutsideProps)  => {
    useEffect(() => {
        const listener = (event: Event) => {
            if (!ref.current || ref.current.contains(event.target as Node)) return;
            if (closeBtn?.current && closeBtn.current.contains(event.target as Node)) return;

            handler(event);
        };

        document.addEventListener("pointerdown", listener);

        return () => {
            document.removeEventListener("pointerdown", listener);
        }
    }, [ref, handler, closeBtn])
};