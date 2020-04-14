import React from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";
import { polyfill } from "react-lifecycles-compat";

import Pane from "./Pane";
import Resizer, { RESIZER_DEFAULT_CLASSNAME } from "./Resizer";
import "./styles.css";
import { jiraExpand, jiraCollapse } from "./jira-icons";

/*
Fork of react-split-pane (https://github.com/tomkp/react-split-pane)
to snap to bootstrap 12-column grid and maintain responsiveness for mobile
*/

function unFocus(document, window) {
  if (document.selection) {
    document.selection.empty();
  } else {
    try {
      window.getSelection().removeAllRanges();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

function getDefaultSize(defaultSize, minSize, maxSize, draggedSize) {
  if (typeof draggedSize === "number") {
    const min = typeof minSize === "number" ? minSize : 0;
    const max = typeof maxSize === "number" && maxSize >= 0 ? maxSize : Infinity;
    return Math.max(min, Math.min(max, draggedSize));
  }
  if (defaultSize !== undefined) {
    return defaultSize;
  }
  return minSize;
}

function removeNullChildren(children) {
  return React.Children.toArray(children).filter(c => c);
}

class BootstrapSplitPane extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.collapseSidebar = this.collapseSidebar.bind(this);
    this.handleSidebarCollapse = this.handleSidebarCollapse.bind(this);

    // order of setting panel sizes.
    // 1. size
    // 2. getDefaultSize(defaultSize, minsize, maxSize)

    const { size, defaultSize, minSize, maxSize, primary, localStorageKey, collapsed } = props;

    let defaultColSize = props.defaultColSize || 3;
    if (localStorageKey && !collapsed) {
      defaultColSize = localStorage.getItem(localStorageKey) || defaultColSize;
    }

    const initialSize = size !== undefined ? size : getDefaultSize(defaultSize, minSize, maxSize, null);

    this.state = {
      active: false,
      resized: false,
      pane1Size: primary === "first" ? initialSize : undefined,
      pane2Size: primary === "second" ? initialSize : undefined,
      splitGridNum: defaultColSize,
      pane1ClassName: `col-sm-${defaultColSize}`,
      pane2ClassName: collapsed ? "container-fluid" : `col-sm-${12 - defaultColSize}`,
      collapsed: collapsed,
      collapseButtonIndex: collapsed ? 1 : 0,
      collapseButtonImgList: [jiraExpand, jiraCollapse],
      // these are props that are needed in static functions. ie: gDSFP
      instanceProps: {
        size
      }
    };
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("touchmove", this.onTouchMove);
    this.setState({ pane1Size: this.getSplitSize() });
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("touchmove", this.onTouchMove);
  }

  /*
   * Mouse related events
   */

  onMouseDown(event) {
    const eventWithTouches = Object.assign({}, event, {
      touches: [{ clientX: event.clientX, clientY: event.clientY }]
    });
    this.onTouchStart(eventWithTouches);
  }

  onMouseMove(event) {
    if (!this.state.collapsed) {
      // Dont allow resize if collapsed
      const eventWithTouches = Object.assign({}, event, {
        touches: [{ clientX: event.clientX, clientY: event.clientY }]
      });
      this.onTouchMove(eventWithTouches);
    }
  }

  onMouseUp() {
    const { allowResize, onDragFinished } = this.props;
    const { active, draggedSize } = this.state;
    if (allowResize && active && !this.state.collapsed) {
      if (typeof onDragFinished === "function") {
        onDragFinished(draggedSize);
      }
      // Round size down to 12ths
      let totalWidth = this.pane1.clientWidth + this.pane2.clientWidth;
      let gridNum = Math.min(Math.max(Math.round((12 * this.pane1.clientWidth) / totalWidth), 1), 11);
      let snappedSize = (gridNum / 12) * totalWidth;
      const isPrimaryFirst = this.props.primary === "first";

      this.setState({
        active: false,
        draggedSize: snappedSize,
        [isPrimaryFirst ? "pane1Size" : "pane2Size"]: snappedSize,
        ...this.getPaneClasses()
      });
    }
  }

  /*
   * Touch events
   */

  onTouchStart(event) {
    const { allowResize, onDragStarted, split } = this.props;
    if (allowResize && !this.state.collapsed) {
      unFocus(document, window);
      const position = split === "vertical" ? event.touches[0].clientX : event.touches[0].clientY;

      if (typeof onDragStarted === "function") {
        onDragStarted();
      }
      this.setState({
        active: true,
        position,
        pane1ClassName: null,
        pane2ClassName: null,
        pane1Size: this.getSplitSize()
      });
    }
  }

  onTouchMove(event) {
    const { allowResize, maxSize, minSize, onChange, localStorageKey, split, step } = this.props;
    const { active, position } = this.state;

    if (allowResize && active && !this.state.collapsed) {
      unFocus(document, window);
      const isPrimaryFirst = this.props.primary === "first";
      const ref = isPrimaryFirst ? this.pane1 : this.pane2;
      const ref2 = isPrimaryFirst ? this.pane2 : this.pane1;
      if (ref) {
        const node = ref;
        const node2 = ref2;

        if (node.getBoundingClientRect) {
          const width = node.getBoundingClientRect().width;
          const height = node.getBoundingClientRect().height;
          const current = split === "vertical" ? event.touches[0].clientX : event.touches[0].clientY;
          const size = split === "vertical" ? width : height;
          let positionDelta = position - current;
          if (step) {
            if (Math.abs(positionDelta) < step) {
              return;
            }
            // Integer division
            // eslint-disable-next-line no-bitwise
            positionDelta = ~~(positionDelta / step) * step;
          }
          let sizeDelta = isPrimaryFirst ? positionDelta : -positionDelta;

          const pane1Order = parseInt(window.getComputedStyle(node).order);
          const pane2Order = parseInt(window.getComputedStyle(node2).order);
          if (pane1Order > pane2Order) {
            sizeDelta = -sizeDelta;
          }

          let newMaxSize = maxSize;
          if (maxSize !== undefined && maxSize <= 0) {
            const splitPane = this.splitPane;
            if (split === "vertical") {
              newMaxSize = splitPane.getBoundingClientRect().width + maxSize;
            } else {
              newMaxSize = splitPane.getBoundingClientRect().height + maxSize;
            }
          }

          let newSize = size - sizeDelta;
          const newPosition = position - positionDelta;

          if (newSize < minSize) {
            newSize = minSize;
          } else if (maxSize !== undefined && newSize > newMaxSize) {
            newSize = newMaxSize;
          } else {
            this.setState({
              position: newPosition,
              resized: true
            });
          }

          let { ratio, splitGridNum } = this.getSplitPoint();
          if (onChange) onChange(newSize, splitGridNum, ratio);
          if (localStorageKey) {
            localStorage.setItem(localStorageKey, splitGridNum);
          }

          this.setState({
            draggedSize: newSize,
            pane1Size: newSize,
            pane2Size: this.totalWidth() - newSize,
            [isPrimaryFirst ? "pane1Size" : "pane2Size"]: newSize,
            splitGridNum
          });
        }
      }
    }
  }

  // we have to check values since gDSFP is called on every render and more in StrictMode
  static getSizeUpdate(props, state) {
    const newState = {};
    const { instanceProps } = state;

    if (instanceProps.size === props.size && props.size !== undefined) {
      return {};
    }

    const newSize =
      props.size !== undefined
        ? props.size
        : getDefaultSize(props.defaultSize, props.minSize, props.maxSize, state.draggedSize);

    if (props.size !== undefined) {
      newState.draggedSize = newSize;
    }

    const isPanel1Primary = props.primary === "first";
    newState[isPanel1Primary ? "pane1Size" : "pane2Size"] = newSize;
    newState[isPanel1Primary ? "pane2Size" : "pane1Size"] = window.innerWidth;

    newState.instanceProps = { size: props.size };
    return newState;
  }

  getPaneClasses(splitGridNum = null) {
    let pane2ClassName;
    if (splitGridNum == null) {
      splitGridNum = this.state.splitGridNum;
    }
    if (this.state.collapsed) {
      pane2ClassName = "container-fluid";
    } else {
      pane2ClassName = `col-sm-${12 - splitGridNum}`;
    }
    return {
      pane1ClassName: `col-sm-${splitGridNum}`,
      pane2ClassName
    };
  }

  totalWidth() {
    return this.pane1.clientWidth + this.pane2.clientWidth;
  }

  getSplitPoint() {
    let ratio = this.pane1.clientWidth / this.totalWidth();
    let minGridSize = this.props.allowZero ? 0 : 1;
    let splitGridNum = Math.min(Math.max(Math.round(12 * ratio), minGridSize), 11);
    return { ratio, splitGridNum };
  }

  getSplitSize() {
    let { splitGridNum } = this.state;
    return (this.totalWidth() * splitGridNum) / 12;
  }

  collapseSidebar() {
    this.setState(
      {
        collapseButtonIndex: !this.state.collapseButtonIndex,
        collapsed: !this.state.collapsed
      },
      () => this.handleSidebarCollapse()
    );
  }

  handleSidebarCollapse() {
    if (this.state.collapsed == true) {
      this.setState({
        pane1Size: 0,
        splitGridNum: 0,
        ...this.getPaneClasses(0)
      });

      if (this.props.onCollapseHook) {
        this.props.onCollapseHook();
      }
    } else if (this.state.collapsed == false) {
      document.getElementsByClassName("collapseButton").src = "https://image.flaticon.com/icons/svg/126/126492.svg";

      let splitGridNum = localStorage.getItem(this.props.localStorageKey) || 3;

      this.setState({
        active: false,

        splitGridNum,
        ...this.getPaneClasses(splitGridNum)
      });

      if (this.props.onExpandHook) {
        this.props.onExpandHook();
      }
    }
  }

  render() {
    const {
      allowResize,
      allowZero,
      children,
      className,
      onResizerClick,
      onResizerDoubleClick,
      paneClassName,
      pane1ClassName,
      pane2ClassName,
      paneStyle,
      pane1Style: pane1StyleProps,
      pane2Style: pane2StyleProps,
      resizerClassName,
      resizerStyle,
      split,
      style: styleProps
    } = this.props;

    const { pane1Size, pane2Size, collapsed } = this.state;

    const disabledClass = allowResize ? "" : "disabled";
    const resizerClassNamesIncludingDefault = resizerClassName
      ? `${resizerClassName} ${RESIZER_DEFAULT_CLASSNAME}`
      : resizerClassName;

    const notNullChildren = removeNullChildren(children);

    const style = {
      display: "flex",
      flex: 1,
      height: "100%",
      // position: 'absolute',
      outline: "none",
      overflow: "hidden",
      MozUserSelect: "text",
      WebkitUserSelect: "text",
      msUserSelect: "text",
      userSelect: "text",
      ...styleProps
    };

    if (split === "vertical") {
      Object.assign(style, {
        flexDirection: "row",
        left: 0,
        right: 0
      });
    } else {
      Object.assign(style, {
        bottom: 0,
        flexDirection: "column",
        minHeight: "100%",
        top: 0,
        width: "100%"
      });
    }

    const classes = ["SplitPane", className, split, disabledClass];

    const pane1Style = { ...paneStyle, ...pane1StyleProps };
    const pane2Style = { ...paneStyle, ...pane2StyleProps };

    const pane1Classes = ["Pane1", paneClassName, this.state.pane1ClassName, pane1ClassName].join(" ");
    const pane2Classes = ["Pane2", paneClassName, this.state.pane2ClassName, pane2ClassName].join(" ");

    return (
      <div
        className={classes.join(" ")}
        ref={node => {
          this.splitPane = node;
        }}
        style={style}
      >
        <Pane
          className={pane1Classes}
          key="pane1"
          eleRef={node => {
            this.pane1 = node;
          }}
          size={this.state.active ? pane1Size : null}
          split={split}
          style={pane1Style}
        >
          {allowZero && collapsed ? "" : notNullChildren[0]}
        </Pane>

        <Resizer
          className={disabledClass}
          onClick={onResizerClick}
          onDoubleClick={onResizerDoubleClick}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onMouseUp}
          key="resizer"
          resizerClassName={resizerClassNamesIncludingDefault}
          split={split}
          style={resizerStyle || {}}
        />

        <div>
          <button className="jira-btn" style={{ zIndex: 100 }} onClick={this.collapseSidebar}>
            {this.state.collapseButtonIndex ? jiraExpand : jiraCollapse}
          </button>
        </div>

        <Pane
          className={pane2Classes}
          key="pane2"
          eleRef={node => {
            this.pane2 = node;
          }}
          size={this.state.active ? pane2Size : null}
          split={split}
          style={pane2Style}
        >
          {notNullChildren[1]}
        </Pane>
      </div>
    );
  }
}

BootstrapSplitPane.propTypes = {
  allowResize: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
  primary: PropTypes.oneOf(["first", "second"]),
  minSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // eslint-disable-next-line react/no-unused-prop-types
  defaultSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  split: PropTypes.oneOf(["vertical", "horizontal"]),
  onDragStarted: PropTypes.func,
  onDragFinished: PropTypes.func,
  onChange: PropTypes.func,
  onResizerClick: PropTypes.func,
  onResizerDoubleClick: PropTypes.func,
  style: stylePropType,
  resizerStyle: stylePropType,
  paneClassName: PropTypes.string,
  pane1ClassName: PropTypes.string,
  pane2ClassName: PropTypes.string,
  paneStyle: stylePropType,
  pane1Style: stylePropType,
  pane2Style: stylePropType,
  resizerClassName: PropTypes.string,
  step: PropTypes.number
};

BootstrapSplitPane.defaultProps = {
  allowResize: true,
  minSize: 0,
  primary: "first",
  split: "vertical",
  paneClassName: "",
  pane1ClassName: "",
  pane2ClassName: ""
};

polyfill(BootstrapSplitPane);

export default BootstrapSplitPane;
