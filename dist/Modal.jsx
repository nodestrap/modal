// react:
import { default as React, useState, useRef, useEffect, useLayoutEffect, } from 'react'; // base technology of our nodestrap components
import { 
// compositions:
composition, compositionOf, mainComposition, imports, 
// layouts:
layout, vars, children, 
// rules:
variants, states, rule, } from '@cssfn/cssfn'; // cssfn core
import { 
// hooks:
createUseSheet, } from '@cssfn/react-cssfn'; // cssfn for react
import { createCssVar, } from '@cssfn/css-var'; // Declares & retrieves *css variables* (css custom properties).
import { createCssConfig, 
// utilities:
usesGeneralProps, usesPrefixedProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // Stores & retrieves configuration using *css custom properties* (css variables)
// nodestrap utilities:
import { stripoutFocusableElement, } from '@nodestrap/stripouts';
import { 
// utilities:
isTypeOf, setRef, } from '@nodestrap/utilities';
// nodestrap components:
import { Element, } from '@nodestrap/element';
import { 
// hooks:
usesSizeVariant, usesAnim, usesExcitedState, useExcitedState, } from '@nodestrap/basic';
import { 
// hooks:
isActivating, isPassivating, isPassived, useActivePassiveState, Indicator, } from '@nodestrap/indicator';
const [modalAnimRefs, modalAnimDecls] = createCssVar();
export const usesModalAnim = () => {
    // dependencies:
    // animations:
    const [anim, animRefs] = usesAnim();
    return [
        () => composition([
            imports([
                // animations:
                anim(),
            ]),
            vars({
                [modalAnimDecls.anim]: animRefs.animNone,
            }),
            states([
                isActivating([
                    vars({
                        [modalAnimDecls.anim]: cssProps.animActive,
                    }),
                ]),
                isPassivating([
                    vars({
                        [modalAnimDecls.anim]: cssProps.animPassive,
                    }),
                ]),
            ]),
        ]),
        modalAnimRefs,
        modalAnimDecls,
    ];
};
export const useModalVariant = (props) => {
    return {
        class: props.modalStyle ? props.modalStyle : null,
    };
};
// styles:
export const usesModalElementLayout = () => {
    // dependencies:
    // animations:
    const [anim, animRefs] = usesAnim();
    return composition([
        imports([
            // resets:
            stripoutFocusableElement(),
            // animations:
            anim(),
        ]),
        layout({
            // layouts:
            display: 'inline-block',
            // animations:
            boxShadow: animRefs.boxShadow,
            filter: animRefs.filter,
            anim: animRefs.anim,
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'element')), // apply general cssProps starting with element***
        }),
    ]);
};
export const usesModalElementStates = () => {
    // dependencies:
    // states:
    const [excited] = usesExcitedState();
    return composition([
        imports([
            // states:
            excited(),
        ]),
    ]);
};
export const useModalElementSheet = createUseSheet(() => [
    mainComposition([
        imports([
            // layouts:
            usesModalElementLayout(),
            // states:
            usesModalElementStates(),
        ]),
    ]),
]);
export const usesModalLayout = () => {
    // dependencies:
    // animations:
    const [, modalAnimRefs] = usesModalAnim();
    return composition([
        layout({
            // layouts:
            display: 'block',
            // sizes:
            // fills the entire screen:
            boxSizing: 'border-box',
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            // maxWidth     : 'fill-available', // hack to excluding scrollbar // not needed since all html pages are virtually full width
            // maxHeight    : 'fill-available', // hack to excluding scrollbar // will be handle by javascript soon
            // animations:
            anim: modalAnimRefs.anim,
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesModalVariants = () => {
    // dependencies:
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    return composition([
        imports([
            // layouts:
            sizes(),
        ]),
        variants([
            rule('.hidden', [
                layout({
                    background: 'none',
                }),
            ]),
            rule(['.hidden', '.interactive'], [
                layout({
                    // accessibilities:
                    pointerEvents: 'none',
                    // children:
                    ...children('*', [
                        layout({
                            // accessibilities:
                            pointerEvents: 'initial',
                        }),
                    ]),
                }),
            ]),
        ]),
    ]);
};
export const usesModalStates = () => {
    // dependencies:
    // animations:
    const [modalAnim] = usesModalAnim();
    return composition([
        imports([
            // animations:
            modalAnim(),
        ]),
        states([
            isPassived([
                layout({
                    // appearances:
                    display: 'none', // hide the modal
                }),
            ]),
        ]),
    ]);
};
export const usesDocumentBodyLayout = () => {
    return composition([
        layout({
            // kill the scroll on the body:
            overflow: 'hidden',
        }),
    ]);
};
export const useModalSheet = createUseSheet(() => [
    mainComposition([
        imports([
            // layouts:
            usesModalLayout(),
            // variants:
            usesModalVariants(),
            // states:
            usesModalStates(),
        ]),
    ]),
    compositionOf('body', [
        imports([
            usesDocumentBodyLayout(),
        ]),
    ]),
]);
// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    //#region keyframes
    const keyframesActive = {
        from: {
            filter: [[
                    'opacity(0)',
                ]],
        },
        to: {
            filter: [[
                    'opacity(1)',
                ]],
        },
    };
    const keyframesPassive = {
        from: keyframesActive.to,
        to: keyframesActive.from,
    };
    //#endregion keyframes
    return {
        // backgrounds:
        backg: 'rgba(0,0,0, 0.5)',
        elementBoxShadow: [[0, 0, '10px', 'rgba(0,0,0,0.5)']],
        //#region animations
        '@keyframes active': keyframesActive,
        '@keyframes passive': keyframesPassive,
        animActive: [['300ms', 'ease-out', 'both', keyframesActive]],
        animPassive: [['500ms', 'ease-out', 'both', keyframesPassive]],
        //#endregion animations
    };
}, { prefix: 'mdl' });
export function ModalElement(props) {
    // styles:
    const sheet = useModalElementSheet();
    // states:
    const excitedState = useExcitedState(props);
    // rest props:
    const { 
    // accessibilities:
    tabIndex = -1, 
    // actions:
    onActiveChange, // not implemented
    onExcitedChange, // not implemented
    ...restProps } = props;
    // jsx:
    return (<Element 
    // other props:
    {...restProps} 
    // accessibilities:
    {...{
        tabIndex,
    }} 
    // classes:
    mainClass={props.mainClass ?? sheet.main} stateClasses={[...(props.stateClasses ?? []),
            excitedState.class,
        ]} 
    // events:
    onAnimationEnd={(e) => {
            props.onAnimationEnd?.(e);
            // states:
            excitedState.handleAnimationEnd(e);
        }}/>);
}
export function Modal(props) {
    // styles:
    const sheet = useModalSheet();
    // variants:
    const modalVariant = useModalVariant(props);
    // states:
    const [excitedDn, setExcitedDn] = useState(false);
    // rest props:
    const { 
    // essentials:
    elmRef, // moved to ModalElement
    // accessibilities:
    enabled, // from accessibilities, not implemented
    inheritEnabled, // from accessibilities, not implemented
    active, // from accessibilities
    inheritActive, // from accessibilities
    tabIndex, // from Modal, moved to ModalElement
    excited, onExcitedChange, 
    // actions:
    onActiveChange, 
    // children:
    children, ...restProps } = props;
    // states:
    const activePassiveState = useActivePassiveState({ active, inheritActive: false });
    const isVisible = activePassiveState.active || (!!activePassiveState.class);
    const isNoBackInteractive = isVisible && ((modalVariant.class !== 'hidden') && (modalVariant.class !== 'interactive'));
    // fn props:
    const excitedFn = excited ?? excitedDn;
    // dom effects:
    const childRef = useRef(null);
    useEffect(() => {
        if (!isVisible)
            return; // modal is not shown => nothing to do
        // setups:
        childRef.current?.focus({ preventScroll: true }); // when actived => focus the ModalElement, so the user able to use [esc] key to close the modal
    }, [isVisible]); // (re)run the setups on every time the modal is shown
    useLayoutEffect(() => {
        if (!isNoBackInteractive)
            return; // only for no_back_interactive mode
        // setups:
        document.body.classList.add(sheet.body);
        // cleanups:
        return () => {
            document.body.classList.remove(sheet.body);
        };
    }, [isNoBackInteractive, sheet.body]); // (re)run the setups on every time the no_back_interactive & sheet.body changes
    // jsx:
    return (<Indicator 
    // other props:
    {...restProps} 
    // semantics:
    semanticTag={props.semanticTag ?? [null]} semanticRole={props.semanticRole ?? 'dialog'} aria-modal={props['aria-modal'] ?? ((isVisible && isNoBackInteractive) ? true : undefined)} 
    // accessibilities:
    {...{
        active: activePassiveState.active,
        inheritActive: false,
    }} 
    // classes:
    mainClass={props.mainClass ?? sheet.main} variantClasses={[...(props.variantClasses ?? []),
            modalVariant.class,
        ]} 
    // events:
    // watch left click on the overlay only (not at the ModalElement):
    onClick={(e) => {
            props.onClick?.(e);
            if (e.target === e.currentTarget) { // only handle click on the overlay, ignores click bubbling from the children
                if (!e.defaultPrevented) {
                    if (props.modalStyle !== 'static') {
                        if (onActiveChange) {
                            onActiveChange(false, 'overlay');
                            e.preventDefault();
                        } // if
                    }
                    else {
                        setExcitedDn(true);
                        childRef.current?.focus({ preventScroll: true }); // re-focus to the ModalElement, so the user able to use [esc] key to close the Modal
                        e.preventDefault();
                    } // if static
                } // if
            } // if
        }} 
    // watch [escape key] on the whole Modal, including ModalElement & ModalElement's children:
    onKeyUp={(e) => {
            props.onKeyUp?.(e);
            if (!e.defaultPrevented) {
                if ((e.key === 'Escape') || (e.code === 'Escape')) {
                    if (onActiveChange) {
                        onActiveChange(false, 'shortcut');
                        e.preventDefault();
                    } // if
                } // if
            } // if
        }} onAnimationEnd={(e) => {
            props.onAnimationEnd?.(e);
            // states:
            activePassiveState.handleAnimationEnd(e);
        }}>
            {isTypeOf(children, ModalElement)
            ?
                <children.type 
                // other props:
                {...children.props} 
                // essentials:
                elmRef={(elm) => {
                        setRef(children.props.elmRef, elm);
                        setRef(elmRef, elm);
                        setRef(childRef, elm);
                    }} 
                // accessibilities:
                tabIndex={tabIndex} excited={excitedFn} onExcitedChange={(newExcited) => {
                        children.props.onExcitedChange?.(newExcited);
                        onExcitedChange?.(newExcited);
                        setExcitedDn(newExcited);
                    }} 
                // events:
                onActiveChange={(newActive, closeType) => {
                        children.props.onActiveChange?.(newActive, closeType);
                        onActiveChange?.(newActive, closeType);
                    }}/>
            :
                <ModalElement 
                // essentials:
                elmRef={(elm) => {
                        setRef(elmRef, elm);
                        setRef(childRef, elm);
                    }} 
                // accessibilities:
                tabIndex={tabIndex} excited={excitedFn} onExcitedChange={(newExcited) => {
                        onExcitedChange?.(newExcited);
                        setExcitedDn(newExcited);
                    }} 
                // events:
                onActiveChange={(newActive, closeType) => {
                        onActiveChange?.(newActive, closeType);
                    }}>
                    {children}
                </ModalElement>}
        </Indicator>);
}
export { Modal as default };
