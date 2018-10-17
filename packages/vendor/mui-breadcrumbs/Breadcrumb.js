import React, { Children } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import CollapsedItem from "./CollapsedItem";

const height = 24;
const defaultMaxItems = 8;

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center"
  },
  separator: {
    userSelect: "none",
    display: "inline-block",
    height: height,
    lineHeight: `${height}px`,
    color: theme.palette.grey[400],
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit / 4,
    paddingRight: theme.spacing.unit / 4
  }
});

function DefaultSeparator({ className, separatorText }) {
  return <div className={className}>{separatorText}</div>;
}

class Breadcrumb extends React.PureComponent {
  state = {
    expanded: false
  };

  expand(e) {
    e.preventDefault();
    this.setState({ expanded: true });
  }

  renderAllItems() {
    const allNonEmptyItems = Children.toArray(this.props.children);
    return allNonEmptyItems.map(child => React.cloneElement(child, {}));
  }

  renderItemsBeforeAndAfter() {
    const { itemsBeforeCollapse, itemsAfterCollapse } = this.props;
    const allItems = this.renderAllItems();
    // This defends against someone passing weird data, to ensure that if all
    // items would be shown anyway, we just show all items without the EllipsisItem
    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {
      return allItems;
    }

    const beforeItems = allItems.slice(0, itemsBeforeCollapse);
    const afterItems = allItems.slice(
      allItems.length - itemsAfterCollapse,
      allItems.length
    );

    return [
      ...beforeItems,
      <CollapsedItem key="ellipsis" onClick={e => this.expand(e)} />,
      ...afterItems
    ];
  }

  getSeparator(props) {
    const { separator: Separator } = this.props;
    if (Separator) {
      let className = props.className;
      if (typeof Separator === "function") {
        return <Separator {...props} className={className} />;
      }
      if (React.isValidElement(Separator)) {
        className = classNames(className, Separator.props.className);
        return React.cloneElement(Separator, {
          ...props,
          className
        });
      }
    }
    return <DefaultSeparator {...props} />;
  }

  insertSeparators(items) {
    const { classes, separatorText, separator } = this.props;

    return items.reduce((arr, v, i, source) => {
      return i < source.length - 1
        ? arr.concat(
            v,
            this.getSeparator(
              separator
                ? {
                    key: `separator-${i}`,
                    className: classes.separator
                  }
                : {
                    key: `separator-${i}`,
                    className: classes.separator,
                    separatorText
                  }
            )
          )
        : arr.concat(v);
    }, []);
  }

  render() {
    const {
      classes,
      children,
      maxItems,
      itemsBeforeCollapse,
      itemsAfterCollapse,
      separator,
      separatorText,
      ...rest
    } = this.props;

    if (!children) return <div className={classes.root} {...rest} />;

    return (
      <div className={classes.root} {...rest}>
        {this.state.expanded ||
        (maxItems && Children.toArray(children).length <= maxItems)
          ? this.insertSeparators(this.renderAllItems())
          : this.insertSeparators(this.renderItemsBeforeAndAfter())}
      </div>
    );
  }
}

Breadcrumb.propTypes = {
  classes: PropTypes.object.isRequired,
  /** Specifies the maximum number of breadcrumbs to display. When there are more
  than the maximum number, only the first and last will be shown, with an
  ellipsis in between. */
  maxItems: PropTypes.number,
  /** A single <BreadcrumbItem> or an array of <BreadcrumbItem>.  */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  /** If max items is exceeded, the number of items to show before the ellipsis */
  itemsBeforeCollapse: PropTypes.number,
  /** If max items is exceeded, the number of items to show after the ellipsis */
  itemsAfterCollapse: PropTypes.number,
  /** custom separator component */
  separator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element
  ]),
  /** custom text separator component */
  separatorText: PropTypes.string
};

Breadcrumb.defaultProps = {
  children: null,
  maxItems: defaultMaxItems,
  itemsBeforeCollapse: 1,
  itemsAfterCollapse: 1,
  separatorText: "/"
};

export default withStyles(styles, { name: "MuiBreadcrumb" })(Breadcrumb);
