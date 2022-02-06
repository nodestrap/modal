/// <reference types="react" />
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
export declare type ModalStyle = 'hidden' | 'interactive' | 'static';
export interface ModalVariant {
    modalStyle?: ModalStyle;
}
export declare const useModalVariant: (props: ModalVariant) => {
    class: ModalStyle | null;
};
export declare const usesModalElementLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesModalElementStates: () => import("@cssfn/cssfn").Rule;
export declare const useModalElementSheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const usesModalLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesModalVariants: () => import("@cssfn/cssfn").Rule;
export declare const usesModalStates: () => import("@cssfn/cssfn").Rule;
export declare const usesDocumentBodyLayout: () => import("@cssfn/cssfn").Rule;
export declare const useModalSheet: import("@cssfn/types").Factory<import("jss").Classes<"main" | "body">>;
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
export interface ModalElementProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType> extends ModalAction<TCloseType>, ElementProps<TElement>, TogglerExcitedProps, ModalVariant {
    tabIndex?: number;
}
export declare function ModalElement<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>(props: ModalElementProps<TElement, TCloseType>): JSX.Element;
export interface ModalProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType> extends IndicatorProps<TElement>, ModalElementProps<TElement, TCloseType> {
    lazy?: boolean;
}
export declare function Modal<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>(props: ModalProps<TElement, TCloseType>): JSX.Element;
export { Modal as default };
