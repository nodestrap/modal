import { default as React } from 'react';
import type { PropEx } from '@cssfn/css-types';
import { TogglerExcitedProps } from '@nodestrap/basic';
import { IndicatorProps } from '@nodestrap/indicator';
export interface ModalAnimVars {
    /**
     * final animation for the modal.
     */
    anim: any;
}
export declare const usesModalAnim: () => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<ModalAnimVars>, import("@cssfn/css-var").ReadonlyDecls<ModalAnimVars>];
export declare type BackdropStyle = 'hidden' | 'interactive' | 'static';
export interface BackdropVariant {
    backdropStyle?: BackdropStyle;
}
export declare const useBackdropVariant: ({ backdropStyle }: BackdropVariant) => {
    class: BackdropStyle | null;
};
export declare const usesDialogLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesDialogStates: () => import("@cssfn/cssfn").Rule;
export declare const useDialogSheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const usesBackdropLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesBackdropVariants: () => import("@cssfn/cssfn").Rule;
export declare const usesBackdropStates: () => import("@cssfn/cssfn").Rule;
export declare const useBackdropSheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const cssProps: import("@cssfn/css-config").Refs<{
    backg: string;
    componentBoxShadow: (string | number)[][];
    '@keyframes active': PropEx.Keyframes;
    '@keyframes passive': PropEx.Keyframes;
    animActive: (string | PropEx.Keyframes)[][];
    animPassive: (string | PropEx.Keyframes)[][];
}>, cssDecls: import("@cssfn/css-config").Decls<{
    backg: string;
    componentBoxShadow: (string | number)[][];
    '@keyframes active': PropEx.Keyframes;
    '@keyframes passive': PropEx.Keyframes;
    animActive: (string | PropEx.Keyframes)[][];
    animPassive: (string | PropEx.Keyframes)[][];
}>, cssVals: import("@cssfn/css-config").Vals<{
    backg: string;
    componentBoxShadow: (string | number)[][];
    '@keyframes active': PropEx.Keyframes;
    '@keyframes passive': PropEx.Keyframes;
    animActive: (string | PropEx.Keyframes)[][];
    animPassive: (string | PropEx.Keyframes)[][];
}>, cssConfig: import("@cssfn/css-config").CssConfigSettings;
export declare type ModalCloseType = 'overlay' | 'shortcut';
export interface ModalAction<TCloseType = ModalCloseType> {
    onActiveChange?: (newActive: boolean, arg?: TCloseType) => void;
}
export interface DialogProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType> extends IndicatorProps<TElement>, ModalAction<TCloseType>, TogglerExcitedProps {
    isVisible?: boolean;
    tabIndex?: number;
}
export interface ModalProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType> extends IndicatorProps<TElement>, Omit<DialogProps<TElement, TCloseType>, 'isVisible'>, BackdropVariant {
    viewportRef?: React.RefObject<HTMLElement> | HTMLElement | null;
    lazy?: boolean;
}
export declare function Modal<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>(props: ModalProps<TElement, TCloseType>): JSX.Element;
export { Modal as default };
