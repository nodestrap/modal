import { default as React } from 'react';
import type { PropEx } from '@cssfn/css-types';
import { ElementProps } from '@nodestrap/element';
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
export declare const useModalVariant: ({ backdropStyle }: BackdropVariant) => {
    class: BackdropStyle | null;
};
export declare const usesDialogLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesDialogStates: () => import("@cssfn/cssfn").Rule;
export declare const useDialogSheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const usesBackdropLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesBackdropVariants: () => import("@cssfn/cssfn").Rule;
export declare const usesBackdropStates: () => import("@cssfn/cssfn").Rule;
export declare const usesDocumentBodyLayout: () => import("@cssfn/cssfn").Rule;
export declare const useBackdropSheet: import("@cssfn/types").Factory<import("jss").Classes<"main" | "body">>;
export declare const cssProps: import("@cssfn/css-config").Refs<{
    backg: string;
    elementBoxShadow: (string | number)[][];
    '@keyframes active': PropEx.Keyframes;
    '@keyframes passive': PropEx.Keyframes;
    animActive: (string | PropEx.Keyframes)[][];
    animPassive: (string | PropEx.Keyframes)[][];
}>, cssDecls: import("@cssfn/css-config").Decls<{
    backg: string;
    elementBoxShadow: (string | number)[][];
    '@keyframes active': PropEx.Keyframes;
    '@keyframes passive': PropEx.Keyframes;
    animActive: (string | PropEx.Keyframes)[][];
    animPassive: (string | PropEx.Keyframes)[][];
}>, cssVals: import("@cssfn/css-config").Vals<{
    backg: string;
    elementBoxShadow: (string | number)[][];
    '@keyframes active': PropEx.Keyframes;
    '@keyframes passive': PropEx.Keyframes;
    animActive: (string | PropEx.Keyframes)[][];
    animPassive: (string | PropEx.Keyframes)[][];
}>, cssConfig: import("@cssfn/css-config").CssConfigSettings;
export declare type ModalCloseType = 'overlay' | 'shortcut';
export interface ModalAction<TCloseType = ModalCloseType> {
    onActiveChange?: (newActive: boolean, arg?: TCloseType) => void;
}
export interface DialogProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType> extends ModalAction<TCloseType>, IndicatorProps<TElement>, TogglerExcitedProps {
    isModal?: boolean;
    isVisible?: boolean;
    tabIndex?: number;
}
export declare function Dialog<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>(props: DialogProps<TElement, TCloseType>): JSX.Element;
export interface ModalProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType> extends IndicatorProps<TElement>, Omit<DialogProps<TElement, TCloseType>, 'isModal' | 'isVisible'>, BackdropVariant {
    lazy?: boolean;
    dialog?: React.ReactComponentElement<any, ElementProps>;
}
export declare function Modal<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>(props: ModalProps<TElement, TCloseType>): React.ReactPortal;
export { Modal as default };
