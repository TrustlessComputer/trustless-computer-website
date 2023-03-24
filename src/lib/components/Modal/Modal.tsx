import { DialogContent, DialogOverlay } from "@reach/dialog";
import { Z_INDEX } from "lib/theme";
import { opacify } from "lib/utils";
import React from "react";
import { isMobile } from "react-device-detect";
import { animated, useSpring, useTransition } from "react-spring";
import { useGesture } from "react-use-gesture";
import styled, { css } from "styled-components";

const AnimatedDialogOverlay = animated(DialogOverlay);

const StyledDialogOverlay = styled(AnimatedDialogOverlay)<{
  scrollOverlay?: boolean;
}>`
  &[data-reach-dialog-overlay] {
    z-index: ${Z_INDEX.modalBackdrop};
    overflow: hidden;

    display: flex;
    align-items: center;
    overflow-y: ${({ scrollOverlay }) => scrollOverlay && "scroll"};
    justify-content: center;

    background-color: ${({ theme }) => opacify(50, theme.bg1)};

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const AnimatedDialogContent = animated(DialogContent);
// destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogContent = styled(
  ({
    hideBorder,
    maxWidth,
    minHeight,
    maxHeight,
    mobile,
    isOpen,
    scrollOverlay = true,
    ...rest
  }) => <AnimatedDialogContent {...rest} />
).attrs({
  "aria-label": "dialog",
})`
  overflow-y: auto;

  &[data-reach-dialog-content] {
    margin: auto;
    background-color: ${({ theme }) => theme.bg2};
    border: ${({ theme, hideBorder }) =>
      !hideBorder && `1px solid ${theme.border1}`};
    box-shadow: ${({ theme }) => theme.deepShadow};
    flex-direction: column;
    padding: 0;
    width: 50vw;
    overflow-y: auto;
    overflow-x: hidden;

    align-self: ${({ mobile }) => mobile && "flex-end"};
    max-width: ${({ maxWidth }) => maxWidth}px;
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
    display: ${({ scrollOverlay }) =>
      scrollOverlay ? "inline-table" : "flex"};
    border-radius: 20px;
    ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
      width: 65vw;
      margin: auto;
    `}
    ${({ theme, mobile }) => theme.deprecated_mediaWidth.deprecated_upToSmall`
      width:  85vw;
      ${
        mobile &&
        css`
          width: 100vw;
          border-radius: 20px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        `
      }
    `}
  }
`;

interface ModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  minHeight?: number | false;
  maxHeight?: number;
  maxWidth?: number;
  initialFocusRef?: React.RefObject<any>;
  children?: React.ReactNode;
  scrollOverlay?: boolean;
  hideBorder?: boolean;
}

const Modal = ({
  isOpen,
  onDismiss,
  minHeight = false,
  maxHeight = 90,
  maxWidth = 420,
  initialFocusRef,
  children,
  scrollOverlay,
  hideBorder = false,
}: ModalProps) => {
  const fadeTransition = useTransition(isOpen, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const [{ y }, set] = useSpring(() => ({
    y: 0,
    config: { mass: 1, tension: 210, friction: 20 },
  }));
  const bind = useGesture({
    onDrag: (state) => {
      set({
        y: state.down ? state.movement[1] : 0,
      });
      if (
        state.movement[1] > 300 ||
        (state.velocity > 3 && state.direction[1] > 0)
      ) {
        onDismiss();
      }
    },
  });

  return (
    <>
      {fadeTransition(
        ({ opacity }, item) =>
          item && (
            <StyledDialogOverlay
              as={AnimatedDialogOverlay}
              initialFocusRef={initialFocusRef}
              style={{
                opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
              }}
              unstable_lockFocusAcrossFrames={false}
              onDismiss={onDismiss}
            >
              <StyledDialogContent
                {...(isMobile
                  ? {
                      ...bind(),
                      style: {
                        transform: y.interpolate(
                          (y) => `translateY(${(y as number) > 0 ? y : 0}px)`
                        ),
                      },
                    }
                  : {})}
                aria-label="dialog content"
                hideBorder={hideBorder}
                maxHeight={maxHeight}
                maxWidth={maxWidth}
                minHeight={minHeight}
                mobile={isMobile}
              >
                {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                {children}
              </StyledDialogContent>
            </StyledDialogOverlay>
          )
      )}
    </>
  );
};

export default Modal;
