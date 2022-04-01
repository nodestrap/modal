// react:
import { default as React, useState, useRef, useEffect, } from 'react'; // base technology of our nodestrap components
import { createPortal, } from 'react-dom';
import { 
// compositions:
mainComposition, 
// styles:
style, vars, imports, 
// rules:
rule, variants, states, 
//combinators:
children, } from '@cssfn/cssfn'; // cssfn core
import { 
// hooks:
createUseSheet, } from '@cssfn/react-cssfn'; // cssfn for react
import { createCssVar, } from '@cssfn/css-var'; // Declares & retrieves *css variables* (css custom properties).
import { createCssConfig, 
// utilities:
usesGeneralProps, usesPrefixedProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // Stores & retrieves configuration using *css custom properties* (css variables)
// nodestrap utilities:
import { stripoutFocusableElement, stripoutDialog, } from '@nodestrap/stripouts';
import { 
// utilities:
setRef, } from '@nodestrap/utilities';
// nodestrap components:
import { 
// hooks:
usesSizeVariant, usesAnim, usesExcitedState, } from '@nodestrap/basic';
import { 
// hooks:
isActivating, isPassivating, isPassived, useActivePassiveState, Indicator, } from '@nodestrap/indicator';
const [modalAnimRefs, modalAnimDecls] = createCssVar();
export const usesModalAnim = () => {
    // dependencies:
    // animations:
    const [anim, animRefs] = usesAnim();
    return [
        () => style({
            ...imports([
                // animations:
                anim(),
            ]),
            ...vars({
                [modalAnimDecls.anim]: animRefs.animNone,
            }),
            ...states([
                isActivating({
                    ...vars({
                        [modalAnimDecls.anim]: cssProps.animActive,
                    }),
                }),
                isPassivating({
                    ...vars({
                        [modalAnimDecls.anim]: cssProps.animPassive,
                    }),
                }),
            ]),
        }),
        modalAnimRefs,
        modalAnimDecls,
    ];
};
export const useBackdropVariant = ({ backdropStyle }) => {
    return {
        class: backdropStyle ? backdropStyle : null,
    };
};
// styles:
export const usesDialogLayout = () => {
    // dependencies:
    // animations:
    const [anim, animRefs] = usesAnim();
    return style({
        ...imports([
            // resets:
            stripoutFocusableElement(),
            stripoutDialog(),
            // animations:
            anim(),
        ]),
        ...style({
            // layouts:
            display: 'block',
            // sizes:
            inlineSize: 'fit-content',
            blockSize: 'fit-content',
            // animations:
            boxShadow: animRefs.boxShadow,
            filter: animRefs.filter,
            anim: animRefs.anim,
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'component')), // apply general cssProps starting with component***
        }),
    });
};
export const usesDialogStates = () => {
    // dependencies:
    // states:
    const [excited] = usesExcitedState();
    return style({
        ...imports([
            // states:
            excited(),
        ]),
    });
};
export const useDialogSheet = createUseSheet(() => [
    mainComposition(imports([
        // layouts:
        usesDialogLayout(),
        // states:
        usesDialogStates(),
    ])),
], /*sheetId :*/ 'u4teynvq1y'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names
export const usesBackdropLayout = () => {
    // dependencies:
    // animations:
    const [, modalAnimRefs] = usesModalAnim();
    return style({
        // positions:
        position: 'absolute',
        ...rule('body>*>&', {
            position: 'fixed',
        }),
        inset: 0,
        zIndex: 1040,
        // layouts:
        display: 'grid',
        // child default sizes:
        justifyItems: 'center',
        alignItems: 'center',
        // sizes:
        // fills the entire screen:
        ...rule('body>*>&', {
            boxSizing: 'border-box',
            minBlockSize: '100vh',
        }),
        // animations:
        anim: modalAnimRefs.anim,
        // customize:
        ...usesGeneralProps(cssProps), // apply general cssProps
    });
};
export const usesBackdropVariants = () => {
    // dependencies:
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    return style({
        ...imports([
            // layouts:
            sizes(),
        ]),
        ...variants([
            rule('.hidden', {
                background: 'none',
            }),
            rule(['.hidden', '.interactive'], {
                // accessibilities:
                pointerEvents: 'none',
                // children:
                ...children('*', {
                    // accessibilities:
                    pointerEvents: 'initial',
                }),
            }),
        ]),
    });
};
export const usesBackdropStates = () => {
    // dependencies:
    // animations:
    const [modalAnim] = usesModalAnim();
    return style({
        ...imports([
            // animations:
            modalAnim(),
        ]),
        ...states([
            isPassived({
                // appearances:
                display: 'none', // hide the modal
            }),
        ]),
    });
};
export const useBackdropSheet = createUseSheet(() => [
    mainComposition(imports([
        // layouts:
        usesBackdropLayout(),
        // variants:
        usesBackdropVariants(),
        // states:
        usesBackdropStates(),
    ])),
], /*sheetId :*/ 'z26pqrin5i'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names
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
        componentBoxShadow: [[0, 0, '10px', 'rgba(0,0,0,0.5)']],
        //#region animations
        '@keyframes active': keyframesActive,
        '@keyframes passive': keyframesPassive,
        animActive: [['300ms', 'ease-out', 'both', keyframesActive]],
        animPassive: [['500ms', 'ease-out', 'both', keyframesPassive]],
        //#endregion animations
    };
}, { prefix: 'mdl' });
// react components:
const isServerSide = (typeof (document) === 'undefined');
export function Modal(props) {
    // styles:
    const sheet = useBackdropSheet();
    // variants:
    const backdropVariant = useBackdropVariant(props);
    // states:
    const [excitedDn, setExcitedDn] = useState(false);
    // rest props:
    const { 
    // essentials:
    // style,          // remain in <Backdrop> // <Backdrop> should be styled
    // outerRef,       // remain in <Backdrop>
    elmRef, // moved  to <Dialog>
    // accessibilities:
    active, // from accessibilities
    inheritActive, // from accessibilities
    tabIndex, // moved  to <Dialog>
    excited, onExcitedChange, 
    // actions:
    onActiveChange, 
    // modals:
    viewportRef, 
    // performances:
    lazy = false, 
    // children:
    children, ...restBackdropProps } = props;
    const { 
    // layouts:
    size, 
    // orientation,
    nude, 
    // colors:
    theme, gradient, outlined, mild, 
    // <Indicator> states:
    enabled, inheritEnabled, readOnly, inheritReadOnly,
    // active,
    // inheritActive,
     } = restBackdropProps;
    // verifies:
    React.Children.only(children);
    if (!React.isValidElement(children))
        throw Error('Invalid child element.');
    // states:
    const activePassiveState = useActivePassiveState({ active, inheritActive: false });
    const isActive = activePassiveState.active;
    const isVisible = isActive || (!!activePassiveState.class);
    const isModal = isVisible && !['hidden', 'interactive'].includes(backdropVariant.class ?? '');
    // fn props:
    const excitedFn = excited ?? excitedDn;
    // dom effects:
    //#region create the portal element and then insert it after the page is fully hydrated
    const [portalElm] = useState(() => isServerSide ? null : document.createElement('div'));
    const viewportElm = (viewportRef
        ?
            ((viewportRef.constructor === Object) ? viewportRef?.current : viewportRef)
        :
            (isServerSide ? null : document.body));
    useEffect(() => {
        // conditions:
        if (!portalElm || !viewportElm)
            return; // server side => no portal
        // setups:
        viewportElm.appendChild(portalElm);
        // cleanups:
        return () => {
            portalElm.parentElement?.removeChild(portalElm);
        };
    }, [portalElm, viewportElm]); // (re)run the setups on every time the portalElm & viewportElm changes
    //#endregion create the portal element and then insert it after the page is fully hydrated
    //#region focus the <Dialog> while the <Modal> is opened
    const dialogRef = useRef(null);
    useEffect(() => {
        // conditions:
        if (!isVisible)
            return; // <Dialog> is not shown => nothing to do
        // setups:
        dialogRef.current?.focus({ preventScroll: true }); // when actived => focus the <Dialog>, so the user able to use [esc] key to close the modal
    }, [isVisible]); // (re)run the setups on every time the <Dialog> is shown
    //#endregion focus the <Dialog> while the <Modal> is opened
    //#region un-scroll the viewport (<body>) while the <Modal> is opened
    useEffect(() => {
        // conditions:
        if (!isModal)
            return; // only for modal mode
        if (!viewportElm)
            return; // server side => no portal
        // setups:
        const scrollableElm = (viewportElm === document.body) ? document.documentElement : viewportElm;
        const scrollableEvent = (viewportElm === document.body) ? document : viewportElm;
        const currentScrollTop = scrollableElm.scrollTop;
        const currentScrollLeft = scrollableElm.scrollLeft;
        const handleScroll = (e) => {
            if (e.target === scrollableEvent) { // only handle click on the viewport, ignores click bubbling from the children
                scrollableElm.scrollTop = currentScrollTop;
                scrollableElm.scrollLeft = currentScrollLeft;
            } // if
        };
        scrollableEvent.addEventListener('scroll', handleScroll);
        // cleanups:
        return () => {
            scrollableEvent.removeEventListener('scroll', handleScroll);
        };
    }, [isModal, viewportElm]); // (re)run the setups on every time the isModal changes
    //#endregion un-scroll the viewport (<body>) while the <Modal> is opened
    //#region delays the rendering of portal until the page is fully hydrated
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        // conditions:
        if (isServerSide)
            return; // client side only
        // setups:
        setIsHydrated(true);
    }, []); // run once at startup
    //#endregion delays the rendering of portal until the page is fully hydrated
    // handlers:
    const handleBackdropPress = (e, passive = false) => {
        if (e.target === e.currentTarget) { // only handle click on the overlay, ignores click bubbling from the children
            if (!e.defaultPrevented) {
                if (props.backdropStyle === 'static') {
                    setExcitedDn(true);
                    dialogRef.current?.focus({ preventScroll: true }); // re-focus to the <Dialog>, so the user able to use [esc] key to close the Modal
                    if (!passive)
                        e.preventDefault();
                } // if
            } // if
        } // if
    };
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) { // only handle click on the overlay, ignores click bubbling from the children
            if (!e.defaultPrevented) {
                if (props.backdropStyle !== 'static') {
                    if (onActiveChange) {
                        onActiveChange(false, 'overlay');
                        e.preventDefault();
                    } // if
                } // if
            } // if
        } // if
    };
    const handleBackdropEscape = (e) => {
        if (!e.defaultPrevented) {
            if ((e.key === 'Escape') || (e.code === 'Escape')) {
                if (onActiveChange) {
                    onActiveChange(false, 'shortcut');
                    e.preventDefault();
                } // if
            } // if
        } // if
    };
    const handleContextMenu = (e) => {
        if (e.target === e.currentTarget) { // only cancels contextMenu on the overlay, allows at the children
            if (!e.defaultPrevented) {
                e.preventDefault();
            } // if
        } // if
    };
    // jsx:
    if (!isHydrated || !portalElm)
        return React.createElement(React.Fragment, null); // page is not already hydrated or server side => nothing to render
    let defaultDialogProps = {
        // essentials:
        elmRef: (elm) => {
            setRef(children.props.elmRef, elm);
            setRef(elmRef, elm);
            setRef(dialogRef, elm);
        },
        // semantics:
        semanticTag: [null, 'dialog'],
        semanticRole: 'dialog',
        'aria-modal': isModal || undefined,
        // accessibilities:
        isVisible: isVisible,
        tabIndex: tabIndex,
        excited: excitedFn,
        onExcitedChange: (newExcited) => {
            children.props.onExcitedChange?.(newExcited);
            onExcitedChange?.(newExcited);
            setExcitedDn(newExcited);
        },
        // actions:
        onActiveChange: (newActive, closeType) => {
            children.props.onActiveChange?.(newActive, closeType);
            onActiveChange?.(newActive, closeType);
        },
        // variants:
        // layouts:
        size: size,
        // orientation     : orientation,
        nude: nude,
        // colors:
        theme: theme,
        gradient: gradient,
        outlined: outlined,
        mild: mild,
        // <Indicator> states:
        enabled: enabled,
        inheritEnabled: inheritEnabled,
        readOnly: readOnly,
        inheritReadOnly: inheritReadOnly,
        active: isActive,
        inheritActive: false,
    };
    if (typeof (children.type) === 'string') {
        defaultDialogProps = {
            // essentials:
            ref: defaultDialogProps.elmRef,
        };
        if (children.type === 'dialog') {
            defaultDialogProps.open = defaultDialogProps.isVisible;
        } // if
    } // if
    return createPortal(React.createElement(Indicator, { ...restBackdropProps, 
        // accessibilities:
        active: isActive, inheritActive: false, 
        // classes:
        mainClass: props.mainClass ?? sheet.main, variantClasses: [...(props.variantClasses ?? []),
            backdropVariant.class,
        ], 
        // events:
        // watch left click on the overlay only (not at the <Dialog>):
        onMouseDown: (e) => {
            props.onMouseDown?.(e);
            handleBackdropPress(e);
        }, onTouchStart: (e) => {
            props.onTouchStart?.(e);
            handleBackdropPress(e, true);
        }, onClick: (e) => {
            props.onClick?.(e);
            handleBackdropClick(e);
        }, onContextMenu: handleContextMenu, 
        // watch [escape key] on the whole Modal, including <Dialog> & <Dialog>'s children:
        onKeyUp: (e) => {
            props.onKeyUp?.(e);
            handleBackdropEscape(e);
        }, onAnimationEnd: (e) => {
            props.onAnimationEnd?.(e);
            // states:
            activePassiveState.handleAnimationEnd(e);
        } }, (!lazy || isVisible) && React.cloneElement(React.cloneElement(children, defaultDialogProps), children.props)), portalElm);
}
export { Modal as default };
